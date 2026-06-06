'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Yoga Student, 2 years',
    rating: 5,
    text: "SOHAM has completely transformed my life. Rakhi's guidance in therapeutic yoga helped me recover from chronic back pain that plagued me for years. The ambience, the teaching, the care — it's unmatched anywhere in Dubai.",
    initials: 'PS',
    color: '#1D3B2A',
  },
  {
    name: 'Aisha Al Rashidi',
    role: 'Bharatanatyam Student, 3 years',
    rating: 5,
    text: "Radhika Ma'am is a true artist and a masterful teacher. My daughter started at age 6 and now performs on stage with such confidence and grace. The way they preserve the classical tradition while making it accessible is remarkable.",
    initials: 'AA',
    color: '#2D1A04',
  },
  {
    name: 'Meera Krishnan',
    role: 'Aerial Yoga Student',
    rating: 5,
    text: "I was terrified of heights but the team at SOHAM made me feel completely safe. Within weeks I was doing aerial yoga poses I thought were impossible. The instructors are incredibly patient, skilled, and encouraging.",
    initials: 'MK',
    color: '#1D3B2A',
  },
  {
    name: 'Fatima Hassan',
    role: 'Prenatal Yoga Student',
    rating: 5,
    text: 'During my pregnancy, SOHAM was my sanctuary. The prenatal yoga classes were gentle, expertly guided, and gave me so much peace of mind. I felt supported every step of the way. I&apos;ve now joined with my baby for postnatal classes!',
    initials: 'FH',
    color: '#2D1A04',
  },
  {
    name: 'Rajan Pillai',
    role: 'Meditation & Hatha Yoga',
    rating: 5,
    text: "As a high-stress professional, I came to SOHAM looking for stress relief. What I found was a complete lifestyle transformation. The meditation sessions alone have made me a better leader, a better father, and a happier human being.",
    initials: 'RP',
    color: '#1D3B2A',
  },
  {
    name: 'Deepa Nair',
    role: 'Mohiniyattam Student, 1 year',
    rating: 5,
    text: "I always wanted to learn classical dance but felt it was too late at 35. SOHAM proved me completely wrong. Radhika Ma'am's classes are so welcoming and beautiful. I'm performing at my first recital next month — I still can't believe it!",
    initials: 'DN',
    color: '#2D1A04',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? '#B6862C' : 'transparent'}
          color={i < rating ? '#B6862C' : 'rgba(255,255,255,0.2)'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#0D1F14' }}
    >
      {/* BG decoration */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 0%, rgba(182,134,44,0.3) 0%, transparent 60%)',
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
            Student Stories
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
            What Our <span className="text-gradient-gold">Students Say</span>
          </motion.h2>
        </div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div
                  className="relative rounded-2xl p-7 h-full group hover-lift"
                  style={{
                    background: `linear-gradient(160deg, ${t.color} 0%, #111111 100%)`,
                    border: '1px solid rgba(182,134,44,0.12)',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 opacity-15">
                    <Quote size={40} color="#B6862C" />
                  </div>

                  {/* Stars */}
                  <StarRating rating={t.rating} />

                  {/* Text */}
                  <p className="text-white/65 leading-relaxed mt-4 mb-6 text-sm flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(182,134,44,0.3), rgba(182,134,44,0.1))',
                        border: '1px solid rgba(182,134,44,0.3)',
                        color: '#B6862C',
                        fontFamily: 'var(--font-playfair)',
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{t.name}</p>
                      <p className="text-white/40 text-xs">{t.role}</p>
                    </div>
                  </div>

                  {/* Hover border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-400"
                    style={{ border: '1px solid rgba(182,134,44,0.3)' }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          <div>
            <div
              className="font-heading text-3xl font-bold text-gradient-gold"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              4.9/5
            </div>
            <div className="text-white/40 text-xs mt-1">Average Rating</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <div
              className="font-heading text-3xl font-bold text-gradient-gold"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              500+
            </div>
            <div className="text-white/40 text-xs mt-1">5-Star Reviews</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <div
              className="font-heading text-3xl font-bold text-gradient-gold"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              98%
            </div>
            <div className="text-white/40 text-xs mt-1">Student Retention</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
