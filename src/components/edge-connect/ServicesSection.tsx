'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Search, Megaphone, BarChart3, Palette, ArrowRight, FileDown, Sparkles, Code2 } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const services = [
  {
    id: 'web-designing',
    icon: Palette,
    title: 'Web Designing',
    subtitle: 'Stunning Digital Experiences',
    description: 'Websites that captivate and convert. Our designs blend aesthetics with functionality to create digital experiences your users will love.',
    color: 'from-[#023047] to-[#00B4D8]',
    lightColor: 'from-[#F0F9FF] to-[#CAF0F8]',
    features: ['UI/UX Design', 'Responsive Development', 'E-commerce Solutions', 'CMS Integration', 'Website Maintenance'],
    href: '/services/web-designing',
  },
  {
    id: 'performance-marketing',
    icon: BarChart3,
    title: 'Performance Marketing',
    subtitle: 'Data-Driven Growth Engine',
    description: 'maximise ROI with precision-targeted campaigns. Every dollar spent is tracked, optimised, and geared toward measurable business outcomes.',
    color: 'from-[#0096C7] to-[#023047]',
    lightColor: 'from-[#F0F9FF] to-[#CAF0F8]/50',
    features: ['PPC Management', 'Conversion Optimisation', 'A/B Testing', 'Analytics & Reporting'],
    href: '/services/performance-marketing',
  },
  {
    id: 'digital-marketing',
    icon: Megaphone,
    title: 'Digital Marketing',
    subtitle: 'Full-Stack Digital Strategy',
    description: 'Comprehensive digital marketing campaigns that span channels and touchpoints, creating cohesive brand experiences that resonate with your audience.',
    color: 'from-[#0096C7] to-[#023047]',
    lightColor: 'from-[#F0F9FF] to-[#CAF0F8]/50',
    features: ['Social Media Marketing', 'Email Campaigns', 'Content Strategy', 'Brand Storytelling'],
    href: '/services/digital-marketing',
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO',
    subtitle: 'Search Engine Optimisation',
    description: 'Dominate search rankings with our proven SEO strategies. We optimise every aspect of your online presence to drive organic traffic that converts.',
    color: 'from-[#0096C7] to-[#023047]',
    lightColor: 'from-[#F0F9FF] to-[#CAF0F8]/50',
    features: ['Technical SEO Audit', 'Keyword Strategy', 'Content Optimisation', 'Link Building'],
    href: '/services/seo',
  },
  {
    id: 'application-development',
    icon: Code2,
    title: 'Application Development',
    subtitle: 'Custom Software Solutions',
    description: 'Build powerful, scalable applications tailored to your business needs. From web apps to enterprise software, we deliver robust solutions that drive growth.',
    color: 'from-[#0096C7] to-[#023047]',
    lightColor: 'from-[#F0F9FF] to-[#CAF0F8]/50',
    features: ['Custom Web Apps', 'Mobile Applications', 'API Development', 'Cloud Solutions'],
    href: '/services/application-development',
  },
  {
    id: 'creative-services',
    icon: Sparkles,
    title: 'Creative Services',
    subtitle: 'Visual Excellence & Branding',
    description: 'Transform your vision into stunning visual experiences. From brand identity to video production, we create designs that captivate and convert.',
    color: 'from-[#00B4D8] to-[#023047]',
    lightColor: 'from-[#F0F9FF] to-[#CAF0F8]/50',
    features: ['Brand Identity', 'Video Production', 'Graphic Design', 'Motion Graphics'],
    href: '/services/creative-services',
  },
  {
    id: 'service-book',
    icon: FileDown,
    title: 'Service Book',
    subtitle: 'Download Our Portfolio',
    description: 'Explore our comprehensive service book to see our expertise, past projects, and how we can help transform your business.',
    color: 'from-[#00B4D8] to-[#023047]',
    lightColor: 'from-[#CAF0F8] to-[#F0F9FF]',
    features: ['Portfolio Overview', 'Case Studies', 'Service Details', 'Contact Info'],
    href: '/img/EC Service Book PDF.pdf',
    isDownload: true,
  },
]

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-[#F0F9FF]/40 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-[#CAF0F8]/40 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-ec-primary transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
              Our Services
            </span>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Solutions That{' '}
              <span className="text-gradient">Drive Results</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
              From search visibility to conversion optimisation, our comprehensive suite of services covers every aspect of your digital growth journey.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => {
              const Icon = service.icon
              const isDownload = (service as { isDownload?: boolean }).isDownload
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white/85 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-[#90E0EF] hover:shadow-xl hover:shadow-[#CAF0F8]/50"
                >
                  {isDownload ? (
                    <a href={service.href} download className="block">
                      <div className={`h-1 w-full bg-gradient-to-r ${service.color}`} />

                      <div className="p-6 sm:p-8">
                        <div className="mb-5 flex items-start gap-4">
                          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.lightColor} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className="h-7 w-7 text-ec-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                              {service.title}
                            </h3>
                            <p className="text-sm font-semibold text-ec-muted">
                              {service.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="mb-6 text-sm font-medium leading-relaxed text-ec-muted sm:text-base">
                          {service.description}
                        </p>

                        <div className="mb-6 grid grid-cols-2 gap-2">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm font-semibold text-ec-muted">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00B4D8]" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold text-ec-primary transition-colors group-hover:text-[#023047]">
                          Download
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </a>
                  ) : (
                    <Link href={service.href} className="block">
                      <div className={`h-1 w-full bg-gradient-to-r ${service.color}`} />

                      <div className="p-6 sm:p-8">
                        <div className="mb-5 flex items-start gap-4">
                          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.lightColor} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className="h-7 w-7 text-ec-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                              {service.title}
                            </h3>
                            <p className="text-sm font-semibold text-ec-muted">
                              {service.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="mb-6 text-sm font-medium leading-relaxed text-ec-muted sm:text-base">
                          {service.description}
                        </p>

                        <div className="mb-6 grid grid-cols-2 gap-2">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm font-semibold text-ec-muted">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00B4D8]" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold text-ec-primary transition-colors group-hover:text-[#023047]">
                          Learn More
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
