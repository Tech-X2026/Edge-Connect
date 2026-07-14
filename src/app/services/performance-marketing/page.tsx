import PageLayout from '@/components/edge-connect/PageLayout'
import PerformanceMarketingSection from '@/components/edge-connect/PerformanceMarketingSection'

export const metadata = {
  title: 'Performance Marketing & Google Ads Canberra | EDGE CONNECT',
  description: "Precision-targeted Google Ads and paid media for Canberra businesses. PPC management, conversion optimisation, A/B testing and clear reporting.",
  alternates: { canonical: '/services/performance-marketing/' },
}

export default function PerformanceMarketingPage() {
  return (
    <PageLayout>
      <PerformanceMarketingSection />
    </PageLayout>
  )
}
