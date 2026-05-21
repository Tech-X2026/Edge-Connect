import PageLayout from '@/components/edge-connect/PageLayout'
import AboutEdgeConnectSection from '@/components/edge-connect/AboutEdgeConnectSection'

export const metadata = {
  title: 'About Edge Connect - EDGE CONNECT',
  description: 'Learn about Edge Connect — founded by Anand Kamani and Avtar Singh, based in Canberra, delivering result-driven digital marketing solutions.',
}

export default function AboutEdgeConnectPage() {
  return (
    <PageLayout>
      <AboutEdgeConnectSection />
    </PageLayout>
  )
}
