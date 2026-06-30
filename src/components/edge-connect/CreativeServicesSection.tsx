'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, Video, Camera, PenTool, Sparkles, Layers, CheckCircle2 } from 'lucide-react'

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
  { icon: Palette, title: 'Brand Identity & Strategy', description: 'Craft a distinctive brand presence that resonates with your audience. From logo design to complete brand guidelines, we build identities that stand out in crowded markets.' },
  { icon: Video, title: 'Video Production & Editing', description: 'Engage your audience with professional video content. From concept to final cut, we produce compelling videos for ads, social media, corporate communications, and brand storytelling.' },
  { icon: Camera, title: 'Photography & Visual Content', description: 'Capture your brand essence with high-quality photography. Product shoots, lifestyle imagery, corporate headshots, and event coverage that elevates your visual presence.' },
  { icon: PenTool, title: 'Graphic Design & Illustration', description: 'Eye-catching designs for print and digital. Marketing collateral, infographics, presentations, packaging, and custom illustrations that communicate your message effectively.' },
  { icon: Sparkles, title: 'Motion Graphics & Animation', description: 'Bring your ideas to life with dynamic animations. Explainer videos, animated logos, social media motion content, and interactive presentations that capture attention.' },
  { icon: Layers, title: 'UI/UX Creative Design', description: 'Beautiful, intuitive interfaces that users love. Wireframing, prototyping, visual design, and user testing to create digital experiences that convert and delight.' },
]

export default function CreativeServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute -left-20 top-40 h-60 w-60 rounded-full bg-[#CAF0F8]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-40 h-60 w-60 rounded-full bg-[#90E0EF]/30 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInRight} className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-[#023047] transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
              Creative Services
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Creative That{' '}
              <span className="text-gradient">Captivates</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
              Transform your vision into stunning visual experiences. Our creative team combines artistic excellence with strategic thinking to deliver designs that drive business results.
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
                  className="group rounded-2xl border border-gray-100 bg-white/85 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:border-[#90E0EF] hover:shadow-lg hover:shadow-[#CAF0F8]/50 sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F9FF] to-[#CAF0F8]/50">
                    <Icon className="h-6 w-6 text-[#023047]" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">{service.title}</h4>
                  <p className="text-sm font-medium leading-relaxed text-ec-muted sm:text-base">{service.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
 
          {/* Approach */}
          <div className="mx-auto max-w-xl"> 
            <motion.div variants={fadeInRight} className="h-full w-full rounded-2xl border border-gray-100 bg-white/85 backdrop-blur-sm p-8 shadow-sm md:p-10">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">Our Creative Process</h3>
              <div className="space-y-4">
                {[
                  'Discovery & creative brief development',
                  'Market research & competitive analysis',
                  'Concept ideation & mood boards',
                  'Design execution & prototyping',
                  'Client review & refinement cycles',
                  'Final delivery & asset optimisation',
                  'Brand guidelines documentation',
                  'Ongoing creative support & updates',
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
