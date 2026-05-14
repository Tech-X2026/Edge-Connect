import Navbar from '@/components/edge-connect/Navbar'
import Footer from '@/components/edge-connect/Footer'
import FloatingContactButtons from '@/components/edge-connect/FloatingContactButtons'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <FloatingContactButtons />
    </div>
  )
}
