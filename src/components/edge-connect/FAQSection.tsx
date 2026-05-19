'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ChevronDown, Search, MessageCircle, ArrowRight } from 'lucide-react'

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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqCategories = ['All', 'General', 'SEO', 'Paid Ads', 'Web Design', 'Strategy']

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'What services does EDGE CONNECT offer?',
    answer: 'We offer a full range of digital marketing services including SEO, Google Ads & Performance Marketing, Social Media Management, Digital Marketing Strategy, Web Design & Development, and Content Marketing. Every engagement starts with a discovery call to match the right services to your specific business goals.',
  },
  {
    category: 'General',
    question: 'How is EDGE CONNECT different from other agencies?',
    answer: 'We combine data-driven strategy with creative execution. Every recommendation is backed by research and real metrics. We work as an extension of your team, not a black-box vendor. Our transparent reporting, regular check-ins, and focus on measurable ROI set us apart. We also invest heavily in staying ahead of platform changes so our clients benefit from the latest strategies.',
  },
  {
    category: 'General',
    question: 'Do you work with businesses outside Australia?',
    answer: 'Yes. While we are based in Canberra, Australia, we work with businesses globally. Our digital strategies are location-agnostic, and we regularly manage campaigns targeting audiences in Australia, New Zealand, the US, the UK, and Southeast Asia. All meetings are conducted virtually with flexible scheduling across time zones.',
  },
  {
    category: 'General',
    question: 'What is the typical onboarding process?',
    answer: 'Our onboarding takes 1&#8211;2 weeks. It starts with a discovery session to understand your business, audience, and goals. We then audit your current marketing, set up tracking and analytics, and develop a strategy. Once approved, we begin execution. You&#8217;ll receive a welcome kit with timelines, reporting cadence, and your dedicated account team\'s contact details.',
  },
  {
    category: 'SEO',
    question: 'How long before I see SEO results?',
    answer: 'SEO is a long-term strategy. Most clients see initial movement within 3&#8211;4 months and significant improvements within 6&#8211;12 months. The timeline depends on your website&#8217;s current state, industry competition, and the scope of work. We set realistic milestones and report progress monthly so you can see the trajectory, not just the destination.',
  },
  {
    category: 'SEO',
    question: 'Do you guarantee page 1 rankings?',
    answer: 'No ethical agency guarantees specific rankings. Google&#8217;s algorithm is complex and constantly evolving. Anyone promising a #1 ranking is likely using risky tactics that can get your site penalised. We guarantee disciplined, white-hat SEO work that builds sustainable authority. Every client we\'ve worked with for 6+ months has seen measurable ranking improvements.',
  },
  {
    category: 'SEO',
    question: 'What does an SEO audit include?',
    answer: 'A comprehensive SEO audit covers technical health (crawlability, site speed, mobile responsiveness, Core Web Vitals), on-page analysis (keyword targeting, content quality, meta data, heading structure), off-page assessment (backlink profile quality, domain authority), and competitive benchmarking. You receive a prioritised action plan with estimated impact for each recommendation.',
  },
  {
    category: 'Paid Ads',
    question: 'What is the minimum ad spend for Google Ads?',
    answer: 'We recommend a minimum monthly ad spend of $1,500&#8211;$2,000 per campaign to generate meaningful data. Lower budgets can work for hyper-local or niche campaigns but limit the testing required for optimisation. The key is finding the sweet spot where your cost per acquisition aligns with your margins. We always start with a test phase to validate assumptions before scaling.',
  },
  {
    category: 'Paid Ads',
    question: 'Which platforms should I advertise on?',
    answer: 'It depends on your audience and goals. Google Ads captures intent-based search traffic. Meta (Facebook/Instagram) excels at audience targeting and brand awareness. LinkedIn is best for B2B. TikTok and Snapchat work for younger demographics. We recommend starting with 1&#8211;2 platforms, mastering them, then expanding. A channel audit helps identify where your audience spends time.',
  },
  {
    category: 'Paid Ads',
    question: 'How do you measure ad performance?',
    answer: 'We track metrics that tie directly to your business objectives: cost per lead, cost per acquisition, return on ad spend, click-through rate, conversion rate, and impression share. We use Google Analytics 4, Google Ads conversion tracking, and custom dashboards to provide real-time visibility. Every optimisation decision is driven by data, not intuition.',
  },
  {
    category: 'Web Design',
    question: 'How long does it take to build a website?',
    answer: 'A standard business website takes 4&#8211;8 weeks from kickoff to launch. This includes strategy, design, development, content population, testing, and optimisation. E-commerce sites or custom web applications take longer. We use an agile process with weekly reviews so you see progress and provide input at every stage.',
  },
  {
    category: 'Web Design',
    question: 'Will my website be mobile-friendly?',
    answer: 'Absolutely. Every site we build is mobile-first. Over 60% of web traffic comes from mobile devices, and Google uses mobile-first indexing. All our sites are fully responsive, tested across devices and browsers, and optimised for touch interactions, fast loading, and accessible design.',
  },
  {
    category: 'Web Design',
    question: 'Do you offer website maintenance?',
    answer: 'Yes. We offer ongoing maintenance packages that include security updates, performance monitoring, content updates, backups, and technical support. Maintenance is essential for keeping your site secure, fast, and up to date. We recommend a minimum of 4&#8211;6 hours of monthly maintenance for active business websites.',
  },
  {
    category: 'Strategy',
    question: 'How do you develop a marketing strategy?',
    answer: 'Our strategy process has five phases: Discovery (audience research, competitor analysis, brand audit), Definition (goals, KPIs, budget allocation), Development (channel selection, messaging, content plan), Execution (campaign setup, content creation, launch), and Optimisation (ongoing testing, refinement, reporting). The result is a documented strategy with clear milestones and measurable targets.',
  },
  {
    category: 'Strategy',
    question: 'What KPIs should I track?',
    answer: 'The right KPIs depend on your goals. For brand awareness: impressions, reach, share of voice. For lead generation: cost per lead, conversion rate, lead quality score. For sales: return on ad spend, customer acquisition cost, average order value. For retention: customer lifetime value, churn rate, repeat purchase rate. We help you identify the 5&#8211;7 metrics that matter most to your business and track them relentlessly.',
  },
]

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = faqs.filter((faq) => {
    const matchCategory = activeCategory === 'All' || faq.category === activeCategory
    const matchSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <section ref={ref} className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-6 py-2 text-sm font-bold tracking-wider uppercase text-ec-primary transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:shadow-md hover:shadow-[#00B4D8]/10 sm:text-base">
            Help Centre
          </span>
          <motion.h1 variants={fadeInUp} className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </motion.h1>
          <motion.p variants={fadeInUp} className="mx-auto mb-12 max-w-2xl text-lg text-ec-muted">
            Everything you need to know about working with EDGE CONNECT. Can&apos;t find what you&apos;re looking for? Get in touch.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
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
              onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null) }}
              placeholder="Search FAQs..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20"
            />
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="mb-2 text-lg font-medium text-gray-900">No results found</p>
            <p className="mb-6 text-sm text-ec-muted">Try a different search or category.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#00B4D8] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0098b8]"
            >
              Ask Us Directly
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-3"
          >
            {filtered.map((faq, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-md hover:shadow-[#00B4D8]/5"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-200 hover:bg-[#F0F9FF]/50 sm:p-6"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#00B4D8]/10 text-xs font-bold text-[#00B4D8] sm:h-8 sm:w-8 sm:text-sm">
                      ?
                    </span>
                    <div>
                      <span className="mb-1 block text-xs font-medium text-[#00B4D8]">
                        {faq.category}
                      </span>
                      <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-ec-muted transition-all duration-300 ${
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
                    <div className="border-t border-gray-100 bg-gray-50/50 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#00B4D8] text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
                          A
                        </span>
                        <p
                          className="leading-relaxed text-ec-muted"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Still have questions */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 rounded-2xl border border-gray-100 bg-gradient-to-br from-[#F0F9FF] to-white p-8 text-center sm:p-12"
        >
          <MessageCircle className="mx-auto mb-4 h-10 w-10 text-[#00B4D8]" />
          <h3 className="mb-2 text-xl font-bold text-gray-900">Still have questions?</h3>
          <p className="mb-6 text-sm text-ec-muted">
            We&apos;re here to help. Reach out and our team will get back to you within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00B4D8] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#0098b8] hover:shadow-lg"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
