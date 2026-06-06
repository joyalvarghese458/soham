import type { Metadata } from 'next'
import Footer from '../components/Footer'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with SOHAM UAE — Dubai\'s premier Yoga & Classical Dance Academy. Book a free trial class, ask about our programs, or visit us at Wasl Village Mall, Muhaisnah, Dubai.',
}

export default function ContactPage() {
  return (
    <main className="relative">
      <ContactContent />
      <Footer />
    </main>
  )
}
