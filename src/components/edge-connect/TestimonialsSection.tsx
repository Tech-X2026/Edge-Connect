'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

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

const testimonials = [
  {
    quote:
      "A premium dining and events website designed to reflect the elegance of lakeside Canberra. Features seamless booking integration and stunning visual storytelling.",
    author: 'Waters Edge',
    role: 'Lakeside Dining & Function Venue',
    company: 'Canberra',
    rating: 5,
    url: 'https://www.watersedgecanberra.com.au/',
  },
  {
    quote:
      "A mouthwatering local food website built for speed and conversions. Easy online ordering, menu browsing, and location details make it effortless for customers.",
    author: 'Gungahlin Kebab & Pizza',
    role: 'Local Food & Takeaway Service',
    company: 'Gungahlin',
    rating: 5,
    url: 'https://gungahlinkebabandpizza.com.au/',
  },
]

const doubledTestimonials = [...testimonials, ...testimonials]

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [isPaused, setIsPaused] = useState(false)

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
              Testimonials
            </span>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              What Our{' '}
              <span className="text-gradient">Clients Say</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
              Hear from the businesses we&apos;ve helped transform through our digital solutions.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="group"
        >
          <div
            className={`flex gap-6 animate-scroll-left${isPaused ? ' paused' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {doubledTestimonials.map((t, index) => (
              <div
                key={`${t.author}-${index}`}
                className="group/card w-[380px] shrink-0 rounded-2xl border border-gray-100 bg-white/85 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:border-[#90E0EF] hover:shadow-xl hover:shadow-[#CAF0F8]/50"
              >
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FFB703] text-[#FFB703]" />
                  ))}
                </div>
                <p className="mb-5 text-sm font-medium leading-relaxed text-ec-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-bold text-gray-900">{t.author}</p>
                  <p className="text-xs font-semibold text-ec-muted">
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>


    </section>
  )
}
