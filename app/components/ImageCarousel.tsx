'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    id: 0,
    category: 'Yoga',
    title: 'Hatha Yoga',
    subtitle: 'The foundation of all yoga traditions — classical postures, conscious breath and deep relaxation',
    src: 'https://images.pexels.com/photos/6157502/pexels-photo-6157502.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#B6862C',
  },
  {
    id: 1,
    category: 'Yoga',
    title: 'Ashtanga Yoga',
    subtitle: 'A dynamic, flowing sequence of postures synchronised with breath — strength, stamina and focus',
    src: 'https://images.pexels.com/photos/2280200/pexels-photo-2280200.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#B6862C',
  },
  {
    id: 2,
    category: 'Yoga',
    title: 'Aerial Yoga',
    subtitle: 'Suspended in silk hammocks — zero-gravity inversions that decompress the spine and deepen every stretch',
    src: 'https://images.pexels.com/photos/8436605/pexels-photo-8436605.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#D4A84B',
  },
  {
    id: 3,
    category: 'Yoga',
    title: 'Meditation',
    subtitle: 'Stillness found at the centre of a busy world — pranayama and guided meditation for inner calm',
    src: 'https://images.pexels.com/photos/8437076/pexels-photo-8437076.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#2D5A3F',
  },
  {
    id: 4,
    category: 'Yoga',
    title: 'Prenatal Yoga',
    subtitle: 'Nurturing movement for expectant mothers — safe postures that support the changing body and calm the mind',
    src: 'https://images.pexels.com/photos/8436490/pexels-photo-8436490.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#B6862C',
  },
  {
    id: 5,
    category: 'Yoga',
    title: 'Therapeutic Yoga',
    subtitle: 'Healing-focused sequences guided by certified therapists for pain management and emotional recovery',
    src: 'https://images.pexels.com/photos/6339347/pexels-photo-6339347.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#B6862C',
  },
  {
    id: 6,
    category: 'Classical Dance',
    title: 'Bharatanatyam',
    subtitle: 'The temple dance of Tamil Nadu — a divine conversation of grace, rhythm and devotion',
    src: 'https://images.pexels.com/photos/30424952/pexels-photo-30424952.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#D4A84B',
  },
  {
    id: 7,
    category: 'Classical Dance',
    title: 'Mohiniyattam',
    subtitle: "Kerala's dance of the enchantress — lyrical, flowing and profoundly feminine",
    src: 'https://images.pexels.com/photos/30444651/pexels-photo-30444651.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#D4A84B',
  },
  {
    id: 8,
    category: 'Classical Dance',
    title: 'Kuchipudi',
    subtitle: 'Dramatic storytelling through intricate footwork, expressive abhinaya and vibrant rhythm',
    src: 'https://images.pexels.com/photos/26856873/pexels-photo-26856873.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#B6862C',
  },
  {
    id: 9,
    category: 'Classical Dance',
    title: 'Semi-Classical',
    subtitle: 'Where classical tradition meets folk vibrancy — expressive, accessible and joyful',
    src: 'https://images.pexels.com/photos/8610533/pexels-photo-8610533.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#B6862C',
  },
  {
    id: 10,
    category: 'Dance',
    title: 'Bollywood',
    subtitle: 'High-energy choreography drawn from India\'s iconic film tradition — pure joy in every beat',
    src: 'https://images.pexels.com/photos/18240707/pexels-photo-18240707.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    accent: '#D4A84B',
  },
]

const AUTO_INTERVAL = 5000

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number, dir: 1 | -1) => {
    setDirection(dir)
    setCurrent(index)
    setProgress(0)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, -1)
  }, [current, goTo])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(next, AUTO_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [next, paused])

  // Progress bar tick
  useEffect(() => {
    setProgress(0)
    if (paused) return
    const tick = 50
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (tick / AUTO_INTERVAL) * 100, 100))
    }, tick)
    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [current, paused])

  const slide = SLIDES[current]

  const EASE: [number, number, number, number] = [0.32, 0, 0.16, 1]

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.04,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.75, ease: EASE },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.6, ease: EASE },
    }),
  }

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#0A0F0C' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(182,134,44,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
            The Arts We Teach
          </span>
          <h2
            className="font-heading mt-4 mb-4"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)',
            }}
          >
            Experience Our{' '}
            <span className="text-gradient-gold">Disciplines</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base">
            Classical dance forms and yoga traditions taught by masters with
            over 20 years of experience.
          </p>
        </motion.div>

        {/* Carousel wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="relative"
        >
          {/* Main image frame */}
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
            style={{
              aspectRatio: '16/9',
              border: '1px solid rgba(182,134,44,0.18)',
              boxShadow:
                '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(182,134,44,0.05)',
            }}
          >
            {/* Slides */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={slide.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                  className="object-cover object-center"
                  priority={slide.id === 0}
                  draggable={false}
                />

                {/* Cinematic overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.88) 100%)',
                  }}
                />

                {/* Slide text */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.25 }}
                  >
                    <span
                      className="inline-block text-[10px] sm:text-xs tracking-[0.28em] uppercase font-medium px-3 py-1 rounded-full mb-3"
                      style={{
                        background: 'rgba(182,134,44,0.2)',
                        border: '1px solid rgba(182,134,44,0.35)',
                        color: '#D4A84B',
                      }}
                    >
                      {slide.category}
                    </span>

                    <h3
                      className="font-heading text-white leading-tight mb-2"
                      style={{
                        fontFamily: 'var(--font-playfair)',
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                      }}
                    >
                      {slide.title}
                    </h3>

                    <p className="text-white/65 max-w-lg text-sm sm:text-base leading-relaxed hidden sm:block">
                      {slide.subtitle}
                    </p>
                  </motion.div>
                </div>

                {/* Gold corner accents */}
                <div className="absolute top-4 left-4 opacity-50">
                  <CornerMark />
                </div>
                <div className="absolute top-4 right-4 opacity-50 rotate-90">
                  <CornerMark />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next buttons — hidden on very small, visible sm+ */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(17,17,17,0.55)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ChevronLeft size={18} color="white" />
            </button>

            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(17,17,17,0.55)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ChevronRight size={18} color="white" />
            </button>

            {/* Slide counter top-right */}
            <div
              className="absolute top-4 right-14 sm:right-20 z-20 text-xs text-white/50 font-mono hidden sm:block"
            >
              {String(current + 1).padStart(2, '0')} /{' '}
              {String(SLIDES.length).padStart(2, '0')}
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="mt-3 sm:mt-4 h-0.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #B6862C, #D4A84B)',
              }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Dot navigation + thumbnails */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 flex-wrap">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Go to ${s.title}`}
                className="group flex flex-col items-center gap-1.5 focus:outline-none"
              >
                {/* Thumbnail — visible on sm+ */}
                <div
                  className={`hidden sm:block relative overflow-hidden rounded-lg transition-all duration-300 ${
                    i === current
                      ? 'ring-2 ring-[#B6862C] ring-offset-1 ring-offset-[#0A0F0C] opacity-100 scale-105'
                      : 'opacity-35 hover:opacity-65 scale-100'
                  }`}
                  style={{ width: 68, height: 42 }}
                >
                  <Image
                    src={s.src}
                    alt={s.title}
                    fill
                    sizes="68px"
                    className="object-cover object-center"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      i === current ? 'opacity-0' : 'opacity-40 bg-black'
                    }`}
                  />
                </div>

                {/* Dot — visible on mobile */}
                <div
                  className={`sm:hidden rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-5 h-1.5 bg-[#B6862C]'
                      : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/50'
                  }`}
                />

                {/* Label under thumbnail */}
                <span
                  className={`hidden lg:block text-[9px] tracking-wide transition-colors duration-300 max-w-[68px] text-center leading-tight ${
                    i === current ? 'text-[#B6862C]' : 'text-white/30'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <p
            className="text-white/45 text-sm italic text-center sm:text-left"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            &ldquo;Every form, a living tradition. Every class, a new beginning.&rdquo;
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document.getElementById('disciplines')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="flex-shrink-0 px-7 py-3 rounded-full text-sm font-semibold text-[#111] tracking-widest transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #B6862C, #D4A84B)',
              letterSpacing: '0.1em',
            }}
          >
            View All Classes
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

function CornerMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 2L2 10" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 2L10 2" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
