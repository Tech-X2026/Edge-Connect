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

interface ParticleBackgroundProps {
  particleCount?: number
  colors?: string[]
  maxRadius?: number
  trailLength?: number
  mouseRadius?: number
  mouseForce?: number
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
    const radius = Math.random() * maxR + 1.2
    const opacity = Math.random() * 0.45 + 0.15
    const depth = Math.random()
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius,
      baseRadius: radius,
      opacity,
      baseOpacity: opacity,
      depth,
      phase: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.2,
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
  particleCount = 200,
  colors = ['047857', '059669', '10B981', '34D399', '6EE7B7'],
  maxRadius = 3.5,
  trailLength = 12,
  mouseRadius = 350,
  mouseForce = 0.025,
  enableGlow = true,
  className = '',
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Real mouse position (raw)
  const rawMouseRef = useRef({ x: -9999, y: -9999, active: false })
  // Smoothed mouse position (lerped toward real — creates latency)
  const smoothMouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef(0)
  // ref to the parent section so we can listen on it
  const sectionRef = useRef<HTMLElement | null>(null)

  /* ── mouse / touch handlers ─────────────────────────────────────────────── */

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    rawMouseRef.current = {
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
    rawMouseRef.current = {
      x: t.clientX - rect.left,
      y: t.clientY - rect.top,
      active: true,
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    rawMouseRef.current = { x: -9999, y: -9999, active: false }
  }, [])

  /* ── animation loop ─────────────────────────────────────────────────────── */

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Attach listeners to the PARENT section so content on top doesn't block
    const section = canvas.parentElement
    sectionRef.current = section

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
      // Low‑alpha clear → long afterimage trails
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.fillRect(0, 0, width, height)

      const particles = particlesRef.current
      const raw = rawMouseRef.current
      const smooth = smoothMouseRef.current
      frameRef.current++

      // ── Smooth the mouse position (creates the latency / lag effect) ──
      if (raw.active) {
        // Lerp factor 0.04 = very smooth/slow follow → high latency feel
        smooth.x += (raw.x - smooth.x) * 0.04
        smooth.y += (raw.y - smooth.y) * 0.04
      } else {
        // When mouse leaves, decay smoothly off‑screen
        smooth.x += (-9999 - smooth.x) * 0.02
        smooth.y += (-9999 - smooth.y) * 0.02
      }

      const mouseActive = raw.active
      const mx = smooth.x
      const my = smooth.y

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const colorIdx = i % rgbColors.length
        const rgb = rgbColors[colorIdx]

        // depth‑scaled speed (foreground moves faster → parallax)
        const depthScale = 0.3 + p.depth * 0.7

        // ── gentle organic drift ──
        p.phase += p.speed * 0.012
        p.vx += Math.sin(p.phase) * 0.008 * depthScale
        p.vy += Math.cos(p.phase * 0.7) * 0.006 * depthScale

        // ── mouse attraction (toward smoothed mouse) ──
        if (mouseActive) {
          const dx = mx - p.x
          const dy = my - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius && dist > 1) {
            const proximity = 1 - dist / mouseRadius
            // Gentle attraction scaled by depth
            const attraction = proximity * mouseForce * depthScale
            p.vx += (dx / dist) * attraction * 6
            p.vy += (dy / dist) * attraction * 6

            // grow & brighten near cursor
            p.radius = p.baseRadius + proximity * 5 * depthScale
            p.opacity = Math.min(0.95, p.baseOpacity + proximity * 0.6)
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.03
            p.opacity += (p.baseOpacity - p.opacity) * 0.03
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.03
          p.opacity += (p.baseOpacity - p.opacity) * 0.03
        }

        // ── velocity damping (high friction → smooth slow deceleration) ──
        p.vx *= 0.97
        p.vy *= 0.97

        // ── clamp velocity ──
        const maxV = 3
        const v = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (v > maxV) {
          p.vx = (p.vx / v) * maxV
          p.vy = (p.vy / v) * maxV
        }

        // ── update trail ──
        for (let t = p.trail.length - 1; t > 0; t--) {
          p.trail[t].x = p.trail[t - 1].x
          p.trail[t].y = p.trail[t - 1].y
          p.trail[t].opacity = p.trail[t - 1].opacity * 0.75
        }
        p.trail[0].x = p.x
        p.trail[0].y = p.y
        p.trail[0].opacity = p.opacity * 0.45

        // ── apply velocity ──
        p.x += p.vx * depthScale
        p.y += p.vy * depthScale

        // ── wrap edges ──
        if (p.x < -40) p.x = width + 30
        if (p.x > width + 40) p.x = -30
        if (p.y < -40) p.y = height + 30
        if (p.y > height + 40) p.y = -30

        // ── draw trail segments ──
        for (let t = p.trail.length - 1; t >= 0; t--) {
          const tr = p.trail[t]
          if (tr.opacity < 0.008) continue
          const trailRadius = p.radius * (1 - t * 0.07)
          if (trailRadius < 0.2) continue
          ctx.beginPath()
          ctx.arc(tr.x, tr.y, trailRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${tr.opacity * 0.25})`
          ctx.fill()
        }

        // ── draw glow halo ──
        if (enableGlow && p.opacity > 0.12) {
          const glowSize = p.radius * 6
          const gradient = ctx.createRadialGradient(
            p.x, p.y, p.radius * 0.2,
            p.x, p.y, glowSize,
          )
          gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.opacity * 0.15})`)
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
      const lineDistance = 130
      ctx.lineWidth = 0.35
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq < lineDistance * lineDistance) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / lineDistance) * 0.1
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

      // ── mouse aura (at smoothed position) ──
      if (mouseActive) {
        const gradient = ctx.createRadialGradient(
          mx, my, 0,
          mx, my, mouseRadius * 0.4,
        )
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.07)')
        gradient.addColorStop(0.5, 'rgba(5, 150, 105, 0.03)')
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')
        ctx.beginPath()
        ctx.arc(mx, my, mouseRadius * 0.4, 0, Math.PI * 2)
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

    // Listen on the parent section element (not the canvas) so the effect
    // works across the whole hero area even when content overlaps
    const listenTarget = section || canvas
    listenTarget.addEventListener('mousemove', handleMouseMove)
    listenTarget.addEventListener('touchmove', handleTouchMove, { passive: true })
    listenTarget.addEventListener('mouseleave', handlePointerLeave)
    listenTarget.addEventListener('touchend', handlePointerLeave)
    window.addEventListener('resize', resize)

    // Initialize smoothed mouse to off‑screen
    smoothMouseRef.current = { x: -9999, y: -9999 }

    // Full clear first frame
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    loop()

    return () => {
      listenTarget.removeEventListener('mousemove', handleMouseMove)
      listenTarget.removeEventListener('touchmove', handleTouchMove)
      listenTarget.removeEventListener('mouseleave', handlePointerLeave)
      listenTarget.removeEventListener('touchend', handlePointerLeave)
      window.removeEventListener('resize', resize)
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
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
