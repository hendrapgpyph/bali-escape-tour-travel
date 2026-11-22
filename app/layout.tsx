import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Bali Escape — Tours & Experiences', template: '%s | Bali Escape' },
  description: 'Explore Bali with local experts. Discover unforgettable tours, island adventures and private car rentals.',
  openGraph: { title: 'Bali Escape — Tours & Experiences', description: 'Explore Bali with local experts.', type: 'website' },
  alternates: { languages: { en: '/en', id: '/id' } },
  icons: { icon: '/icon.svg' },
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
