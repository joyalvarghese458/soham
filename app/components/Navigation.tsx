'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Disciplines', href: '/disciplines' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '#location' },
]

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  // Sync active link with the current URL whenever the route changes
  useEffect(() => {
    const match = navLinks.find((l) => l.href === pathname)
    if (match) setActiveLink(match.label)
    else if (pathname === '/') setActiveLink('Home')
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string, label: string) => {
    setActiveLink(label)
    setMenuOpen(false)
    if (href.startsWith('/')) {
      router.push(href)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.scrollTo(href, { offset: -96, duration: 1.2 })
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-scrolled' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo — flex-1 so nav links stay centered */}
            <div className="flex-1 flex items-center">
              <motion.a
                href="/"
                onClick={() => handleNav('/', 'Home')}
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <LotusIcon />
                <div>
                  <span
                    className="font-heading text-2xl font-bold tracking-wide"
                    style={{ color: '#B6862C', fontFamily: 'var(--font-playfair)' }}
                  >
                    SOHAM
                  </span>
                  <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase -mt-1">
                    UAE
                  </p>
                </div>
              </motion.a>
            </div>

            {/* Desktop Links — naturally centered between the two flex-1 flanks */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-9">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href, link.label)}
                  className={`relative text-sm tracking-wide transition-colors duration-300 border-gold-animate pb-1 ${
                    activeLink === link.label
                      ? 'text-[#B6862C]'
                      : 'text-white/70 hover:text-white'
                  }`}
                  style={{ letterSpacing: '0.08em' }}
                >
                  {link.label}
                  {activeLink === link.label && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B6862C]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA — flex-1 justify-end so it mirrors the logo side */}
            <div className="hidden lg:flex flex-1 items-center justify-end gap-5">
              <a
                href="tel:+971581592454"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap"
              >
                <Phone size={14} />
                <span>+971 58 159 2454</span>
              </a>
              <div className="h-4 w-px bg-white/20" />
              <motion.button
                onClick={() => handleNav('#location', 'Contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-2.5 text-sm font-medium tracking-wider text-[#111111] rounded-full transition-all duration-300 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #B6862C, #D4A84B)',
                  letterSpacing: '0.08em',
                }}
              >
                Book Free Trial
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white p-2"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 glass-dark flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNav(link.href, link.label)}
                className="font-heading text-3xl text-white/80 hover:text-[#B6862C] transition-colors"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
              href="tel:+971581592454"
              className="flex items-center gap-2 text-[#B6862C] text-lg mt-4"
            >
              <Phone size={18} />
              +971 58 159 2454
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function LotusIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 60 60" fill="none">
      <ellipse cx="30" cy="38" rx="18" ry="10" fill="rgba(182,134,44,0.15)" />
      <path d="M30 36 C30 20 18 14 10 18 C16 22 22 28 30 36Z" fill="#B6862C" opacity="0.8" />
      <path d="M30 36 C30 20 42 14 50 18 C44 22 38 28 30 36Z" fill="#B6862C" opacity="0.8" />
      <path d="M30 36 C22 30 14 32 12 40 C18 38 24 36 30 36Z" fill="#D4A84B" opacity="0.7" />
      <path d="M30 36 C38 30 46 32 48 40 C42 38 36 36 30 36Z" fill="#D4A84B" opacity="0.7" />
      <path d="M30 36 C28 22 22 16 18 20 C22 24 26 30 30 36Z" fill="#B6862C" opacity="0.6" />
      <path d="M30 36 C32 22 38 16 42 20 C38 24 34 30 30 36Z" fill="#B6862C" opacity="0.6" />
      <path d="M30 36 C30 16 26 10 30 8 C34 10 30 16 30 36Z" fill="#D4A84B" />
      <circle cx="30" cy="37" r="3.5" fill="#B6862C" />
    </svg>
  )
}
