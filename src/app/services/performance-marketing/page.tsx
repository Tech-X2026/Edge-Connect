import PageLayout from '@/components/edge-connect/PageLayout'
import PerformanceMarketingSection from '@/components/edge-connect/PerformanceMarketingSection'

export const metadata = {
  title: 'Performance Marketing - EDGE CONNECT',
  description: 'maximise ROI with precision-targeted campaigns. PPC management, conversion optimisation, budget optimisation, and advanced analytics.',
}

export default function PerformanceMarketingPage() {
  return (
    <PageLayout>
      <PerformanceMarketingSection />
    </PageLayout>
  )
}
