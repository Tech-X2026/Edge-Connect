import PageLayout from '@/components/edge-connect/PageLayout'
import VisionMissionSection from '@/components/edge-connect/VisionMissionSection'

export const metadata = {
  title: 'Vision & Mission - EDGE CONNECT',
  description: 'Discover our vision to be the most trusted digital marketing partner and our mission to deliver measurable, impactful solutions.',
}

export default function VisionMissionPage() {
  return (
    <PageLayout>
      <VisionMissionSection />
    </PageLayout>
  )
}
