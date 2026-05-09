import PageLayout from '@/components/edge-connect/PageLayout'
import ServicesSection from '@/components/edge-connect/ServicesSection'

export const metadata = {
  title: 'Our Services - EDGE CONNECT',
  description: 'Explore our comprehensive suite of digital marketing services: SEO, Digital Marketing, Performance Marketing, and Web Designing.',
}

export default function ServicesPage() {
  return (
    <PageLayout>
      <ServicesSection />
    </PageLayout>
  )
}
