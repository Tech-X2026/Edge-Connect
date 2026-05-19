'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Calendar, User, Tag, ArrowLeft, ChevronDown, Mail, Share2 } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { blogPosts } from '@/lib/blog'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

interface BlogPostContentProps {
  post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const handleShare = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <section ref={ref} className="relative py-20 sm:py-28 lg:py-32">
      <div className="section-divider" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-ec-muted transition-colors duration-200 hover:text-[#00B4D8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="rounded-full bg-[#F0F9FF] px-3 py-1 text-xs font-semibold text-[#00B4D8]">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-ec-muted">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-ec-muted">
              <User className="h-3 w-3" />
              {post.author}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {post.title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-8 text-lg leading-relaxed text-ec-muted"
          >
            {post.excerpt}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-t border-gray-100 py-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-500">
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ec-muted transition-colors duration-200 hover:text-[#00B4D8]"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </motion.div>

          {/* Article image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-12 overflow-hidden rounded-2xl bg-gradient-to-br from-[#F0F9FF] to-[#CAF0F8]"
          >
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="aspect-[2/1] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[2/1] items-center justify-center">
                <span className="text-8xl font-extrabold text-[#00B4D8]/10">
                  {post.category === 'Digital Marketing' ? 'DM' : post.category === 'SEO' ? 'SEO' : post.category === 'Performance Marketing' ? 'PM' : 'WD'}
                </span>
              </div>
            )}
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-12 rounded-2xl border border-gray-100 bg-gradient-to-br from-[#F0F9FF] to-white p-6 sm:p-8"
          >
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">Contents</h2>
            <nav className="space-y-2">
              {post.content.map((section, idx) => (
                <button
                  key={idx}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="group flex w-full items-center gap-3 text-left text-sm font-medium text-ec-muted transition-colors duration-200 hover:text-[#00B4D8]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00B4D8]/10 text-xs font-bold text-[#00B4D8]">
                    {idx + 1}
                  </span>
                  <span className="flex-1">{section.question}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} />
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Q&A Content */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {post.content.map((section, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-md hover:shadow-[#00B4D8]/5"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 bg-white p-6 text-left transition-colors duration-200 hover:bg-[#F0F9FF]/50 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00B4D8] text-sm font-bold text-white">
                      Q
                    </span>
                    <h3 className="pt-1 text-lg font-bold text-gray-900">{section.question}</h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-ec-muted transition-transform duration-300 ${
                      openIndex === idx ? 'rotate-180 text-[#00B4D8]' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-100 bg-gray-50/50 px-6 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
                      <div className="flex items-start gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-sm font-bold text-gray-500">
                          A
                        </span>
                        <p
                          className="pt-1 leading-relaxed text-ec-muted"
                          dangerouslySetInnerHTML={{ __html: section.answer }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Newsletter */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-16 rounded-2xl bg-gradient-to-br from-[#00B4D8] to-[#0096C7] p-8 sm:p-10"
          >
            <div className="mx-auto max-w-lg text-center">
              <Mail className="mx-auto mb-4 h-8 w-8 text-white/80" />
              <h3 className="mb-2 text-xl font-bold text-white">Stay Updated</h3>
              <p className="mb-6 text-sm text-white/80">
                Get the latest marketing insights delivered to your inbox.
              </p>
              {subscribed ? (
                <p className="font-medium text-white">Thanks for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="min-w-0 flex-1 rounded-xl border-0 bg-white/20 px-4 py-3 text-sm text-white placeholder-white/50 outline-none backdrop-blur-sm focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#00B4D8] transition-all duration-200 hover:bg-white/90"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-16"
          >
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {blogPosts
                .filter((p) => p.slug !== post.slug && p.category === post.category)
                .slice(0, 2)
                .map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#00B4D8]/5 hover:-translate-y-0.5"
                  >
                    <span className="mb-2 inline-block rounded-full bg-[#F0F9FF] px-2.5 py-0.5 text-xs font-medium text-[#00B4D8]">
                      {related.category}
                    </span>
                    <h3 className="mb-2 font-bold text-gray-900 transition-colors duration-200 group-hover:text-[#00B4D8]">
                      {related.title}
                    </h3>
                    <p className="text-sm text-ec-muted">{related.excerpt}</p>
                  </Link>
                ))}
            </div>
            {blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).length === 0 && (
              <p className="text-sm text-ec-muted">More articles coming soon.</p>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-16 text-center"
          >
            <p className="mb-4 text-lg font-semibold text-gray-900">
              Ready to grow your business?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#00B4D8] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#0098b8] hover:shadow-lg"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
