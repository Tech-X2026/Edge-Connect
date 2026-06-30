'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Code2, Globe, Smartphone, Database, Shield, CheckCircle2, ArrowRight, Layout } from 'lucide-react'

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
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const services = [
  { icon: Globe, title: 'Web Applications', description: 'Scalable, high-performance web apps built with modern frameworks like React, Next.js, and Node.js, tailored to your business workflows.' },
  { icon: Smartphone, title: 'Mobile Applications', description: 'Native and cross-platform mobile apps for iOS and Android that deliver seamless user experiences and robust functionality.' },
  { icon: Database, title: 'API Development', description: 'RESTful and GraphQL APIs designed for performance, security, and seamless integration with your existing systems.' },
  { icon: Shield, title: 'DevOps & Infrastructure', description: 'CI/CD pipelines, containerisation, infrastructure as code, and monitoring to accelerate delivery and ensure uptime.' },
  { icon: Layout, title: 'UI/UX Design', description: 'User-centred design processes that create intuitive, accessible, and engaging interfaces for your applications.' },
]

const results = [
  { metric: '99.9%', label: 'Application Uptime' },
  { metric: '3x', label: 'Faster Time-to-Market' },
  { metric: '60%', label: 'Cost Reduction on Cloud' },
  { metric: '95%', label: 'Client Satisfaction Rate' },
]

export default function ApplicationDevelopmentSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute -right-20 top-20 h-60 w-60 rounded-full bg-[#CAF0F8]/30 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInLeft} className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-ec-primary transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
              Application Development
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Custom Software{' '}
              <span className="text-gradient">Solutions</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
              From concept to deployment, we build powerful, scalable applications that solve real business problems and drive measurable growth.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={staggerContainer}
            className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-2xl border border-gray-100 bg-white/85 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:border-[#90E0EF] hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F9FF]">
                    <Icon className="h-5 w-5 text-ec-primary" />
                  </div>
                  <h4 className="mb-2 text-base font-bold text-gray-900">{service.title}</h4>
                  <p className="text-sm font-medium leading-relaxed text-ec-muted">{service.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Results & Checklist */}
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Results */}
            <motion.div variants={fadeInLeft} className="rounded-2xl bg-gradient-to-br from-[#023047] to-[#0077B6] p-8 md:p-10">
              <h3 className="mb-6 text-2xl font-bold text-white">Proven Results</h3>
              <div className="grid grid-cols-2 gap-6">
                {results.map((result) => (
                  <div key={result.label}>
                    <div className="text-3xl font-black text-white sm:text-4xl">{result.metric}</div>
                    <div className="mt-1 text-sm font-medium text-[#CAF0F8]">{result.label}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Checklist */}
            <motion.div variants={fadeInRight} className="rounded-2xl border border-gray-100 bg-white/85 backdrop-blur-sm p-8 shadow-sm md:p-10">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">What&apos;s Included</h3>
              <div className="space-y-4">
                {[
                  'Requirements analysis & architecture planning',
                  'Custom UI/UX design & prototyping',
                  'Full-stack development (frontend & backend)',
                  'API design, development & documentation',
                  'Cloud infrastructure setup & deployment',
                  'Automated testing & CI/CD pipelines',
                  'Security audit & compliance',
                  'Ongoing maintenance & support',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00B4D8]" />
                    <span className="text-sm font-medium text-gray-700 sm:text-base">{item}</span>
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
