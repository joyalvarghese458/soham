'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ArrowRight } from 'lucide-react'

const galleryItems = [
  {
    title: 'Aerial Yoga Flow',
    category: 'Yoga',
    aspect: 'tall',
    src: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    desc: 'Suspended in serenity',
  },
  {
    title: 'Bharatanatyam Performance',
    category: 'Dance',
    aspect: 'wide',
    src: 'https://images.pexels.com/photos/30424952/pexels-photo-30424952.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    desc: 'Ancient grace in motion',
  },
  {
    title: 'Morning Meditation',
    category: 'Yoga',
    aspect: 'square',
    src: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    desc: 'Stillness within',
  },
  {
    title: 'Mohiniyattam Workshop',
    category: 'Dance',
    aspect: 'tall',
    src: 'https://images.pexels.com/photos/30424954/pexels-photo-30424954.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    desc: 'Dance of the enchantress',
  },
  {
    title: 'Hatha Yoga Class',
    category: 'Yoga',
    aspect: 'wide',
    src: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    desc: 'Balance & alignment',
  },
  {
    title: 'Annual Recital',
    category: 'Events',
    aspect: 'square',
    src: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    desc: 'Celebrating our students',
  },
  {
    title: 'Kids Kuchipudi',
    category: 'Dance',
    aspect: 'wide',
    src: 'https://images.pexels.com/photos/30481584/pexels-photo-30481584.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    desc: 'Little feet, big dreams',
  },
  {
    title: 'Prenatal Yoga',
    category: 'Yoga',
    aspect: 'square',
    src: 'https://images.pexels.com/photos/3823063/pexels-photo-3823063.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    desc: 'Gentle care for new life',
  },
]

function GalleryCard({
  item,
  onOpen,
  index,
}: {
  item: (typeof galleryItems)[0]
  onOpen: () => void
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  const heightClass =
    item.aspect === 'tall'
      ? 'h-80 sm:h-96'
      : item.aspect === 'wide'
      ? 'h-52 sm:h-60'
      : 'h-64 sm:h-72'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: 'easeOut' }}
      className={`masonry-item relative rounded-2xl overflow-hidden cursor-pointer group ${heightClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {/* Real photo */}
      <Image
        src={item.src}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.92) 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
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
      </div>
    </motion.div>
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
        className="absolute inset-0 opacity-20 pointer-events-none"
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
        <div className="masonry-grid">
          {galleryItems.map((item, i) => (
            <GalleryCard
              key={i}
              item={item}
              index={i}
              onOpen={() => setLightboxItem(item)}
            />
          ))}
        </div>

        {/* Explore More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 flex justify-center relative z-10"
        >
          <Link href="/gallery">
            <motion.span
              whileHover={{ scale: 1.04, boxShadow: '0 0 36px rgba(182,134,44,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-semibold tracking-widest text-[#111111] transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #B6862C, #D4A84B, #B6862C)',
                backgroundSize: '200% auto',
                letterSpacing: '0.12em',
              }}
            >
              Explore Full Gallery
              <ArrowRight size={16} />
            </motion.span>
          </Link>
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
              <div className="relative w-full h-80">
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
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
