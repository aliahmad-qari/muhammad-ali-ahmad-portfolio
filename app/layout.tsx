import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteUrl } from './config/site'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const BASE_URL = siteUrl

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Muhammad Ali Ahmad — Full Stack Developer | MERN | SaaS | Remote',
    template: '%s | Muhammad Ali Ahmad',
  },
  description:
    'Results-driven Full Stack Developer with 3+ years of experience building scalable SaaS platforms, REST APIs, and production-ready web applications using React.js, Next.js, Node.js, and MongoDB. Available for remote and international opportunities.',
  keywords: [
    'Full Stack Developer', 'MERN Stack Developer', 'React Developer', 'Next.js Developer',
    'Node.js Developer', 'MongoDB', 'SaaS Developer', 'Remote Developer Pakistan',
    'Muhammad Ali Ahmad', 'Web Developer Multan', 'Hire Full Stack Developer',
    'JavaScript Developer', 'TypeScript Developer', 'API Developer', 'Express.js',
  ],
  authors: [{ name: 'Muhammad Ali Ahmad', url: BASE_URL }],
  creator: 'Muhammad Ali Ahmad',
  publisher: 'Muhammad Ali Ahmad',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Muhammad Ali Ahmad — Portfolio',
    title: 'Muhammad Ali Ahmad — Full Stack Developer | MERN | SaaS',
    description:
      'Full Stack Developer with 3+ years building scalable SaaS platforms and production-ready web applications. Available for remote opportunities worldwide.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Muhammad Ali Ahmad — Full Stack Developer' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Ali Ahmad — Full Stack Developer | MERN | SaaS',
    description: 'Full Stack Developer with 3+ years building scalable SaaS platforms. Available for remote opportunities.',
    images: ['/opengraph-image'],
    creator: '@muhammadaliahmad',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}><a className="skip-link" href="#main-content">Skip to content</a>{children}</body>
    </html>
  )
}
