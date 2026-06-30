import PageLayout from '@/components/edge-connect/PageLayout'
import ApplicationDevelopmentSection from '@/components/edge-connect/ApplicationDevelopmentSection'

export const metadata = {
  title: 'Application Development Services - EDGE CONNECT',
  description: 'Build powerful, scalable applications tailored to your business needs. Custom web apps, mobile applications, API development, and cloud solutions.',
}

export default function ApplicationDevelopmentPage() {
  return (
    <PageLayout>
      <ApplicationDevelopmentSection />
    </PageLayout>
  )
}
