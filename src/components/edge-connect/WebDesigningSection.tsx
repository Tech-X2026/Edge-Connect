'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Palette, Monitor, Smartphone, ShoppingCart, Code, Layers, CheckCircle2, ArrowRight } from 'lucide-react'

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
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const services = [
  { icon: Palette, title: 'UI/UX Design', description: 'Human-centered design that delights users and drives engagement. From wireframes to pixel-perfect mockups.' },
  { icon: Monitor, title: 'Responsive Web Development', description: 'Websites that look and perform flawlessly across all devices, browsers, and screen sizes.' },
  { icon: Smartphone, title: 'Mobile-First Design', description: 'Designed for the mobile majority first, ensuring seamless experiences on every smartphone and tablet.' },
  { icon: ShoppingCart, title: 'E-commerce Solutions', description: 'End-to-end online stores with secure payment processing, inventory management, and conversion optimization.' },
  { icon: Code, title: 'CMS Integration', description: 'Flexible content management with WordPress, Shopify, or custom solutions tailored to your workflow.' },
  { icon: Layers, title: 'Design Systems', description: 'Scalable component libraries and design tokens that ensure consistency across your entire digital ecosystem.' },
]

const portfolio = [
  { name: 'E-commerce Redesign', category: 'Retail', result: '45% increase in conversions' },
  { name: 'SaaS Dashboard', category: 'Technology', result: '60% reduction in support tickets' },
  { name: 'Corporate Website', category: 'Finance', result: '3x increase in lead generation' },
]

export default function WebDesigningSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute left-0 top-1/4 h-60 w-60 rounded-full bg-[#F0F9FF]/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-60 w-60 rounded-full bg-[#CAF0F8]/40 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-ec-primary transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
              Web Designing
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Stunning Digital{' '}
              <span className="text-gradient">Experiences</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
              Your website is your digital storefront. We design and build experiences that captivate visitors, communicate your value, and convert them into loyal customers.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={staggerContainer}
            className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#90E0EF] hover:shadow-lg hover:shadow-[#CAF0F8]/50"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F9FF] to-[#CAF0F8]">
                    <Icon className="h-6 w-6 text-ec-primary" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-gray-900">{service.title}</h4>
                  <p className="text-sm font-medium leading-relaxed text-ec-muted">{service.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Portfolio Highlights + Design Process */}
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Portfolio */}
            <motion.div variants={fadeInLeft}>
              <h3 className="mb-6 text-2xl font-bold text-gray-900">Featured Projects</h3>
              <div className="space-y-4">
                {portfolio.map((project) => (
                  <motion.div
                    key={project.name}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#90E0EF] hover:shadow-md"
                  >
                    <div>
                      <h4 className="font-bold text-gray-900">{project.name}</h4>
                      <span className="text-xs font-semibold text-ec-muted">{project.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-ec-primary">{project.result}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Design Process */}
            <motion.div variants={fadeInRight} className="rounded-2xl bg-gradient-to-br from-[#023047] to-[#00B4D8] p-8 md:p-10">
              <h3 className="mb-6 text-2xl font-bold text-white">Our Design Process</h3>
              <div className="space-y-5">
                {[
                  { step: '01', title: 'Discovery', desc: 'Deep dive into your brand, audience, and goals' },
                  { step: '02', title: 'Wireframing', desc: 'Structure and layout that prioritizes usability' },
                  { step: '03', title: 'Visual Design', desc: 'Pixel-perfect designs that embody your brand' },
                  { step: '04', title: 'Development', desc: 'Clean, performant code that brings designs to life' },
                  { step: '05', title: 'Launch & Optimize', desc: 'Testing, deployment, and continuous improvement' },
                ].map((phase) => (
                  <div key={phase.step} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">
                      {phase.step}
                    </span>
                    <div>
                      <h4 className="font-semibold text-white">{phase.title}</h4>
                      <p className="text-sm font-medium text-[#CAF0F8]">{phase.desc}</p>
                    </div>
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
