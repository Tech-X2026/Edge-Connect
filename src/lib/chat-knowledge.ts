export interface KnowledgeEntry {
  keywords: string[]
  question: string
  answer: string
  category: string
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // ── General ──────────────────────────────────────────────────────────────
  {
    keywords: ['services', 'offer', 'do you do', 'provide', 'what do you', 'capabilities', 'solutions'],
    question: 'What services does EDGE CONNECT offer?',
    answer: `We offer a full range of digital marketing services including:

• SEO (Search Engine Optimisation) — Dominate search rankings with proven strategies
• Performance Marketing — Google Ads, Meta Ads, PPC management
• Digital Marketing — Social media, email, content, and influencer marketing
• Application Development — Custom web apps, mobile apps, APIs, cloud solutions
• Web Design & Development — UI/UX, responsive development, e-commerce, CMS
• Creative Services — Brand identity, video production, graphic design, motion graphics

Every engagement starts with a discovery call to understand your unique goals. Visit our /services page for detailed information.`,
    category: 'General',
  },
  {
    keywords: ['different', 'unique', 'why choose', 'stand out', 'better than', 'edge'],
    question: 'How is EDGE CONNECT different from other agencies?',
    answer: `We combine data-driven strategy with creative execution. Every recommendation is backed by research and real metrics. We work as an extension of your team, not a black-box vendor — with transparent reporting, regular check-ins, and a relentless focus on measurable ROI.

Our founder Anand Kamani brings 20+ years of experience across media, marketing, and business growth. We've served 100+ happy clients across 5+ industry verticals in Australia, India, UK, and South Africa.`,
    category: 'General',
  },
  {
    keywords: ['location', 'based', 'australia', 'canberra', 'office', 'where'],
    question: 'Where is EDGE CONNECT based?',
    answer: `We are based in Canberra, Australia at 40 Parkes Pl E, Parkes ACT 2600. But we work with clients globally — across Australia, New Zealand, the US, UK, India, and Southeast Asia. All meetings are conducted virtually with flexible scheduling.`,
    category: 'General',
  },
  {
    keywords: ['contact', 'call', 'phone', 'email', 'reach', 'get in touch', 'support'],
    question: 'How can I contact EDGE CONNECT?',
    answer: `You can reach us at:

• Phone: +61 432 887 457
• Email: info@edgeconnect.au
• Contact Form: Visit our /contact page

We typically respond within 24 hours on business days.`,
    category: 'General',
  },
  {
    keywords: ['pricing', 'cost', 'price', 'how much', 'budget', 'package', 'plan', 'rates', 'fees'],
    question: 'What are your pricing and packages?',
    answer: `Our pricing is tailored to each client's specific needs and goals. We'd love to discuss your requirements and provide a custom quote.

Please reach out to our team:
• Call: +61 432 887 457
• Email: info@edgeconnect.au
• Contact Form: /contact

We typically respond within 24 hours.`,
    category: 'General',
  },
  {
    keywords: ['onboarding', 'process', 'start', 'begin', 'getting started', 'how it works', 'discovery'],
    question: 'What is the typical onboarding process?',
    answer: `Our onboarding takes 1-2 weeks and follows these steps:

1. Discovery Session — Deep dive into your business, goals, and challenges
2. Audit — Review current marketing, analytics, and online presence
3. Setup — Configure tracking, analytics, and campaign infrastructure
4. Strategy Development — Create a documented plan with milestones
5. Execution — Begin campaign deployment and content production

You'll receive a welcome kit with timelines, reporting cadence, and dedicated account team contact details.`,
    category: 'General',
  },
  {
    keywords: ['results', 'roi', 'measure', 'kpi', 'metrics', 'track', 'reporting', 'analytics'],
    question: 'How do you measure and report results?',
    answer: `We track the KPIs that matter most to your business goals:

• Awareness: Impressions, reach, share of voice
• Lead Generation: Cost per lead, conversion rate
• Sales: ROAS, customer acquisition cost, average order value
• Retention: Customer lifetime value, churn rate

We provide transparent monthly reporting with real-time dashboards and regular strategy reviews. Every dollar spent is tracked and optimised.`,
    category: 'General',
  },
  {
    keywords: ['who', 'client', 'industry', 'vertical', 'work with', 'experience', 'portfolio'],
    question: 'Who does EDGE CONNECT work with?',
    answer: `We work with businesses of all sizes across multiple industries. We've served 100+ clients in retail, technology, finance, hospitality, and professional services across Australia, India, UK, and South Africa.

Check out our portfolio at /portfolio to see featured projects like Waters Edge Canberra (lakeside dining) and Gungahlin Kebab & Pizza (local food).`,
    category: 'General',
  },

  // ── SEO ──────────────────────────────────────────────────────────────────
  {
    keywords: ['seo', 'search engine', 'organic', 'ranking', 'google search'],
    question: 'Tell me about your SEO services.',
    answer: `Our SEO services help you dominate search rankings and drive organic traffic. We optimise every aspect of your online presence:

What we cover:
• Technical SEO audits & fixes
• Keyword research & competitive analysis
• On-page optimisation (meta tags, schema markup, content structure)
• Content strategy & creation
• White-hat link building campaigns
• Local SEO (Google Business Profile, citations, reviews)
• YouTube SEO
• Core Web Vitals improvement
• Monthly performance reporting

Our results: 250% average organic traffic increase, 40% improvement in keyword rankings, 3.2x return on SEO investment.`,
    category: 'SEO',
  },
  {
    keywords: ['seo results', 'how long seo', 'seo timeline', 'when will i see'],
    question: 'How long before I see SEO results?',
    answer: `SEO is a long-term investment. You can expect:

• Initial movement: 3-4 months
• Significant improvements: 6-12 months
• Sustainable authority: 12+ months

Timelines depend on your website's current state, competition level, and scope of work. Every client who has worked with us for 6+ months has seen measurable ranking improvements.`,
    category: 'SEO',
  },
  {
    keywords: ['seo guarantee', 'page 1 guarantee', 'rank guarantee'],
    question: 'Do you guarantee page 1 rankings?',
    answer: `No ethical SEO agency guarantees specific rankings — anyone who does is misleading you. What we guarantee is disciplined, white-hat SEO work that builds sustainable authority and drives measurable improvement.`,
    category: 'SEO',
  },
  {
    keywords: ['seo audit', 'audit includes', 'technical audit'],
    question: 'What does an SEO audit include?',
    answer: `Our comprehensive SEO audit covers:

• Technical Health: Crawlability, site speed, mobile responsiveness, Core Web Vitals
• On-Page Analysis: Keyword targeting, content quality, meta data, heading structure
• Off-Page Assessment: Backlink profile, domain authority, competitor benchmarking
• Competitive Analysis: How you stack up against competitors

You receive a prioritised action plan with clear next steps.`,
    category: 'SEO',
  },
  {
    keywords: ['on page seo', 'off page seo', 'difference seo'],
    question: 'What is the difference between on-page and off-page SEO?',
    answer: `On-page SEO is everything on your website — content quality, keyword usage, meta tags, headings, internal links, page speed, mobile responsiveness, and schema markup.

Off-page SEO is everything outside your site — backlinks from other websites, brand mentions, social signals, and influencer partnerships.

Both are essential for ranking well. On-page ensures search engines understand your content; off-page builds the authority to outrank competitors.`,
    category: 'SEO',
  },
  {
    keywords: ['local seo', 'google business', 'near me', 'local search'],
    question: 'Do you offer local SEO services?',
    answer: `Yes! Local SEO helps businesses dominate search results in their geographic area. We optimise:

• Google Business Profile — Complete optimisation and management
• Local Citations — Consistent NAP across directories
• Review Management — Strategy to earn and manage reviews
• Location-Based Keywords — Targeting "near me" and local intent searches

Perfect for brick-and-mortar businesses, restaurants, professional services, and multi-location brands.`,
    category: 'SEO',
  },

  // ── Performance Marketing ────────────────────────────────────────────────
  {
    keywords: ['performance marketing', 'paid ads', 'ppc', 'google ads', 'adwords', 'pay per click'],
    question: 'Tell me about your Performance Marketing services.',
    answer: `Our performance marketing maximises ROI through precision-targeted campaigns. Every dollar is tracked, optimised, and geared toward measurable outcomes.

What we offer:
• PPC Management — Google Ads, Bing Ads managed by certified specialists
• Meta Ads — Facebook & Instagram advertising with precision targeting
• Conversion Rate Optimisation — Systematic testing of landing pages and funnels
• Budget Optimisation — Intelligent bid strategies for maximum ROI
• Google Analytics 4 — Comprehensive tracking and reporting

Our results: 35% average cost reduction, 4.2x return on ad spend, 2.8x lead volume increase.`,
    category: 'Performance Marketing',
  },
  {
    keywords: ['ad spend', 'minimum budget ads', 'google ads budget', 'how much ads'],
    question: 'What is the minimum ad spend for Google Ads?',
    answer: `We recommend a minimum of $1,500-$2,000 per month per campaign to generate meaningful data and results. Lower budgets can work for hyper-local or niche campaigns, but this range gives our optimisation strategies room to perform.`,
    category: 'Performance Marketing',
  },
  {
    keywords: ['which platform', 'where to advertise', 'best platform ads', 'facebook vs google'],
    question: 'Which advertising platform should I use?',
    answer: `It depends on your goals:

• Google Ads — Best for intent-based search (people actively looking)
• Meta (Facebook/Instagram) — Best for audience targeting and brand awareness
• LinkedIn — Best for B2B and professional services
• TikTok/Snapchat — Best for younger demographics

We recommend starting with 1-2 platforms where your audience is most active, then expanding as you optimise.`,
    category: 'Performance Marketing',
  },
  {
    keywords: ['cost per click', 'cpc', 'how much per click'],
    question: 'How much should I expect to pay per click?',
    answer: `Cost-per-click varies significantly by industry in Australia:

• Legal/Insurance: $30-$60 per click
• Professional Services: $5-$15 per click
• Retail/E-commerce: $1-$3 per click

We focus on lowering your cost per acquisition (CPA), not just CPC — a higher click price that converts well is better than cheap clicks that don't.`,
    category: 'Performance Marketing',
  },

  // ── Digital Marketing ────────────────────────────────────────────────────
  {
    keywords: ['digital marketing', 'social media', 'email marketing', 'content marketing', 'influencer'],
    question: 'Tell me about your Digital Marketing services.',
    answer: `Our digital marketing creates cohesive brand experiences across every touchpoint. We build full-funnel strategies that attract, engage, and convert.

What we offer:
• Social Media Marketing — Community building, content, and paid social
• Email Marketing — Automated workflows, nurture sequences, campaigns
• Content Marketing — Blog posts, video scripts, lead magnets
• Influencer Marketing — Partnership identification and management

Our results: 10M+ monthly impressions, 5.8% average email CTR, 180% social engagement increase, 4.5x content ROI.`,
    category: 'Digital Marketing',
  },
  {
    keywords: ['social media', 'facebook', 'instagram', 'linkedin', 'tiktok', 'social'],
    question: 'Do you manage social media accounts?',
    answer: `Yes! Our social media marketing includes:

• Content Strategy — Platform-specific content calendars
• Community Management — Engagement, comments, and messaging
• Paid Social — Targeted ad campaigns on Facebook, Instagram, LinkedIn
• Analytics & Reporting — Monthly performance reviews

We build engaged communities that amplify your brand voice and drive real business results.`,
    category: 'Digital Marketing',
  },
  {
    keywords: ['email marketing', 'newsletter', 'email campaign'],
    question: 'Do you offer email marketing services?',
    answer: `Absolutely. We create personalised email journeys that nurture leads and retain customers:

• Welcome Sequences — Onboard new subscribers automatically
• Nurture Campaigns — Educate and convert leads over time
• Newsletters — Regular updates that build relationships
• Abandoned Cart — Recover lost sales automatically
• Analytics — Open rates, CTR, conversion tracking

Our average email click-through rate is 5.8%, well above industry benchmarks.`,
    category: 'Digital Marketing',
  },

  // ── Web Design ───────────────────────────────────────────────────────────
  {
    keywords: ['web design', 'website', 'web development', 'ui ux', 'design', 'development'],
    question: 'Tell me about your Web Design services.',
    answer: `We design and build websites that captivate visitors and convert them into customers. Every site is mobile-first, fast, and built for results.

What we offer:
• UI/UX Design — Human-centred design that delights users
• Responsive Development — Flawless across all devices
• E-commerce Solutions — Online stores with secure payments
• CMS Integration — WordPress, Shopify, or custom solutions
• Design Systems — Scalable component libraries
• Website Maintenance — Updates, security, performance monitoring

Our process: Discovery → Wireframing → Visual Design → Development → Launch & Optimise`,
    category: 'Web Design',
  },
  {
    keywords: ['website cost', 'how much website', 'website pricing', 'build website'],
    question: 'How much does a professional website cost?',
    answer: `A professional business website typically ranges from $5,000 to $20,000 depending on complexity. E-commerce sites and custom applications may be higher.

For specific pricing, please reach out to our team for a custom quote based on your requirements.

Call: +61 432 887 457
Email: info@edgeconnect.au`,
    category: 'Web Design',
  },
  {
    keywords: ['website timeline', 'how long website', 'build time'],
    question: 'How long does it take to build a website?',
    answer: `Typical timelines:

• Standard business website: 4-8 weeks
• E-commerce site: 8-12 weeks
• Custom web application: 12+ weeks

We use an agile process with weekly reviews so you see progress every step of the way.`,
    category: 'Web Design',
  },
  {
    keywords: ['website maintenance', 'maintenance', 'update website', 'support website'],
    question: 'Do you offer website maintenance?',
    answer: `Yes! Our website maintenance includes:

• Security Updates — Patches and vulnerability management
• Performance Monitoring — Speed and uptime tracking
• Content Updates — Text, images, and page additions
• Backups — Regular automated backups
• Technical Support — Priority support for issues

We recommend a minimum of 4-6 hours monthly for active websites.`,
    category: 'Web Design',
  },
  {
    keywords: ['mobile friendly', 'responsive', 'mobile first'],
    question: 'Will my website be mobile-friendly?',
    answer: `Absolutely. We use a mobile-first approach for every project. Over 60% of web traffic is mobile, and Google uses mobile-first indexing. All our sites are fully responsive and tested across devices, browsers, and screen sizes.`,
    category: 'Web Design',
  },
  {
    keywords: ['ecommerce', 'online store', 'shop', 'woocommerce', 'shopify'],
    question: 'Do you build e-commerce websites?',
    answer: `Yes! We build end-to-end online stores with:

• Secure payment processing (Stripe, PayPal, etc.)
• Inventory management systems
• Conversion-optimised product pages
• Mobile-first shopping experience
• CMS integration (Shopify, WooCommerce, or custom)

Our e-commerce redesign for a retail client resulted in a 45% increase in conversions.`,
    category: 'Web Design',
  },

  // ── Application Development ───────────────────────────────────────────────
  {
    keywords: ['application development', 'app development', 'custom software', 'web app', 'mobile app', 'software development'],
    question: 'Tell me about your Application Development services.',
    answer: `We build powerful, scalable applications tailored to your business needs. From web apps to enterprise software, we deliver robust solutions that drive growth.

What we offer:
• Web Applications — Scalable web apps built with React, Next.js, and Node.js
• Mobile Applications — Native and cross-platform apps for iOS and Android
• API Development — RESTful and GraphQL APIs for seamless integrations
• DevOps & Infrastructure — CI/CD pipelines, containerisation, infrastructure as code
• UI/UX Design — User-centred design for intuitive interfaces

Our results: 99.9% application uptime, 3x faster time-to-market, 60% cloud cost reduction.`,
    category: 'Application Development',
  },
  {
    keywords: ['web app vs mobile app', 'native vs cross platform', 'react native', 'flutter', 'ios android'],
    question: 'Should I build a web app, mobile app, or both?',
    answer: `It depends on your users and use case:

• Web App — Best for complex functionality, frequent updates, and broad accessibility. Works on any device with a browser. Lower development and maintenance cost.
• Native Mobile App — Best for push notifications, camera/gps access, offline functionality, and app store visibility. Higher development cost but better UX.
• Cross-Platform (React Native / Flutter) — Single codebase for iOS and Android. Good balance of cost and native-like performance.

We often recommend starting with a responsive web app, then adding native mobile based on user demand.`,
    category: 'Application Development',
  },
  {
    keywords: ['custom app cost', 'app development cost', 'how much app', 'software cost', 'app pricing'],
    question: 'How much does custom application development cost?',
    answer: `Application development costs vary based on complexity:

• Simple App (MVP): $15,000 - $30,000
• Medium Complexity: $30,000 - $80,000
• Complex Enterprise: $80,000+

Factors affecting cost: number of features, platform (web, iOS, Android), third-party integrations, UI complexity, and ongoing maintenance.

We provide transparent quotes after a thorough discovery session. Contact us for a custom estimate.`,
    category: 'Application Development',
  },
  {
    keywords: ['how long app development', 'app timeline', 'software timeline', 'build time app'],
    question: 'How long does it take to build a custom application?',
    answer: `Typical timelines:

• MVP (Minimum Viable Product): 2-3 months
• Full-featured web app: 3-6 months
• Mobile app (iOS + Android): 4-8 months
• Enterprise software: 6-12+ months

We use agile methodology with 2-week sprints, so you see progress and provide feedback throughout development.`,
    category: 'Application Development',
  },
  {
    keywords: ['tech stack', 'react', 'next.js', 'node.js', 'typescript', 'technology', 'framework'],
    question: 'What technology stack do you use for development?',
    answer: `Our preferred tech stack:

Frontend: React, Next.js, TypeScript, Tailwind CSS
Backend: Node.js, Express, Python
Database: PostgreSQL, MongoDB, Firebase
Mobile: React Native, Flutter
Cloud: AWS, Google Cloud, Azure
DevOps: Docker, Kubernetes, GitHub Actions

We select the best technology for each project's specific needs — not a one-size-fits-all approach.`,
    category: 'Application Development',
  },

  // ── Creative Services ────────────────────────────────────────────────────
  {
    keywords: ['creative', 'branding', 'brand identity', 'logo', 'design'],
    question: 'Tell me about your Creative Services.',
    answer: `Our creative team combines artistic excellence with strategic thinking to deliver designs that drive business results.

What we offer:
• Brand Identity & Strategy — Logo, guidelines, and brand positioning
• Video Production & Editing — Ads, social content, corporate videos
• Photography & Visual Content — Product shoots, lifestyle imagery
• Graphic Design & Illustration — Collateral, infographics, packaging
• Motion Graphics & Animation — Explainer videos, animated logos
• UI/UX Creative Design — Wireframing, prototyping, visual design`,
    category: 'Creative Services',
  },
  {
    keywords: ['video', 'production', 'video editing', 'animation', 'motion'],
    question: 'Do you offer video production services?',
    answer: `Yes! We produce professional video content for:

• Social Media Ads — Short-form video for Facebook, Instagram, TikTok
• Corporate Communications — Brand stories, testimonials, explainers
• Product Demos — Showcase features and benefits
• Motion Graphics — Animated logos, typography, infographics

From concept to final cut, we handle the entire production process.`,
    category: 'Creative Services',
  },

  // ── FAQ / Miscellaneous ──────────────────────────────────────────────────
  {
    keywords: ['website builder', 'custom development', 'wordpress', 'next.js', 'platform'],
    question: 'Website builder vs custom development — which is better?',
    answer: `Website builders (Webflow, Squarespace, Wix) are good for simple brochure sites — faster and cheaper upfront but limited in functionality, speed, and SEO.

Custom development (Next.js, React) is better for unique functionality, advanced SEO requirements, complex integrations, and scalability. Custom sites consistently outperform builders in speed, SEO, and conversion rates.

We recommend custom development for businesses that treat their website as a growth asset.`,
    category: 'General',
  },
  {
    keywords: ['agency vs in-house', 'hire agency', 'in house marketing'],
    question: 'Should I hire an agency or manage marketing in-house?',
    answer: `Agency: You get a full specialist team (SEO, ads, content, design, analytics) for less than the cost of one senior marketing hire. Great for accessing diverse expertise quickly.

In-house: Deeper brand knowledge and faster day-to-day execution. Better for companies with established marketing operations.

Hybrid: Many clients find a hybrid model works best — an in-house marketing manager with agency support for specialised execution.`,
    category: 'General',
  },
  {
    keywords: ['marketing budget', 'how much budget', 'budget marketing'],
    question: 'How much should I budget for digital marketing?',
    answer: `A general rule of thumb is 7-12% of revenue for marketing, with digital taking 50-70% of that budget.

For startups and SMBs, a starting point of $2,000-$5,000 per month is common.

The right budget depends on your industry, goals, and competition. We're happy to discuss what makes sense for your business.`,
    category: 'General',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
    question: 'Greeting',
    answer: `Hi there! 👋 Welcome to EDGE CONNECT. I'm here to help you learn about our digital marketing services. Feel free to ask me about SEO, performance marketing, web design, or anything else!`,
    category: 'General',
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    question: 'Thanks',
    answer: `You're welcome! If you have any more questions about our services, feel free to ask. You can also reach us directly at info@edgeconnect.au or call +61 432 887 457.`,
    category: 'General',
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'talk later'],
    question: 'Goodbye',
    answer: `Thanks for chatting! If you need anything else, just open this chat anytime. You can also visit our website or contact us at info@edgeconnect.au. Have a great day!`,
    category: 'General',
  },
]

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
}

function tokenize(text: string): string[] {
  return normalize(text).split(/\s+/).filter(Boolean)
}

function matchScore(query: string, entry: KnowledgeEntry): number {
  const queryTokens = tokenize(query)
  const queryNormalized = normalize(query)

  if (queryTokens.length === 0) return 0

  let score = 0

  for (const keyword of entry.keywords) {
    const keywordNormalized = normalize(keyword)
    if (queryNormalized.includes(keywordNormalized)) {
      score += keywordNormalized.split(/\s+/).length * 3
    }
  }

  for (const token of queryTokens) {
    for (const keyword of entry.keywords) {
      const keywordTokens = tokenize(keyword)
      for (const kt of keywordTokens) {
        if (kt === token) {
          score += 2
        } else if (kt.includes(token) || token.includes(kt)) {
          score += 1
        }
      }
    }
  }

  return score
}

export function findBestAnswer(query: string): { answer: string; matchedQuestion: string } {
  const trimmed = query.trim()
  if (!trimmed) {
    return {
      answer: `Please ask me a question about our services. I can help with SEO, performance marketing, web design, digital marketing, and more!`,
      matchedQuestion: 'Empty query',
    }
  }

  const scored = KNOWLEDGE_BASE.map((entry) => ({
    entry,
    score: matchScore(trimmed, entry),
  }))

  scored.sort((a, b) => b.score - a.score)

  const best = scored[0]

  if (!best || best.score < 1) {
    return {
      answer: `I'm not sure I understand your question. Could you rephrase it?

Here are some things I can help with:
• SEO services — Search optimisation and rankings
• Performance Marketing — Google Ads and paid campaigns
• Digital Marketing — Social media, email, content strategy
• Application Development — Custom web apps, mobile apps, APIs
• Web Design — Website development and design
• Creative Services — Branding, video, and graphic design

Or feel free to contact us directly at info@edgeconnect.au or call +61 432 887 457.`,
      matchedQuestion: 'No match',
    }
  }

  const contactFooter = `\n\n---\nNeed more details? Contact us at info@edgeconnect.au or \ncall +61 432 887 457`

  return {
    answer: best.entry.answer + contactFooter,
    matchedQuestion: best.entry.question,
  }
}

export function getQuickSuggestions(): string[] {
  return [
    'What services do you offer?',
    'Tell me about SEO',
    'Google Ads pricing',
    'Application development cost',
    'Website design cost',
    'Digital marketing strategy',
  ]
}

export { KNOWLEDGE_BASE }
