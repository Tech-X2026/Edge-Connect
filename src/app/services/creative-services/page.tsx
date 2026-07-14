import PageLayout from '@/components/edge-connect/PageLayout'
import CreativeServicesSection from '@/components/edge-connect/CreativeServicesSection'

export const metadata = {
  title: 'Creative Services & Branding Canberra | EDGE CONNECT',
  description: "Brand identity, video production, graphic design and motion graphics from EDGE CONNECT's Canberra creative team.",
  alternates: { canonical: '/services/creative-services/' },
}

export default function CreativeServicesPage() {
  return (
    <PageLayout>
      <CreativeServicesSection />
    </PageLayout>
  )
}
