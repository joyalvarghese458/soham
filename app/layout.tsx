import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from './components/SmoothScroll'
import Navigation from './components/Navigation'
import FloatingButtons from './components/FloatingButtons'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = 'https://sohamuae.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SOHAM UAE | Premium Yoga & Classical Dance Academy in Dubai',
    template: '%s | SOHAM UAE',
  },
  description:
    'Dubai\'s premier Yoga & Classical Dance Academy. Expert-led Hatha, Ashtanga, Aerial, Prenatal Yoga, Bharatanatyam, Mohiniyattam, Kuchipudi classes. Book your free trial at Wasl Village Mall, Muhaisnah.',
  keywords: [
    'Yoga Classes Dubai',
    'Bharatanatyam Classes Dubai',
    'Classical Dance Classes Dubai',
    'Yoga Studio Dubai',
    'Aerial Yoga Dubai',
    'Dance Academy Dubai',
    'Wellness Center Dubai',
    'Hatha Yoga Dubai',
    'Ashtanga Yoga Dubai',
    'Prenatal Yoga Dubai',
    'Meditation Dubai',
    'Kuchipudi Dubai',
    'Mohiniyattam Dubai',
    'Indian Dance Dubai',
    'SOHAM UAE',
    'Yoga Muhaisnah',
    'Wasl Village Mall yoga',
  ],
  authors: [{ name: 'SOHAM UAE', url: siteUrl }],
  creator: 'SOHAM UAE',
  publisher: 'SOHAM UAE',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: siteUrl,
    siteName: 'SOHAM UAE',
    title: 'SOHAM UAE | Premium Yoga & Classical Dance Academy in Dubai',
    description:
      "Dubai's most inspiring wellness sanctuary. World-class Yoga & Classical Dance. 20+ years experience. Book your free trial class today.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SOHAM UAE — Yoga & Classical Dance Academy Dubai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOHAM UAE | Premium Yoga & Classical Dance Academy in Dubai',
    description:
      "Dubai's most inspiring wellness sanctuary. World-class Yoga & Classical Dance.",
    images: ['/og-image.jpg'],
    creator: '@sohamuae',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'wellness',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1D3B2A',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': siteUrl,
  name: 'SOHAM UAE',
  description:
    "Dubai's premier Yoga & Classical Dance Academy offering expert-led classes for all ages and levels.",
  url: siteUrl,
  telephone: '+971581592454',
  email: 'info@sohamuae.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'M03 Wasl Village Mall',
    addressLocality: 'Muhaisnah',
    addressRegion: 'Dubai',
    addressCountry: 'AE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.2522,
    longitude: 55.3647,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '06:00',
    closes: '21:00',
  },
  priceRange: '$$',
  image: `${siteUrl}/og-image.jpg`,
  sameAs: [
    'https://instagram.com/sohamuae',
    'https://facebook.com/sohamuae',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Classes & Programs',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Yoga Classes',
          description:
            'Hatha, Ashtanga, Aerial, Prenatal, and Therapeutic Yoga',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Classical Dance Classes',
          description:
            'Bharatanatyam, Mohiniyattam, Kuchipudi, Semi Classical and Bollywood',
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#111111] text-[#F8F6F2] antialiased overflow-x-hidden">
        <SmoothScroll>
          <Navigation />
          {children}
          <FloatingButtons />
        </SmoothScroll>
      </body>
    </html>
  )
}
