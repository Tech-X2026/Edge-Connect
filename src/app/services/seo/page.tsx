import PageLayout from '@/components/edge-connect/PageLayout'
import SEOSection from '@/components/edge-connect/SEOSection'

export const metadata = {
  title: 'SEO Services - EDGE CONNECT',
  description: 'Dominate search rankings with our proven SEO strategies. Technical audits, content optimisation, link building, and continuous monitoring.',
}

export default function SEOPage() {
  return (
    <PageLayout>
      <SEOSection />
    </PageLayout>
  )
}
