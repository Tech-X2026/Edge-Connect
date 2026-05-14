'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  opacity: number
  baseOpacity: number
  depth: number
  phase: number
  speed: number
}

interface PageParticleBackgroundProps {
  particleCount?: number
  className?: string
}

const COLORS = [
  [2, 48, 71],     // #023047
  [0, 119, 182],   // #0077B6
  [0, 150, 199],   // #0096C7
  [0, 180, 216],   // #00B4D8
  [72, 202, 228],  // #48CAE4
]

export default function PageParticleBackground({
  particleCount = 60,
  className = '',
}: PageParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const smoothMouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY,
      active: true,
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const t = e.touches[0]
    mouseRef.current = {
      x: t.clientX,
      y: t.clientY,
      active: true,
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999, active: false }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0

    const createParticles = (w: number, h: number) => {
      const particles: Particle[] = []
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2.5 + 1
        const opacity = Math.random() * 0.3 + 0.1
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius,
          baseRadius: radius,
          opacity,
          baseOpacity: opacity,
          depth: Math.random(),
          phase: Math.random() * Math.PI * 2,
          speed: 0.05 + Math.random() * 0.15,
        })
      }
      return particles
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particlesRef.current = createParticles(window.innerWidth, window.innerHeight)
    }

    const drawFrame = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current
      const raw = mouseRef.current
      const smooth = smoothMouseRef.current
      frameRef.current++

      // Smooth mouse with lerp
      if (raw.active) {
        smooth.x += (raw.x - smooth.x) * 0.03
        smooth.y += (raw.y - smooth.y) * 0.03
      } else {
        smooth.x += (-9999 - smooth.x) * 0.02
        smooth.y += (-9999 - smooth.y) * 0.02
      }

      const mx = smooth.x
      const my = smooth.y
      const mouseRadius = 250
      const mouseForce = 0.015

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const rgb = COLORS[i % COLORS.length]
        const depthScale = 0.3 + p.depth * 0.7

        // Organic drift
        p.phase += p.speed * 0.01
        p.vx += Math.sin(p.phase) * 0.005 * depthScale
        p.vy += Math.cos(p.phase * 0.7) * 0.004 * depthScale

        // Mouse attraction
        if (raw.active) {
          const dx = mx - p.x
          const dy = my - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouseRadius && dist > 1) {
            const proximity = 1 - dist / mouseRadius
            const attraction = proximity * mouseForce * depthScale
            p.vx += (dx / dist) * attraction * 5
            p.vy += (dy / dist) * attraction * 5
            p.radius = p.baseRadius + proximity * 3 * depthScale
            p.opacity = Math.min(0.85, p.baseOpacity + proximity * 0.5)
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.03
            p.opacity += (p.baseOpacity - p.opacity) * 0.03
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.03
          p.opacity += (p.baseOpacity - p.opacity) * 0.03
        }

        // Damping
        p.vx *= 0.97
        p.vy *= 0.97

        // Clamp velocity
        const maxV = 2
        const v = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (v > maxV) {
          p.vx = (p.vx / v) * maxV
          p.vy = (p.vy / v) * maxV
        }

        // Apply velocity
        p.x += p.vx * depthScale
        p.y += p.vy * depthScale

        // Wrap edges
        if (p.x < -20) p.x = w + 15
        if (p.x > w + 20) p.x = -15
        if (p.y < -20) p.y = h + 15
        if (p.y > h + 20) p.y = -15

        // Draw glow
        if (p.opacity > 0.1) {
          const glowSize = p.radius * 4
          const gradient = ctx.createRadialGradient(
            p.x, p.y, p.radius * 0.2,
            p.x, p.y, glowSize,
          )
          gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity * 0.1})`)
          gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity})`
        ctx.fill()
      }

      // Connecting lines (only check nearby pairs for performance)
      const lineDistance = 120
      ctx.lineWidth = 0.3
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq < lineDistance * lineDistance) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / lineDistance) * 0.08
            const rgb = COLORS[i % COLORS.length]
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
            ctx.stroke()
          }
        }
      }

      // Mouse aura
      if (raw.active) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, mouseRadius * 0.35)
        gradient.addColorStop(0, 'rgba(0, 180, 216, 0.05)')
        gradient.addColorStop(0.5, 'rgba(0, 150, 199, 0.02)')
        gradient.addColorStop(1, 'rgba(0, 180, 216, 0)')
        ctx.beginPath()
        ctx.arc(mx, my, mouseRadius * 0.35, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    const loop = () => {
      drawFrame()
      animationId = requestAnimationFrame(loop)
    }

    resize()
    smoothMouseRef.current = { x: -9999, y: -9999 }
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('mouseleave', handlePointerLeave)
    window.addEventListener('touchend', handlePointerLeave)
    window.addEventListener('resize', resize)

    loop()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('touchend', handlePointerLeave)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [particleCount, handleMouseMove, handleTouchMove, handlePointerLeave])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
