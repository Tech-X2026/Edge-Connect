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
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    subItems: [
      { label: 'SEO', href: '/services/seo' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Performance Marketing', href: '/services/performance-marketing' },
      { label: 'Web Designing', href: '/services/web-designing' },
    ],
  },
  { label: 'Vision & Mission', href: '/vision-mission' },
  { label: 'Contact', href: '/contact' },
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
    // Use a microtask to avoid synchronous setState in effect
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
    if (item.href !== '/' && pathname.startsWith(item.href)) return true
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
          ? 'bg-white shadow-md'
          : 'bg-white/80 backdrop-blur-md'
      } ${className ?? ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-1 focus:outline-none">
            <span className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              EDGE
            </span>
            <span className="text-xl font-extrabold tracking-tight text-emerald-600 sm:text-2xl">
              CONNECT
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
                    className={`relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 lg:px-4 ${
                      active
                        ? 'text-emerald-600'
                        : 'text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    {item.label}
                    {hasDropdown && (
                      <motion.span
                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    )}

                    {/* Active indicator line */}
                    {active && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-emerald-500"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
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
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute left-0 top-full mt-1 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-200/50"
                        >
                          <div className="p-2">
                            {item.subItems!.map((sub, idx) => {
                              const subActive = pathname === sub.href
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                                    subActive
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                                  }`}
                                >
                                  <span>{sub.label}</span>
                                  <ArrowRight
                                    className={`h-3.5 w-3.5 transition-transform duration-150 ${
                                      subActive
                                        ? 'translate-x-0 text-emerald-500'
                                        : '-translate-x-1 opacity-0'
                                    }`}
                                  />
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              )
            })}

            {/* CTA Button */}
            <Link
              href="/contact"
              className="ml-3 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700 active:bg-emerald-800 lg:ml-4"
            >
              Get Started
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-emerald-600"
                whileTap={{ scale: 0.9 }}
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </motion.button>

              <SheetContent side="right" className="w-[300px] bg-white p-0">
                <SheetHeader className="border-b border-gray-100 px-6 py-5">
                  <SheetTitle className="flex items-center gap-1 text-left">
                    <span className="text-lg font-extrabold tracking-tight text-gray-900">
                      EDGE
                    </span>
                    <span className="text-lg font-extrabold tracking-tight text-emerald-600">
                      CONNECT
                    </span>
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
                              className={`flex-1 rounded-lg px-3 py-3 text-left text-base font-medium transition-colors duration-150 ${
                                active
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                              }`}
                            >
                              {item.label}
                            </button>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className={`flex-1 rounded-lg px-3 py-3 text-left text-base font-medium transition-colors duration-150 ${
                                  active
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                                }`}
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                          )}

                          {hasDropdown && (
                            <button
                              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-emerald-600"
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
                                <div className="ml-4 border-l-2 border-emerald-200 pl-3">
                                  {item.subItems!.map((sub) => {
                                    const subActive = pathname === sub.href
                                    return (
                                      <SheetClose key={sub.href} asChild>
                                        <Link
                                          href={sub.href}
                                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                                            subActive
                                              ? 'bg-emerald-50 text-emerald-700'
                                              : 'text-gray-500 hover:bg-gray-50 hover:text-emerald-600'
                                          }`}
                                        >
                                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                          {sub.label}
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
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700 active:bg-emerald-800"
                      >
                        Get Started
                        <ArrowRight className="h-4 w-4" />
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
