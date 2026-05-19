import PageLayout from '@/components/edge-connect/PageLayout'
import BlogSection from '@/components/edge-connect/BlogSection'

export const metadata = {
  title: 'Blog - EDGE CONNECT',
  description: 'Insights, strategies, and answers from EDGE CONNECT to help your business grow online.',
}

export default function BlogPage() {
  return (
    <PageLayout>
      <BlogSection />
    </PageLayout>
  )
}
