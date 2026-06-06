'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'

// ─── Replace this with your YouTube video ID ─────────────────────────────────
// e.g. for https://www.youtube.com/watch?v=AbCdEfGhIjK  →  VIDEO_ID = 'AbCdEfGhIjK'
const VIDEO_ID = 'YOUR_YOUTUBE_VIDEO_ID'
// ─────────────────────────────────────────────────────────────────────────────

export default function FeaturedVideo() {
  const [playing, setPlaying] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: '#0D1510' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(182,134,44,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
            Classical Arts
          </span>

          <h2
            className="font-heading mt-4 mb-4"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
            }}
          >
            The Art of{' '}
            <span className="text-gradient-gold">Bharatanatyam</span>
          </h2>

          <p className="text-white/50 max-w-xl mx-auto">
            One of India&apos;s oldest classical dance forms — a sacred language
            of rhythm, expression and devotion, taught with love at SOHAM UAE.
          </p>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ y }}
        >
          <div
            className="relative rounded-3xl overflow-hidden group"
            style={{
              border: '1px solid rgba(182,134,44,0.2)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(182,134,44,0.05)',
            }}
          >
            {/* 16:9 aspect-ratio wrapper */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>

              {/* Poster / play-button overlay — shown before user clicks play */}
              {!playing && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                  {/* Gradient poster background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(160deg, #0D2118 0%, #1D3B2A 40%, #111111 100%)',
                    }}
                  />

                  {/* Decorative mandala ring */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.svg
                      width="340"
                      height="340"
                      viewBox="0 0 340 340"
                      className="opacity-10"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    >
                      {[140, 160, 170].map((r, i) => (
                        <circle
                          key={i}
                          cx="170"
                          cy="170"
                          r={r}
                          stroke="#B6862C"
                          strokeWidth="0.8"
                          fill="none"
                          strokeDasharray={i === 1 ? '6 10' : undefined}
                        />
                      ))}
                      {MANDALA_SPOKES.map((pt, i) => (
                        <line
                          key={i}
                          x1="170"
                          y1="170"
                          x2={pt.x2}
                          y2={pt.y2}
                          stroke="#B6862C"
                          strokeWidth="0.5"
                          opacity="0.6"
                        />
                      ))}
                    </motion.svg>
                  </div>

                  {/* Dance silhouette art */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                    <BharatanatyamArt />
                  </div>

                  {/* Play button */}
                  <motion.button
                    onClick={() => setPlaying(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-20 flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #B6862C, #D4A84B)',
                      boxShadow: '0 0 0 12px rgba(182,134,44,0.12), 0 0 40px rgba(182,134,44,0.3)',
                    }}
                    aria-label="Play Bharatanatyam performance"
                  >
                    <Play size={28} fill="#111111" color="#111111" className="ml-1" />
                  </motion.button>

                  {/* Label */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative z-20 mt-5 text-white/50 text-sm tracking-widest uppercase"
                    style={{ letterSpacing: '0.2em' }}
                  >
                    Watch Performance
                  </motion.p>

                  {/* Bottom gradient fade */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0D1510] to-transparent pointer-events-none" />
                </div>
              )}

              {/* YouTube iframe — only mounted after click to avoid autoplay policy issues */}
              {playing && (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&color=white`}
                  title="Bharatanatyam Performance — SOHAM UAE"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}

              {/* Gold corner accents */}
              {[
                'top-4 left-4',
                'top-4 right-4 rotate-90',
                'bottom-4 left-4 -rotate-90',
                'bottom-4 right-4 rotate-180',
              ].map((pos, i) => (
                <div key={i} className={`absolute ${pos} opacity-40 z-20 pointer-events-none`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2 2 L2 10" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M2 2 L10 2" stroke="#B6862C" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom caption row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="divider-gold w-8" />
            <span className="text-white/40 text-sm italic" style={{ fontFamily: 'var(--font-playfair)' }}>
              Performed by students of SOHAM UAE
            </span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {['Abhinaya', 'Nritta', 'Natya', 'Mudra'].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(182,134,44,0.08)',
                  border: '1px solid rgba(182,134,44,0.2)',
                  color: 'rgba(182,134,44,0.85)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Pre-computed at module scope — prevents SSR/client floating-point hydration mismatch
const MANDALA_SPOKES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
  (angle) => ({
    x2: (170 + 170 * Math.cos((angle * Math.PI) / 180)).toFixed(4),
    y2: (170 + 170 * Math.sin((angle * Math.PI) / 180)).toFixed(4),
  })
)

function BharatanatyamArt() {
  return (
    <svg width="320" height="380" viewBox="0 0 320 380" fill="white">
      {/* Head */}
      <ellipse cx="170" cy="55" rx="28" ry="30" />
      {/* Neck */}
      <rect x="162" y="84" width="16" height="22" rx="6" />
      {/* Torso — bent slightly */}
      <path d="M155 106 Q148 140 145 175 L195 175 Q192 140 185 106 Z" />
      {/* Left arm raised — classic Bharatanatyam gesture */}
      <path d="M155 120 Q120 100 85 72 Q78 66 82 60 Q86 54 93 58 Q120 80 150 112 Z" />
      {/* Left hand — alapadma mudra hint */}
      <ellipse cx="82" cy="58" rx="10" ry="7" transform="rotate(-30 82 58)" />
      {/* Right arm — to the side */}
      <path d="M185 120 Q220 108 248 118 Q255 121 254 128 Q253 135 246 133 Q218 124 188 130 Z" />
      {/* Right hand */}
      <ellipse cx="250" cy="128" rx="10" ry="7" transform="rotate(15 250 128)" />
      {/* Legs — aramandi (half-sit) position */}
      {/* Left leg bent out */}
      <path d="M145 175 Q128 210 110 250 Q100 270 108 278 Q116 286 125 275 Q140 255 155 218 L165 175 Z" />
      {/* Right leg bent out */}
      <path d="M195 175 Q212 210 230 250 Q240 270 232 278 Q224 286 215 275 Q200 255 185 218 L175 175 Z" />
      {/* Left foot with ankle bell hint */}
      <ellipse cx="112" cy="280" rx="16" ry="8" transform="rotate(-15 112 280)" />
      <ellipse cx="112" cy="280" rx="14" ry="5" transform="rotate(-15 112 280)" fill="rgba(182,134,44,0.4)" />
      {/* Right foot */}
      <ellipse cx="228" cy="280" rx="16" ry="8" transform="rotate(15 228 280)" />
      <ellipse cx="228" cy="280" rx="14" ry="5" transform="rotate(15 228 280)" fill="rgba(182,134,44,0.4)" />
      {/* Crown / mukut decoration */}
      <path d="M142 30 Q155 8 170 4 Q185 8 198 30" stroke="#B6862C" strokeWidth="2" fill="none" />
      <circle cx="170" cy="4" r="4" fill="#B6862C" />
      <circle cx="152" cy="24" r="2.5" fill="#B6862C" />
      <circle cx="188" cy="24" r="2.5" fill="#B6862C" />
    </svg>
  )
}
