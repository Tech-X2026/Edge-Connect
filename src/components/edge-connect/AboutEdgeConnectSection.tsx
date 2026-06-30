'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Sparkles, Quote, Globe, MapPin, ArrowRight,
  CheckCircle2, Target, Eye, TrendingUp, Users, Star
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
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
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const outcomes = [
  {
    icon: Globe,
    title: 'Strengthen Online Presence',
    description: 'Build a digital footprint that stands out and commands attention in your industry.',
  },
  {
    icon: Target,
    title: 'Reach the Right Audience',
    description: 'Precision targeting ensures your message reaches the people who matter most.',
  },
  {
    icon: Users,
    title: 'Improve Customer Engagement',
    description: 'Create meaningful interactions that turn visitors into loyal customers.',
  },
  {
    icon: TrendingUp,
    title: 'Generate Quality Leads',
    description: 'Attract high-intent prospects ready to take the next step with your brand.',
  },
  {
    icon: Star,
    title: 'Build Brand Credibility',
    description: 'Establish lasting trust and authority in your market through consistent excellence.',
  },
]

export default function AboutEdgeConnectSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#CAF0F8]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-[#F0F9FF]/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00B4D8]/30 to-transparent" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* ── Hero Header ── */}
          <motion.div variants={fadeInUp} className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#90E0EF] bg-white/80 px-5 py-1.5 text-sm font-bold tracking-wider uppercase text-ec-primary shadow-sm backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-[#00B4D8]" />
              About Edge Connect
            </motion.div>
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Your Brand.{' '}
              <span className="text-gradient">Our Edge.</span>
            </h2>
            <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg md:text-xl">
              We help businesses grow through meaningful, result-driven marketing solutions in an increasingly digital world.
            </p>
          </motion.div>

          {/* ── Foundation Section ── */}
          <div className="mb-24 grid items-center gap-12 lg:grid-cols-5">
            {/* Left: Founders highlight */}
            <motion.div
              variants={fadeInLeft}
              className="lg:col-span-2"
            >
              <div className="relative">
                <div className="glow-cyan-strong relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#023047] to-[#0077B6] p-8 md:p-10">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#48CAE4]/15 blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#90E0EF]/10 blur-2xl" />
                  <div className="relative z-10">
                    <Quote className="mb-4 h-8 w-8 text-[#48CAE4]" />
                    <p className="mb-6 text-lg font-medium leading-relaxed text-[#CAF0F8] italic">
                      &ldquo;We believe successful marketing is built on trust, consistency, creativity, and understanding people — and that philosophy remains at the core of everything we do.&rdquo;
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                      <div className="flex -space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-sm font-bold text-white">
                          AK
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-sm font-bold text-white">
                          AS
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-white">Anand Kamani & Avtar Singh</div>
                        <div className="text-sm text-[#90E0EF]">Founders</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-2 opacity-10">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
                    ))}
                  </div>
                </div>

                {/* Location badge */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-4 py-1.5 text-xs font-bold text-ec-primary">
                    <MapPin className="h-3 w-3" />
                    Based in Canberra
                  </span>
                  {['Australia', 'India', 'UK', 'South Africa'].map((country) => (
                    <span
                      key={country}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-4 py-1.5 text-xs font-bold text-ec-primary"
                    >
                      <Globe className="h-3 w-3" />
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: About content */}
            <motion.div
              variants={fadeInRight}
              className="space-y-6 lg:col-span-3"
            >
              <span className="inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-4 py-1 text-xs font-bold tracking-wider uppercase text-ec-primary">
                Our Foundation
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Built on Experience.{' '}
                <span className="text-gradient">Driven by Purpose.</span>
              </h3>

              <div className="space-y-5">
                <p className="text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                  Anand Kamani and Avtar Singh founded Edge Connect with a simple vision — to help businesses grow through meaningful, result-driven marketing solutions in an increasingly digital world.
                </p>
                <p className="text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                  Based in Canberra, Edge Connect combines strategic thinking, creative execution, and customer-focused service to help brands build stronger visibility, better engagement, and sustainable growth.
                </p>
                <p className="text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                  With over two decades of experience across media, advertising, client partnerships, customer engagement, and business development, Anand brings a strong understanding of how businesses connect with their audience and build lasting relationships. Having worked across Australia, India, the UK, and South Africa, his experience spans multiple industries and diverse market environments — helping businesses navigate both traditional and digital marketing landscapes.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Strategy', 'Creativity', 'Trust', 'Results'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-5 py-1.5 text-sm font-bold text-ec-primary transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Approach Section ── */}
          <div className="mb-24 grid gap-10 lg:grid-cols-2">
            <motion.div
              variants={fadeInLeft}
              className="rounded-2xl border border-gray-100 bg-white/85 p-8 shadow-sm backdrop-blur-sm md:p-10"
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Our Approach</h3>
              <p className="mb-6 text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                At Edge Connect, we understand that every business is unique. That is why our approach is tailored, practical, and focused on outcomes rather than one-size-fits-all solutions. From SEO and digital marketing to performance campaigns and modern website design, we work closely with businesses to create strategies that not only improve visibility but also generate measurable impact.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-ec px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[#00B4D8]/30"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              className="rounded-2xl bg-gradient-to-br from-[#0077B6] to-[#023047] p-8 md:p-10"
            >
              <h3 className="mb-6 text-2xl font-bold text-white">What We Help You Achieve</h3>
              <div className="space-y-3">
                {[
                  'Strengthen your online presence',
                  'Reach the right audience',
                  'Improve customer engagement',
                  'Generate quality leads',
                  'Build long-term brand credibility',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#48CAE4]" />
                    <span className="text-base font-medium text-[#CAF0F8]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Outcomes Grid ── */}
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-5 py-1.5 text-xs font-bold tracking-wider uppercase text-ec-primary">
              What We Deliver
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Solutions That{' '}
              <span className="text-gradient">Make an Impact</span>
            </h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {outcomes.map((outcome) => {
              const Icon = outcome.icon
              return (
                <motion.div
                  key={outcome.title}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/85 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#90E0EF] hover:shadow-lg hover:shadow-[#CAF0F8]/50"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#CAF0F8]/40 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#00B4D8]/10" />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-ec shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-gray-900">
                      {outcome.title}
                    </h4>
                    <p className="text-sm font-medium leading-relaxed text-ec-muted">
                      {outcome.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ── Closing Section ── */}
          <motion.div
            variants={fadeInUp}
            className="mb-20 rounded-2xl border border-gray-100 bg-white/85 p-10 shadow-sm backdrop-blur-sm md:p-14"
          >
            <div className="mx-auto max-w-4xl text-center">
              <Quote className="mx-auto mb-6 h-10 w-10 text-[#00B4D8]/40" />
              <p className="mb-6 text-xl font-medium leading-relaxed text-ec-muted sm:text-2xl">
                Whether it is creating a responsive website, running targeted performance campaigns, improving search engine rankings, or building a complete digital presence — Edge Connect focuses on delivering solutions that are modern, scalable, and aligned with business goals.
              </p>
              <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-[#00B4D8] to-transparent" />
              <p className="mt-6 text-lg font-bold text-gray-900 sm:text-xl">
                We believe successful marketing is built on trust, consistency, creativity, and understanding people — and that philosophy remains at the core of everything we do.
              </p>
            </div>
          </motion.div>

          {/* ── CTA Banner ── */}
          <motion.div
            variants={fadeInUp}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#023047] via-[#0077B6] to-[#023047] p-10 text-center md:p-16"
          >
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#48CAE4]/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#90E0EF]/10 blur-3xl" />
            <div className="relative z-10">
              <h3 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
                Your Brand. Our Edge Connect.
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-base font-medium text-[#CAF0F8] sm:text-lg">
                Ready to grow your business with marketing that truly delivers? Let&apos;s build something remarkable together.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#023047] shadow-lg transition-all duration-300 hover:bg-[#F0F9FF] hover:shadow-xl active:scale-[0.97]"
              >
                Get in Touch
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
