'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, ArrowRight, Calendar } from 'lucide-react'

type Category = 'All' | 'Yoga' | 'Dance' | 'Wellness' | 'Events'

interface Post {
  slug: string
  title: string
  excerpt: string
  category: Exclude<Category, 'All'>
  date: string
  readTime: string
  image: string
  featured?: boolean
}

const CATEGORIES: Category[] = ['All', 'Yoga', 'Dance', 'Wellness', 'Events']

const POSTS: Post[] = [
  {
    slug: 'healing-power-prenatal-yoga',
    title: 'The Healing Power of Prenatal Yoga',
    excerpt: 'Discover how a mindful prenatal yoga practice supports the body through every trimester — calming the nervous system, strengthening the pelvic floor, and preparing for a conscious birth.',
    category: 'Yoga',
    date: 'May 28, 2026',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/8436490/pexels-photo-8436490.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    featured: true,
  },
  {
    slug: 'understanding-bharatanatyam',
    title: 'Understanding Bharatanatyam: India\'s Sacred Dance',
    excerpt: 'Rooted in the Natya Shastra, Bharatanatyam is more than performance — it is a conversation between the dancer, the divine, and the audience. We explore its history, grammar, and enduring grace.',
    category: 'Dance',
    date: 'May 14, 2026',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/30424952/pexels-photo-30424952.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    featured: true,
  },
  {
    slug: 'morning-yoga-sequences',
    title: '5 Morning Sequences to Awaken Your Practice',
    excerpt: 'Five carefully curated morning flows — from a ten-minute gentle wake-up to a vigorous Ashtanga opener — to help you establish a daily practice that sticks.',
    category: 'Yoga',
    date: 'April 30, 2026',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/6019798/pexels-photo-6019798.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    slug: 'annual-recital-2025',
    title: 'Annual Recital 2025: A Night to Remember',
    excerpt: 'Over 120 students graced the stage at Wasl Village Auditorium in our most spectacular recital yet. A recap of the performances, the emotions, and the extraordinary talent on display.',
    category: 'Events',
    date: 'April 10, 2026',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/1701194/pexels-photo-1701194.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    slug: 'art-of-mohiniyattam',
    title: "The Art of Mohiniyattam: Kerala's Enchantress",
    excerpt: "Lyrical, fluid and profoundly feminine — Mohiniyattam tells the story of Mohini, the divine enchantress. Explore the poetry of its footwork, eye movements, and swaying grace.",
    category: 'Dance',
    date: 'March 25, 2026',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/30444651/pexels-photo-30444651.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    slug: 'pranayama-gateway-to-calm',
    title: 'Pranayama: Your Gateway to Inner Calm',
    excerpt: 'From Nadi Shodhana to Bhramari, breathwork is the fastest path to a settled nervous system. Learn the science behind pranayama and how to weave it into your daily life.',
    category: 'Wellness',
    date: 'March 12, 2026',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/8437076/pexels-photo-8437076.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    slug: 'classical-dance-perfect-workout',
    title: 'Why Classical Dance Is the Ultimate Full-Body Workout',
    excerpt: 'Forget the gym. Classical Indian dance demands exceptional core strength, cardiovascular endurance, and precise coordination — while also nourishing the mind and soul.',
    category: 'Wellness',
    date: 'February 28, 2026',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/5262079/pexels-photo-5262079.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    slug: 'aerial-yoga-new-heights',
    title: 'Aerial Yoga: Taking Your Practice to New Heights',
    excerpt: 'Suspended in a silk hammock, gravity becomes your ally. Aerial yoga decompresses the spine, makes inversions accessible, and transforms the way you experience every posture.',
    category: 'Yoga',
    date: 'February 10, 2026',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/8436605/pexels-photo-8436605.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    slug: 'intensive-workshop-recap',
    title: 'Kuchipudi Intensive Workshop: A Deep Dive',
    excerpt: 'Guest artist Smt. Pavithra Reddy led our two-day Kuchipudi intensive — an unforgettable exploration of footwork, abhinaya and the dramatic storytelling that defines this ancient form.',
    category: 'Events',
    date: 'January 20, 2026',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
]

const CATEGORY_COLORS: Record<Exclude<Category, 'All'>, string> = {
  Yoga: 'rgba(29,91,42,0.25)',
  Dance: 'rgba(182,134,44,0.2)',
  Wellness: 'rgba(44,91,182,0.2)',
  Events: 'rgba(182,44,44,0.2)',
}
const CATEGORY_TEXT: Record<Exclude<Category, 'All'>, string> = {
  Yoga: '#4CAF7C',
  Dance: '#D4A84B',
  Wellness: '#7BA4D4',
  Events: '#D47B7B',
}

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.07, ease: 'easeOut' as const },
  }),
}

function CategoryBadge({ category }: { category: Exclude<Category, 'All'> }) {
  return (
    <span
      className="text-[10px] tracking-[0.25em] uppercase px-2.5 py-0.5 rounded-full inline-block font-medium"
      style={{
        background: CATEGORY_COLORS[category],
        color: CATEGORY_TEXT[category],
        border: `1px solid ${CATEGORY_TEXT[category]}33`,
      }}
    >
      {category}
    </span>
  )
}

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.article
      variants={FADE_UP}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.3s',
      }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <CategoryBadge category={post.category} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-4 text-white/35 text-xs mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar size={11} />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} />
            {post.readTime}
          </span>
        </div>

        <h2
          className="font-heading text-lg font-semibold text-white leading-snug mb-3 group-hover:text-[#D4A84B] transition-colors duration-300"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {post.title}
        </h2>

        <p className="text-white/50 text-sm leading-relaxed flex-1 mb-5">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 text-[#B6862C] text-xs font-medium tracking-wide group-hover:gap-3 transition-all duration-300">
          Read Article <ArrowRight size={13} />
        </div>
      </div>
    </motion.article>
  )
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <motion.article
      variants={FADE_UP}
      custom={0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden col-span-full"
      style={{
        border: '1px solid rgba(182,134,44,0.15)',
      }}
    >
      <div className="grid lg:grid-cols-2 min-h-[380px]">
        {/* Image */}
        <div className="relative min-h-[240px] lg:min-h-0 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
        </div>

        {/* Content */}
        <div
          className="flex flex-col justify-center p-8 lg:p-12"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <CategoryBadge category={post.category} />
            <span
              className="text-[10px] tracking-[0.25em] uppercase px-2.5 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(182,134,44,0.15)', color: '#D4A84B', border: '1px solid rgba(182,134,44,0.3)' }}
            >
              Featured
            </span>
          </div>

          <h2
            className="font-heading font-semibold text-white leading-tight mb-4 group-hover:text-[#D4A84B] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}
          >
            {post.title}
          </h2>

          <p className="text-white/55 leading-relaxed mb-6 max-w-lg">{post.excerpt}</p>

          <div className="flex items-center gap-6 text-white/30 text-xs mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#B6862C] text-sm font-medium tracking-wide group-hover:gap-3 transition-all duration-300">
            Read Article <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function BlogContent() {
  const [active, setActive] = useState<Category>('All')

  const featured = POSTS.filter((p) => p.featured)
  const filtered = active === 'All'
    ? POSTS.filter((p) => !p.featured)
    : POSTS.filter((p) => p.category === active && !p.featured)
  const allFiltered = active === 'All' ? POSTS : POSTS.filter((p) => p.category === active)

  return (
    <>
      {/* ── PAGE HERO ─────────────────────────────────────────── */}
      <section className="relative w-full h-[62vh] min-h-[480px] flex items-end overflow-hidden pt-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85"
            alt="SOHAM UAE Blog"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/92" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-white/40 text-xs tracking-[0.2em] uppercase mb-6"
          >
            <Link href="/" className="hover:text-[#B6862C] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#B6862C]">Blog</span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#B6862C] text-xs tracking-[0.35em] uppercase font-medium"
          >
            Insights & Stories
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading mt-3 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}
          >
            The <span className="text-gradient-gold">SOHAM Journal</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-white/60 mt-4 max-w-xl text-base sm:text-lg leading-relaxed"
          >
            Wisdom from the mat, stories from the stage, and reflections on living well.
          </motion.p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(182,134,44,0.4), transparent)' }}
        />
      </section>

      {/* ── POSTS ─────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: '#111111' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300"
                style={
                  active === cat
                    ? {
                        background: 'linear-gradient(135deg, #B6862C, #D4A84B)',
                        color: '#111111',
                        boxShadow: '0 0 20px rgba(182,134,44,0.3)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }
                }
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured posts — only when All is active */}
          {active === 'All' && (
            <div className="grid gap-6 mb-6">
              {featured.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                  <FeaturedCard post={post} />
                </Link>
              ))}
            </div>
          )}

          {/* Regular grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(active === 'All' ? filtered : allFiltered).map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <PostCard post={post} index={i} />
              </Link>
            ))}
          </div>

          {(active === 'All' ? filtered : allFiltered).length === 0 && (
            <div className="text-center py-24 text-white/30">
              No posts in this category yet.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
