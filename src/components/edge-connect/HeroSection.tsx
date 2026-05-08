'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

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
      <span className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
        {count}
        {stat.suffix}
      </span>
      <span className="text-xs font-medium tracking-wide uppercase text-emerald-100 sm:text-sm">
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
  const videoRef = useRef<HTMLVideoElement>(null)
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── Background Video ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay to make text readable on top of video ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* ── Green tint overlay for brand color ── */}
      <div className="absolute inset-0 bg-emerald-900/20" />

      {/* ── Floating Orbs (on top of video) ── */}
      {FLOATING_ORBS.map((orb) => (
        <FloatingOrb key={orb.id} orb={orb} />
      ))}

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
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md sm:mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-300 sm:text-sm">
            Digital Marketing Excellence
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={textRevealVariants}
          className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Elevate Your{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Digital Presence
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={textRevealVariants}
          className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-300 sm:mb-10 sm:text-lg md:text-xl"
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
            className="group bg-gradient-ec inline-flex cursor-pointer items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/40 sm:px-8 sm:py-4 sm:text-base"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>

          {/* Secondary CTA — Outline */}
          <motion.button
            onClick={handleContactClick}
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/50 hover:bg-white/10 sm:px-8 sm:py-4 sm:text-base"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Play className="h-4 w-4 transition-colors duration-300 group-hover:text-emerald-400" />
            Contact Us
          </motion.button>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          ref={statsRef}
          variants={statsContainerVariants}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 px-2 py-4 backdrop-blur-md sm:px-4 sm:py-6"
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
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
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
          <span className="text-xs font-medium text-white/50">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border-2 border-white/20 p-1">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
