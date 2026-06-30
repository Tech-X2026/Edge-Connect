'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, Contact, Heart } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'Digital Marketing', href: '/services/digital-marketing' },
    { label: 'Performance Marketing', href: '/services/performance-marketing' },
    { label: 'SEO', href: '/services/seo' },
    { label: 'Web Designing', href: '/services/web-designing' },
    { label: 'Creative Services', href: '/services/creative-services' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Vision, Mission & Statement', href: '/vision-mission' },

  ],
  Contact: [
    { label: 'Phone: +61 432 887 457', href: 'tel:+61432887457' },
    { label: 'Email: info@edgeconnect.au', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=info@edgeconnect.au' },
    { label: 'Address: 40 Parkes Pl E, Parkes ACT 2600, Australia', href: 'https://www.google.com/maps/search/?api=1&query=40+Parkes+Pl+E,+Parkes+ACT+2600,+Australia' },
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
            <Link href="/" className="mb-4 inline-flex flex-col focus:outline-none">
              <div className="flex items-center gap-2">
                <img src="/img/connect_logo.png" alt="Edge Connect Logo" className="h-7 w-auto object-contain" />
                <span className="text-2xl font-extrabold tracking-tight text-[#00B4D8]">
                  EDGE
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                  CONNECT
                </span>
              </div>
              <span className="w-full text-[8px] font-bold tracking-[0.35em] text-gray-900 uppercase text-center">
                YOUR BRAND OUR EDGE CONNECT
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm font-medium leading-relaxed text-ec-muted">
              Transforming businesses through innovative digital marketing strategies. We connect brands with their audiences in meaningful, measurable ways.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/@edgeconnect-u9w"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all duration-200 hover:border-[#90E0EF] hover:bg-[#F0F9FF] hover:text-[#00B4D8]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/edge-connect-515986410/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all duration-200 hover:border-[#90E0EF] hover:bg-[#F0F9FF] hover:text-[#00B4D8]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/edgec_onnect/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all duration-200 hover:border-[#90E0EF] hover:bg-[#F0F9FF] hover:text-[#00B4D8]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590116797723"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all duration-200 hover:border-[#90E0EF] hover:bg-[#F0F9FF] hover:text-[#00B4D8]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
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