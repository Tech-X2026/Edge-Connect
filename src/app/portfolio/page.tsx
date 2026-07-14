import PageLayout from '@/components/edge-connect/PageLayout'
import PortfolioSection from '@/components/edge-connect/PortfolioSection'

export const metadata = {
  title: 'Our Work & Portfolio | EDGE CONNECT Canberra',
  description: "See recent EDGE CONNECT projects: websites, campaigns and creative work for Canberra businesses across hospitality, retail and services.",
  alternates: { canonical: '/portfolio/' },
}

export default function PortfolioPage() {
  return (
    <PageLayout>
      <PortfolioSection />
    </PageLayout>
  )
}
