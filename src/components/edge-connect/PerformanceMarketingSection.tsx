'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { BarChart3, MousePointerClick, Target, DollarSign, CheckCircle2, ArrowRight, TrendingUp, Percent, Zap } from 'lucide-react'

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

const capabilities = [
  { icon: MousePointerClick, title: 'PPC Management', description: 'Google Ads, Bing Ads, and social media advertising managed by certified specialists who maximize every click.' },
  { icon: Target, title: 'Conversion Rate Optimization', description: 'Systematic testing and optimization of your landing pages, forms, and user flows to turn visitors into customers.' },
  { icon: DollarSign, title: 'Budget Optimization', description: 'Intelligent bid strategies and budget allocation that ensures maximum ROI across all your paid channels.' },
  { icon: TrendingUp, title: 'Analytics & Attribution', description: 'Advanced multi-touch attribution and real-time dashboards that provide crystal-clear insight into campaign performance.' },
]

const metrics = [
  { icon: Percent, value: '35%', label: 'Avg. Cost Reduction' },
  { icon: TrendingUp, value: '4.2x', label: 'Return on Ad Spend' },
  { icon: Zap, value: '2.8x', label: 'Lead Volume Increase' },
  { icon: Target, value: '95%', label: 'Client Satisfaction' },
]

export default function PerformanceMarketingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute right-0 top-1/3 h-60 w-60 rounded-full bg-[#CAF0F8]/30 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-[#023047] transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
              Performance Marketing
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Data-Driven{' '}
              <span className="text-gradient">Growth Engine</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
              Every dollar you spend should work harder. Our performance marketing strategies are designed to maximize ROI through precision targeting, continuous optimization, and data-backed decisions.
            </p>
          </motion.div>

          {/* Metrics Bar */}
          <motion.div
            variants={fadeInUp}
            className="mb-16 glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {metrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <div key={metric.label} className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F9FF] to-[#CAF0F8]/50">
                      <Icon className="h-6 w-6 text-[#023047]" />
                    </div>
                    <div className="text-gradient text-2xl font-black sm:text-3xl">{metric.value}</div>
                    <div className="text-xs font-semibold text-ec-muted sm:text-sm">{metric.label}</div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Capabilities Grid */}
          <motion.div
            variants={staggerContainer}
            className="mb-16 grid gap-6 sm:grid-cols-2"
          >
            {capabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <motion.div
                  key={cap.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-2xl border border-gray-100 bg-white/85 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:border-[#90E0EF] hover:shadow-lg hover:shadow-[#CAF0F8]/50 sm:p-8"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F9FF] to-[#CAF0F8]/50">
                      <Icon className="h-6 w-6 text-[#023047]" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 sm:text-xl">{cap.title}</h4>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-ec-muted sm:text-base">{cap.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#0096C7] to-[#00B4D8]"
          >
            <div className="relative p-8 md:p-12">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
              <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                    Ready to Maximize Your ROI?
                  </h3>
                  <p className="text-sm font-medium text-[#CAF0F8] sm:text-base">
                    Get a free performance audit and discover untapped growth opportunities.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#023047] shadow-lg transition-colors hover:bg-gray-50 sm:px-8"
                >
                  Get Free Audit
                  <ArrowRight className="ml-2 inline h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
