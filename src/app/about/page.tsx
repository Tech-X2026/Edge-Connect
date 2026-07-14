import PageLayout from '@/components/edge-connect/PageLayout'
import AboutSection from '@/components/edge-connect/AboutSection'

export const metadata = {
  title: 'About Us | Canberra Digital Marketing Agency – EDGE CONNECT',
  description: "Meet EDGE CONNECT, a Canberra digital marketing agency with 15+ years of expertise bridging the gap between brands and their audiences.",
  alternates: { canonical: '/about/' },
}

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutSection />
    </PageLayout>
  )
}
