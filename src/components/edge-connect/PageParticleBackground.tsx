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
  trail: { x: number; y: number; opacity: number }[]
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
  particleCount = 150,
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
    const trailLength = 8

    const createParticles = (w: number, h: number) => {
      const particles: Particle[] = []
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2.8 + 1.2
        const opacity = Math.random() * 0.35 + 0.15
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius,
          baseRadius: radius,
          opacity,
          baseOpacity: opacity,
          depth: Math.random(),
          phase: Math.random() * Math.PI * 2,
          speed: 0.06 + Math.random() * 0.18,
          trail: Array.from({ length: trailLength }, () => ({
            x: 0,
            y: 0,
            opacity: 0,
          })),
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

      // Low-alpha clear for subtle afterimage trails
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.fillRect(0, 0, w, h)

      const particles = particlesRef.current
      const raw = mouseRef.current
      const smooth = smoothMouseRef.current
      frameRef.current++

      // Smooth mouse with lerp
      if (raw.active) {
        smooth.x += (raw.x - smooth.x) * 0.04
        smooth.y += (raw.y - smooth.y) * 0.04
      } else {
        smooth.x += (-9999 - smooth.x) * 0.02
        smooth.y += (-9999 - smooth.y) * 0.02
      }

      const mx = smooth.x
      const my = smooth.y
      const mouseRadius = 300
      const mouseForce = 0.02

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const rgb = COLORS[i % COLORS.length]
        const depthScale = 0.3 + p.depth * 0.7

        // Organic drift
        p.phase += p.speed * 0.012
        p.vx += Math.sin(p.phase) * 0.006 * depthScale
        p.vy += Math.cos(p.phase * 0.7) * 0.005 * depthScale

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
            p.radius = p.baseRadius + proximity * 4 * depthScale
            p.opacity = Math.min(0.9, p.baseOpacity + proximity * 0.55)
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
        const maxV = 2.5
        const v = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (v > maxV) {
          p.vx = (p.vx / v) * maxV
          p.vy = (p.vy / v) * maxV
        }

        // Update trail
        for (let t = p.trail.length - 1; t > 0; t--) {
          p.trail[t].x = p.trail[t - 1].x
          p.trail[t].y = p.trail[t - 1].y
          p.trail[t].opacity = p.trail[t - 1].opacity * 0.7
        }
        p.trail[0].x = p.x
        p.trail[0].y = p.y
        p.trail[0].opacity = p.opacity * 0.4

        // Apply velocity
        p.x += p.vx * depthScale
        p.y += p.vy * depthScale

        // Wrap edges
        if (p.x < -30) p.x = w + 20
        if (p.x > w + 30) p.x = -20
        if (p.y < -30) p.y = h + 20
        if (p.y > h + 30) p.y = -20

        // Draw trail segments
        for (let t = p.trail.length - 1; t >= 0; t--) {
          const tr = p.trail[t]
          if (tr.opacity < 0.01) continue
          const trailRadius = p.radius * (1 - t * 0.08)
          if (trailRadius < 0.3) continue
          ctx.beginPath()
          ctx.arc(tr.x, tr.y, trailRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${tr.opacity * 0.2})`
          ctx.fill()
        }

        // Draw glow halo
        if (p.opacity > 0.12) {
          const glowSize = p.radius * 5
          const gradient = ctx.createRadialGradient(
            p.x, p.y, p.radius * 0.2,
            p.x, p.y, glowSize,
          )
          gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity * 0.12})`)
          gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Draw particle core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity})`
        ctx.fill()
      }

      // Connecting lines between nearby particles
      const lineDistance = 140
      ctx.lineWidth = 0.4
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq < lineDistance * lineDistance) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / lineDistance) * 0.12
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
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, mouseRadius * 0.4)
        gradient.addColorStop(0, 'rgba(0, 180, 216, 0.06)')
        gradient.addColorStop(0.5, 'rgba(0, 150, 199, 0.025)')
        gradient.addColorStop(1, 'rgba(0, 180, 216, 0)')
        ctx.beginPath()
        ctx.arc(mx, my, mouseRadius * 0.4, 0, Math.PI * 2)
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
