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
  depth: number          // 0‑1 parallax depth layer
  phase: number
  speed: number
  trail: { x: number; y: number; opacity: number }[]
}

interface ParticleBackgroundProps {
  particleCount?: number
  /** Hex colours WITHOUT # prefix — default is emerald‑green palette */
  colors?: string[]
  maxRadius?: number
  /** How many frames of trail each particle keeps */
  trailLength?: number
  /** Mouse interaction radius */
  mouseRadius?: number
  /** Mouse attraction strength */
  mouseForce?: number
  /** Show soft glow halo around particles */
  enableGlow?: boolean
  className?: string
}

/* ── helpers ──────────────────────────────────────────────────────────────── */

function createParticles(
  count: number,
  width: number,
  height: number,
  maxR: number,
  trailLen: number,
): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    const radius = Math.random() * maxR + 1
    const opacity = Math.random() * 0.4 + 0.12
    const depth = Math.random()            // 0 = far background, 1 = foreground
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius,
      baseRadius: radius,
      opacity,
      baseOpacity: opacity,
      depth,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.25,
      trail: Array.from({ length: trailLen }, () => ({
        x: 0,
        y: 0,
        opacity: 0,
      })),
    })
  }
  return particles
}

function parseHex(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ]
}

/* ── component ────────────────────────────────────────────────────────────── */

export default function ParticleBackground({
  particleCount = 160,
  colors = ['047857', '059669', '10B981', '34D399', '6EE7B7'],
  maxRadius = 3.5,
  trailLength = 6,
  mouseRadius = 260,
  mouseForce = 0.06,
  enableGlow = true,
  className = '',
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef(0)

  /* ── mouse handlers ─────────────────────────────────────────────────────── */

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

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const t = e.touches[0]
    mouseRef.current = {
      x: t.clientX - rect.left,
      y: t.clientY - rect.top,
      active: true,
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999, active: false }
  }, [])

  /* ── animation loop ─────────────────────────────────────────────────────── */

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    const rgbColors = colors.map(parseHex)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particlesRef.current = createParticles(
        particleCount,
        rect.width,
        rect.height,
        maxRadius,
        trailLength,
      )
    }

    /* ── draw one frame ─────────────────────────────────────────────────── */

    const drawFrame = (width: number, height: number) => {
      // translucent clear → natural motion‑blur / trail
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)'
      ctx.fillRect(0, 0, width, height)

      const particles = particlesRef.current
      const mouse = mouseRef.current
      frameRef.current++

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const colorIdx = i % rgbColors.length
        const rgb = rgbColors[colorIdx]

        // depth‑scaled speed (foreground moves faster → parallax)
        const depthScale = 0.4 + p.depth * 0.6

        // ── gentle organic drift ──
        p.phase += p.speed * 0.015
        p.vx += Math.sin(p.phase) * 0.012 * depthScale
        p.vy += Math.cos(p.phase * 0.7) * 0.008 * depthScale

        // ── mouse attraction ──
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius && dist > 1) {
            const proximity = 1 - dist / mouseRadius
            // stronger pull for foreground particles
            const attraction = proximity * mouseForce * depthScale
            p.vx += (dx / dist) * attraction * 10
            p.vy += (dy / dist) * attraction * 10

            // grow & brighten near cursor
            p.radius = p.baseRadius + proximity * 5 * depthScale
            p.opacity = Math.min(0.95, p.baseOpacity + proximity * 0.55)
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.05
            p.opacity += (p.baseOpacity - p.opacity) * 0.05
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05
          p.opacity += (p.baseOpacity - p.opacity) * 0.05
        }

        // ── velocity damping (smooth deceleration) ──
        p.vx *= 0.955
        p.vy *= 0.955

        // ── clamp velocity ──
        const maxV = 4
        const v = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (v > maxV) {
          p.vx = (p.vx / v) * maxV
          p.vy = (p.vy / v) * maxV
        }

        // ── update trail ──
        // shift trail history
        for (let t = p.trail.length - 1; t > 0; t--) {
          p.trail[t].x = p.trail[t - 1].x
          p.trail[t].y = p.trail[t - 1].y
          p.trail[t].opacity = p.trail[t - 1].opacity * 0.7
        }
        p.trail[0].x = p.x
        p.trail[0].y = p.y
        p.trail[0].opacity = p.opacity * 0.5

        // ── apply velocity ──
        p.x += p.vx * depthScale
        p.y += p.vy * depthScale

        // ── wrap edges ──
        if (p.x < -30) p.x = width + 20
        if (p.x > width + 30) p.x = -20
        if (p.y < -30) p.y = height + 20
        if (p.y > height + 30) p.y = -20

        // ── draw trail segments ──
        for (let t = p.trail.length - 1; t >= 0; t--) {
          const tr = p.trail[t]
          if (tr.opacity < 0.01) continue
          const trailRadius = p.radius * (1 - t * 0.12)
          if (trailRadius < 0.3) continue
          ctx.beginPath()
          ctx.arc(tr.x, tr.y, trailRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${tr.opacity * 0.3})`
          ctx.fill()
        }

        // ── draw glow halo ──
        if (enableGlow && p.opacity > 0.15) {
          const glowSize = p.radius * 5
          const gradient = ctx.createRadialGradient(
            p.x, p.y, p.radius * 0.3,
            p.x, p.y, glowSize,
          )
          gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity * 0.18})`)
          gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // ── draw particle core ──
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity})`
        ctx.fill()
      }

      // ── draw connecting lines between nearby particles ──
      const lineDistance = 120
      ctx.lineWidth = 0.4
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < lineDistance) {
            const alpha = (1 - dist / lineDistance) * 0.12
            const colorIdxA = i % rgbColors.length
            const rgbA = rgbColors[colorIdxA]
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${rgbA[0]}, ${rgbA[1]}, ${rgbA[2]}, ${alpha})`
            ctx.stroke()
          }
        }
      }

      // ── mouse aura ──
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouseRadius * 0.45,
        )
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.06)')
        gradient.addColorStop(0.5, 'rgba(5, 150, 105, 0.025)')
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouseRadius * 0.45, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    /* ── main loop ── */
    const loop = () => {
      const rect = canvas.getBoundingClientRect()
      drawFrame(rect.width, rect.height)
      animationId = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('mouseleave', handlePointerLeave)
    canvas.addEventListener('touchend', handlePointerLeave)

    // clear canvas fully once so no leftover from previous mount
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('mouseleave', handlePointerLeave)
      canvas.removeEventListener('touchend', handlePointerLeave)
      cancelAnimationFrame(animationId)
    }
  }, [
    particleCount,
    colors,
    maxRadius,
    trailLength,
    mouseRadius,
    mouseForce,
    enableGlow,
    handleMouseMove,
    handleTouchMove,
    handlePointerLeave,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
