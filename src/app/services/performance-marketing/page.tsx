import PageLayout from '@/components/edge-connect/PageLayout'
import PerformanceMarketingSection from '@/components/edge-connect/PerformanceMarketingSection'

export const metadata = {
  title: 'Performance Marketing - EDGE CONNECT',
  description: 'Maximize ROI with precision-targeted campaigns. PPC management, conversion optimization, budget optimization, and advanced analytics.',
}

export default function PerformanceMarketingPage() {
  return (
    <PageLayout>
      <PerformanceMarketingSection />
    </PageLayout>
  )
}
