'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Users, BookOpen, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 20, suffix: '+', label: 'Years Experience', icon: Award },
  { value: 1000, suffix: '+', label: 'Students Guided', icon: Users },
  { value: 13, suffix: '+', label: 'Programs', icon: BookOpen },
  { value: 7, suffix: '', label: 'Days Open', icon: Clock },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), value)
      setCount(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function WhySoham() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: '#0D1F14' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5"
        style={{
          background: 'radial-gradient(ellipse at right, #B6862C 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Image composition */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
              <div
                ref={imageRef}
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, #1D3B2A 0%, #2D5A3F 40%, #1A3226 70%, #0F2016 100%)',
                }}
              >
                {/* Abstract yoga/dance art */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <AbstractWellnessArt />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 glass-gold rounded-2xl p-5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #B6862C, #D4A84B)',
                    }}
                  >
                    <Award size={22} color="#111" />
                  </div>
                  <div>
                    <p
                      className="font-heading text-lg font-bold text-[#B6862C]"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      Award-Winning Academy
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                      Recognized as Dubai&apos;s Premier Wellness Studio
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="absolute -top-6 -right-6 glass rounded-2xl p-5 text-center hidden lg:block"
              style={{ border: '1px solid rgba(182,134,44,0.2)' }}
            >
              <div
                className="font-heading text-4xl font-bold text-gradient-gold"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                20+
              </div>
              <div className="text-white/50 text-xs mt-1 tracking-wide">
                Years of<br />Excellence
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span
                className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium"
              >
                Our Story
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-heading mb-6 leading-tight"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
              }}
            >
              Where Ancient Wisdom
              <br />
              <span className="text-gradient-gold">Meets Modern Wellness</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="divider-gold w-20 mb-8" />

            <motion.p
              variants={itemVariants}
              className="text-white/60 leading-relaxed mb-6"
              style={{ fontSize: '1.05rem' }}
            >
              SOHAM UAE is more than a studio — it&apos;s a sanctuary where
              tradition breathes through every movement. Founded on the principles
              of authentic Indian art forms, we bring together certified masters of
              Yoga and Classical Dance to guide students of all ages and abilities.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-white/50 leading-relaxed mb-10"
            >
              Nestled in the heart of Dubai&apos;s vibrant Muhaisnah district, our
              state-of-the-art studio is designed to inspire transformation — from
              your very first class to lifelong mastery.
            </motion.p>

            {/* Stats grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="glass rounded-2xl p-5 group hover:border-[#B6862C]/30 transition-all duration-300"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: 'linear-gradient(135deg, rgba(182,134,44,0.2), rgba(182,134,44,0.05))',
                        }}
                      >
                        <Icon size={16} color="#B6862C" />
                      </div>
                    </div>
                    <div
                      className="font-heading text-3xl font-bold text-gradient-gold"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-white/50 text-sm mt-1">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AbstractWellnessArt() {
  return (
    <svg width="340" height="420" viewBox="0 0 340 420" fill="none" opacity="0.6">
      {/* Mandala-like design */}
      <circle cx="170" cy="210" r="150" stroke="rgba(182,134,44,0.15)" strokeWidth="1" />
      <circle cx="170" cy="210" r="120" stroke="rgba(182,134,44,0.1)" strokeWidth="0.5" />
      <circle cx="170" cy="210" r="90" stroke="rgba(182,134,44,0.08)" strokeWidth="0.5" />

      {/* Yoga pose lines */}
      <path d="M170 80 C170 80 130 130 90 160 C120 175 150 165 170 150 C190 165 220 175 250 160 C210 130 170 80 170 80Z" fill="rgba(182,134,44,0.2)" />
      <path d="M170 150 L170 260" stroke="rgba(182,134,44,0.4)" strokeWidth="2" />
      <path d="M170 200 L100 240 M170 200 L240 240" stroke="rgba(182,134,44,0.3)" strokeWidth="1.5" />
      <path d="M170 260 L140 320 M170 260 L200 320" stroke="rgba(182,134,44,0.3)" strokeWidth="1.5" />

      {/* Lotus petals at center */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx={170 + Math.cos((angle * Math.PI) / 180) * 40}
          cy={210 + Math.sin((angle * Math.PI) / 180) * 40}
          rx="12"
          ry="28"
          fill="rgba(182,134,44,0.15)"
          transform={`rotate(${angle + 90} ${170 + Math.cos((angle * Math.PI) / 180) * 40} ${210 + Math.sin((angle * Math.PI) / 180) * 40})`}
        />
      ))}
      <circle cx="170" cy="210" r="20" fill="rgba(182,134,44,0.25)" />
      <circle cx="170" cy="210" r="8" fill="rgba(182,134,44,0.5)" />
    </svg>
  )
}
