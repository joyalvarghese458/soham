import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Discover the story of SOHAM UAE — Dubai's premier Yoga & Classical Dance Academy. Meet founders Rakhi Sunish and Radhika Narayan, explore our philosophy, and join 1000+ students on a transformative journey.",
}

export default function AboutPage() {
  return (
    <main className="relative">
      <Navigation />
      <AboutContent />
      <Footer />
    </main>
  )
}
