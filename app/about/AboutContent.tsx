'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, Star, Users, Heart, Play } from 'lucide-react'

// ── Pre-computed spokes — avoids SSR/client float mismatch ──────
const SPOKES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => ({
  x2: (130 + 120 * Math.cos((angle * Math.PI) / 180)).toFixed(4),
  y2: (130 + 120 * Math.sin((angle * Math.PI) / 180)).toFixed(4),
}))

// ── Data ────────────────────────────────────────────────────────
const pillars = [
  {
    icon: Award,
    title: 'Authenticity',
    body: 'Every class is rooted in classical lineage — taught exactly as passed down through generations of masters.',
  },
  {
    icon: Star,
    title: 'Excellence',
    body: 'We hold ourselves to the highest pedagogical standards, nurturing technique, artistry and inner growth equally.',
  },
  {
    icon: Users,
    title: 'Inclusivity',
    body: 'Our doors are open to all ages, abilities and backgrounds. Art belongs to everyone.',
  },
  {
    icon: Heart,
    title: 'Transformation',
    body: 'We believe movement is medicine. Every student leaves changed — in body, mind and spirit.',
  },
]

const milestones = [
  {
    year: '2004',
    title: 'The Dream Begins',
    desc: 'SOHAM UAE is founded in Dubai with a humble studio and an unwavering belief in the power of classical arts.',
  },
  {
    year: '2010',
    title: '500 Students Milestone',
    desc: 'Word spreads across the Indian diaspora. The academy grows beyond its first studio, adding new programs and instructors.',
  },
  {
    year: '2015',
    title: 'A Home at Wasl Village',
    desc: 'We move to our current state-of-the-art space at M03 Wasl Village Mall, Muhaisnah — designed for serious practitioners.',
  },
  {
    year: '2020',
    title: 'Going Global Online',
    desc: 'During the pandemic we pivot to world-class online classes, reaching students across 12 countries.',
  },
  {
    year: '2024',
    title: '1000+ Lives Transformed',
    desc: 'We celebrate the milestone that matters most — over a thousand students who carry the art within them, every day.',
  },
]

const achievementStats = [
  { value: '20+', label: 'Years of Excellence' },
  { value: '1000+', label: 'Students Guided' },
  { value: '13+', label: 'Programs Offered' },
  { value: '7', label: 'Days a Week' },
]

const founders = [
  {
    name: 'Rakhi Sunish',
    title: 'Co-Founder & Yoga Director',
    tagline: 'Master of Holistic Yoga Sciences',
    bio: 'With over two decades of dedicated practice and teaching, Rakhi has guided more than a thousand students through transformative wellness journeys. A certified yoga therapist and meditation guide, she brings ancient wisdom into modern life with extraordinary grace and clarity.',
    highlights: [
      '20+ years of teaching experience',
      'Certified Yoga Therapist & Meditation Guide',
      'Specialist in Hatha, Prenatal & Therapeutic Yoga',
      'Trained under renowned masters in India',
    ],
    specialties: ['Hatha Yoga', 'Prenatal Yoga', 'Therapeutic Yoga', 'Meditation', 'Pranayama'],
    initial: 'RS',
    image: 'https://images.pexels.com/photos/4584590/pexels-photo-4584590.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    imagePosition: 'object-center',
    gradient: 'linear-gradient(160deg, #0D2118 0%, #1D3B2A 50%, #2D4A38 100%)',
  },
  {
    name: 'Radhika Narayan',
    title: 'Co-Founder & Dance Director',
    tagline: 'Maestro of Classical Indian Dance',
    bio: 'Radhika is a living embodiment of classical Indian dance traditions. Trained under legendary Gurus, she has graced international stages across India, UAE and Europe, dedicating her life to preserving and transmitting the sacred arts of Bharatanatyam, Mohiniyattam and Kuchipudi.',
    highlights: [
      'International performer across 3 continents',
      'Trained under legendary Gurus in Kerala & Tamil Nadu',
      'Multiple national and international award winner',
      '15+ years of dance academy leadership',
    ],
    specialties: ['Bharatanatyam', 'Mohiniyattam', 'Kuchipudi', 'Semi-Classical', 'Bollywood'],
    initial: 'RN',
    image: 'https://images.pexels.com/photos/31880387/pexels-photo-31880387.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    imagePosition: 'object-top',
    gradient: 'linear-gradient(160deg, #1A0F02 0%, #2D1A04 50%, #3D2810 100%)',
  },
]

// ── Video card ───────────────────────────────────────────────────
function VideoCard({ id, title, desc, tag }: { id: string; title: string; desc: string; tag: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div
      className="relative rounded-2xl overflow-hidden group"
      style={{ aspectRatio: '16/9', border: '1px solid rgba(182,134,44,0.2)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
    >
      {!playing ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${id}/maxresdefault.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] px-3 py-1 rounded-full tracking-widest uppercase font-medium"
              style={{ background: 'rgba(182,134,44,0.2)', border: '1px solid rgba(182,134,44,0.4)', color: '#D4A84B' }}>
              {tag}
            </span>
          </div>
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Play ${title}`}
          >
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)', boxShadow: '0 0 0 14px rgba(182,134,44,0.15), 0 0 50px rgba(182,134,44,0.35)' }}
            >
              <Play size={22} fill="#111" color="#111" className="ml-1" />
            </motion.div>
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-heading text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>{title}</h3>
            <p className="text-white/55 text-sm">{desc}</p>
          </div>
          {['top-3 left-3', 'top-3 right-3 rotate-90', 'bottom-3 left-3 -rotate-90', 'bottom-3 right-3 rotate-180'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} opacity-40 pointer-events-none`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L2 8" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 2L8 2" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&color=white`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  )
}

// Shared fade-up variant with optional stagger index
const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}

export default function AboutContent() {
  return (
    <>
      {/* ── PAGE HERO ─────────────────────────────────────────── */}
      <section className="relative w-full h-[62vh] min-h-[480px] flex items-end overflow-hidden pt-24">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/2280200/pexels-photo-2280200.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85"
            alt="SOHAM UAE — Yoga practice"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/92" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 w-full">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-white/40 text-xs tracking-[0.2em] uppercase mb-6"
          >
            <a href="/" className="hover:text-[#B6862C] transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-[#B6862C]">About</span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium"
          >
            Our Story
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading mt-3 leading-tight"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
            }}
          >
            About{' '}
            <span className="text-gradient-gold">SOHAM UAE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-white/60 mt-4 max-w-xl text-base sm:text-lg leading-relaxed"
          >
            Two artists. One vision. Over a thousand transformed lives.
          </motion.p>
        </div>

        {/* Gold bottom rule */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, #B6862C 40%, #D4A84B 60%, transparent)',
          }}
        />
      </section>

      {/* ── OUR STORY ─────────────────────────────────────────── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: '#0D1F14' }}
      >
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at right, #B6862C 0%, transparent 60%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
                How It All Began
              </span>
              <h2
                className="font-heading mt-4 mb-6 leading-tight"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.9rem, 3vw, 3rem)',
                }}
              >
                Where Ancient Wisdom
                <br />
                <span className="text-gradient-gold">Meets Modern Life</span>
              </h2>
              <div className="divider-gold w-20 mb-8" />

              <div className="space-y-5 text-white/60 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                <p>
                  SOHAM UAE was born from a shared conviction: that the classical arts of India
                  are not relics of the past, but living, breathing wisdom for the present. Two
                  extraordinary artists — united by friendship, purpose and a love for their art —
                  made the leap from performance to pedagogy.
                </p>
                <p>
                  Established in the heart of Dubai&apos;s vibrant Muhaisnah district, our studio
                  became a sanctuary where tradition breathes through every movement. From our
                  first class with a handful of students to celebrating over a thousand lives
                  touched, every step has been guided by one principle: art, taught well,
                  transforms.
                </p>
                <p>
                  Today, SOHAM UAE stands as Dubai&apos;s most respected institution for Indian
                  classical dance and yoga — a place where practitioners of every background
                  discover not just a skill, but a way of being.
                </p>
              </div>

              {/* Mission / Vision */}
              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: 'Our Mission',
                    text: 'Preserve and transmit the classical arts of India while transforming lives through mindful movement.',
                  },
                  {
                    label: 'Our Vision',
                    text: 'To be the most respected centre for Indian classical arts and wellness across the UAE and beyond.',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass rounded-2xl p-5"
                    style={{ border: '1px solid rgba(182,134,44,0.15)' }}
                  >
                    <p className="text-[#B6862C] text-xs tracking-widest uppercase font-medium mb-2">
                      {item.label}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{
                  aspectRatio: '4/5',
                  border: '1px solid rgba(182,134,44,0.15)',
                }}
              >
                <Image
                  src="https://images.pexels.com/photos/26856873/pexels-photo-26856873.jpeg?auto=compress&cs=tinysrgb&w=900&q=85"
                  alt="Classical dance at SOHAM UAE"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute bottom-6 left-6 right-6 glass-gold rounded-2xl p-4">
                  <p className="text-[#B6862C] text-xs tracking-widest uppercase font-medium mb-1">
                    Est. 2004
                  </p>
                  <p
                    className="font-heading text-white text-lg font-semibold"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Dubai&apos;s Premier Wellness Sanctuary
                  </p>
                  <p className="text-white/50 text-xs mt-1">
                    Wasl Village Mall, Muhaisnah
                  </p>
                </div>
              </div>

              {/* Floating stat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-6 -left-6 glass rounded-2xl p-5 text-center hidden lg:block"
                style={{ border: '1px solid rgba(182,134,44,0.2)' }}
              >
                <div
                  className="font-heading text-4xl font-bold text-gradient-gold"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  20+
                </div>
                <div className="text-white/50 text-xs mt-1 leading-tight">
                  Years of
                  <br />
                  Excellence
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: '#111111' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
              What We Stand For
            </span>
            <h2
              className="font-heading mt-4 mb-4"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)',
              }}
            >
              Our <span className="text-gradient-gold">Philosophy</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Four principles that guide every class, every interaction, every breath.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  custom={i}
                  variants={FADE_UP}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  whileHover={{ y: -6 }}
                  className="glass rounded-3xl p-7 group transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(182,134,44,0.2), rgba(182,134,44,0.05))',
                    }}
                  >
                    <Icon size={22} color="#B6862C" />
                  </div>
                  <h3
                    className="font-heading text-lg font-semibold text-[#F8F6F2] mb-3"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{p.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ──────────────────────────────────────────── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: '#0A0F0C' }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 10% 50%, rgba(29,59,42,0.4) 0%, transparent 50%), radial-gradient(ellipse at 90% 50%, rgba(182,134,44,0.06) 0%, transparent 50%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
              The Visionaries
            </span>
            <h2
              className="font-heading mt-4 mb-4"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)',
              }}
            >
              Meet the <span className="text-gradient-gold">Founders</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Two extraordinary artists united by a vision to bring authentic Indian wellness
              traditions to Dubai.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
                custom={i}
                variants={FADE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="rounded-3xl overflow-hidden group hover-lift"
                style={{
                  background: f.gradient,
                  border: '1px solid rgba(182,134,44,0.15)',
                }}
              >
                {/* Portrait area */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover ${f.imagePosition} transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  {/* Mandala overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
                    <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
                      {[70, 95, 120].map((r, ri) => (
                        <circle key={ri} cx="130" cy="130" r={r} stroke="#B6862C" strokeWidth="1" />
                      ))}
                      {SPOKES.map((pt, ai) => (
                        <line key={ai} x1="130" y1="130" x2={pt.x2} y2={pt.y2} stroke="#B6862C" strokeWidth="0.5" opacity="0.5" />
                      ))}
                    </svg>
                  </div>
                  {/* Initials badge */}
                  <div className="absolute bottom-4 left-5">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{ background: 'rgba(182,134,44,0.25)', border: '2px solid rgba(182,134,44,0.5)', fontFamily: 'var(--font-playfair)', color: '#D4A84B', backdropFilter: 'blur(8px)' }}
                    >
                      {f.initial}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 lg:p-8">
                  <div className="divider-gold w-12 mb-5" />
                  <h3
                    className="font-heading text-2xl font-bold text-[#F8F6F2] mb-1"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {f.name}
                  </h3>
                  <p className="text-[#B6862C] text-sm tracking-wide mb-1">{f.title}</p>
                  <p className="text-white/40 text-xs italic mb-5">{f.tagline}</p>
                  <p className="text-white/60 leading-relaxed text-sm mb-6">{f.bio}</p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {f.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2.5 text-white/55 text-sm">
                        <span className="text-[#B6862C] flex-shrink-0 mt-0.5 text-xs">◆</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {f.specialties.map((s) => (
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
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 text-center max-w-3xl mx-auto"
          >
            <div className="divider-gold mx-auto w-24 mb-8" />
            <blockquote
              className="font-heading text-xl lg:text-2xl text-white/70 italic leading-relaxed"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              &ldquo;We don&apos;t just teach postures and steps — we guide souls toward
              discovering their truest, most luminous selves.&rdquo;
            </blockquote>
            <p className="text-[#B6862C] text-sm mt-4 tracking-wide">
              — Rakhi Sunish &amp; Radhika Narayan
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── WATCH & EXPERIENCE ───────────────────────────────── */}
      <section className="section-padding" style={{ background: '#111111' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">Watch & Experience</span>
            <h2 className="font-heading mt-4 mb-4" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)' }}>
              See SOHAM in <span className="text-gradient-gold">Motion</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Experience the artistry of our teachers through authentic performances and live yoga flows.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div variants={FADE_UP} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <VideoCard
                id="JWhA3ldZcyY"
                title="Bharatanatyam — Shiva Shambho"
                desc="A mesmerising classical performance showcasing devotion, rhythm and grace."
                tag="Classical Dance"
              />
            </motion.div>
            <motion.div variants={FADE_UP} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <VideoCard
                id="yRCUfumiqhk"
                title="Power Vinyasa Yoga Flow"
                desc="Experience our teaching style — strength, breath and flow in perfect harmony."
                tag="Yoga"
              />
            </motion.div>
          </div>

          {/* Photo gallery strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-10 rounded-2xl overflow-hidden">
            {[
              { id: '8437076', alt: 'Yoga class at SOHAM UAE' },
              { id: '30424952', alt: 'Bharatanatyam performance' },
              { id: '6339347', alt: 'Group yoga stretching' },
              { id: '30444651', alt: 'Mohiniyattam classical dance' },
            ].map((img, i) => (
              <motion.div
                key={img.id}
                custom={i}
                variants={FADE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative overflow-hidden group"
                style={{ aspectRatio: '1' }}
              >
                <Image
                  src={`https://images.pexels.com/photos/${img.id}/pexels-photo-${img.id}.jpeg?auto=compress&cs=tinysrgb&w=600&q=80`}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: '#0D1F14' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
              Two Decades of Growth
            </span>
            <h2
              className="font-heading mt-4"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)',
              }}
            >
              Our <span className="text-gradient-gold">Journey</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical center line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"
              style={{
                background:
                  'linear-gradient(180deg, transparent, #B6862C 8%, #B6862C 92%, transparent)',
              }}
            />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  custom={i}
                  variants={FADE_UP}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className={`relative flex flex-col sm:flex-row items-stretch gap-0 ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Card side */}
                  <div className="flex-1 sm:px-8">
                    <div
                      className="glass rounded-2xl p-5 h-full"
                      style={{ border: '1px solid rgba(182,134,44,0.15)' }}
                    >
                      <p className="text-[#B6862C] text-xs tracking-widest uppercase font-medium mb-1">
                        {m.year}
                      </p>
                      <h3
                        className="font-heading text-lg font-semibold text-[#F8F6F2] mb-2"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        {m.title}
                      </h3>
                      <p className="text-white/55 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden sm:flex items-center justify-center flex-shrink-0 w-0">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-[#B6862C] relative z-10"
                      style={{
                        background: '#0D1F14',
                        boxShadow: '0 0 14px rgba(182,134,44,0.5)',
                      }}
                    />
                  </div>

                  {/* Empty side */}
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #0F2016 0%, #1D3B2A 50%, #0F2016 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(182,134,44,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {achievementStats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={FADE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className="font-heading font-bold text-gradient-gold"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                  }}
                >
                  {s.value}
                </div>
                <div className="divider-gold w-12 mx-auto my-3" />
                <p className="text-white/60 text-sm tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-padding text-center" style={{ background: '#111111' }}>
        <div className="max-w-2xl mx-auto px-6">
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
              className="font-heading mt-4 mb-6 leading-tight"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              }}
            >
              Ready to Transform
              <br />
              <span className="text-gradient-gold">Your Life Through Art?</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-10">
              Join hundreds of students who have discovered their truest selves through Yoga and
              Classical Dance at SOHAM UAE. Your first class is on us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+971581592454"
                className="px-9 py-4 rounded-full text-[#111111] font-semibold text-sm transition-all duration-300 hover:scale-105 inline-block"
                style={{
                  background: 'linear-gradient(135deg, #B6862C, #D4A84B)',
                  letterSpacing: '0.12em',
                }}
              >
                Book Free Trial
              </a>
              <a
                href="/"
                className="px-9 py-4 rounded-full border border-white/30 text-white/80 font-medium text-sm transition-all duration-300 hover:bg-white/5 hover:border-[#B6862C] hover:text-[#B6862C] inline-block"
                style={{ letterSpacing: '0.12em' }}
              >
                Back to Home
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
