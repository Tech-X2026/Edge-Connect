'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Award, Target, Lightbulb } from 'lucide-react'

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
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const values = [
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'We put our clients at the heart of everything we do, building lasting partnerships based on trust and results.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We pursue the highest standards in every strategy, campaign, and deliverable we create.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'Every action we take is measured against tangible outcomes that drive your business forward.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay ahead of the curve, leveraging cutting-edge tools and creative thinking to solve complex challenges.',
  },
]

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#CAF0F8]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#CAF0F8]/30 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-ec-primary transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
              About Us
            </span>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Who We Are at{' '}
              <span className="text-gradient">EDGE CONNECT</span>
            </h2>
            <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
              EDGE CONNECT is a full-service digital marketing agency that bridges the gap between brands and their audiences. With over 15 years of collective expertise, we craft strategies that don&apos;t just reach people — they resonate, engage, and convert.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            variants={fadeInUp}
            className="mb-16 grid items-center gap-10 md:grid-cols-2 md:gap-16"
          >
            {/* Left: Visual element */}
            <div className="relative">
              <div className="glow-cyan-strong relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#023047] to-[#0077B6] p-8 md:p-10">
                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#48CAE4]/20 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#90E0EF]/15 blur-2xl" />
                <div className="relative z-10">
                  <div className="mb-6 text-6xl font-black text-white sm:text-7xl md:text-8xl">
                    15+
                  </div>
                  <div className="text-lg font-semibold text-white sm:text-xl">
                    Years of Digital Excellence
                  </div>
                  <div className="mt-2 text-sm text-[#CAF0F8] sm:text-base">
                    Transforming businesses through innovative digital strategies
                  </div>
                </div>
                {/* Decorative dots */}
                <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-2 opacity-20">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Story text */}
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Our Story
              </h3>
              <p className="text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                Founded with a simple yet powerful belief — that every business deserves a digital presence that truly reflects its potential — EDGE CONNECT has grown from a small team of passionate marketers into a full-fledged agency serving clients across industries.
              </p>
              <p className="text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                We combine creativity with data-driven insights to deliver campaigns that make a real difference. Our team of strategists, designers, developers, and analysts work as one cohesive unit to ensure your brand stands out in the digital landscape.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {['Strategy', 'Creativity', 'Data', 'Results'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-5 py-1.5 text-sm font-bold text-ec-primary transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group glass-card rounded-2xl p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-[#CAF0F8]/50"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-ec shadow-sm">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-gray-900">
                    {value.title}
                  </h4>
                  <p className="text-sm font-medium leading-relaxed text-ec-muted">
                    {value.description}
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
