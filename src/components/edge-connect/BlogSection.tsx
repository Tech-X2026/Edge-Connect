'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react'
import { blogPosts } from '@/lib/blog'
import { useState } from 'react'

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

const categories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))]

export default function BlogSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = blogPosts.filter((post) => {
    const matchCategory = activeCategory === 'All' || post.category === activeCategory
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchCategory && matchSearch
  })

  return (
    <section ref={ref} className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-ec-primary transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
            Resources
          </span>
          
          <motion.h1 variants={fadeInUp} className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Our Blog
          </motion.h1>
          <motion.p variants={fadeInUp} className="mx-auto mb-12 max-w-2xl text-lg text-ec-muted">
            Insights, strategies, and answers to help your business grow online.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#00B4D8] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#F0F9FF] hover:text-[#00B4D8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20"
            />
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-ec-muted"
          >
            No articles found. Try a different search or category.
          </motion.p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((post) => (
              <motion.article
                key={post.slug}
                variants={fadeInUp}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-[#00B4D8]/5 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F0F9FF] to-[#CAF0F8]">
                      <span className="text-6xl font-extrabold text-[#00B4D8]/10">
                        {post.category === 'Digital Marketing' ? 'DM' : post.category === 'SEO' ? 'SEO' : post.category === 'Performance Marketing' ? 'PM' : 'WD'}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#00B4D8] shadow-sm backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs text-ec-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-[#00B4D8]">
                    {post.title}
                  </h3>

                  <p className="mb-4 flex-1 text-sm leading-relaxed text-ec-muted">
                    {post.excerpt}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-0.5 text-xs text-gray-500">
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/link mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#00B4D8] transition-all duration-200 hover:text-[#0098b8]"
                  >
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
