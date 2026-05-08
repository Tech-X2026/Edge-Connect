'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Eye, Compass, Rocket, Shield, Zap, Globe, Target } from 'lucide-react'
import ParticleBackground from './ParticleBackground'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const pillars = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Transparent communication and ethical practices form the backbone of our operations.',
  },
  {
    icon: Zap,
    title: 'Agility',
    description: 'We adapt swiftly to the ever-changing digital landscape, keeping your brand ahead.',
  },
  {
    icon: Globe,
    title: 'Global Mindset',
    description: 'Our strategies are designed to resonate across markets and cultures worldwide.',
  },
]

export default function VisionMissionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="vision-mission" className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* ── Emerald‑green particle field (high latency) ── */}
      <ParticleBackground
        particleCount={120}
        colors={['047857', '059669', '10B981', '34D399', '6EE7B7']}
        maxRadius={3}
        trailLength={10}
        mouseRadius={300}
        mouseForce={0.025}
        enableGlow={true}
      />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-[1] h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
      <div className="pointer-events-none absolute -right-32 top-1/3 z-[1] h-64 w-64 rounded-full bg-cyan-50/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-1/3 z-[1] h-64 w-64 rounded-full bg-emerald-50/60 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-ec-primary">
              Vision & Mission
            </span>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Guided by Purpose,{' '}
              <span className="text-gradient">Driven by Impact</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-ec-muted sm:text-lg">
              Our vision and mission shape every strategy we create and every campaign we launch.
            </p>
          </motion.div>

          {/* Vision & Mission Cards */}
          <div className="mb-16 grid gap-8 md:grid-cols-2">
            {/* Vision Card */}
            <motion.div
              variants={cardVariants}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-700" />
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5 blur-xl transition-transform duration-500 group-hover:scale-125" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-cyan-400/10 blur-xl transition-transform duration-500 group-hover:scale-125" />
              <div className="relative z-10 p-8 md:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Our Vision
                </h3>
                <p className="text-base leading-relaxed text-emerald-100 sm:text-lg">
                  To be the most trusted and innovative digital marketing partner globally, empowering businesses of all sizes to achieve extraordinary digital growth and create meaningful connections with their audiences.
                </p>
                <div className="mt-8 flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-cyan-300" />
                  <span className="text-sm font-medium text-cyan-200">
                    Empowering Digital Growth
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={cardVariants}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-cyan-700" />
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5 blur-xl transition-transform duration-500 group-hover:scale-125" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-emerald-400/10 blur-xl transition-transform duration-500 group-hover:scale-125" />
              <div className="relative z-10 p-8 md:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <Compass className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Our Mission
                </h3>
                <p className="text-base leading-relaxed text-cyan-100 sm:text-lg">
                  To deliver measurable, impactful digital marketing solutions through a fusion of creative storytelling, data intelligence, and cutting-edge technology — ensuring every client achieves sustainable growth and a competitive edge.
                </p>
                <div className="mt-8 flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-300" />
                  <span className="text-sm font-medium text-emerald-200">
                    Delivering Measurable Impact
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Pillars */}
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
              Our Core Pillars
            </h3>
            <p className="text-sm text-ec-muted sm:text-base">
              The principles that anchor everything we do
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-3"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group glass-card rounded-2xl p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-emerald-100/50"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-ec shadow-sm">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-gray-900">
                    {pillar.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-ec-muted">
                    {pillar.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
