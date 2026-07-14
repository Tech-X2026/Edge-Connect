import PageLayout from '@/components/edge-connect/PageLayout'
import ApplicationDevelopmentSection from '@/components/edge-connect/ApplicationDevelopmentSection'

export const metadata = {
  title: 'Web & App Development Canberra | EDGE CONNECT',
  description: "Custom web and mobile application development in Canberra: scalable web apps, mobile apps, API development and cloud solutions.",
  alternates: { canonical: '/services/application-development/' },
}

export default function ApplicationDevelopmentPage() {
  return (
    <PageLayout>
      <ApplicationDevelopmentSection />
    </PageLayout>
  )
}
