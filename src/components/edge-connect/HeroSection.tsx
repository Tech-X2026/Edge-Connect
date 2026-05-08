'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import ParticleBackground from './ParticleBackground'

// ─── Types ──────────────────────────────────────────────────────────────────

interface FloatingOrb {
  id: number
  size: number
  x: string
  y: string
  gradient: string
  duration: number
  delay: number
}

interface StatItem {
  value: number
  suffix: string
  label: string
}

// ─── Constants ──────────────────────────────────────────────────────────────

const FLOATING_ORBS: FloatingOrb[] = [
  {
    id: 1,
    size: 320,
    x: '8%',
    y: '10%',
    gradient: 'from-emerald-400/25 to-cyan-300/15',
    duration: 18,
    delay: 0,
  },
  {
    id: 2,
    size: 240,
    x: '72%',
    y: '15%',
    gradient: 'from-cyan-400/20 to-emerald-300/10',
    duration: 22,
    delay: 2,
  },
  {
    id: 3,
    size: 180,
    x: '55%',
    y: '60%',
    gradient: 'from-emerald-300/18 to-teal-200/10',
    duration: 20,
    delay: 4,
  },
  {
    id: 4,
    size: 140,
    x: '18%',
    y: '68%',
    gradient: 'from-teal-300/15 to-cyan-200/10',
    duration: 16,
    delay: 1,
  },
  {
    id: 5,
    size: 110,
    x: '82%',
    y: '50%',
    gradient: 'from-cyan-300/12 to-emerald-200/8',
    duration: 24,
    delay: 3,
  },
]

const STATS: StatItem[] = [
  { value: 500, suffix: '+', label: 'Projects' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Team Members' },
]

// ─── Animation Variants ─────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.8,
    },
  },
}

const statItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// ─── CountUp Hook ───────────────────────────────────────────────────────────

function useCountUp(
  target: number,
  isInView: boolean,
  duration: number = 2000
): number {
  const [count, setCount] = useState(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    startRef.current = null
    const startTime = performance.now()

    const step = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [target, isInView, duration])

  return count
}

// ─── StatCard Sub-Component ─────────────────────────────────────────────────

interface StatCardProps {
  stat: StatItem
  index: number
}

function StatCard({ stat }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useCountUp(stat.value, isInView, 2000)

  return (
    <motion.div
      ref={ref}
      variants={statItemVariants}
      className="flex flex-col items-center gap-1 px-4 py-3 sm:px-6 sm:py-4"
    >
      <span className="text-gradient text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
        {count}
        {stat.suffix}
      </span>
      <span className="text-ec-muted text-xs font-medium tracking-wide uppercase sm:text-sm">
        {stat.label}
      </span>
    </motion.div>
  )
}

// ─── FloatingOrb Sub-Component ──────────────────────────────────────────────

interface FloatingOrbProps {
  orb: FloatingOrb
}

function FloatingOrb({ orb }: FloatingOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br ${orb.gradient} blur-3xl`}
      style={{
        width: orb.size,
        height: orb.size,
        left: orb.x,
        top: orb.y,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.5, 0.8, 0.5],
        scale: [1, 1.2, 1],
        x: [0, 25, -20, 0],
        y: [0, -30, 15, 0],
      }}
      transition={{
        duration: orb.duration,
        delay: orb.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    />
  )
}

// ─── Main HeroSection Component ─────────────────────────────────────────────

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white"
    >
      {/* ── Full‑section emerald‑green particle field (high latency) ── */}
      <ParticleBackground
        particleCount={220}
        colors={['047857', '059669', '10B981', '34D399', '6EE7B7']}
        maxRadius={3.5}
        trailLength={14}
        mouseRadius={350}
        mouseForce={0.025}
        enableGlow={true}
        className="z-0"
      />

      {/* ── Floating Orbs ── */}
      {FLOATING_ORBS.map((orb) => (
        <FloatingOrb key={orb.id} orb={orb} />
      ))}

      {/* ── Subtle radial glow behind content ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="h-[700px] w-[700px] rounded-full bg-gradient-to-br from-emerald-100/50 via-cyan-50/30 to-transparent blur-3xl" />
      </div>

      {/* ── Main Content ── */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center sm:px-6 md:py-24 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge / Tagline */}
        <motion.div
          variants={textRevealVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 backdrop-blur-sm sm:mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-ec-primary text-xs font-semibold tracking-wider uppercase sm:text-sm">
            Digital Marketing Excellence
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={textRevealVariants}
          className="text-gradient mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Elevate Your Digital Presence
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={textRevealVariants}
          className="text-ec-muted mx-auto mb-8 max-w-2xl text-base leading-relaxed sm:mb-10 sm:text-lg md:text-xl"
        >
          We craft data-driven strategies that transform your brand&apos;s online
          impact. From SEO to performance marketing, EDGE CONNECT delivers
          results that matter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={buttonVariants}
          className="mb-12 flex flex-col items-center gap-4 sm:mb-16 sm:flex-row sm:gap-5"
        >
          {/* Primary CTA — Gradient */}
          <Link
            href="/services"
            className="group bg-gradient-ec inline-flex cursor-pointer items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/40 sm:px-8 sm:py-4 sm:text-base"
          >
            Explore Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA — Outline */}
          <Link
            href="/contact"
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-emerald-600/30 bg-white/80 px-7 py-3.5 text-sm font-semibold text-ec-primary backdrop-blur-sm transition-colors duration-300 hover:border-emerald-500/50 hover:bg-emerald-50/80 sm:px-8 sm:py-4 sm:text-base"
          >
            <Play className="h-4 w-4 transition-colors duration-300 group-hover:text-emerald-500" />
            Contact Us
          </Link>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          ref={statsRef}
          variants={statsContainerVariants}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          className="glass-card w-full max-w-3xl rounded-2xl px-2 py-4 sm:px-4 sm:py-6"
        >
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
            {STATS.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Bottom fade ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-24 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-medium text-emerald-600/50">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border-2 border-emerald-300/30 p-1">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
