'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, Contact, Heart } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'Web Designing', href: '/services/web-designing' },
    { label: 'Performance Marketing', href: '/services/performance-marketing' },
    { label: 'Digital Marketing', href: '/services/digital-marketing' },
    { label: 'SEO', href: '/services/seo' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Vision & Mission', href: '/vision-mission' },

  ],
  Contact: [
    { label: 'Phone: +61 432 887 457', href: 'tel:+61432887457' },
    { label: 'Email: info@edgeconnect.com.au', href: 'mailto:info@edgeconnect.com.au' },
    { label: 'Address: Sydney, Australia', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-gray-100 bg-white/80 backdrop-blur-sm">
      {/* Decorative line */}
      <div className="section-divider" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-1 focus:outline-none">
              <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                EDGE
              </span>
              <span className="text-2xl font-extrabold tracking-tight text-[#00B4D8]">
                CONNECT
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm font-medium leading-relaxed text-ec-muted">
              Transforming businesses through innovative digital marketing strategies. We connect brands with their audiences in meaningful, measurable ways.
            </p>
            <div className="flex gap-3">
              {['X', 'Li', 'Ig', 'Fb'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-xs font-bold text-gray-500 transition-all duration-200 hover:border-[#90E0EF] hover:bg-[#F0F9FF] hover:text-[#00B4D8]"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="relative">
              
              <h4 className="mb-4 text-sm font-bold text-gray-900">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ec-muted transition-colors duration-200 hover:text-[#00B4D8]"
                    >
                      {link.label}
                    </Link>
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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-all duration-200 hover:border-[#90E0EF] hover:bg-[#F0F9FF] hover:text-[#00B4D8]"
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