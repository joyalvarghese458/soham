'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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
  image: string
  index: number
}

function TiltCard({ title, subtitle, items, color, image, index }: TiltCardProps) {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 200, damping: 22 })
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 200, damping: 22 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const isYoga = color === 'yoga'
  const overlay = isYoga
    ? 'rgba(13,33,24,0.82)'
    : 'rgba(10,10,10,0.84)'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', border: '1px solid rgba(182,134,44,0.18)' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-3xl overflow-hidden cursor-pointer group h-full flex flex-col"
      >
        {/* Real photo background */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: overlay }} />
        </div>

        {/* Gold top-edge glow on hover */}
        <div
          className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, #B6862C 40%, #D4A84B 60%, transparent)' }}
        />

        {/* Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(182,134,44,0.1) 0%, transparent 65%)' }}
        />

        <div className="relative p-8 lg:p-10 flex flex-col flex-1">
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
          <div className="space-y-3 mb-8 flex-1">
            {items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                className="flex items-center gap-3 group/item"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover/item:scale-125"
                  style={{ background: '#B6862C' }}
                />
                <span className="text-white/70 group-hover/item:text-white/95 transition-colors duration-300">
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
            onClick={() => router.push('/disciplines')}
            className="w-full py-4 rounded-xl text-sm font-semibold tracking-widest transition-all duration-300"
            style={{
              background: isHovered ? 'linear-gradient(135deg, #B6862C, #D4A84B)' : 'rgba(182,134,44,0.12)',
              color: isHovered ? '#111111' : '#B6862C',
              border: '1px solid rgba(182,134,44,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            Explore {title}
          </motion.button>
        </div>
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
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(29,59,42,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(182,134,44,0.06) 0%, transparent 55%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
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
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
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
            image="https://images.pexels.com/photos/8437076/pexels-photo-8437076.jpeg?auto=compress&cs=tinysrgb&w=900&q=80"
            index={0}
          />
          <TiltCard
            title="Classical Dance"
            subtitle="Tradition · Grace · Expression"
            items={danceItems}
            color="dance"
            image="https://images.pexels.com/photos/26856873/pexels-photo-26856873.jpeg?auto=compress&cs=tinysrgb&w=900&q=80"
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
            style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)', letterSpacing: '0.1em' }}
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
      <rect width="52" height="52" rx="14" fill="rgba(182,134,44,0.12)" />
      <circle cx="26" cy="16" r="5" stroke="#B6862C" strokeWidth="1.5" />
      <path d="M26 21 L26 34" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 28 L16 34 M26 28 L36 34" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 42 L26 34 L32 42" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 38 C22 34 26 32 26 32 C26 32 30 34 30 38" stroke="#D4A84B" strokeWidth="1" />
    </svg>
  )
}

function DanceIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="14" fill="rgba(182,134,44,0.12)" />
      <circle cx="30" cy="13" r="5" stroke="#B6862C" strokeWidth="1.5" />
      <path d="M30 18 L28 30 L20 36" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 24 L15 18" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 24 L38 16" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 30 L24 42" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 30 L34 40" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="42" r="2" stroke="#D4A84B" strokeWidth="1" />
    </svg>
  )
}
