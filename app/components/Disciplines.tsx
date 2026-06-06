'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const yogaItems = [
  'Hatha Yoga',
  'Ashtanga Yoga',
  'Aerial Yoga',
  'Meditation',
  'Prenatal Yoga',
  'Therapeutic Yoga',
]

const danceItems = [
  'Bharatanatyam',
  'Mohiniyattam',
  'Kuchipudi',
  'Semi Classical',
  'Bollywood',
]

interface TiltCardProps {
  title: string
  subtitle: string
  items: string[]
  color: 'yoga' | 'dance'
  index: number
}

function TiltCard({ title, subtitle, items, color, index }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [10, -10]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const isYoga = color === 'yoga'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-3xl overflow-hidden cursor-pointer group"
      >
        {/* Background */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: isYoga
              ? 'linear-gradient(135deg, #0D2118 0%, #1D3B2A 40%, #0F2016 100%)'
              : 'linear-gradient(135deg, #111111 0%, #1A1A0D 40%, #0D0D0A 100%)',
          }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: isYoga
              ? 'radial-gradient(ellipse at 50% 0%, rgba(182,134,44,0.12) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at 50% 0%, rgba(182,134,44,0.10) 0%, transparent 70%)',
          }}
        />

        {/* Border */}
        <div
          className="absolute inset-0 rounded-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
          style={{
            border: '1px solid rgba(182,134,44,0.3)',
          }}
        />

        <div className="relative p-8 lg:p-10">
          {/* Icon */}
          <div className="mb-6">
            {isYoga ? <YogaIcon /> : <DanceIcon />}
          </div>

          {/* Header */}
          <div className="mb-8">
            <h3
              className="font-heading text-4xl lg:text-5xl font-bold text-[#F8F6F2] mb-2"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {title}
            </h3>
            <div className="divider-gold w-16 mb-4" />
            <p className="text-white/50 text-sm tracking-wide">{subtitle}</p>
          </div>

          {/* Items */}
          <div className="space-y-3 mb-8">
            {items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="flex items-center gap-3 group/item"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover/item:scale-125"
                  style={{ background: '#B6862C' }}
                />
                <span className="text-white/70 group-hover/item:text-white/90 transition-colors duration-300">
                  {item}
                </span>
                <div
                  className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 w-4 h-px"
                  style={{ background: '#B6862C' }}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-xl text-sm font-semibold tracking-widest transition-all duration-300"
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #B6862C, #D4A84B)'
                : 'rgba(182,134,44,0.1)',
              color: isHovered ? '#111111' : '#B6862C',
              border: '1px solid rgba(182,134,44,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            Explore {title}
          </motion.button>
        </div>

        {/* 3D depth layers */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            transform: 'translateZ(20px)',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Disciplines() {
  return (
    <section
      id="disciplines"
      className="section-padding relative overflow-hidden"
      style={{ background: '#111111' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 50%, rgba(29,59,42,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(182,134,44,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium"
          >
            What We Teach
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
            Our <span className="text-gradient-gold">Disciplines</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            From ancient yogic traditions to classical Indian dance forms — curated
            for every soul, every age, every level.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <TiltCard
            title="Yoga"
            subtitle="Mind · Body · Spirit"
            items={yogaItems}
            color="yoga"
            index={0}
          />
          <TiltCard
            title="Classical Dance"
            subtitle="Tradition · Grace · Expression"
            items={danceItems}
            color="dance"
            index={1}
          />
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-white/40 text-sm mb-6">
            All programs available for children, teens, and adults
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-3.5 rounded-full text-sm font-medium tracking-wider text-[#111111] transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #B6862C, #D4A84B)',
              letterSpacing: '0.1em',
            }}
          >
            Book a Free Trial Class
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

function YogaIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="14" fill="rgba(182,134,44,0.1)" />
      <circle cx="26" cy="16" r="5" stroke="#B6862C" strokeWidth="1.5" />
      <path d="M26 21 L26 34" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 28 L16 34 M26 28 L36 34" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 42 L26 34 L32 42" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Lotus */}
      <path d="M22 38 C22 34 26 32 26 32 C26 32 30 34 30 38" stroke="#D4A84B" strokeWidth="1" />
    </svg>
  )
}

function DanceIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="14" fill="rgba(182,134,44,0.1)" />
      <circle cx="30" cy="13" r="5" stroke="#B6862C" strokeWidth="1.5" />
      <path d="M30 18 L28 30 L20 36" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 24 L15 18" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 24 L38 16" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 30 L24 42" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 30 L34 40" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      {/* Ankle ornament */}
      <circle cx="24" cy="42" r="2" stroke="#D4A84B" strokeWidth="1" />
    </svg>
  )
}
