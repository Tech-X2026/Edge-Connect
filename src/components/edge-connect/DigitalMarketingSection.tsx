'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Megaphone, Share2, Mail, PenTool, CheckCircle2, ArrowRight } from 'lucide-react'

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

const channels = [
  { icon: Share2, title: 'Social Media Marketing', description: 'Build engaged communities across platforms with strategic content, community management, and paid social campaigns that amplify your brand voice.' },
  { icon: Mail, title: 'Email Marketing', description: 'Nurture leads and retain customers with personalized email journeys, automated workflows, and data-optimized campaigns that drive conversions.' },
  { icon: PenTool, title: 'Content Marketing', description: 'Create compelling content that educates, entertains, and converts. From blog posts to video scripts, we tell your brand story authentically.' },
  { icon: Megaphone, title: 'Influencer Marketing', description: 'Partner with the right voices to extend your reach. We identify, vet, and manage influencer collaborations that deliver authentic engagement.' },
]

const stats = [
  { metric: '10M+', label: 'Impressions Generated Monthly' },
  { metric: '5.8%', label: 'Avg. Email Click-Through Rate' },
  { metric: '180%', label: 'Social Engagement Increase' },
  { metric: '4.5x', label: 'Content ROI Average' },
]

export default function DigitalMarketingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute -left-20 top-40 h-60 w-60 rounded-full bg-[#CAF0F8]/40 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInRight} className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-[#023047] transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
              Digital Marketing
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Full-Stack{' '}
              <span className="text-gradient">Digital Strategy</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
              Create meaningful connections across every digital touchpoint. Our integrated approach ensures your brand message is consistent, compelling, and conversion-focused.
            </p>
          </motion.div>

          {/* Channels Grid */}
          <motion.div
            variants={staggerContainer}
            className="mb-16 grid gap-6 sm:grid-cols-2"
          >
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <motion.div
                  key={channel.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#90E0EF] hover:shadow-lg hover:shadow-[#CAF0F8]/50 sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F9FF] to-[#CAF0F8]/50">
                    <Icon className="h-6 w-6 text-[#023047]" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">{channel.title}</h4>
                  <p className="text-sm font-medium leading-relaxed text-ec-muted sm:text-base">{channel.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Stats + CTA */}
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Stats */}
            <motion.div variants={fadeInLeft} className="rounded-2xl bg-gradient-to-br from-[#0077B6] to-[#023047] p-8 md:p-10">
              <h3 className="mb-6 text-2xl font-bold text-white">Campaign Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-black text-white sm:text-4xl">{stat.metric}</div>
                    <div className="mt-1 text-sm font-medium text-[#CAF0F8]">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Start Your Campaign
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Approach */}
            <motion.div variants={fadeInRight} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">Our Approach</h3>
              <div className="space-y-4">
                {[
                  'Audience research & persona development',
                  'Multi-channel campaign strategy',
                  'Creative content production',
                  'A/B testing & optimization',
                  'Real-time performance monitoring',
                  'Monthly strategy reviews & reporting',
                  'Competitive landscape analysis',
                  'Brand voice & messaging framework',
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
