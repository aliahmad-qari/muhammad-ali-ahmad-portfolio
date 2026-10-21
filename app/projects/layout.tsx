import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import ScrollIndicator from '../components/ScrollIndicator'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Case Study',
  description: 'In-depth case study of a featured client project',
}

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      <ScrollIndicator />
      {children}
      <Footer />
    </main>
  )
}
