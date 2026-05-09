import PageLayout from '@/components/edge-connect/PageLayout'
import HeroSection from '@/components/edge-connect/HeroSection'
import ServicesSection from '@/components/edge-connect/ServicesSection'

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <ServicesSection />
    </PageLayout>
  )
}
