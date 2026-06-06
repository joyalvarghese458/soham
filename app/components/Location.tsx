'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Navigation2, ExternalLink } from 'lucide-react'

const contactDetails = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'M03 Wasl Village Mall',
    sub: 'Muhaisnah, Dubai UAE',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+971 58 159 2454',
    sub: 'Available 7 days a week',
    href: 'tel:+971581592454',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@sohamuae.com',
    sub: 'We respond within 24 hours',
    href: 'mailto:info@sohamuae.com',
  },
  {
    icon: Clock,
    label: 'Studio Hours',
    value: 'Open 7 Days',
    sub: '6:00 AM – 9:00 PM',
  },
]

const landmarks = [
  'Wasl Village Mall',
  'Muhaisnah Area',
  'Near Al Qusais',
  'Easy Metro Access',
]

export default function Location() {
  return (
    <section
      id="location"
      className="section-padding relative overflow-hidden"
      style={{ background: '#111111' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 0% 50%, rgba(29,59,42,0.4) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, rgba(182,134,44,0.06) 0%, transparent 50%)',
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
            Find Us
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
            Visit Our <span className="text-gradient-gold">Studio</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            Conveniently located in the heart of Dubai. Come visit us and take
            your first step toward transformation.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Map — takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 relative rounded-3xl overflow-hidden"
            style={{ minHeight: '420px' }}
          >
            {/* Google Maps embed */}
            <iframe
              src="https://maps.google.com/maps?q=Wasl+Village+Mall,+Muhaisnah,+Dubai,+UAE&hl=en&z=16&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'invert(88%) hue-rotate(180deg) saturate(0.5) brightness(0.95)',
                minHeight: '420px',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SOHAM UAE Studio Location — Wasl Village Mall, Muhaisnah, Dubai"
            />

            {/* Map overlay badge */}
            <div className="absolute top-4 left-4">
              <div
                className="glass-dark rounded-xl px-4 py-3 flex items-center gap-2"
                style={{ border: '1px solid rgba(182,134,44,0.2)' }}
              >
                <MapPin size={16} color="#B6862C" />
                <span className="text-white text-sm font-medium">
                  SOHAM UAE
                </span>
              </div>
            </div>

            {/* Get directions button */}
            <a
              href="https://maps.google.com/maps?q=Wasl+Village+Mall+Muhaisnah+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#111] transition-all"
                style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)' }}
              >
                <Navigation2 size={14} />
                Get Directions
                <ExternalLink size={12} />
              </motion.button>
            </a>
          </motion.div>

          {/* Contact info — takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Contact cards */}
            {contactDetails.map((detail, i) => {
              const Icon = detail.icon
              const Wrapper = detail.href ? 'a' : 'div'
              const wrapperProps = detail.href
                ? { href: detail.href }
                : {}

              return (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    className={`flex items-start gap-4 p-5 rounded-2xl group transition-all duration-300 ${
                      detail.href ? 'cursor-pointer hover:border-[#B6862C]/30' : ''
                    }`}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(182,134,44,0.2), rgba(182,134,44,0.05))',
                      }}
                    >
                      <Icon size={18} color="#B6862C" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs tracking-wide mb-0.5">
                        {detail.label}
                      </p>
                      <p className="text-white font-medium text-sm">
                        {detail.value}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">{detail.sub}</p>
                    </div>
                  </Wrapper>
                </motion.div>
              )
            })}

            {/* Nearby landmarks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="p-5 rounded-2xl mt-2"
              style={{
                background: 'rgba(182,134,44,0.05)',
                border: '1px solid rgba(182,134,44,0.15)',
              }}
            >
              <p className="text-[#B6862C] text-xs tracking-[0.2em] uppercase mb-3">
                Nearby Landmarks
              </p>
              <div className="grid grid-cols-2 gap-2">
                {landmarks.map((lm) => (
                  <div key={lm} className="flex items-center gap-2">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: '#B6862C' }}
                    />
                    <span className="text-white/60 text-xs">{lm}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="tel:+971581592454"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl text-[#111] font-semibold tracking-widest text-sm transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #B6862C, #D4A84B)',
                  letterSpacing: '0.1em',
                }}
              >
                Call & Book Now
              </motion.button>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
