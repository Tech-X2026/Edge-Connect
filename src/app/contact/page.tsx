import PageLayout from '@/components/edge-connect/PageLayout'
import ContactSection from '@/components/edge-connect/ContactSection'

export const metadata = {
  title: 'Contact Us | EDGE CONNECT Canberra',
  description: "Get in touch with EDGE CONNECT in Canberra. Call +61 432 887 457 or send a message to discuss your digital marketing goals.",
  alternates: { canonical: '/contact/' },
}

export default function ContactPage() {
  return (
    <PageLayout>
      <ContactSection />
    </PageLayout>
  )
}
