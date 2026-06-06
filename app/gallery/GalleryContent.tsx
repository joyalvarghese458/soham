'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

type Category = 'All' | 'Yoga' | 'Dance' | 'Events'

interface GalleryItem {
  id: number
  title: string
  category: Exclude<Category, 'All'>
  desc: string
  image: string
  ratio: string
}

const CATEGORIES: Category[] = ['All', 'Yoga', 'Dance', 'Events']

const ITEMS: GalleryItem[] = [
  { id:  1, title: 'Aerial Silk Yoga',      category: 'Yoga',   desc: 'Zero-gravity serenity suspended from silk hammocks',       image: 'https://images.pexels.com/photos/8436605/pexels-photo-8436605.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '2/3'  },
  { id:  2, title: 'Morning Hatha Flow',     category: 'Yoga',   desc: 'Foundation postures and conscious breathing',              image: 'https://images.pexels.com/photos/6019798/pexels-photo-6019798.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '4/3'  },
  { id:  3, title: 'Bharatanatyam Grace',    category: 'Dance',  desc: "Ancient Tamil Nadu's most revered dance form",            image: 'https://images.pexels.com/photos/30424952/pexels-photo-30424952.jpeg?auto=compress&cs=tinysrgb&w=900&q=85', ratio: '3/4'  },
  { id:  4, title: 'Deep Meditation',        category: 'Yoga',   desc: 'Stillness found at the centre of a busy world',           image: 'https://images.pexels.com/photos/8437076/pexels-photo-8437076.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '1/1'  },
  { id:  5, title: 'Mohiniyattam',           category: 'Dance',  desc: "Kerala's enchantress — lyrical swaying grace",            image: 'https://images.pexels.com/photos/30444651/pexels-photo-30444651.jpeg?auto=compress&cs=tinysrgb&w=900&q=85', ratio: '4/3'  },
  { id:  6, title: 'Prenatal Yoga',          category: 'Yoga',   desc: 'Nurturing movement for expectant mothers',                 image: 'https://images.pexels.com/photos/8436490/pexels-photo-8436490.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '3/4'  },
  { id:  7, title: 'Kuchipudi Footwork',     category: 'Dance',  desc: 'Dramatic storytelling through intricate rhythms',          image: 'https://images.pexels.com/photos/5262079/pexels-photo-5262079.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '2/3'  },
  { id:  8, title: 'Therapeutic Practice',   category: 'Yoga',   desc: 'Healing-focused sequences guided by therapists',           image: 'https://images.pexels.com/photos/6339347/pexels-photo-6339347.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '4/3'  },
  { id:  9, title: 'Semi-Classical Dance',   category: 'Dance',  desc: 'Where classical tradition meets folk vibrancy',            image: 'https://images.pexels.com/photos/8610533/pexels-photo-8610533.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '3/4'  },
  { id: 10, title: 'Ashtanga Power Flow',    category: 'Yoga',   desc: 'Dynamic vinyasa — breath, strength and precision',        image: 'https://images.pexels.com/photos/2280200/pexels-photo-2280200.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '1/1'  },
  { id: 11, title: 'Bollywood Energy',       category: 'Dance',  desc: 'High-energy choreography that celebrates pure joy',        image: 'https://images.pexels.com/photos/18240707/pexels-photo-18240707.jpeg?auto=compress&cs=tinysrgb&w=900&q=85', ratio: '4/3'  },
  { id: 12, title: 'Classical Performance',  category: 'Dance',  desc: 'Breathtaking stage art, practised and perfect',            image: 'https://images.pexels.com/photos/26856873/pexels-photo-26856873.jpeg?auto=compress&cs=tinysrgb&w=900&q=85', ratio: '2/3'  },
  { id: 13, title: 'Annual Recital',         category: 'Events', desc: 'Students dazzling audiences at the year-end showcase',     image: 'https://images.pexels.com/photos/1701194/pexels-photo-1701194.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '4/3'  },
  { id: 14, title: 'Intensive Workshop',     category: 'Events', desc: 'A deep-dive masterclass with visiting guest artists',      image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '3/4'  },
  { id: 15, title: 'Community Gathering',    category: 'Events', desc: 'Celebrating culture, wellness and togetherness',           image: 'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '4/3'  },
  { id: 16, title: 'Outdoor Yoga Retreat',   category: 'Events', desc: 'Sunrise practice under open Dubai skies',                  image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',  ratio: '2/3'  },
]

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.06, ease: 'easeOut' as const },
  }),
}

// ── Gallery Card ──────────────────────────────────────────────────
function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem
  index: number
  onOpen: () => void
}) {
  return (
    <motion.div
      custom={index % 6}
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="masonry-item relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ aspectRatio: item.ratio }}
      onClick={onOpen}
    >
      {/* Fallback gradient shown while image loads */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #0F2016 0%, #1D3B2A 60%, #111 100%)' }}
      />

      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Cinematic gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(6,6,6,0.96) 100%)' }}
      />
      {/* Hover darkening */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span
          className="text-[9px] tracking-[0.22em] uppercase px-2 py-[3px] rounded-full mb-1.5 inline-block"
          style={{
            background: 'rgba(182,134,44,0.15)',
            color: '#D4A84B',
            border: '1px solid rgba(182,134,44,0.25)',
          }}
        >
          {item.category}
        </span>
        <h3
          className="font-heading text-sm sm:text-[15px] font-semibold text-white leading-snug"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {item.title}
        </h3>
        <p className="text-white/45 text-xs mt-0.5 leading-snug opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {item.desc}
        </p>
      </div>

      {/* Zoom icon */}
      <div
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
        style={{ background: 'rgba(182,134,44,0.9)' }}
      >
        <ZoomIn size={13} color="#111" />
      </div>
    </motion.div>
  )
}

// ── Lightbox ──────────────────────────────────────────────────────
function Lightbox({
  filtered,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  filtered: GalleryItem[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const item = filtered[index]

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-white/35 text-xs tracking-[0.2em] font-medium select-none">
        {index + 1} / {filtered.length}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
      >
        <X size={18} />
      </button>

      {/* Prev / Next */}
      {filtered.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); onPrev() }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onNext() }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Content panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -14 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-3xl overflow-hidden"
          style={{
            border: '1px solid rgba(182,134,44,0.2)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, #0F2016 0%, #1D3B2A 100%)' }}
            />
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
            />
            {/* Corner accents */}
            {(['top-3 left-3', 'top-3 right-3 rotate-90', 'bottom-3 left-3 -rotate-90', 'bottom-3 right-3 rotate-180'] as const).map((pos, i) => (
              <div key={i} className={`absolute ${pos} opacity-40 pointer-events-none`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L2 8" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2 2L8 2" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            ))}
          </div>

          {/* Info */}
          <div
            className="p-6 sm:p-8"
            style={{ background: '#090909', borderTop: '1px solid rgba(182,134,44,0.12)' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span
                  className="text-[9px] tracking-[0.25em] uppercase px-2.5 py-[3px] rounded-full inline-block mb-3"
                  style={{
                    background: 'rgba(182,134,44,0.15)',
                    color: '#D4A84B',
                    border: '1px solid rgba(182,134,44,0.3)',
                  }}
                >
                  {item.category}
                </span>
                <h3
                  className="font-heading text-xl sm:text-2xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {item.title}
                </h3>
                <p className="text-white/50 mt-1.5 text-sm leading-relaxed">{item.desc}</p>
              </div>
              <a
                href="tel:+971581592454"
                className="hidden sm:flex flex-shrink-0 items-center px-5 py-2.5 rounded-full text-[#111] text-xs font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #B6862C, #D4A84B)',
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap',
                }}
              >
                Book Trial
              </a>
            </div>

            {/* Dot nav */}
            {filtered.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-6">
                {filtered.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === index ? 20 : 6,
                      height: 6,
                      background: i === index ? '#B6862C' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main ──────────────────────────────────────────────────────────
export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'All' ? ITEMS : ITEMS.filter(i => i.category === activeCategory)

  // Close lightbox when category changes
  useEffect(() => {
    setLightboxIndex(null)
  }, [activeCategory])

  const openLightbox = (id: number) => {
    const idx = filtered.findIndex(i => i.id === id)
    if (idx !== -1) setLightboxIndex(idx)
  }

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const prevItem = useCallback(() => {
    setLightboxIndex(i => i === null ? null : (i - 1 + filtered.length) % filtered.length)
  }, [filtered.length])

  const nextItem = useCallback(() => {
    setLightboxIndex(i => i === null ? null : (i + 1) % filtered.length)
  }, [filtered.length])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full h-[65vh] min-h-[500px] flex items-end overflow-hidden pt-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/8436605/pexels-photo-8436605.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85"
            alt="SOHAM UAE Gallery"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/92" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-white/40 text-xs tracking-[0.2em] uppercase mb-6"
          >
            <a href="/" className="hover:text-[#B6862C] transition-colors">Home</a>
            <span>/</span>
            <span className="text-[#B6862C]">Gallery</span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium"
          >
            Visual Journey
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading mt-3 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}
          >
            Our <span className="text-gradient-gold">Gallery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-white/55 mt-4 max-w-lg text-base sm:text-lg leading-relaxed"
          >
            Moments of grace, strength and transformation — captured from our yoga sessions, dance performances and events.
          </motion.p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #B6862C 40%, #D4A84B 60%, transparent)' }}
        />
      </section>

      {/* ── FILTERS ──────────────────────────────────────────── */}
      <div
        className="sticky top-[80px] lg:top-[96px] z-20 py-4"
        style={{
          background: 'rgba(9,9,9,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(182,134,44,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
                style={
                  activeCategory === cat
                    ? {
                        background: 'linear-gradient(135deg, #B6862C, #D4A84B)',
                        color: '#111',
                        letterSpacing: '0.07em',
                        boxShadow: '0 0 20px rgba(182,134,44,0.3)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.55)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        letterSpacing: '0.07em',
                      }
                }
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <span className="text-white/30 text-xs tracking-[0.15em] select-none">
            {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}
          </span>
        </div>
      </div>

      {/* ── MASONRY GRID ─────────────────────────────────────── */}
      <section className="section-padding" style={{ background: '#090909' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="masonry-grid"
            >
              {filtered.map((item, i) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={i}
                  onOpen={() => openLightbox(item.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section
        className="py-24 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #090909 0%, #0D1F14 50%, #090909 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(182,134,44,0.08) 0%, transparent 65%)' }}
        />
        <div className="max-w-2xl mx-auto px-6 relative">
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
              Begin Your Journey
            </span>
            <h2
              className="font-heading mt-4 mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Ready to Create<br />
              <span className="text-gradient-gold">Your Own Moments?</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-10 text-sm sm:text-base">
              Join 1000+ students who have discovered yoga and classical dance at SOHAM UAE. Your first class is completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+971581592454"
                className="px-9 py-4 rounded-full text-[#111] font-semibold text-sm transition-all duration-300 hover:scale-105 inline-block"
                style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)', letterSpacing: '0.1em' }}
              >
                Book Free Trial
              </a>
              <a
                href="/disciplines"
                className="px-9 py-4 rounded-full border border-white/20 text-white/65 font-medium text-sm transition-all duration-300 hover:bg-white/5 hover:border-[#B6862C] hover:text-[#B6862C] inline-block"
                style={{ letterSpacing: '0.1em' }}
              >
                Explore Classes
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            filtered={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </>
  )
}
