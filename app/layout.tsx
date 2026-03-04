import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Muhammad Ali Ahmad - Full-Stack Developer | MERN Specialist',
  description: 'Full-Stack Developer specializing in React, Node.js, MongoDB, and cloud technologies. Building scalable web applications and SaaS platforms.',
  keywords: 'Full-Stack Developer, MERN Stack, React, Node.js, MongoDB, Web Development, SaaS, Muhammad Ali Ahmad',
  authors: [{ name: 'Muhammad Ali Ahmad' }],
  openGraph: {
    title: 'Muhammad Ali Ahmad - Full-Stack Developer',
    description: 'Building scalable web applications and SaaS platforms',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
