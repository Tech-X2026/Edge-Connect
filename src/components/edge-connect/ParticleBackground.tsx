'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

interface ParticleBackgroundProps {
  /** Number of particles to render */
  particleCount?: number
  /** Base color for particles (hex without #) */
  color?: string
  /** Maximum particle radius */
  maxRadius?: number
  /** Speed multiplier */
  speed?: number
  /** Connection line distance threshold */
  connectionDistance?: number
  /** Background className override */
  className?: string
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
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * spd,
      vy: (Math.random() - 0.5) * spd,
      radius: Math.random() * maxR + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
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
  particleCount = 60,
  color = '059669',
  maxRadius = 2.5,
  speed = 0.4,
  connectionDistance = 120,
  className = '',
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let particles: Particle[] = []
    const rgb = parseHexColor(color)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = createParticles(particleCount, rect.width, rect.height, speed, maxRadius)
    }

    const drawFrame = (width: number, height: number) => {
      ctx.clearRect(0, 0, width, height)

      // Update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        p.x = Math.max(0, Math.min(width, p.x))
        p.y = Math.max(0, Math.min(height, p.y))
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const lineOpacity = (1 - dist / connectionDistance) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${lineOpacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity})`
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
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [particleCount, color, maxRadius, speed, connectionDistance])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
