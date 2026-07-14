import PageLayout from '@/components/edge-connect/PageLayout'
import ServicesSection from '@/components/edge-connect/ServicesSection'

export const metadata = {
  title: 'Digital Marketing Services Canberra | EDGE CONNECT',
  description: "Explore EDGE CONNECT's Canberra digital marketing services: SEO, performance marketing, web design, app development and creative services.",
  alternates: { canonical: '/services/' },
}

export default function ServicesPage() {
  return (
    <PageLayout>
      <ServicesSection />
    </PageLayout>
  )
}
