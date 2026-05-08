import PageLayout from '@/components/edge-connect/PageLayout'
import ContactSection from '@/components/edge-connect/ContactSection'

export const metadata = {
  title: 'Contact Us - EDGE CONNECT',
  description: 'Get in touch with EDGE CONNECT. Let\'s discuss how we can help you achieve your digital marketing goals.',
}

export default function ContactPage() {
  return (
    <PageLayout>
      <ContactSection />
    </PageLayout>
  )
}
