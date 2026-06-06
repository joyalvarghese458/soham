import type { Metadata } from 'next'
import Footer from '../components/Footer'
import GalleryContent from './GalleryContent'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Explore the SOHAM UAE Gallery — beautiful moments from our yoga sessions, classical dance performances, annual recitals and community events in Dubai.',
}

export default function GalleryPage() {
  return (
    <main className="relative">
      <GalleryContent />
      <Footer />
    </main>
  )
}
