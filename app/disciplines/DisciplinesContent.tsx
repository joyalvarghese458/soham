'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Users, Star, Award, Play } from 'lucide-react'

// ── Yoga programs ────────────────────────────────────────────────
const yogaPrograms = [
  {
    title: 'Hatha Yoga',
    level: 'All Levels',
    ageGroup: 'Ages 10+',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/6019798/pexels-photo-6019798.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: 'The foundation of all yoga traditions. Hatha balances body and mind through classical postures, conscious breathing and deep relaxation — the perfect starting point for any student.',
    highlights: ['Classical postures (asanas)', 'Pranayama breathwork', 'Deep relaxation', 'Flexibility & strength'],
  },
  {
    title: 'Ashtanga Yoga',
    level: 'Intermediate',
    ageGroup: 'Ages 14+',
    duration: '75 min',
    image: 'https://images.pexels.com/photos/2280200/pexels-photo-2280200.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: 'A dynamic, flowing sequence of postures synchronized with breath. Ashtanga builds incredible strength, stamina and focus through its precise, progressive system.',
    highlights: ['Primary series flow', 'Vinyasa transitions', 'Core strength', 'Mental discipline'],
  },
  {
    title: 'Aerial Yoga',
    level: 'Beginner – Intermediate',
    ageGroup: 'Ages 12+',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/8436605/pexels-photo-8436605.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: 'Yoga elevated — literally. Using silk hammocks suspended from the ceiling, aerial yoga decompresses the spine, deepens stretches and makes inversions accessible to everyone.',
    highlights: ['Spinal decompression', 'Zero-gravity inversions', 'Deepened flexibility', 'Core & upper body'],
  },
  {
    title: 'Prenatal Yoga',
    level: 'All Trimesters',
    ageGroup: 'Expectant Mothers',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/8436490/pexels-photo-8436490.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: 'A nurturing practice specially designed for expectant mothers. Safe, guided postures support the changing body, calm the nervous system and prepare for childbirth.',
    highlights: ['Trimester-specific postures', 'Breathwork for labour', 'Pelvic floor strengthening', 'Stress relief'],
  },
  {
    title: 'Therapeutic Yoga',
    level: 'All Levels',
    ageGroup: 'Ages 18+',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/6339347/pexels-photo-6339347.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: 'A healing-focused practice for students managing specific physical or emotional conditions. Guided by certified yoga therapists, this class works alongside your wellness journey.',
    highlights: ['Condition-specific sequences', 'Pain management', 'Posture correction', 'Emotional healing'],
  },
  {
    title: 'Meditation & Pranayama',
    level: 'All Levels',
    ageGroup: 'Ages 10+',
    duration: '45 min',
    image: 'https://images.pexels.com/photos/8437076/pexels-photo-8437076.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: 'Stillness is a skill. This class cultivates deep mindfulness through guided meditation techniques and classical pranayama — transforming how you respond to everyday life.',
    highlights: ['Guided visualization', 'Classical pranayama', 'Stress & anxiety relief', 'Improved focus'],
  },
]

// ── Dance programs ───────────────────────────────────────────────
const dancePrograms = [
  {
    title: 'Bharatanatyam',
    origin: 'Tamil Nadu',
    level: 'Beginner – Advanced',
    ageGroup: 'Ages 5+',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/30424952/pexels-photo-30424952.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: "One of India's oldest and most revered classical dance forms. Bharatanatyam weaves together nritta, nritya and natya into a breathtaking living art.",
    highlights: ['Adavus (basic movements)', 'Abhinaya (expression)', 'Mudras (hand gestures)', 'Alarippu to Varnam'],
  },
  {
    title: 'Mohiniyattam',
    origin: 'Kerala',
    level: 'Beginner – Advanced',
    ageGroup: 'Ages 6+',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/30444651/pexels-photo-30444651.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: "The dance of the enchantress — Kerala's most lyrical and sensuous classical form, characterised by graceful swaying movements and deeply devotional nature.",
    highlights: ['Swaying lasya movements', 'Facial expressions', 'Footwork & rhythm', 'Devotional compositions'],
  },
  {
    title: 'Kuchipudi',
    origin: 'Andhra Pradesh',
    level: 'Beginner – Advanced',
    ageGroup: 'Ages 6+',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/5262079/pexels-photo-5262079.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: 'Vibrant, expressive and theatrical — Kuchipudi brings stories from Hindu mythology to life through intricate footwork, acrobatic elements and vivid facial expression.',
    highlights: ['Dramatic storytelling', 'Tarangam (plate dance)', 'Expressive abhinaya', 'Classical compositions'],
  },
  {
    title: 'Semi-Classical Dance',
    origin: 'Pan-Indian',
    level: 'All Levels',
    ageGroup: 'Ages 6+',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/8610533/pexels-photo-8610533.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: 'A beautiful bridge between classical and folk traditions. Semi-classical dance blends the discipline of classical forms with the colour and energy of regional folk styles.',
    highlights: ['Fusion choreography', 'Regional folk elements', 'Stage performance skills', 'Expressive movement'],
  },
  {
    title: 'Bollywood Dance',
    origin: 'Contemporary Indian',
    level: 'All Levels',
    ageGroup: 'Ages 5+',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/18240707/pexels-photo-18240707.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    description: 'High-energy, joyful and accessible — Bollywood dance is the perfect introduction to Indian movement for students of all backgrounds.',
    highlights: ['Choreographed routines', 'Film song sequences', 'Group performance', 'Stage presence'],
  },
]

const audiences = [
  { label: 'Children', range: 'Ages 5 – 12', note: 'Fun, age-appropriate classes that build focus, coordination and creativity.' },
  { label: 'Teens', range: 'Ages 13 – 17', note: 'Build strength, flexibility and artistic confidence during formative years.' },
  { label: 'Adults', range: 'Ages 18 – 60', note: 'Transform your body, calm your mind and rediscover yourself through art.' },
  { label: 'Seniors', range: 'Ages 60+', note: 'Gentle, therapeutic practices that support mobility, balance and wellbeing.' },
]

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

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
          {/* YouTube thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${id}/maxresdefault.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

          {/* Category tag */}
          <div className="absolute top-4 left-4">
            <span
              className="text-[10px] px-3 py-1 rounded-full tracking-widest uppercase font-medium"
              style={{ background: 'rgba(182,134,44,0.2)', border: '1px solid rgba(182,134,44,0.4)', color: '#D4A84B' }}
            >
              {tag}
            </span>
          </div>

          {/* Play button */}
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

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-heading text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
              {title}
            </h3>
            <p className="text-white/55 text-sm">{desc}</p>
          </div>

          {/* Gold corner accents */}
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

// ── Level badge ──────────────────────────────────────────────────
function LevelBadge({ label }: { label: string }) {
  return (
    <span className="text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wide flex-shrink-0"
      style={{ background: 'rgba(182,134,44,0.12)', border: '1px solid rgba(182,134,44,0.3)', color: '#D4A84B' }}>
      {label}
    </span>
  )
}

// ── Program card (with image) ────────────────────────────────────
function ProgramCard({ program, index }: {
  program: typeof yogaPrograms[0] & { origin?: string }
  index: number
}) {
  return (
    <motion.div
      custom={index % 3}
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6 }}
      className="rounded-3xl overflow-hidden flex flex-col transition-all duration-300 group"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Hero image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <Image
          src={program.image}
          alt={program.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Badges on image */}
        <div className="absolute top-3 left-3">
          <LevelBadge label={program.level} />
        </div>
        {'origin' in program && program.origin && (
          <div className="absolute bottom-3 left-3">
            <span className="text-[#B6862C] text-[10px] tracking-widest uppercase">{program.origin}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-xl font-bold text-[#F8F6F2]" style={{ fontFamily: 'var(--font-playfair)' }}>
            {program.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-white/40 text-xs">
          <span className="flex items-center gap-1.5"><Users size={11} /> {program.ageGroup}</span>
          <span className="flex items-center gap-1.5"><Clock size={11} /> {program.duration}</span>
        </div>

        <div className="divider-gold w-10" />
        <p className="text-white/60 text-sm leading-relaxed">{program.description}</p>

        <ul className="space-y-1.5 mt-auto">
          {program.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-white/50 text-xs">
              <span className="text-[#B6862C] flex-shrink-0 mt-0.5 text-[10px]">◆</span>
              {h}
            </li>
          ))}
        </ul>

        <motion.a
          href="tel:+971581592454"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 w-full py-3 rounded-xl text-xs font-semibold tracking-widest text-center transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)', color: '#111111', letterSpacing: '0.1em' }}
        >
          Book a Trial
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function DisciplinesContent() {
  return (
    <>
      {/* ── PAGE HERO ─────────────────────────────────────────── */}
      <section className="relative w-full h-[65vh] min-h-[500px] flex items-end overflow-hidden pt-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/26856873/pexels-photo-26856873.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85"
            alt="Classical dance at SOHAM UAE"
            fill priority sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/92" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-white/40 text-xs tracking-[0.2em] uppercase mb-6">
            <a href="/" className="hover:text-[#B6862C] transition-colors">Home</a>
            <span>/</span>
            <span className="text-[#B6862C]">Disciplines</span>
          </motion.div>

          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
            What We Teach
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading mt-3 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}>
            Our <span className="text-gradient-gold">Disciplines</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="text-white/60 mt-4 max-w-xl text-base sm:text-lg leading-relaxed">
            Ancient yogic wisdom and classical Indian dance — curated for every soul, every age, every level.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #B6862C 40%, #D4A84B 60%, transparent)' }} />
      </section>

      {/* ── OVERVIEW STRIP ────────────────────────────────────── */}
      <section className="py-14" style={{ background: '#0A0F0C' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: <YogaIcon />, title: 'Yoga Programs', count: '6 Styles', desc: 'From foundation Hatha to therapeutic and aerial — a complete yogic journey for every body.' },
              { icon: <DanceIcon />, title: 'Classical Dance', count: '5 Forms', desc: 'Bharatanatyam, Mohiniyattam, Kuchipudi, Semi-Classical and Bollywood taught by masters.' },
            ].map((item, i) => (
              <motion.div key={item.title} custom={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-start gap-5 glass rounded-2xl p-6"
                style={{ border: '1px solid rgba(182,134,44,0.15)' }}>
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading text-xl font-bold text-[#F8F6F2]" style={{ fontFamily: 'var(--font-playfair)' }}>{item.title}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(182,134,44,0.12)', border: '1px solid rgba(182,134,44,0.25)', color: '#B6862C' }}>
                      {item.count}
                    </span>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YOGA PROGRAMS ─────────────────────────────────────── */}
      <section className="section-padding" style={{ background: '#0D1F14' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <YogaIcon />
              <div>
                <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">Mind · Body · Spirit</span>
                <h2 className="font-heading mt-1" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                  Yoga <span className="text-gradient-gold">Programs</span>
                </h2>
              </div>
            </div>
            <div className="divider-gold w-24" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {yogaPrograms.map((prog, i) => <ProgramCard key={prog.title} program={prog} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── VIDEO SHOWCASE ────────────────────────────────────── */}
      <section className="section-padding" style={{ background: '#0A0F0C' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">Watch & Experience</span>
            <h2 className="font-heading mt-4 mb-4" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)' }}>
              See Our Art in <span className="text-gradient-gold">Motion</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Watch authentic classical performances and yoga flows from world-class practitioners.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div variants={FADE_UP} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <VideoCard
                id="JWhA3ldZcyY"
                title="Bharatanatyam — Shiva Shambho"
                desc="A mesmerising classical Bharatanatyam performance showcasing devotion, rhythm and grace."
                tag="Classical Dance"
              />
            </motion.div>
            <motion.div variants={FADE_UP} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <VideoCard
                id="1UNWz1HSLt4"
                title="Mohiniyattam — Kerala's Enchantress"
                desc="Experience the lyrical beauty of Mohiniyattam, Kerala's most graceful classical dance form."
                tag="Classical Dance"
              />
            </motion.div>
          </div>

          {/* Yoga video row */}
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <motion.div variants={FADE_UP} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <VideoCard
                id="yRCUfumiqhk"
                title="Power Vinyasa Yoga Flow"
                desc="Experience a dynamic yoga class — strength, breath and flow united in perfect harmony."
                tag="Yoga"
              />
            </motion.div>
            <motion.div variants={FADE_UP} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <VideoCard
                id="v7AYKMP6rOE"
                title="Yoga for Beginners"
                desc="A welcoming introduction to yoga — perfect for new students exploring the practice."
                tag="Yoga"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CLASSICAL DANCE PROGRAMS ──────────────────────────── */}
      <section className="section-padding" style={{ background: '#111111' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <DanceIcon />
              <div>
                <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">Tradition · Grace · Expression</span>
                <h2 className="font-heading mt-1" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                  Classical Dance <span className="text-gradient-gold">Programs</span>
                </h2>
              </div>
            </div>
            <div className="divider-gold w-24" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dancePrograms.map((prog, i) => <ProgramCard key={prog.title} program={prog} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── WHO CAN JOIN ──────────────────────────────────────── */}
      <section className="section-padding" style={{ background: '#0D1F14' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">For Everyone</span>
            <h2 className="font-heading mt-4 mb-4" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)' }}>
              Who Can <span className="text-gradient-gold">Join?</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">Our programs are designed to welcome students at every stage of life.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audiences.map((a, i) => (
              <motion.div key={a.label} custom={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -5 }} className="glass rounded-3xl p-6 text-center transition-all duration-300"
                style={{ border: '1px solid rgba(182,134,44,0.12)' }}>
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(182,134,44,0.18), rgba(182,134,44,0.05))' }}>
                  <Star size={22} color="#B6862C" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#F8F6F2] mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>{a.label}</h3>
                <p className="text-[#B6862C] text-xs tracking-wide mb-3">{a.range}</p>
                <p className="text-white/50 text-xs leading-relaxed">{a.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFO STRIP ────────────────────────────────────────── */}
      <section className="py-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F2016 0%, #1D3B2A 50%, #0F2016 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(182,134,44,0.07) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: Award, label: '20+ Years', sub: 'of teaching excellence' },
              { icon: Users, label: '1000+', sub: 'students guided' },
              { icon: Clock, label: '6 AM – 9 PM', sub: 'open 7 days a week' },
              { icon: Star, label: 'Free Trial', sub: 'first class on us' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={item.label} custom={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <div className="flex justify-center mb-3"><Icon size={22} color="#B6862C" /></div>
                  <div className="font-heading font-bold text-gradient-gold text-2xl" style={{ fontFamily: 'var(--font-playfair)' }}>{item.label}</div>
                  <p className="text-white/50 text-xs mt-1">{item.sub}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-padding text-center" style={{ background: '#111111' }}>
        <div className="max-w-2xl mx-auto px-6">
          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">Start Today</span>
            <h2 className="font-heading mt-4 mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Find Your Perfect<br />
              <span className="text-gradient-gold">Program</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-10">
              Not sure where to begin? Call us and our teachers will help you choose the program that fits your goals — and your first class is completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+971581592454"
                className="px-9 py-4 rounded-full text-[#111111] font-semibold text-sm transition-all duration-300 hover:scale-105 inline-block"
                style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)', letterSpacing: '0.12em' }}>
                Book Free Trial
              </a>
              <a href="/"
                className="px-9 py-4 rounded-full border border-white/30 text-white/80 font-medium text-sm transition-all duration-300 hover:bg-white/5 hover:border-[#B6862C] hover:text-[#B6862C] inline-block"
                style={{ letterSpacing: '0.12em' }}>
                Back to Home
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function YogaIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="14" fill="rgba(182,134,44,0.12)" />
      <circle cx="26" cy="16" r="5" stroke="#B6862C" strokeWidth="1.5" />
      <path d="M26 21 L26 34" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 28 L16 34 M26 28 L36 34" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 42 L26 34 L32 42" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DanceIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="14" fill="rgba(182,134,44,0.12)" />
      <circle cx="30" cy="13" r="5" stroke="#B6862C" strokeWidth="1.5" />
      <path d="M30 18 L28 30 L20 36" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 24 L15 18" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 24 L38 16" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 30 L24 42 M28 30 L34 40" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
