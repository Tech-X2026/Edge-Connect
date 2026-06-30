'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'

export default function ShowcaseVideoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // Sync state with video element
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  // Handle auto-play fallback
  useEffect(() => {
    if (videoRef.current) {
      // Ensure the video plays if autoPlay is blocked by browsers
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log("Playback prevented by browser: ", error)
            setIsPlaying(false)
          })
      }
    }
  }, [])

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden bg-white/40">
      {/* Decorative Orbs for background depth */}
      <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-[#CAF0F8]/30 blur-3xl" />
      <div className="pointer-events-none absolute left-10 bottom-0 h-60 w-60 rounded-full bg-[#F0F9FF]/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#90E0EF] bg-[#F0F9FF]/80 px-5 py-1.5 backdrop-blur-sm">
            <span className="text-ec-dark text-xs sm:text-sm font-bold tracking-wider uppercase">
              Brand Showcase
            </span>
          </div>
          
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            See Edge Connect <span className="text-gradient">In Action</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-ec-muted sm:text-lg">
            Discover how we design, market, and develop digital growth systems that elevate your business potential.
          </p>
        </motion.div>

        {/* Video Wrapper with Glow Effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={togglePlay}
        >
          {/* Ambient Glow behind the video */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#00B4D8] via-[#48CAE4] to-[#023047] rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-35 transition-all duration-500" />
          
          {/* Main Video Card Border */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-gray-200/50 bg-white/50 p-1.5 md:p-2 backdrop-blur-md shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl md:rounded-[1.25rem] bg-black">
              
              {/* HTML5 video element */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/img/EDGE CONNECT FINAL.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>

              {/* Hover overlay controls / play-pause trigger */}
              <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

              {/* Center Play/Pause Indicator (Overlay) */}
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${!isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ec-dark shadow-lg backdrop-blur-sm">
                  <Play className="h-6 w-6 fill-current ml-1" />
                </div>
              </div>

              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${isPlaying && isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 text-white shadow-lg backdrop-blur-sm">
                  <Pause className="h-6 w-6 fill-current" />
                </div>
              </div>

              {/* Bottom Right Audio Toggle Control */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-white/10"
                title={isMuted ? "Unmute" : "Mute"}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-gray-300" />
                ) : (
                  <Volume2 className="h-5 w-5 text-[#00B4D8] animate-pulse" />
                )}
              </button>

              {/* Autoplay Badge (Top Left) */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm border border-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B4D8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B4D8]"></span>
                </span>
                LIVE PREVIEW
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
