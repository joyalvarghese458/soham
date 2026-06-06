import Hero from './components/Hero'
import WhySoham from './components/WhySoham'
import ImageCarousel from './components/ImageCarousel'
import Disciplines from './components/Disciplines'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Location from './components/Location'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <WhySoham />
      <ImageCarousel />
      <Disciplines />
      <Gallery />
      <Testimonials />
      <Location />
      <CTA />
      <Footer />
    </main>
  )
}
