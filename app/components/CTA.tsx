'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      life: number
      maxLife: number
    }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const createParticle = () => {
      const x = Math.random() * canvas.width
      const y = canvas.height + 10
      particles.push({
        x,
        y,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -(Math.random() * 1.5 + 0.5),
        opacity: Math.random() * 0.6 + 0.2,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (Math.random() < 0.3) createParticle()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY
        p.life++

        const lifeRatio = p.life / p.maxLife
        const currentOpacity = p.opacity * (1 - lifeRatio)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(182, 134, 44, ${currentOpacity})`
        ctx.fill()

        if (p.life >= p.maxLife || p.y < 0) {
          particles.splice(i, 1)
        }
      }

      animId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '70vh' }}
    >
      {/* Animated cinematic background */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, #0F2016 0%, #1D3B2A 30%, #1A3225 60%, #0F1A12 100%)
            `,
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute"
          style={{
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(182,134,44,0.08) 0%, transparent 70%)',
            top: '10%',
            left: '-10%',
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute"
          style={{
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(29,59,42,0.3) 0%, transparent 70%)',
            bottom: '0%',
            right: '-5%',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Particles */}
        <ParticleField />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 lg:py-36 max-w-4xl mx-auto">
        {/* Lotus decoration */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <Sparkles size={32} color="#B6862C" className="mx-auto opacity-70" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium mb-6 block"
        >
          Your Journey Begins Here
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading mb-6 leading-tight"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          }}
        >
          Begin Your{' '}
          <span className="text-gradient-gold">Transformation</span>
          <br />
          Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ fontSize: '1.05rem' }}
        >
          Join a community where wellness, movement and tradition come together.
          Your first class is on us — come discover what SOHAM can unlock in you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.a
            href="tel:+971581592454"
            whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(182,134,44,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-10 py-4 rounded-full text-[#111] font-semibold text-sm transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #B6862C, #D4A84B, #B6862C)',
              backgroundSize: '200% auto',
              letterSpacing: '0.12em',
            }}
          >
            Book Free Trial
            <ArrowRight size={16} />
          </motion.a>

          <motion.a
            href="mailto:info@sohamuae.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-10 py-4 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-medium transition-all duration-300"
            style={{ letterSpacing: '0.1em' }}
          >
            Contact Us
          </motion.a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-12 text-white/35 text-xs"
        >
          {[
            'No commitment required',
            'All levels welcome',
            'Expert certified instructors',
            'Premium studio facilities',
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span
                className="w-1 h-1 rounded-full inline-block"
                style={{ background: '#B6862C' }}
              />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
