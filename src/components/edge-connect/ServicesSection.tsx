'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Megaphone, BarChart3, Palette, ArrowRight } from 'lucide-react'

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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const services = [
  {
    id: 'seo',
    icon: Search,
    title: 'SEO',
    subtitle: 'Search Engine Optimization',
    description: 'Dominate search rankings with our proven SEO strategies. We optimize every aspect of your online presence to drive organic traffic that converts.',
    color: 'from-emerald-500 to-emerald-600',
    lightColor: 'from-emerald-50 to-emerald-100/50',
    features: ['Technical SEO Audit', 'Keyword Strategy', 'Content Optimization', 'Link Building'],
  },
  {
    id: 'digital-marketing',
    icon: Megaphone,
    title: 'Digital Marketing',
    subtitle: 'Full-Stack Digital Strategy',
    description: 'Comprehensive digital marketing campaigns that span channels and touchpoints, creating cohesive brand experiences that resonate with your audience.',
    color: 'from-cyan-500 to-cyan-600',
    lightColor: 'from-cyan-50 to-cyan-100/50',
    features: ['Social Media Marketing', 'Email Campaigns', 'Content Strategy', 'Brand Storytelling'],
  },
  {
    id: 'performance-marketing',
    icon: BarChart3,
    title: 'Performance Marketing',
    subtitle: 'Data-Driven Growth Engine',
    description: 'Maximize ROI with precision-targeted campaigns. Every dollar spent is tracked, optimized, and geared toward measurable business outcomes.',
    color: 'from-teal-500 to-teal-600',
    lightColor: 'from-teal-50 to-teal-100/50',
    features: ['PPC Management', 'Conversion Optimization', 'A/B Testing', 'Analytics & Reporting'],
  },
  {
    id: 'web-designing',
    icon: Palette,
    title: 'Web Designing',
    subtitle: 'Stunning Digital Experiences',
    description: 'Websites that captivate and convert. Our designs blend aesthetics with functionality to create digital experiences your users will love.',
    color: 'from-emerald-600 to-cyan-500',
    lightColor: 'from-emerald-50 to-cyan-50',
    features: ['UI/UX Design', 'Responsive Development', 'E-commerce Solutions', 'CMS Integration'],
  },
]

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const scrollToService = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white py-20 md:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-emerald-50/40 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-cyan-50/40 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-ec-primary">
              Our Services
            </span>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Solutions That{' '}
              <span className="text-gradient">Drive Results</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-ec-muted sm:text-lg">
              From search visibility to conversion optimization, our comprehensive suite of services covers every aspect of your digital growth journey.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onClick={() => scrollToService(service.id)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-50/50"
                >
                  {/* Top gradient bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${service.color}`} />

                  <div className="p-6 sm:p-8">
                    {/* Icon & Title */}
                    <div className="mb-5 flex items-start gap-4">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.lightColor} shadow-sm`}>
                        <Icon className="h-7 w-7 text-ec-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                          {service.title}
                        </h3>
                        <p className="text-sm font-medium text-ec-muted">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-6 text-sm leading-relaxed text-ec-muted sm:text-base">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6 grid grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-ec-primary transition-colors group-hover:text-emerald-700">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
