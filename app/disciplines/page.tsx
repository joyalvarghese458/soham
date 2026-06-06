import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import DisciplinesContent from './DisciplinesContent'

export const metadata: Metadata = {
  title: 'Disciplines',
  description:
    'Explore SOHAM UAE\'s full range of Yoga and Classical Dance programs — Hatha, Ashtanga, Aerial, Prenatal Yoga, Bharatanatyam, Mohiniyattam, Kuchipudi, and more. Classes for all ages and levels in Dubai.',
}

export default function DisciplinesPage() {
  return (
    <main className="relative">
      <Navigation />
      <DisciplinesContent />
      <Footer />
    </main>
  )
}
