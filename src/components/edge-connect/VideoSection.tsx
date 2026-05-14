'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface VideoSectionProps {
  videoSrc: string
  overlay?: string
  children: React.ReactNode
  className?: string
}

export default function VideoSection({
  videoSrc,
  overlay = 'from-black/50 via-black/40 to-black/60',
  children,
  className = '',
}: VideoSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />

      {/* Cyan tint */}
      <div className="absolute inset-0 bg-[#023047]/10" />

      {/* Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
