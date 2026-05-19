import PageLayout from '@/components/edge-connect/PageLayout'
import FAQSection from '@/components/edge-connect/FAQSection'

export const metadata = {
  title: 'FAQ - EDGE CONNECT',
  description: 'Frequently asked questions about digital marketing, SEO, Google Ads, web design, and working with EDGE CONNECT.',
}

export default function FAQPage() {
  return (
    <PageLayout>
      <FAQSection />
    </PageLayout>
  )
}
