import PageLayout from '@/components/edge-connect/PageLayout'
import VisionMissionSection from '@/components/edge-connect/VisionMissionSection'

export const metadata = {
  title: 'Vision & Mission | EDGE CONNECT',
  description: "The vision, mission and values behind EDGE CONNECT and how they shape the way we grow Canberra businesses online.",
  alternates: { canonical: '/vision-mission/' },
}

export default function VisionMissionPage() {
  return (
    <PageLayout>
      <VisionMissionSection />
    </PageLayout>
  )
}
