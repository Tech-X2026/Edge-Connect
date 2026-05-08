'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Search, FileText, Link2, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react'

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
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const process = [
  { icon: Search, title: 'Technical Audit', description: 'Comprehensive analysis of your site\'s technical health, identifying crawl issues, speed bottlenecks, and architecture problems.' },
  { icon: FileText, title: 'Content Strategy', description: 'Data-backed content plans targeting high-value keywords and search intent to build topical authority.' },
  { icon: Link2, title: 'Link Building', description: 'Strategic outreach and relationship-building to earn authoritative backlinks that boost domain strength.' },
  { icon: TrendingUp, title: 'Continuous Optimization', description: 'Ongoing monitoring, testing, and refinement to maintain and improve rankings over time.' },
]

const results = [
  { metric: '250%', label: 'Avg. Organic Traffic Increase' },
  { metric: '40%', label: 'Improvement in Keyword Rankings' },
  { metric: '3.2x', label: 'Return on SEO Investment' },
  { metric: '92%', label: 'Client Retention Rate' },
]

export default function SEOSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/30 to-white py-20 md:py-28">
      <div className="pointer-events-none absolute -right-20 top-20 h-60 w-60 rounded-full bg-emerald-100/30 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInLeft} className="mb-12">
            <span className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-ec-primary">
              SEO Services
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Search Engine{' '}
              <span className="text-gradient">Optimization</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-ec-muted sm:text-lg">
              Get found by the people who are actively looking for your products and services. Our SEO strategies are built on data, refined by experience, and measured by results.
            </p>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            variants={staggerContainer}
            className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {process.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-emerald-100 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700">
                      {idx + 1}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                      <Icon className="h-5 w-5 text-ec-primary" />
                    </div>
                  </div>
                  <h4 className="mb-2 text-base font-bold text-gray-900">{step.title}</h4>
                  <p className="text-sm leading-relaxed text-ec-muted">{step.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Results & Checklist */}
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Results */}
            <motion.div variants={fadeInLeft} className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 md:p-10">
              <h3 className="mb-6 text-2xl font-bold text-white">Proven Results</h3>
              <div className="grid grid-cols-2 gap-6">
                {results.map((result) => (
                  <div key={result.label}>
                    <div className="text-3xl font-black text-white sm:text-4xl">{result.metric}</div>
                    <div className="mt-1 text-sm text-emerald-100">{result.label}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Get SEO Audit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Checklist */}
            <motion.div variants={fadeInRight} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">What&apos;s Included</h3>
              <div className="space-y-4">
                {[
                  'Complete technical SEO audit & fixes',
                  'Keyword research & competitive analysis',
                  'On-page optimization (meta, schema, speed)',
                  'Content strategy & creation',
                  'White-hat link building campaigns',
                  'Monthly performance reporting',
                  'Local SEO optimization',
                  'Core Web Vitals improvement',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-sm text-gray-700 sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
