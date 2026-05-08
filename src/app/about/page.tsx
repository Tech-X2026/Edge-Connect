import PageLayout from '@/components/edge-connect/PageLayout'
import AboutSection from '@/components/edge-connect/AboutSection'

export const metadata = {
  title: 'About Us - EDGE CONNECT',
  description: 'Learn about EDGE CONNECT, a full-service digital marketing agency with 15+ years of expertise bridging the gap between brands and their audiences.',
}

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutSection />
    </PageLayout>
  )
}
