'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

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

const testimonials = [
  {
    quote:
      "Edge Connect completely transformed our online presence. Our website bookings have increased by over 40% since the redesign, and the seamless user experience has earned us countless compliments from our guests.",
    author: 'Sarah Mitchell',
    role: 'General Manager',
    company: 'Waters Edge Canberra',
    rating: 5,
  },
  {
    quote:
      "The team at Edge Connect understood our vision from day one. They delivered a website that perfectly captures the elegance of our venue while making it incredibly easy for customers to browse menus and book tables online.",
    author: 'James Harrington',
    role: 'Operations Director',
    company: 'Waters Edge Canberra',
    rating: 5,
  },
  {
    quote:
      "Working with Edge Connect was a seamless experience. Their attention to detail and commitment to delivering a product that truly represents our brand exceeded our expectations. Highly recommended for any hospitality business.",
    author: 'Emily Chen',
    role: 'Marketing Lead',
    company: 'Waters Edge Canberra',
    rating: 5,
  },
  {
    quote:
      "From initial consultation to final launch, Edge Connect were professional, creative, and incredibly responsive. The end result is a website that not only looks stunning but drives real business results for us.",
    author: 'Michael Torres',
    role: 'Head of Operations',
    company: 'Waters Edge Canberra',
    rating: 5,
  },
  {
    quote:
      "We couldn't be happier with the outcome. Edge Connect took the time to understand our brand identity and translated it perfectly into a digital experience that our guests love interacting with.",
    author: 'Laura Bennett',
    role: 'Brand Manager',
    company: 'Waters Edge Canberra',
    rating: 5,
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
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-[#00B4D8]/30" />
                </div>
                <p className="mb-5 text-sm font-medium leading-relaxed text-ec-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-ec text-sm font-bold text-white">
                    {t.author.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.author}</p>
                    <p className="text-xs font-semibold text-ec-muted">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>


    </section>
  )
}
