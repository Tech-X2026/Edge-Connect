import { notFound } from 'next/navigation'
import PageLayout from '@/components/edge-connect/PageLayout'
import BlogPostContent from '@/components/edge-connect/BlogPostContent'
import { blogPosts } from '@/lib/blog'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} - EDGE CONNECT Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <PageLayout>
      <BlogPostContent post={post} />
    </PageLayout>
  )
}
