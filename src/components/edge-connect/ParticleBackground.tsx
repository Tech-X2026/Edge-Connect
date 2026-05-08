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
}

interface ParticleBackgroundProps {
  /** Number of particles to render */
  particleCount?: number
  /** Colors for particles (hex without #) */
  colors?: string[]
  /** Maximum particle radius */
  maxRadius?: number
  /** Speed multiplier */
  speed?: number
  /** Connection line distance threshold */
  connectionDistance?: number
  /** Mouse interaction radius */
  mouseRadius?: number
  /** Mouse interaction strength (repulsion force) */
  mouseForce?: number
  /** Background className override */
  className?: string
  /** Whether to show glow around particles near mouse */
  enableGlow?: boolean
  /** Whether to highlight connections near mouse */
  highlightConnections?: boolean
}

function createParticles(
  count: number,
  width: number,
  height: number,
  spd: number,
  maxR: number
): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    const radius = Math.random() * maxR + 1
    const opacity = Math.random() * 0.4 + 0.15
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * spd,
      vy: (Math.random() - 0.5) * spd,
      radius,
      baseRadius: radius,
      opacity,
      baseOpacity: opacity,
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
  particleCount = 100,
  colors = ['059669', '10B981', '06B6D4'],
  maxRadius = 3,
  speed = 0.5,
  connectionDistance = 150,
  mouseRadius = 180,
  mouseForce = 0.08,
  className = '',
  enableGlow = true,
  highlightConnections = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const particlesRef = useRef<Particle[]>([])

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
      particlesRef.current = createParticles(particleCount, rect.width, rect.height, speed, maxRadius)
    }

    // Assign a color index to each particle
    const particleColorIndices: number[] = []
    for (let i = 0; i < particleCount; i++) {
      particleColorIndices.push(i % rgbColors.length)
    }

    const drawFrame = (width: number, height: number) => {
      ctx.clearRect(0, 0, width, height)
      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Update positions with mouse interaction
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * mouseForce
            p.vx += (dx / dist) * force * 10
            p.vy += (dy / dist) * force * 10

            // Enlarge particles near mouse
            const proximity = 1 - dist / mouseRadius
            p.radius = p.baseRadius + proximity * 3
            p.opacity = Math.min(1, p.baseOpacity + proximity * 0.5)
          } else {
            // Gradually return to base values
            p.radius += (p.baseRadius - p.radius) * 0.05
            p.opacity += (p.baseOpacity - p.opacity) * 0.05
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05
          p.opacity += (p.baseOpacity - p.opacity) * 0.05
        }

        // Apply velocity damping
        p.vx *= 0.98
        p.vy *= 0.98

        // Ensure minimum velocity for continuous movement
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (currentSpeed < speed * 0.3) {
          const angle = Math.atan2(p.vy, p.vx)
          p.vx = Math.cos(angle) * speed * 0.3
          p.vy = Math.sin(angle) * speed * 0.3
        }

        p.x += p.vx
        p.y += p.vy

        // Bounce off walls
        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) }
        if (p.x > width) { p.x = width; p.vx = -Math.abs(p.vx) }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) }
        if (p.y > height) { p.y = height; p.vy = -Math.abs(p.vy) }
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const baseLineOpacity = (1 - dist / connectionDistance) * 0.12

            // Highlight connections near mouse
            let mouseInfluence = 0
            if (highlightConnections && mouse.active) {
              const midX = (particles[i].x + particles[j].x) / 2
              const midY = (particles[i].y + particles[j].y) / 2
              const mouseDist = Math.sqrt(
                (midX - mouse.x) ** 2 + (midY - mouse.y) ** 2
              )
              if (mouseDist < mouseRadius) {
                mouseInfluence = 1 - mouseDist / mouseRadius
              }
            }

            const lineOpacity = baseLineOpacity + mouseInfluence * 0.25
            const colorIdx = particleColorIndices[i]
            const rgb = rgbColors[colorIdx]

            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${lineOpacity})`
            ctx.lineWidth = mouseInfluence > 0 ? 0.5 + mouseInfluence * 1.5 : 0.5
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const colorIdx = particleColorIndices[i]
        const rgb = rgbColors[colorIdx]

        // Glow effect for particles near mouse
        if (enableGlow && mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius) {
            const proximity = 1 - dist / mouseRadius
            const glowRadius = p.radius + proximity * 12
            const glowOpacity = proximity * 0.15

            const gradient = ctx.createRadialGradient(
              p.x, p.y, p.radius,
              p.x, p.y, glowRadius
            )
            gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${glowOpacity})`)
            gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`)

            ctx.beginPath()
            ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()
          }
        }

        // Particle core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity})`
        ctx.fill()
      }

      // Draw mouse cursor glow
      if (mouse.active && enableGlow) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouseRadius * 0.6
        )
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.06)')
        gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)')
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')

        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouseRadius * 0.6, 0, Math.PI * 2)
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
  }, [particleCount, colors, maxRadius, speed, connectionDistance, mouseRadius, mouseForce, enableGlow, highlightConnections, handleMouseMove, handleMouseLeave])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
