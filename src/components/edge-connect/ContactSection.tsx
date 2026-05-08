'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'

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

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: Mail, label: 'Email', value: 'hello@edgeconnect.com', href: 'mailto:hello@edgeconnect.com' },
  { icon: MapPin, label: 'Office', value: 'San Francisco, CA', href: '#' },
]

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', service: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28">
      {/* ── Background Video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      <div className="absolute inset-0 bg-emerald-900/15" />

      {/* Top fade */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-emerald-300 backdrop-blur-sm">
              Get In Touch
            </span>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Let&apos;s Build Something{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Amazing
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Ready to transform your digital presence? Reach out and let&apos;s discuss how EDGE CONNECT can help you achieve your goals.
            </p>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left: Contact Info */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10">
                <h3 className="mb-6 text-2xl font-bold text-white">Contact Us Today</h3>
                <p className="mb-8 text-sm text-gray-300 sm:text-base">
                  We&apos;d love to hear about your project. Drop us a line and we&apos;ll get back to you within 24 hours.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => {
                    const Icon = info.icon
                    return (
                      <a
                        key={info.label}
                        href={info.href}
                        className="flex items-center gap-4 transition-colors duration-200 hover:opacity-80"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15">
                          <Icon className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-400">{info.label}</div>
                          <div className="text-sm font-semibold text-white sm:text-base">{info.value}</div>
                        </div>
                      </a>
                    )
                  })}
                </div>

                {/* Social proof */}
                <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['bg-emerald-400', 'bg-cyan-400', 'bg-teal-400', 'bg-emerald-300'].map((color, i) => (
                        <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 ${color} text-xs font-bold text-white`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">500+ Happy Clients</div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className="h-3 w-3 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-gray-400">4.9/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                      <CheckCircle className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">Message Sent!</h3>
                    <p className="text-sm text-gray-400">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-gray-500 focus:border-emerald-400/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-gray-500 focus:border-emerald-400/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-gray-300">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-400/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option value="" className="bg-gray-900">Select a service</option>
                        <option value="seo" className="bg-gray-900">SEO</option>
                        <option value="digital-marketing" className="bg-gray-900">Digital Marketing</option>
                        <option value="performance-marketing" className="bg-gray-900">Performance Marketing</option>
                        <option value="web-designing" className="bg-gray-900">Web Designing</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-300">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-gray-500 focus:border-emerald-400/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-ec px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/30 sm:w-auto"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Send Message
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
