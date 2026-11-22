import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: 'Bali Escape — Tours & Experiences', template: '%s | Bali Escape' },
  description: 'Explore Bali with local experts. Discover unforgettable tours, island adventures, and private car rentals with driver.',
  keywords: [
    'Bali tours',
    'Bali tour packages',
    'Nusa Penida tour',
    'Ubud tour',
    'Kintamani volcano tour',
    'Bali private driver',
    'Bali car rental with driver',
    'paket tour bali',
    'sewa mobil bali',
  ],
  openGraph: {
    title: 'Bali Escape — Tours & Experiences',
    description: 'Explore Bali with local experts. Discover unforgettable tours and private car rentals.',
    type: 'website',
    siteName: 'Bali Escape',
    locale: 'en_US',
    images: [
      {
        url: '/images/hero-bali.png',
        width: 1200,
        height: 630,
        alt: 'Bali Escape Tours & Experiences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bali Escape — Tours & Experiences',
    description: 'Explore Bali with local experts.',
    images: ['/images/hero-bali.png'],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      id: '/id',
      'x-default': '/en',
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#087DB5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
