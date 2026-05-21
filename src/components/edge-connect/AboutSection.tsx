'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Users, Award, Target, Lightbulb, Quote,
  MapPin, Globe, Briefcase, Heart, ArrowRight,
  CheckCircle2, Sparkles
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
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

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '4', label: 'Countries Served' },
  { value: '100+', label: 'Happy Clients' },
  { value: '5+', label: 'Industry Verticals' },
]

const principles = [
  'Understand the client',
  'Understand the audience',
  'Create solutions that make an impact',
  'Build long-term relationships',
  'Communicate with transparency',
  'Deliver with passion & purpose',
]

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#CAF0F8]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#F0F9FF]/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00B4D8]/30 to-transparent" />

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
              About Us
            </motion.div>
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              We Build{' '}
              <span className="text-gradient">Relationships</span>
              <br />
              That Drive Results
            </h2>
            <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg md:text-xl">
              At the heart of every successful brand is a strong relationship with its audience — and that is exactly what we help businesses build.
            </p>
          </motion.div>

          {/* ── Story Section ── */}
          <div className="mb-24 grid items-center gap-12 lg:grid-cols-5">
            {/* Left: Founder highlight */}
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
                      &ldquo;Marketing is not just about visibility — it is about building trust, creating relevance, and helping businesses grow sustainably.&rdquo;
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white">
                        AK
                      </div>
                      <div>
                        <div className="font-bold text-white">Anand Kamani</div>
                        <div className="text-sm text-[#90E0EF]">Founder</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-2 opacity-10">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
                    ))}
                  </div>
                </div>

                {/* Geography badges */}
                <div className="mt-4 flex flex-wrap gap-2">
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

            {/* Right: Story */}
            <motion.div
              variants={fadeInRight}
              className="space-y-6 lg:col-span-3"
            >
              <span className="inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-4 py-1 text-xs font-bold tracking-wider uppercase text-ec-primary">
                Our Story
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Two Decades of{' '}
                <span className="text-gradient">Digital Excellence</span>
              </h3>

              <div className="space-y-5">
                <p className="text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                  Founded by Anand Kamani, our company brings together over two decades of experience across media, marketing, client partnerships, and business growth. Having worked with businesses across Australia, India, the UK, and South Africa, Anand has spent his career helping brands connect with communities, strengthen their presence, and create meaningful engagement that drives results.
                </p>
                <p className="text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                  Over the years, he has worked closely with clients across diverse industries, managing end-to-end relationships covering marketing strategy, advertising solutions, stakeholder engagement, partnerships, customer servicing, and business development. This experience has built a deep understanding of what businesses truly need — practical marketing solutions, trusted relationships, and strategies that deliver measurable value.
                </p>
                <p className="text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                  Whether working with local businesses, community organisations, or growing brands, our focus remains simple: understand the client, understand the audience, and create marketing solutions that genuinely make an impact.
                </p>
                <p className="text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                  We value long-term relationships, transparent communication, and delivering work with passion, professionalism, and purpose.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Strategy', 'Creativity', 'Data', 'Results'].map((tag) => (
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

          {/* ── Philosophy + Principles ── */}
          <div className="mb-24 grid gap-10 lg:grid-cols-2">
            {/* Philosophy */}
            <motion.div
              variants={fadeInLeft}
              className="rounded-2xl border border-gray-100 bg-white/85 p-8 shadow-sm backdrop-blur-sm md:p-10"
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Our Philosophy</h3>
              <p className="mb-6 text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
                What makes our approach different is the balance between creativity and commercial understanding. We believe marketing is not just about visibility — it is about building trust, creating relevance, and helping businesses grow sustainably.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-ec px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[#00B4D8]/30"
              >
                Let&apos;s Talk
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Principles */}
            <motion.div
              variants={fadeInRight}
              className="rounded-2xl bg-gradient-to-br from-[#0077B6] to-[#023047] p-8 md:p-10"
            >
              <h3 className="mb-4 text-2xl font-bold text-white">What Guides Us</h3>
              <div className="space-y-3">
                {principles.map((principle) => (
                  <div key={principle} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#48CAE4]" />
                    <span className="text-base font-medium text-[#CAF0F8]">{principle}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Values Grid ── */}
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-5 py-1.5 text-xs font-bold tracking-wider uppercase text-ec-primary">
              Core Values
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What We Stand For
            </h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
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
                      {value.title}
                    </h4>
                    <p className="text-sm font-medium leading-relaxed text-ec-muted">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
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
                Ready to Build Something Great?
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-base font-medium text-[#CAF0F8] sm:text-lg">
                Whether you are a local business, community organisation, or growing brand — let&apos;s create marketing solutions that genuinely make an impact.
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
