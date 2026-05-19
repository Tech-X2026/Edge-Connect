import PageLayout from '@/components/edge-connect/PageLayout'
import PortfolioSection from '@/components/edge-connect/PortfolioSection'

export const metadata = {
  title: 'Portfolio - EDGE CONNECT',
  description: 'Explore our portfolio of web design and digital projects showcasing our expertise in creating stunning digital experiences.',
}

export default function PortfolioPage() {
  return (
    <PageLayout>
      <PortfolioSection />
    </PageLayout>
  )
}
