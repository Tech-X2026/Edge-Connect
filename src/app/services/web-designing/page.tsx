import PageLayout from '@/components/edge-connect/PageLayout'
import WebDesigningSection from '@/components/edge-connect/WebDesigningSection'

export const metadata = {
  title: 'Web Design Canberra | EDGE CONNECT',
  description: "Canberra web design that captivates and converts: UI/UX design, responsive development, e-commerce and ongoing website maintenance.",
  alternates: { canonical: '/services/web-designing/' },
}

export default function WebDesigningPage() {
  return (
    <PageLayout>
      <WebDesigningSection />
    </PageLayout>
  )
}
