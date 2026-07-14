import PageLayout from '@/components/edge-connect/PageLayout'
import DigitalMarketingSection from '@/components/edge-connect/DigitalMarketingSection'

export const metadata = {
  title: 'Digital Marketing Canberra | EDGE CONNECT',
  description: "Full-stack digital marketing in Canberra: social media, email campaigns, content strategy and brand storytelling that resonates with your audience.",
  alternates: { canonical: '/services/digital-marketing/' },
}

export default function DigitalMarketingPage() {
  return (
    <PageLayout>
      <DigitalMarketingSection />
    </PageLayout>
  )
}
