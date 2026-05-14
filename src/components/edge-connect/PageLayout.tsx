import Navbar from '@/components/edge-connect/Navbar'
import Footer from '@/components/edge-connect/Footer'
import FloatingContactButtons from '@/components/edge-connect/FloatingContactButtons'
import PageParticleBackground from '@/components/edge-connect/PageParticleBackground'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageParticleBackground particleCount={60} />
      <Navbar />
      <main className="relative z-10 flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <FloatingContactButtons />
    </div>
  )
}
