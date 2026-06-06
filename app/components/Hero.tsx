'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const BG_IMAGES = [
  {
    src: 'https://images.pexels.com/photos/2280200/pexels-photo-2280200.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    alt: 'Yoga practice at sunset',
    pos: 'object-center',
  },
  {
    src: 'https://images.pexels.com/photos/26856873/pexels-photo-26856873.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    alt: 'Bharatanatyam classical dance performance',
    pos: 'object-center',
  },
]

const stats = [
  { value: '7', label: 'Yoga Styles' },
  { value: '6', label: 'Dance Forms' },
  { value: '20+', label: 'Years Experience' },
  { value: '7', label: 'Days Open' },
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BG_IMAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroRef.current
      if (!hero) return

      // Scroll-driven parallax — GSAP is synced with Lenis so no RAF conflict
      gsap.to('.hero-bg-layer', {
        y: '30%',
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.hero-text-layer', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      })

      // Mouse-move parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        const x = (clientX / innerWidth - 0.5) * 20
        const yPos = (clientY / innerHeight - 0.5) * 10

        gsap.to('.hero-bg-layer', {
          x: x * 0.5,
          y: yPos * 0.3,
          duration: 1.5,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        gsap.to('.hero-text-layer', {
          x: x * -0.1,
          y: yPos * -0.05,
          duration: 2,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToNext = () => {
    const next = document.getElementById('about')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center pt-24 lg:pt-32 pb-24"
    >
      {/* Animated cinematic background */}
      <div className="hero-bg-layer absolute inset-0">
        {/* Crossfading full-screen images */}
        {BG_IMAGES.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: i === current ? 1 : 0,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${img.pos}`}
            />
          </div>
        ))}

        {/* Cinematic vignette + bottom fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/85 z-10" />

        {/* Subtle radial vignette edges */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="hero-text-layer relative z-20 text-center px-6 max-w-5xl mx-auto w-full"
      >
        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-[#B6862C]" />
          <span
            className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium"
          >
            Yoga & Classical Dance Academy • Dubai
          </span>
          <span className="h-px w-12 bg-[#B6862C]" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading mb-6 leading-[1.08] tracking-tight"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
          }}
        >
          <span className="text-[#F8F6F2]">Balance.</span>{' '}
          <span className="text-gradient-gold">Harmony.</span>
          <br />
          <span className="text-[#F8F6F2]">Growth.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
        >
          Experience world-class Yoga and Classical Dance in Dubai&apos;s most
          inspiring wellness sanctuary.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(182,134,44,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-9 py-4 rounded-full text-[#111111] font-semibold tracking-widest text-sm transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #B6862C, #D4A84B, #B6862C)',
              backgroundSize: '200% auto',
              letterSpacing: '0.12em',
            }}
          >
            Book Free Trial
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: '#B6862C', color: '#B6862C' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              document.getElementById('disciplines')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-9 py-4 rounded-full border border-white/30 text-white/80 font-medium tracking-widest text-sm transition-all duration-300 hover:bg-white/5"
            style={{ letterSpacing: '0.12em' }}
          >
            Explore Classes
          </motion.button>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="glass rounded-2xl px-4 py-4 text-center"
            >
              <div
                className="font-heading text-2xl font-bold text-gradient-gold"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {stat.value}
              </div>
              <div className="text-white/50 text-xs mt-1 tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — sits in the pb-24 reserve below the stats */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={scrollToNext}
        className="absolute bottom-6 lg:bottom-16 left-1/2 -translate-x-1/2 lg:left-auto lg:right-10 lg:translate-x-0 z-30 flex flex-col items-center gap-1.5 text-white/40 hover:text-[#B6862C] transition-colors"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 opacity-30">
        <CornerDecor />
      </div>
      <div className="absolute top-8 right-8 opacity-30 rotate-90">
        <CornerDecor />
      </div>
      <div className="absolute bottom-8 left-8 opacity-30 -rotate-90">
        <CornerDecor />
      </div>
      <div className="absolute bottom-8 right-8 opacity-30 rotate-180">
        <CornerDecor />
      </div>
    </section>
  )
}

function CornerDecor() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M2 2 L2 20" stroke="#B6862C" strokeWidth="1.5" />
      <path d="M2 2 L20 2" stroke="#B6862C" strokeWidth="1.5" />
      <circle cx="2" cy="2" r="2" fill="#B6862C" />
    </svg>
  )
}
