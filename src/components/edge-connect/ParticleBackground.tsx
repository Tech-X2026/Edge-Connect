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
  colorIndex: number
  phase: number
  speed: number
  drift: number
}

interface ParticleBackgroundProps {
  /** Number of particles to render */
  particleCount?: number
  /** Colors for particles (hex without #) */
  colors?: string[]
  /** Maximum particle radius */
  maxRadius?: number
  /** Base upward drift speed (anti-gravity) */
  driftSpeed?: number
  /** Mouse interaction radius */
  mouseRadius?: number
  /** Mouse attraction strength */
  mouseForce?: number
  /** Whether to show glow around particles */
  enableGlow?: boolean
  /** Background className override */
  className?: string
}

function createParticles(
  count: number,
  width: number,
  height: number,
  maxR: number,
  driftSpeed: number
): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    const radius = Math.random() * maxR + 1.5
    const opacity = Math.random() * 0.35 + 0.1
    const speed = Math.random() * 0.3 + 0.1
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: 0,
      radius,
      baseRadius: radius,
      opacity,
      baseOpacity: opacity,
      colorIndex: i,
      phase: Math.random() * Math.PI * 2,
      speed,
      drift: driftSpeed * (0.5 + Math.random() * 0.5),
    })
  }
  return particles
}

function parseHexColor(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ]
}

export default function ParticleBackground({
  particleCount = 120,
  colors = ['059669', '10B981', '06B6D4', 'F59E0B', 'EC4899', '8B5CF6'],
  maxRadius = 4,
  driftSpeed = 0.3,
  mouseRadius = 220,
  mouseForce = 0.04,
  enableGlow = true,
  className = '',
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999, active: false }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    const rgbColors = colors.map(parseHexColor)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particlesRef.current = createParticles(particleCount, rect.width, rect.height, maxRadius, driftSpeed)
    }

    const drawFrame = (width: number, height: number) => {
      ctx.clearRect(0, 0, width, height)
      const particles = particlesRef.current
      const mouse = mouseRef.current
      frameRef.current++

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const colorIdx = i % rgbColors.length
        const rgb = rgbColors[colorIdx]

        // ── Anti-gravity: gentle upward drift ──
        p.vy -= p.drift * 0.01

        // ── Horizontal sway (sine wave) ──
        p.phase += p.speed * 0.02
        p.vx += Math.sin(p.phase) * 0.02

        // ── Mouse attraction ──
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius && dist > 1) {
            const attraction = (1 - dist / mouseRadius) * mouseForce
            p.vx += (dx / dist) * attraction * 8
            p.vy += (dy / dist) * attraction * 8

            // Grow & brighten near mouse
            const proximity = 1 - dist / mouseRadius
            p.radius = p.baseRadius + proximity * 4
            p.opacity = Math.min(0.9, p.baseOpacity + proximity * 0.5)
          } else {
            // Settle back to base
            p.radius += (p.baseRadius - p.radius) * 0.04
            p.opacity += (p.baseOpacity - p.opacity) * 0.04
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.04
          p.opacity += (p.baseOpacity - p.opacity) * 0.04
        }

        // ── Velocity damping ──
        p.vx *= 0.96
        p.vy *= 0.96

        // ── Apply velocity ──
        p.x += p.vx
        p.y += p.vy

        // ── Wrap around edges (seamless loop) ──
        if (p.y < -20) {
          p.y = height + 10
          p.x = Math.random() * width
          p.vx = (Math.random() - 0.5) * 0.3
          p.vy = 0
        }
        if (p.x < -20) p.x = width + 10
        if (p.x > width + 20) p.x = -10

        // ── Draw glow ──
        if (enableGlow) {
          const glowSize = p.radius * 4
          const gradient = ctx.createRadialGradient(
            p.x, p.y, p.radius * 0.5,
            p.x, p.y, glowSize
          )
          gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity * 0.2})`)
          gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`)

          ctx.beginPath()
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // ── Draw particle core ──
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity})`
        ctx.fill()
      }

      // ── Draw mouse aura ──
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouseRadius * 0.5
        )
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.04)')
        gradient.addColorStop(0.4, 'rgba(6, 182, 212, 0.02)')
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')

        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouseRadius * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    const loop = () => {
      const rect = canvas.getBoundingClientRect()
      drawFrame(rect.width, rect.height)
      animationId = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [particleCount, colors, maxRadius, driftSpeed, mouseRadius, mouseForce, enableGlow, handleMouseMove, handleMouseLeave])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
