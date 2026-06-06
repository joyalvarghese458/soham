'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Phone, Mail, Clock,
  Navigation2, ExternalLink,
  ChevronDown, Send, MessageCircle,
} from 'lucide-react'

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

const QUICK_METHODS = [
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    value: '+971 58 159 2454',
    desc: 'Fastest way to reach us',
    href: "https://wa.me/971581592454?text=Hi%20SOHAM%20UAE%2C%20I'd%20like%20to%20book%20a%20free%20trial%20class.",
    external: true,
    iconColor: '#25D366',
    iconBg: 'rgba(37,211,102,0.12)',
  },
  {
    Icon: Phone,
    label: 'Call Us',
    value: '+971 58 159 2454',
    desc: 'Mon – Sun, 6 AM – 9 PM',
    href: 'tel:+971581592454',
    external: false,
    iconColor: '#B6862C',
    iconBg: 'rgba(182,134,44,0.12)',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'info@sohamuae.com',
    desc: 'Reply within 24 hours',
    href: 'mailto:info@sohamuae.com',
    external: false,
    iconColor: '#B6862C',
    iconBg: 'rgba(182,134,44,0.12)',
  },
  {
    Icon: MapPin,
    label: 'Visit Studio',
    value: 'M03 Wasl Village Mall',
    desc: 'Muhaisnah, Dubai UAE',
    href: 'https://maps.google.com/maps?q=Wasl+Village+Mall+Muhaisnah+Dubai',
    external: true,
    iconColor: '#B6862C',
    iconBg: 'rgba(182,134,44,0.12)',
  },
]

const INFO_CARDS = [
  { Icon: MapPin,  label: 'Address', value: 'M03 Wasl Village Mall', sub: 'Muhaisnah, Dubai UAE',      href: null },
  { Icon: Clock,   label: 'Hours',   value: 'Open 7 Days a Week',    sub: '6:00 AM – 9:00 PM',          href: null },
  { Icon: Phone,   label: 'Phone',   value: '+971 58 159 2454',       sub: 'Call or WhatsApp',           href: 'tel:+971581592454' },
  { Icon: Mail,    label: 'Email',   value: 'info@sohamuae.com',      sub: 'We reply within 24 hours',   href: 'mailto:info@sohamuae.com' },
]

const FAQ_ITEMS = [
  {
    q: 'How do I book a free trial class?',
    a: 'Call or WhatsApp us at +971 58 159 2454, or fill in the contact form on this page. Our team will schedule your first class at a time that suits you — no commitment required.',
  },
  {
    q: 'Are the classes suitable for complete beginners?',
    a: 'Absolutely. Every program has beginner batches taught with patience and individual attention. We welcome students with zero prior experience in both yoga and classical dance.',
  },
  {
    q: 'What age groups do you teach?',
    a: 'We teach students from age 5 to 60+, with dedicated batches for children (5–12), teens (13–17), adults (18–60) and seniors (60+), each thoughtfully designed for that stage of life.',
  },
  {
    q: 'What should I bring to my first class?',
    a: 'For yoga, wear comfortable stretch clothing and bring a water bottle — mats are provided for trial classes. For dance, wear comfortable clothes you can move freely in. Classical dance is practised barefoot.',
  },
  {
    q: 'Do you offer private or one-on-one lessons?',
    a: 'Yes. Private and semi-private sessions are available for both yoga and classical dance — ideal for focused progress, exam preparation or performance coaching. Contact us to discuss availability.',
  },
  {
    q: 'What are your studio timings?',
    a: 'We are open 7 days a week, 6:00 AM to 9:00 PM. Batch schedules vary by program. After your trial class, we share the full timetable and help you pick the batch that fits your routine.',
  },
]

const INTEREST_OPTIONS = ['Yoga Classes', 'Classical Dance', 'Both Yoga & Dance', 'Just Exploring']

// ── Input style helpers ───────────────────────────────────────────
const INPUT_BASE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
}
const INPUT_FOCUS: React.CSSProperties = {
  background: 'rgba(182,134,44,0.04)',
  border: '1px solid rgba(182,134,44,0.45)',
}

// ── FAQ Accordion Item ────────────────────────────────────────────
function FAQItem({ item, index }: { item: (typeof FAQ_ITEMS)[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      custom={index % 3}
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className="font-heading font-semibold text-white/85 text-[15px] leading-snug"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28 }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
          style={{ background: open ? 'linear-gradient(135deg, #B6862C, #D4A84B)' : 'rgba(255,255,255,0.06)' }}
        >
          <ChevronDown size={15} color={open ? '#111' : 'rgba(255,255,255,0.55)'} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="px-6 pt-3 pb-5 text-white/50 text-sm leading-relaxed"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Contact Form ──────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const applyFocus = (el: HTMLElement) => Object.assign(el.style, INPUT_FOCUS)
  const applyBlur  = (el: HTMLElement) => Object.assign(el.style, INPUT_BASE)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sub  = encodeURIComponent(`Class Inquiry — ${form.interest || 'General'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || '—'}\nInterested In: ${form.interest || '—'}\n\nMessage:\n${form.message}`
    )
    window.open(`mailto:info@sohamuae.com?subject=${sub}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 6000)
  }

  const sharedClass =
    'w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-colors duration-200'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-white/40 text-[10px] tracking-[0.18em] uppercase mb-2">
            Full Name <span className="text-[#B6862C]">*</span>
          </label>
          <input
            type="text" value={form.name} onChange={set('name')}
            placeholder="Priya Nair" required
            className={sharedClass} style={{ ...INPUT_BASE }}
            onFocus={e => applyFocus(e.currentTarget)}
            onBlur={e => applyBlur(e.currentTarget)}
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-white/40 text-[10px] tracking-[0.18em] uppercase mb-2">
            Email Address <span className="text-[#B6862C]">*</span>
          </label>
          <input
            type="email" value={form.email} onChange={set('email')}
            placeholder="priya@example.com" required
            className={sharedClass} style={{ ...INPUT_BASE }}
            onFocus={e => applyFocus(e.currentTarget)}
            onBlur={e => applyBlur(e.currentTarget)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Phone */}
        <div>
          <label className="block text-white/40 text-[10px] tracking-[0.18em] uppercase mb-2">
            Phone Number
          </label>
          <input
            type="tel" value={form.phone} onChange={set('phone')}
            placeholder="+971 5X XXX XXXX"
            className={sharedClass} style={{ ...INPUT_BASE }}
            onFocus={e => applyFocus(e.currentTarget)}
            onBlur={e => applyBlur(e.currentTarget)}
          />
        </div>
        {/* Interest */}
        <div>
          <label className="block text-white/40 text-[10px] tracking-[0.18em] uppercase mb-2">
            Interested In <span className="text-[#B6862C]">*</span>
          </label>
          <select
            value={form.interest} onChange={set('interest')} required
            className={sharedClass + ' cursor-pointer appearance-none'}
            style={{ ...INPUT_BASE, color: form.interest ? '#F8F6F2' : 'rgba(255,255,255,0.28)' }}
            onFocus={e => {
              Object.assign(e.currentTarget.style, INPUT_FOCUS)
              e.currentTarget.style.color = form.interest ? '#F8F6F2' : 'rgba(255,255,255,0.28)'
            }}
            onBlur={e => {
              Object.assign(e.currentTarget.style, INPUT_BASE)
              e.currentTarget.style.color = form.interest ? '#F8F6F2' : 'rgba(255,255,255,0.28)'
            }}
          >
            <option value="" disabled style={{ background: '#111', color: 'rgba(255,255,255,0.4)' }}>
              Select a class...
            </option>
            {INTEREST_OPTIONS.map(opt => (
              <option key={opt} value={opt} style={{ background: '#111', color: '#F8F6F2' }}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-white/40 text-[10px] tracking-[0.18em] uppercase mb-2">
          Your Message <span className="text-[#B6862C]">*</span>
        </label>
        <textarea
          value={form.message} onChange={set('message')}
          placeholder="Tell us about your goals, experience level, or any questions you have..."
          required rows={5}
          className={sharedClass + ' resize-none'}
          style={{ ...INPUT_BASE }}
          onFocus={e => applyFocus(e.currentTarget)}
          onBlur={e => applyBlur(e.currentTarget)}
        />
      </div>

      {/* Submit */}
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="py-4 px-5 rounded-xl text-center text-sm font-medium"
            style={{ background: 'rgba(182,134,44,0.1)', border: '1px solid rgba(182,134,44,0.3)', color: '#D4A84B' }}
          >
            ✓ Your email client opened — thank you for reaching out!
          </motion.div>
        ) : (
          <motion.button
            key="btn"
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl text-[#111111] font-semibold text-sm flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)', letterSpacing: '0.08em' }}
          >
            <Send size={15} />
            Send Message
          </motion.button>
        )}
      </AnimatePresence>

      <p className="text-white/25 text-xs text-center">
        For a faster reply, WhatsApp us directly — most messages answered within the hour.
      </p>
    </form>
  )
}

// ── Main ──────────────────────────────────────────────────────────
export default function ContactContent() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative w-full h-[60vh] min-h-[460px] flex items-end overflow-hidden pt-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/30424952/pexels-photo-30424952.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85"
            alt="Contact SOHAM UAE"
            fill priority sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/92" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-white/40 text-xs tracking-[0.2em] uppercase mb-6"
          >
            <a href="/" className="hover:text-[#B6862C] transition-colors">Home</a>
            <span>/</span>
            <span className="text-[#B6862C]">Contact</span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium"
          >
            Get in Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading mt-3 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}
          >
            Let&apos;s Begin Your <span className="text-gradient-gold">Journey</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="text-white/55 mt-4 max-w-lg text-base sm:text-lg leading-relaxed"
          >
            Your first class is completely free. Reach out and take the first step towards yoga, dance and wellness.
          </motion.p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #B6862C 40%, #D4A84B 60%, transparent)' }}
        />
      </section>

      {/* ── QUICK CONTACT METHODS ─────────────────────────────── */}
      <section className="py-12" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_METHODS.map((m, i) => (
              <motion.a
                key={m.label}
                href={m.href}
                target={m.external ? '_blank' : undefined}
                rel={m.external ? 'noopener noreferrer' : undefined}
                custom={i}
                variants={FADE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center gap-3 p-5 sm:p-6 rounded-2xl transition-all duration-300 group"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: m.iconBg }}
                >
                  <m.Icon size={20} color={m.iconColor} />
                </div>
                <div>
                  <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase mb-1">{m.label}</p>
                  <p className="text-white text-sm font-medium leading-snug">{m.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{m.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + MAP ────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: '#0D1F14' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">

            {/* ── Left: Form ── */}
            <motion.div
              custom={0} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
                Send a Message
              </span>
              <h2
                className="font-heading mt-3 mb-2"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.9rem, 3vw, 2.8rem)' }}
              >
                Book Your <span className="text-gradient-gold">Free Trial</span>
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-8">
                Fill in the form and we&apos;ll schedule your complimentary first class within 24 hours.
              </p>
              <ContactForm />
            </motion.div>

            {/* ── Right: Map + Info ── */}
            <motion.div
              custom={1} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              {/* Map */}
              <div
                className="relative rounded-3xl overflow-hidden flex-shrink-0"
                style={{ height: 300, border: '1px solid rgba(182,134,44,0.15)' }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=Wasl+Village+Mall,+Muhaisnah,+Dubai,+UAE&hl=en&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'invert(88%) hue-rotate(180deg) saturate(0.5) brightness(0.95)',
                    display: 'block',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SOHAM UAE Studio — Wasl Village Mall, Muhaisnah, Dubai"
                />
                <div className="absolute top-3 left-3">
                  <div
                    className="glass-dark rounded-xl px-3 py-2 flex items-center gap-2"
                    style={{ border: '1px solid rgba(182,134,44,0.2)' }}
                  >
                    <MapPin size={13} color="#B6862C" />
                    <span className="text-white text-xs font-medium">SOHAM UAE</span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/maps?q=Wasl+Village+Mall+Muhaisnah+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[#111] cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)' }}
                  >
                    <Navigation2 size={12} />
                    Get Directions
                    <ExternalLink size={10} />
                  </motion.div>
                </a>
              </div>

              {/* Info cards */}
              <div className="grid sm:grid-cols-2 gap-3">
                {INFO_CARDS.map(({ Icon, label, value, sub, href }) => {
                  const cardCls = 'flex items-start gap-3 p-4 rounded-2xl transition-all duration-300 group'
                  const cardStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }
                  const inner = (
                    <>
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: 'linear-gradient(135deg, rgba(182,134,44,0.2), rgba(182,134,44,0.05))' }}
                      >
                        <Icon size={15} color="#B6862C" />
                      </div>
                      <div>
                        <p className="text-white/35 text-[10px] tracking-[0.15em] uppercase mb-0.5">{label}</p>
                        <p className="text-white text-sm font-medium">{value}</p>
                        <p className="text-white/40 text-xs">{sub}</p>
                      </div>
                    </>
                  )
                  return href ? (
                    <a key={label} href={href} className={cardCls} style={cardStyle}>{inner}</a>
                  ) : (
                    <div key={label} className={cardCls} style={cardStyle}>{inner}</div>
                  )
                })}
              </div>

              {/* Landmarks chip */}
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(182,134,44,0.05)', border: '1px solid rgba(182,134,44,0.12)' }}
              >
                <p className="text-[#B6862C] text-[10px] tracking-[0.2em] uppercase mb-3">Nearby Landmarks</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Wasl Village Mall', 'Muhaisnah Area', 'Near Al Qusais', 'Easy Metro Access'].map(lm => (
                    <div key={lm} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#B6862C' }} />
                      <span className="text-white/55 text-xs">{lm}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: '#111111' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <motion.div
            variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
              Before You Reach Out
            </span>
            <h2
              className="font-heading mt-4 mb-4"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.9rem, 3.5vw, 3rem)' }}
            >
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-sm leading-relaxed">
              Quick answers to the questions we hear most often. Still unsure? Just ask us directly.
            </p>
          </motion.div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        className="py-24 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F2016 0%, #1D3B2A 50%, #0F2016 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(182,134,44,0.1) 0%, transparent 60%)' }}
        />
        <div className="max-w-2xl mx-auto px-6 relative">
          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium">
              No Commitment
            </span>
            <h2
              className="font-heading mt-4 mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Your First Class<br />
              <span className="text-gradient-gold">Is Completely Free</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-10 text-sm sm:text-base">
              Walk in, experience a class, and feel the SOHAM difference. No pressure, no paperwork — just pure practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/971581592454?text=Hi%20SOHAM%20UAE%2C%20I'd%20like%20to%20book%20a%20free%20trial%20class."
                target="_blank"
                rel="noopener noreferrer"
                className="px-9 py-4 rounded-full text-[#111] font-semibold text-sm transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #B6862C, #D4A84B)', letterSpacing: '0.1em' }}
              >
                <MessageCircle size={16} />
                WhatsApp Us Now
              </a>
              <a
                href="tel:+971581592454"
                className="px-9 py-4 rounded-full border border-white/20 text-white/70 font-medium text-sm transition-all duration-300 hover:bg-white/5 hover:border-[#B6862C] hover:text-[#B6862C] inline-block"
                style={{ letterSpacing: '0.1em' }}
              >
                Call +971 58 159 2454
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
