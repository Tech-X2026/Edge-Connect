'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ChevronDown, ArrowRight } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'

// ─── Types ───────────────────────────────────────────────────────────────────

interface SubItem {
  label: string
  href: string
  download?: boolean
}

interface NavItem {
  label: string
  href: string
  subItems?: SubItem[]
}

interface NavbarProps {
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'About Edge Connect', href: '/about-edge-connect' },
  {
    label: 'Services',
    href: '/services',
    subItems: [
      { label: 'Creative Services', href: '/services/creative-services' },
      { label: 'Performance Marketing', href: '/services/performance-marketing' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'SEO', href: '/services/seo' },
      { label: 'Application Development', href: '/services/application-development' },
      { label: 'Web Designing', href: '/services/web-designing' },
      { label: 'Service Book', href: '/img/EC Service Book PDF.pdf', download: true },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Vision & Mission', href: '/vision-mission' },
]

const SCROLL_THRESHOLD = 20

// ─── Component ───────────────────────────────────────────────────────────────

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // ── Scroll listener: navbar background ──
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
  }, [])

  useEffect(() => {
    const raf = requestAnimationFrame(() => handleScroll())
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsMobileMenuOpen(false)
      setIsServicesOpen(false)
      setIsMobileServicesOpen(false)
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  // ── Helpers ──

  const isItemActive = (item: NavItem): boolean => {
    if (item.href === '/' && pathname === '/') return true
    if (item.href !== '/' && pathname === item.href) return true
    if (item.href !== '/' && pathname.startsWith(item.href + '/')) return true
    if (item.subItems) {
      return item.subItems.some((sub) => pathname === sub.href)
    }
    return false
  }

  // ── Render ──

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 shadow-lg shadow-gray-200/40 backdrop-blur-lg'
          : 'bg-white/70 backdrop-blur-xl'
      } ${className ?? ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="group flex flex-col focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <img src="/img/connect_logo.png" alt="Edge Connect Logo" className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-[#00B4D8] transition-all duration-300 group-hover:text-[#0077B6] group-hover:tracking-wider sm:text-2xl">
                  EDGE
                </span>
                <span className="text-xl font-extrabold tracking-tight text-gray-900 transition-all duration-300 group-hover:tracking-wider sm:text-2xl">
                  CONNECT
                </span>
              </div>
            </div>
            <span className="w-full text-[9px] font-bold tracking-[0.25em] text-gray-900 uppercase text-center">
              YOUR BRAND OUR EDGE CONNECT
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item)
              const hasDropdown = !!item.subItems

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setIsServicesOpen(true)}
                  onMouseLeave={() => hasDropdown && setIsServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`group/nav relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 lg:px-4 ${
                      active
                        ? 'text-[#00B4D8]'
                        : 'text-gray-600 hover:text-[#00B4D8]'
                    }`}
                  >
                    {/* Hover background glow */}
                    <span className="absolute inset-0 rounded-lg bg-[#00B4D8]/0 transition-all duration-300 group-hover/nav:bg-[#00B4D8]/5 group-hover/nav:shadow-[0_0_20px_rgba(0,180,216,0.08)]" />

                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#00B4D8] to-[#48CAE4] transition-all duration-300 ease-out ${
                        active
                          ? 'w-6'
                          : 'w-0 group-hover/nav:w-5'
                      }`}
                    />

                    <span className="relative z-10 transition-transform duration-200 group-hover/nav:-translate-y-[1px]">
                      {item.label}
                    </span>

                    {hasDropdown && (
                      <motion.span
                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                      >
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover/nav:translate-y-[1px]" />
                      </motion.span>
                    )}
                  </Link>

                  {/* ── Dropdown Menu ── */}
                  {hasDropdown && (
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-gray-100/80 bg-white/95 shadow-xl shadow-gray-200/50 backdrop-blur-lg"
                        >
                          {/* Top gradient accent */}
                          <div className="h-[2px] bg-gradient-to-r from-[#00B4D8] via-[#48CAE4] to-[#00B4D8]" />

                          <div className="p-2">
                            {item.subItems!.map((sub, idx) => {
                              const subActive = pathname === sub.href
                              const MotionLink = motion(Link)
                              const linkProps = sub.download 
                                ? { href: sub.href, download: true } 
                                : { href: sub.href }
                              return (
                                <MotionLink
                                  key={sub.href}
                                  {...linkProps}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className={`group/sub flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                    subActive
                                      ? 'bg-[#F0F9FF] text-[#023047]'
                                      : 'text-gray-600 hover:bg-[#F0F9FF]/70 hover:text-[#00B4D8]'
                                  }`}
                                >
                                  <span className="flex items-center gap-2.5">
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                        subActive
                                          ? 'bg-[#00B4D8] scale-100'
                                          : 'bg-gray-300 group-hover/sub:bg-[#00B4D8] group-hover/sub:scale-125'
                                      }`}
                                    />
                                    <span className="transition-transform duration-200 group-hover/sub:translate-x-0.5">
                                      {sub.label}
                                    </span>
                                  </span>
                                  <ArrowRight
                                    className={`h-3.5 w-3.5 transition-all duration-200 ${
                                      subActive
                                        ? 'translate-x-0 text-[#00B4D8]'
                                        : '-translate-x-2 opacity-0 group-hover/sub:translate-x-0 group-hover/sub:opacity-100 group-hover/sub:text-[#00B4D8]'
                                    }`}
                                  />
                                </MotionLink>
                              )
                            })}
                          </div>

                          {/* Bottom gradient accent */}
                          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#90E0EF] to-transparent" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              )
            })}

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="group/btn ml-3 inline-flex items-center gap-1.5 rounded-xl bg-ec-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-ec-accent hover:shadow-lg lg:ml-4"
                style={{ backgroundColor: '#00B4D8' }}
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* ── Mobile Hamburger ── */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center justify-center rounded-xl p-2 text-gray-700 transition-all duration-200 hover:bg-[#F0F9FF] hover:text-[#00B4D8] hover:shadow-md hover:shadow-[#00B4D8]/10"
                whileTap={{ scale: 0.9 }}
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </motion.button>

              <SheetContent side="right" className="w-[300px] bg-white p-0">
                <SheetHeader className="border-b border-gray-100 px-6 py-5">
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <img src="/img/connect_logo.png" alt="Edge Connect Logo" className="h-6 w-auto object-contain" />
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-extrabold tracking-tight text-gray-900">
                        EDGE
                      </span>
                      <span className="text-lg font-extrabold tracking-tight text-[#00B4D8]">
                        CONNECT
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col overflow-y-auto px-4 py-4">
                  {NAV_ITEMS.map((item, idx) => {
                    const active = isItemActive(item)
                    const hasDropdown = !!item.subItems
                    const isSubOpen = hasDropdown && isMobileServicesOpen

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06 }}
                      >
                        <div className="flex items-center">
                          {hasDropdown ? (
                            <button
                              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                              className={`group/mob flex-1 rounded-xl px-3 py-3 text-left text-base font-medium transition-all duration-200 ${
                                active
                                  ? 'bg-[#F0F9FF] text-[#023047]'
                                  : 'text-gray-700 hover:bg-[#F0F9FF]/50 hover:text-[#00B4D8]'
                              }`}
                            >
                              {item.label}
                            </button>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className={`group/mob flex-1 rounded-xl px-3 py-3 text-left text-base font-medium transition-all duration-200 ${
                                  active
                                    ? 'bg-[#F0F9FF] text-[#023047]'
                                    : 'text-gray-700 hover:bg-[#F0F9FF]/50 hover:text-[#00B4D8]'
                                }`}
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                          )}

                          {hasDropdown && (
                            <button
                              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                              className="rounded-xl p-2 text-gray-400 transition-all duration-200 hover:bg-[#F0F9FF] hover:text-[#00B4D8]"
                              aria-label="Toggle services submenu"
                            >
                              <motion.span
                                animate={{ rotate: isSubOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </motion.span>
                            </button>
                          )}
                        </div>

                        {/* Mobile Sub-items */}
                        {hasDropdown && (
                          <AnimatePresence>
                            {isSubOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 border-l-2 border-[#90E0EF] pl-3">
                                  {item.subItems!.map((sub) => {
                                    const subActive = pathname === sub.href
                                    if (sub.download) {
                                      return (
                                        <a
                                          key={sub.href}
                                          href={sub.href}
                                          download
                                          className={`group/msub flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                            subActive
                                              ? 'bg-[#F0F9FF] text-[#023047]'
                                              : 'text-gray-500 hover:bg-[#F0F9FF]/50 hover:text-[#00B4D8]'
                                          }`}
                                        >
                                          <span
                                            className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                                              subActive
                                                ? 'bg-[#00B4D8]'
                                                : 'bg-gray-300 group-hover/msub:bg-[#00B4D8] group-hover/msub:scale-125'
                                            }`}
                                          />
                                          <span className="transition-transform duration-200 group-hover/msub:translate-x-0.5">
                                            {sub.label}
                                          </span>
                                        </a>
                                      )
                                    }
                                    return (
                                      <SheetClose key={sub.href} asChild>
                                        <Link
                                          href={sub.href}
                                          className={`group/msub flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                            subActive
                                              ? 'bg-[#F0F9FF] text-[#023047]'
                                              : 'text-gray-500 hover:bg-[#F0F9FF]/50 hover:text-[#00B4D8]'
                                          }`}
                                        >
                                          <span
                                            className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                                              subActive
                                                ? 'bg-[#00B4D8]'
                                                : 'bg-gray-300 group-hover/msub:bg-[#00B4D8] group-hover/msub:scale-125'
                                            }`}
                                          />
                                          <span className="transition-transform duration-200 group-hover/msub:translate-x-0.5">
                                            {sub.label}
                                          </span>
                                        </Link>
                                      </SheetClose>
                                    )
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.div>
                    )
                  })}

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: NAV_ITEMS.length * 0.06 + 0.1 }}
                    className="mt-6 border-t border-gray-100 pt-6"
                  >
                    <SheetClose asChild>
                      <Link
                        href="/contact"
                        className="group/mbtn flex w-full items-center justify-center gap-2 rounded-xl bg-ec-primary px-5 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-ec-accent hover:shadow-lg active:scale-[0.97]"
                        style={{ backgroundColor: '#00B4D8' }}
                      >
                        <span className="relative flex items-center gap-2">
                          Get Started
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/mbtn:translate-x-0.5" />
                        </span>
                      </Link>
                    </SheetClose>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
