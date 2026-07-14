import PageLayout from '@/components/edge-connect/PageLayout'
import BlogSection from '@/components/edge-connect/BlogSection'

export const metadata = {
  title: 'Digital Marketing Blog | EDGE CONNECT Canberra',
  description: "Practical digital marketing insights from EDGE CONNECT's Canberra team: SEO strategy, Google Ads, web design and conversion tips.",
  alternates: { canonical: '/blog/' },
}

export default function BlogPage() {
  return (
    <PageLayout>
      <BlogSection />
    </PageLayout>
  )
}
