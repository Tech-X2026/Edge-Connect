import PageLayout from '@/components/edge-connect/PageLayout'
import SEOSection from '@/components/edge-connect/SEOSection'

export const metadata = {
  title: 'SEO Services Canberra | EDGE CONNECT',
  description: "Canberra SEO services that drive rankings and revenue: technical audits, local SEO, content optimisation, link building and monthly reporting.",
  alternates: { canonical: '/services/seo/' },
}

export default function SEOPage() {
  return (
    <PageLayout>
      <SEOSection />
    </PageLayout>
  )
}
