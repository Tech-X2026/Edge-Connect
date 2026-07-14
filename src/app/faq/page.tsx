import PageLayout from '@/components/edge-connect/PageLayout'
import FAQSection from '@/components/edge-connect/FAQSection'

export const metadata = {
  title: 'FAQ | EDGE CONNECT Canberra',
  description: "Answers to common questions about working with EDGE CONNECT: services, pricing, timelines and how we report on results.",
  alternates: { canonical: '/faq/' },
}

export default function FAQPage() {
  return (
    <PageLayout>
      <FAQSection />
    </PageLayout>
  )
}
