import PageLayout from '@/components/edge-connect/PageLayout'
import AboutEdgeConnectSection from '@/components/edge-connect/AboutEdgeConnectSection'

export const metadata = {
  title: 'Why Edge Connect | Canberra Digital Agency',
  description: "Discover what sets EDGE CONNECT apart: a Canberra-based team combining strategy, creativity and data to grow your business online.",
  alternates: { canonical: '/about-edge-connect/' },
}

export default function AboutEdgeConnectPage() {
  return (
    <PageLayout>
      <AboutEdgeConnectSection />
    </PageLayout>
  )
}
