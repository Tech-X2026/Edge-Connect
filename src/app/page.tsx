import PageLayout from '@/components/edge-connect/PageLayout'
import HeroSection from '@/components/edge-connect/HeroSection'
import ShowcaseVideoSection from '@/components/edge-connect/ShowcaseVideoSection'
import ServicesSection from '@/components/edge-connect/ServicesSection'
import TestimonialsSection from '@/components/edge-connect/TestimonialsSection'

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <ShowcaseVideoSection />
      <ServicesSection />
      <TestimonialsSection />
    </PageLayout>
  )
}

