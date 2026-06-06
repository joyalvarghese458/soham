'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'

const footerLinks = {
  classes: [
    'Hatha Yoga',
    'Ashtanga Yoga',
    'Aerial Yoga',
    'Prenatal Yoga',
    'Therapeutic Yoga',
    'Meditation',
  ],
  dance: [
    'Bharatanatyam',
    'Mohiniyattam',
    'Kuchipudi',
    'Semi Classical',
    'Bollywood',
  ],
  quick: [
    { label: 'About Soham', href: '/about' },
    { label: 'Our Founders', href: '#founders' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Student Reviews', href: '#testimonials' },
    { label: 'Book a Trial', href: 'tel:+971581592454' },
    { label: 'Contact', href: '/contact' },
  ],
}

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', letter: 'IG' },
  { label: 'Facebook', href: 'https://facebook.com', letter: 'FB' },
  { label: 'YouTube', href: 'https://youtube.com', letter: 'YT' },
  { label: 'X / Twitter', href: 'https://twitter.com', letter: 'X' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(182,134,44,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top divider */}
        <div className="divider-gold opacity-20 mb-0" />

        {/* Main footer content */}
        <div className="py-12 lg:py-16">

          {/* Brand — centered on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center lg:hidden mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <FooterLotus />
              <div>
                <span className="text-2xl font-bold tracking-wide" style={{ color: '#B6862C', fontFamily: 'var(--font-playfair)' }}>SOHAM</span>
                <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase -mt-1">UAE</p>
              </div>
            </div>
            <p className="text-white/45 text-sm leading-relaxed mb-5 max-w-[280px]">
              Dubai&apos;s premier Yoga & Classical Dance Academy — where ancient wisdom meets modern wellness.
            </p>
            <div className="flex flex-col items-center gap-2 mb-5">
              <a href="tel:+971581592454" className="flex items-center gap-2 text-white/50 hover:text-[#B6862C] transition-colors text-sm">
                <Phone size={13} className="text-[#B6862C]" />+971 58 159 2454
              </a>
              <a href="mailto:info@sohamuae.com" className="flex items-center gap-2 text-white/50 hover:text-[#B6862C] transition-colors text-sm">
                <Mail size={13} className="text-[#B6862C]" />info@sohamuae.com
              </a>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin size={13} className="text-[#B6862C]" />
                <span>M03 Wasl Village Mall, Muhaisnah, Dubai</span>
              </div>
            </div>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-[#B6862C] transition-all duration-300 text-[10px] font-bold"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {social.letter}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Mobile: thin gold divider */}
          <div className="lg:hidden divider-gold opacity-20 mb-10" />

          {/* Desktop: 4-col grid | Mobile: structured sections */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-12">
            {/* Brand — desktop only */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-5">
                <FooterLotus />
                <div>
                  <span className="text-2xl font-bold tracking-wide" style={{ color: '#B6862C', fontFamily: 'var(--font-playfair)' }}>SOHAM</span>
                  <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase -mt-1">UAE</p>
                </div>
              </div>
              <p className="text-white/45 text-sm leading-relaxed mb-6">Dubai&apos;s premier Yoga & Classical Dance Academy. Where ancient wisdom meets modern wellness, and every student finds their inner light.</p>
              <div className="space-y-3">
                <a href="tel:+971581592454" className="flex items-center gap-3 text-white/50 hover:text-[#B6862C] transition-colors text-sm">
                  <Phone size={14} className="text-[#B6862C] flex-shrink-0" />+971 58 159 2454
                </a>
                <a href="mailto:info@sohamuae.com" className="flex items-center gap-3 text-white/50 hover:text-[#B6862C] transition-colors text-sm">
                  <Mail size={14} className="text-[#B6862C] flex-shrink-0" />info@sohamuae.com
                </a>
                <div className="flex items-start gap-3 text-white/50 text-sm">
                  <MapPin size={14} className="text-[#B6862C] flex-shrink-0 mt-0.5" />
                  <span>M03 Wasl Village Mall<br />Muhaisnah, Dubai UAE</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                {socials.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-[#B6862C] transition-all duration-300 text-[10px] font-bold"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {social.letter}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Yoga Classes */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h4 className="text-white font-medium mb-5 text-xs uppercase" style={{ letterSpacing: '0.2em' }}>Yoga Classes</h4>
              <ul className="space-y-3">
                {footerLinks.classes.map((item) => (
                  <li key={item}><a href="/disciplines" className="text-white/45 hover:text-[#B6862C] transition-colors text-sm">{item}</a></li>
                ))}
              </ul>
            </motion.div>

            {/* Dance Programs */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h4 className="text-white font-medium mb-5 text-xs uppercase" style={{ letterSpacing: '0.2em' }}>Dance Programs</h4>
              <ul className="space-y-3">
                {footerLinks.dance.map((item) => (
                  <li key={item}><a href="/disciplines" className="text-white/45 hover:text-[#B6862C] transition-colors text-sm">{item}</a></li>
                ))}
              </ul>
              <div className="mt-8">
                <h4 className="text-white font-medium mb-4 text-xs uppercase" style={{ letterSpacing: '0.2em' }}>Studio Hours</h4>
                <p className="text-white/45 text-sm">Open 7 Days a Week</p>
                <p className="text-[#B6862C] text-sm">6:00 AM – 9:00 PM</p>
              </div>
            </motion.div>

            {/* Quick Links + Newsletter */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h4 className="text-white font-medium mb-5 text-xs uppercase" style={{ letterSpacing: '0.2em' }}>Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.quick.map((item) => (
                  <li key={item.label}><a href={item.href} className="text-white/45 hover:text-[#B6862C] transition-colors text-sm">{item.label}</a></li>
                ))}
              </ul>
              <div className="mt-8">
                <h4 className="text-white font-medium mb-4 text-xs uppercase" style={{ letterSpacing: '0.2em' }}>Newsletter</h4>
                <p className="text-white/40 text-xs mb-3">Get wellness tips & event updates</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#B6862C]/50 transition-colors min-w-0" />
                  <button className="px-4 py-2 rounded-lg text-xs font-medium text-[#111] flex-shrink-0 transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)' }}>Join</button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile: links grid */}
          <div className="lg:hidden space-y-8">

            {/* Row 1: Yoga + Dance side by side */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h4 className="text-white font-medium mb-4 text-xs uppercase text-center" style={{ letterSpacing: '0.2em' }}>Yoga Classes</h4>
                <ul className="space-y-2.5 text-center">
                  {footerLinks.classes.map((item) => (
                    <li key={item}><a href="/disciplines" className="text-white/45 hover:text-[#B6862C] transition-colors text-xs">{item}</a></li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h4 className="text-white font-medium mb-4 text-xs uppercase text-center" style={{ letterSpacing: '0.2em' }}>Dance Programs</h4>
                <ul className="space-y-2.5 text-center">
                  {footerLinks.dance.map((item) => (
                    <li key={item}><a href="/disciplines" className="text-white/45 hover:text-[#B6862C] transition-colors text-xs">{item}</a></li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Thin divider */}
            <div className="divider-gold opacity-10" />

            {/* Row 2: Studio Hours + Quick Links side by side */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                <h4 className="text-white font-medium mb-4 text-xs uppercase" style={{ letterSpacing: '0.2em' }}>Studio Hours</h4>
                <p className="text-white/45 text-xs">Open 7 Days a Week</p>
                <p className="text-[#B6862C] text-xs mt-1">6:00 AM – 9:00 PM</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center">
                <h4 className="text-white font-medium mb-4 text-xs uppercase" style={{ letterSpacing: '0.2em' }}>Quick Links</h4>
                <ul className="space-y-2.5">
                  {footerLinks.quick.slice(0, 4).map((item) => (
                    <li key={item.label}><a href={item.href} className="text-white/45 hover:text-[#B6862C] transition-colors text-xs">{item.label}</a></li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Thin divider */}
            <div className="divider-gold opacity-10" />

            {/* Newsletter — full width, centered */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <h4 className="text-white font-medium mb-2 text-xs uppercase" style={{ letterSpacing: '0.2em' }}>Newsletter</h4>
              <p className="text-white/40 text-xs mb-4">Get wellness tips & event updates</p>
              <div className="flex gap-2 max-w-xs mx-auto">
                <input type="email" placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#B6862C]/50 transition-colors min-w-0" />
                <button className="px-4 py-2.5 rounded-lg text-xs font-medium text-[#111] flex-shrink-0 transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)' }}>Join</button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-white/30 text-xs">
            © {year} SOHAM UAE. All rights reserved. Dubai&apos;s Premier Yoga & Dance Academy.
          </p>
          <div className="flex items-center gap-4 text-white/25 text-xs">
            <a href="#" className="hover:text-white/50 transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white/50 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLotus() {
  return (
    <svg width="30" height="30" viewBox="0 0 60 60" fill="none">
      <ellipse cx="30" cy="38" rx="18" ry="10" fill="rgba(182,134,44,0.1)" />
      <path d="M30 36 C30 20 18 14 10 18 C16 22 22 28 30 36Z" fill="#B6862C" opacity="0.8" />
      <path d="M30 36 C30 20 42 14 50 18 C44 22 38 28 30 36Z" fill="#B6862C" opacity="0.8" />
      <path d="M30 36 C22 30 14 32 12 40 C18 38 24 36 30 36Z" fill="#D4A84B" opacity="0.7" />
      <path d="M30 36 C38 30 46 32 48 40 C42 38 36 36 30 36Z" fill="#D4A84B" opacity="0.7" />
      <path d="M30 36 C30 16 26 10 30 8 C34 10 30 16 30 36Z" fill="#D4A84B" />
      <circle cx="30" cy="37" r="3.5" fill="#B6862C" />
    </svg>
  )
}
