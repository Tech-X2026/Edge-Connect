import PageLayout from '@/components/edge-connect/PageLayout'
import VisionMissionSection from '@/components/edge-connect/VisionMissionSection'

export const metadata = {
  title: 'Vision, Mission & Statement - EDGE CONNECT',
  description: 'Discover our vision to be the most trusted digital marketing partner, our mission to deliver measurable impact, and our commitment to excellence.',
}

export default function VisionMissionPage() {
  return (
    <PageLayout>
      <VisionMissionSection />
    </PageLayout>
  )
}
