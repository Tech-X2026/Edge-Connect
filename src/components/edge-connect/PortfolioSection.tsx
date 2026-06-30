'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Globe, Smartphone, Palette, Zap } from 'lucide-react'

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

const projects = [
  {
    title: 'Waters Edge Canberra',
    subtitle: 'Lakeside Dining & Function Venue',
    url: 'https://www.watersedgecanberra.com.au/',
    description:
      'A premium dining and events website designed to reflect the elegance of lakeside Canberra. Features seamless booking integration and stunning visual storytelling.',
    features: ['Responsive Design', 'Online Booking', 'Menu Showcase', 'Event Gallery'],
    gradient: 'from-[#023047] to-[#00B4D8]',
    lightGradient: 'from-[#F0F9FF] to-[#CAF0F8]',
    tags: ['Restaurant', 'Hospitality', 'Events'],
  },
  {
    title: 'Gungahlin Kebab & Pizza',
    subtitle: 'Local Food & Takeaway Service',
    url: 'https://gungahlinkebabandpizza.com.au/',
    description:
      'A mouthwatering local food website built for speed and conversions. Easy online ordering, menu browsing, and location details make it effortless for customers.',
    features: ['Online Ordering', 'Menu Management', 'Location Map', 'Mobile First'],
    gradient: 'from-[#0096C7] to-[#023047]',
    lightGradient: 'from-[#F0F9FF] to-[#CAF0F8]/50',
    tags: ['Food & Beverage', 'Takeaway', 'Local Business'],
  },
]

const projectIcons = [Globe, Smartphone, Palette, Zap]

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-[#F0F9FF]/40 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-[#CAF0F8]/40 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-ec-primary transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
              Our Portfolio
            </span>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Work That{' '}
              <span className="text-gradient">Speaks Volumes</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
              Every project we deliver is a testament to our commitment to quality, creativity, and measurable results.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white/85 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-[#90E0EF] hover:shadow-xl hover:shadow-[#CAF0F8]/50"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`} />

                <div className="p-6 sm:p-8">
                  <div className="mb-5 flex items-start gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${project.lightGradient} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                      <Globe className="h-7 w-7 text-ec-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="text-sm font-semibold text-ec-muted">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="mb-6 text-sm font-medium leading-relaxed text-ec-muted sm:text-base">
                    {project.description}
                  </p>

                  <div className="mb-6 grid grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm font-semibold text-ec-muted">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00B4D8]" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-3 py-1 text-xs font-bold text-ec-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#00B4D8] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#0077B6] hover:shadow-md hover:shadow-[#00B4D8]/30 group/btn"
                  >
                    <span>Learn More</span>
                    <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
