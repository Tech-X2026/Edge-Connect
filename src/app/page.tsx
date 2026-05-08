'use client'

import Navbar from '@/components/edge-connect/Navbar'
import HeroSection from '@/components/edge-connect/HeroSection'
import AboutSection from '@/components/edge-connect/AboutSection'
import ServicesSection from '@/components/edge-connect/ServicesSection'
import SEOSection from '@/components/edge-connect/SEOSection'
import DigitalMarketingSection from '@/components/edge-connect/DigitalMarketingSection'
import PerformanceMarketingSection from '@/components/edge-connect/PerformanceMarketingSection'
import WebDesigningSection from '@/components/edge-connect/WebDesigningSection'
import VisionMissionSection from '@/components/edge-connect/VisionMissionSection'
import ContactSection from '@/components/edge-connect/ContactSection'
import Footer from '@/components/edge-connect/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SEOSection />
        <DigitalMarketingSection />
        <PerformanceMarketingSection />
        <WebDesigningSection />
        <VisionMissionSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
