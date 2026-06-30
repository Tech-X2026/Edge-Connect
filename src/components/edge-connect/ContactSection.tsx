'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

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
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+61 432887457', href: 'tel:+61432887457' },
  { icon: Mail, label: 'Email', value: 'info@edgeconnect.au', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=info@edgeconnect.au' },
  { icon: MapPin, label: 'Office', value: '40 Parkes Pl E, Parkes ACT 2600, Australia', href: 'https://www.google.com/maps/search/?api=1&query=40+Parkes+Pl+E,+Parkes+ACT+2600,+Australia' },
]

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    service: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        contactNo: formData.contactNo,
        service: formData.service,
        message: formData.message,
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      )

      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      setFormData({ name: '', email: '', contactNo: '', service: '', message: '' })
    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -left-20 bottom-0 z-[1] h-60 w-60 rounded-full bg-[#CAF0F8]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 z-[1] h-60 w-60 rounded-full bg-[#CAF0F8]/30 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-ec-primary transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
              Get In Touch
            </span>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Let&apos;s Build Something{' '}
              <span className="text-gradient">Amazing</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
              Ready to transform your digital presence? Reach out and let&apos;s discuss how EDGE CONNECT can help you achieve your goals.
            </p>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left: Contact Info */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <div className="rounded-2xl bg-gradient-to-br from-[#023047] to-[#00B4D8] p-8 md:p-10">
                <h3 className="mb-6 text-2xl font-bold text-white">Contact Us Today</h3>
                <p className="mb-8 text-sm font-medium text-[#CAF0F8] sm:text-base">
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
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-[#90E0EF]">{info.label}</div>
                          <div className="text-sm font-semibold text-white sm:text-base">{info.value}</div>
                        </div>
                      </a>
                    )
                  })}
                </div>

                </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <div className="glass-card rounded-2xl p-8 md:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#CAF0F8]">
                      <CheckCircle className="h-8 w-8 text-[#023047]" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">Message Sent!</h3>
                    <p className="text-sm font-medium text-ec-muted">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#CAF0F8]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#CAF0F8]"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-no" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Contact No.
                      </label>
                      <input
                        type="tel"
                        id="contact-no"
                        name="contactNo"
                        required
                        value={formData.contactNo}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#CAF0F8]"
                        placeholder="+61 4XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-service" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Service Interested In
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#CAF0F8]"
                      >
                        <option value="">Select a service</option>
                        <option value="application-development">Application Development</option>
                        <option value="seo">SEO</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="performance-marketing">Performance Marketing</option>
                        <option value="web-designing">Web Designing</option>
                        <option value="website-maintenance">Website Maintenance</option>
                        <option value="creative-services">Creative Services</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Your Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#CAF0F8]"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-ec px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#00B4D8]/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#00B4D8]/30 sm:w-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      whileHover={isSubmitting ? {} : { scale: 1.03 }}
                      whileTap={isSubmitting ? {} : { scale: 0.97 }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
