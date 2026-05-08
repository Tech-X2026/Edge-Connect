import PageLayout from '@/components/edge-connect/PageLayout'
import DigitalMarketingSection from '@/components/edge-connect/DigitalMarketingSection'

export const metadata = {
  title: 'Digital Marketing - EDGE CONNECT',
  description: 'Full-stack digital marketing strategies spanning social media, email, content, and influencer marketing for cohesive brand experiences.',
}

export default function DigitalMarketingPage() {
  return (
    <PageLayout>
      <DigitalMarketingSection />
    </PageLayout>
  )
}
