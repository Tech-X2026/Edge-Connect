'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Heart } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'SEO', href: '#seo' },
    { label: 'Digital Marketing', href: '#digital-marketing' },
    { label: 'Performance Marketing', href: '#performance-marketing' },
    { label: 'Web Designing', href: '#web-designing' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Vision & Mission', href: '#vision-mission' },
    { label: 'Contact', href: '#contact' },
  ],
  Resources: [
    { label: 'Blog', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'Careers', href: '#' },
  ],
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
      {/* Decorative line */}
      <div className="section-divider" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.button
              onClick={scrollToTop}
              className="mb-4 flex items-center gap-1 focus:outline-none"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                EDGE
              </span>
              <span className="text-2xl font-extrabold tracking-tight text-emerald-600">
                CONNECT
              </span>
            </motion.button>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-ec-muted">
              Transforming businesses through innovative digital marketing strategies. We connect brands with their audiences in meaningful, measurable ways.
            </p>
            <div className="flex gap-3">
              {['X', 'Li', 'Ig', 'Fb'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-xs font-bold text-gray-500 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-bold text-gray-900">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-ec-muted transition-colors duration-200 hover:text-emerald-600"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row">
          <p className="flex items-center gap-1 text-xs text-ec-muted sm:text-sm">
            © {new Date().getFullYear()} EDGE CONNECT. Made with
            <Heart className="h-3 w-3 text-red-400" />
            for digital excellence.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top
            <ArrowUp className="h-3 w-3" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
