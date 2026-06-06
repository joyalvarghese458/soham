'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const galleryItems = [
  {
    title: 'Aerial Yoga Flow',
    category: 'Yoga',
    aspect: 'tall',
    bg: 'linear-gradient(160deg, #0F2016 0%, #1D3B2A 50%, #2D5A3F 100%)',
    icon: '🧘',
    desc: 'Suspended in serenity',
  },
  {
    title: 'Bharatanatyam Performance',
    category: 'Dance',
    aspect: 'wide',
    bg: 'linear-gradient(135deg, #1A0F02 0%, #3D2810 50%, #1A0F02 100%)',
    icon: '💃',
    desc: 'Ancient grace in motion',
  },
  {
    title: 'Morning Meditation',
    category: 'Yoga',
    aspect: 'square',
    bg: 'linear-gradient(180deg, #0A1A0F 0%, #1D3B2A 100%)',
    icon: '☮️',
    desc: 'Stillness within',
  },
  {
    title: 'Mohiniyattam Workshop',
    category: 'Dance',
    aspect: 'tall',
    bg: 'linear-gradient(160deg, #1A0F02 0%, #2D1A04 50%, #B6862C22 100%)',
    icon: '🌸',
    desc: 'Dance of the enchantress',
  },
  {
    title: 'Hatha Yoga Class',
    category: 'Yoga',
    aspect: 'wide',
    bg: 'linear-gradient(135deg, #0F1F14 0%, #1D3B2A 50%, #152C1E 100%)',
    icon: '🌿',
    desc: 'Balance & alignment',
  },
  {
    title: 'Annual Recital',
    category: 'Events',
    aspect: 'square',
    bg: 'linear-gradient(135deg, #1A0800 0%, #3D1800 50%, #1A0800 100%)',
    icon: '✨',
    desc: 'Celebrating our students',
  },
  {
    title: 'Kids Kuchipudi',
    category: 'Dance',
    aspect: 'wide',
    bg: 'linear-gradient(135deg, #100B00 0%, #2D1E02 50%, #B6862C15 100%)',
    icon: '👧',
    desc: 'Little feet, big dreams',
  },
  {
    title: 'Prenatal Yoga',
    category: 'Yoga',
    aspect: 'square',
    bg: 'linear-gradient(160deg, #0A1F12 0%, #1D3B2A 100%)',
    icon: '🤰',
    desc: 'Gentle care for new life',
  },
]

function GalleryCard({
  item,
  onOpen,
}: {
  item: (typeof galleryItems)[0]
  onOpen: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const heightClass =
    item.aspect === 'tall'
      ? 'h-80 sm:h-96'
      : item.aspect === 'wide'
      ? 'h-52 sm:h-60'
      : 'h-64 sm:h-72'

  return (
    <div
      className={`masonry-item relative rounded-2xl overflow-hidden cursor-pointer group ${heightClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        style={{ background: item.bg }}
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(182,134,44,0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Icon large */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-6xl sm:text-7xl opacity-20"
          animate={{ scale: hovered ? 1.2 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {item.icon}
        </motion.span>
      </div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-5"
        style={{
          background:
            'linear-gradient(180deg, transparent 30%, rgba(17,17,17,0.95) 100%)',
        }}
      >
        <div className="flex items-end justify-between">
          <div>
            <span
              className="text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full mb-2 inline-block"
              style={{
                background: 'rgba(182,134,44,0.2)',
                color: '#B6862C',
                border: '1px solid rgba(182,134,44,0.3)',
              }}
            >
              {item.category}
            </span>
            <h3
              className="font-heading text-lg text-white font-medium"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {item.title}
            </h3>
            <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
          </div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="w-10 h-10 rounded-full flex items-center justify-center ml-3 flex-shrink-0"
            style={{ background: 'rgba(182,134,44,0.9)' }}
          >
            <ZoomIn size={16} color="#111" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Gallery() {
  const [lightboxItem, setLightboxItem] = useState<
    (typeof galleryItems)[0] | null
  >(null)

  return (
    <section
      id="gallery"
      className="section-padding relative overflow-hidden"
      style={{ background: '#0D1510' }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 100%, rgba(29,59,42,0.4) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium"
          >
            Our World
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-heading mt-4 mb-4"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
            }}
          >
            Experience the{' '}
            <span className="text-gradient-gold">Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            Glimpses of transformation — yoga sessions, dance performances,
            workshops, and celebrations.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="masonry-grid"
        >
          {galleryItems.map((item, i) => (
            <GalleryCard
              key={i}
              item={item}
              onOpen={() => setLightboxItem(item)}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-80 flex items-center justify-center"
                style={{ background: lightboxItem.bg }}
              >
                <span className="text-9xl opacity-40">{lightboxItem.icon}</span>
              </div>
              <div className="glass-dark p-6">
                <span
                  className="text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full inline-block mb-3"
                  style={{
                    background: 'rgba(182,134,44,0.2)',
                    color: '#B6862C',
                    border: '1px solid rgba(182,134,44,0.3)',
                  }}
                >
                  {lightboxItem.category}
                </span>
                <h3
                  className="font-heading text-2xl text-white mb-2"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {lightboxItem.title}
                </h3>
                <p className="text-white/50">{lightboxItem.desc}</p>
              </div>

              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
