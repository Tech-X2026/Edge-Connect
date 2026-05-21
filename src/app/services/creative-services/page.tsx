import PageLayout from '@/components/edge-connect/PageLayout'
import CreativeServicesSection from '@/components/edge-connect/CreativeServicesSection'

export const metadata = {
  title: 'Creative Services - EDGE CONNECT',
  description: 'Professional creative services including brand identity, video production, photography, graphic design, motion graphics, and UI/UX design.',
}

export default function CreativeServicesPage() {
  return (
    <PageLayout>
      <CreativeServicesSection />
    </PageLayout>
  )
}
