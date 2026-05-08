'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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
    size: 280,
    x: '10%',
    y: '15%',
    gradient: 'from-emerald-400/20 to-cyan-300/15',
    duration: 18,
    delay: 0,
  },
  {
    id: 2,
    size: 200,
    x: '75%',
    y: '20%',
    gradient: 'from-cyan-400/15 to-emerald-300/10',
    duration: 22,
    delay: 2,
  },
  {
    id: 3,
    size: 160,
    x: '60%',
    y: '65%',
    gradient: 'from-emerald-300/15 to-teal-200/10',
    duration: 20,
    delay: 4,
  },
  {
    id: 4,
    size: 120,
    x: '20%',
    y: '70%',
    gradient: 'from-teal-300/12 to-cyan-200/8',
    duration: 16,
    delay: 1,
  },
  {
    id: 5,
    size: 100,
    x: '85%',
    y: '55%',
    gradient: 'from-cyan-300/10 to-emerald-200/8',
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

function StatCard({ stat, index }: StatCardProps) {
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
      className={`absolute rounded-full bg-gradient-to-br ${orb.gradient} blur-2xl`}
      style={{
        width: orb.size,
        height: orb.size,
        left: orb.x,
        top: orb.y,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.15, 1],
        x: [0, 20, -15, 0],
        y: [0, -25, 10, 0],
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

  const handleExploreClick = useCallback(() => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleContactClick = useCallback(() => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white"
    >
      {/* ── Particle Background ── */}
      <ParticleBackground
        particleCount={50}
        color="059669"
        maxRadius={2}
        speed={0.3}
        connectionDistance={100}
      />

      {/* ── Floating Orbs ── */}
      {FLOATING_ORBS.map((orb) => (
        <FloatingOrb key={orb.id} orb={orb} />
      ))}

      {/* ── Subtle radial glow behind content ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-100/40 via-cyan-50/30 to-transparent blur-3xl" />
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
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
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
          <motion.button
            onClick={handleExploreClick}
            className="group bg-gradient-ec inline-flex cursor-pointer items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/30 sm:px-8 sm:py-4 sm:text-base"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>

          {/* Secondary CTA — Outline */}
          <motion.button
            onClick={handleContactClick}
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-emerald-600/30 bg-white/80 px-7 py-3.5 text-sm font-semibold text-ec-primary backdrop-blur-sm transition-colors duration-300 hover:border-emerald-500/50 hover:bg-emerald-50/80 sm:px-8 sm:py-4 sm:text-base"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Play className="h-4 w-4 transition-colors duration-300 group-hover:text-emerald-500" />
            Contact Us
          </motion.button>
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
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
