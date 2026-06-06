import type { Metadata } from 'next'
import Footer from '../components/Footer'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'The SOHAM Journal — insights on yoga, classical Indian dance, wellness, and stories from our Dubai academy. Tips, cultural deep-dives, event recaps and more.',
}

export default function BlogPage() {
  return (
    <main className="relative">
      <BlogContent />
      <Footer />
    </main>
  )
}
