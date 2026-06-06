'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, Star, Users } from 'lucide-react'

// Pre-computed at module scope so SSR and client produce identical strings
const MANDALA_LINES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
  (angle) => ({
    x2: (150 + 140 * Math.cos((angle * Math.PI) / 180)).toFixed(4),
    y2: (150 + 140 * Math.sin((angle * Math.PI) / 180)).toFixed(4),
  })
)

const founders = [
  {
    name: 'Rakhi Sunish',
    title: 'Co-Founder & Yoga Director',
    tagline: 'Master of Holistic Yoga Sciences',
    bio: 'With over two decades of dedicated practice and teaching, Rakhi has guided more than a thousand students through transformative wellness journeys. A certified yoga therapist and meditation guide, she brings ancient wisdom into modern life with extraordinary grace.',
    highlights: [
      { icon: Award, text: '20+ Years Teaching Experience' },
      { icon: Star, text: 'Certified Yoga Therapist' },
      { icon: Users, text: '1000+ Students Transformed' },
    ],
    specialties: ['Hatha Yoga', 'Prenatal Yoga', 'Therapeutic Yoga', 'Meditation'],
    gradient: 'linear-gradient(160deg, #0D2118 0%, #1D3B2A 50%, #2D4A38 100%)',
    accentBg: 'linear-gradient(135deg, #1D3B2A, #2D5A3F)',
    initial: 'RS',
  },
  {
    name: 'Radhika Narayan',
    title: 'Co-Founder & Dance Director',
    tagline: 'Maestro of Classical Indian Dance',
    bio: 'Radhika is a living embodiment of classical Indian dance traditions. Trained under legendary Gurus, she has performed on international stages and dedicated her life to preserving and transmitting the sacred art of Bharatanatyam, Mohiniyattam, and Kuchipudi.',
    highlights: [
      { icon: Award, text: 'International Performer' },
      { icon: Star, text: 'Trained Under Legendary Gurus' },
      { icon: Users, text: 'Multiple Award Winner' },
    ],
    specialties: ['Bharatanatyam', 'Mohiniyattam', 'Kuchipudi', 'Semi Classical'],
    gradient: 'linear-gradient(160deg, #1A0F02 0%, #2D1A04 50%, #3D2810 100%)',
    accentBg: 'linear-gradient(135deg, #2D1A04, #3D2810)',
    initial: 'RN',
  },
]

export default function Founders() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      id="founders"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: '#111111' }}
    >
      {/* BG */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 10% 50%, rgba(29,59,42,0.4) 0%, transparent 50%), radial-gradient(ellipse at 90% 50%, rgba(182,134,44,0.08) 0%, transparent 50%)',
        }}
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
            The Visionaries
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
            Meet The <span className="text-gradient-gold">Founders</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            Two extraordinary artists united by a vision to bring authentic Indian
            wellness traditions to Dubai.
          </motion.p>
        </div>

        {/* Founders Cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: i === 0 ? y1 : y2 }}
            >
              <div
                className="relative rounded-3xl overflow-hidden group hover-lift"
                style={{
                  background: founder.gradient,
                  border: '1px solid rgba(182,134,44,0.15)',
                }}
              >
                {/* Portrait area */}
                <div className="relative h-64 lg:h-72 overflow-hidden">
                  {/* Gradient background art */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: founder.accentBg }}
                  />

                  {/* Decorative mandala */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
                      {[80, 110, 140].map((r, ri) => (
                        <circle key={ri} cx="150" cy="150" r={r} stroke="#B6862C" strokeWidth="1" />
                      ))}
                      {MANDALA_LINES.map((pt, ai) => (
                        <line
                          key={ai}
                          x1="150"
                          y1="150"
                          x2={pt.x2}
                          y2={pt.y2}
                          stroke="#B6862C"
                          strokeWidth="0.5"
                          opacity="0.5"
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Initials avatar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold"
                      style={{
                        background: 'rgba(182,134,44,0.15)',
                        border: '2px solid rgba(182,134,44,0.3)',
                        fontFamily: 'var(--font-playfair)',
                        color: '#B6862C',
                      }}
                    >
                      {founder.initial}
                    </div>
                  </div>

                  {/* Bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#111] to-transparent" />
                </div>

                {/* Content — glass card */}
                <div className="relative p-7 lg:p-8">
                  {/* Gold accent line */}
                  <div className="divider-gold w-12 mb-5" />

                  <h3
                    className="font-heading text-2xl lg:text-3xl font-bold text-[#F8F6F2] mb-1"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {founder.name}
                  </h3>
                  <p
                    className="text-[#B6862C] text-sm tracking-wide mb-1"
                    style={{ letterSpacing: '0.05em' }}
                  >
                    {founder.title}
                  </p>
                  <p className="text-white/40 text-xs italic mb-5">
                    {founder.tagline}
                  </p>

                  <p className="text-white/60 leading-relaxed text-sm mb-6">
                    {founder.bio}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-6">
                    {founder.highlights.map((h, hi) => {
                      const Icon = h.icon
                      return (
                        <div key={hi} className="flex items-center gap-3">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(182,134,44,0.12)' }}
                          >
                            <Icon size={13} color="#B6862C" />
                          </div>
                          <span className="text-white/60 text-xs">{h.text}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {founder.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: 'rgba(182,134,44,0.08)',
                          border: '1px solid rgba(182,134,44,0.2)',
                          color: 'rgba(182,134,44,0.9)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover glow border */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{ border: '1px solid rgba(182,134,44,0.3)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="divider-gold mx-auto w-24 mb-8" />
          <blockquote
            className="font-heading text-xl lg:text-2xl text-white/70 italic leading-relaxed"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            &ldquo;We don&apos;t just teach postures and steps — we guide souls
            toward discovering their truest, most luminous selves.&rdquo;
          </blockquote>
          <p className="text-[#B6862C] text-sm mt-4 tracking-wide">
            — Rakhi Sunish & Radhika Narayan
          </p>
        </motion.div>
      </div>
    </section>
  )
}
