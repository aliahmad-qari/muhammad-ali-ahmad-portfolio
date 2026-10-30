'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MobileStickyCTA() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Hide on /enquiry (already on form page)
  if (pathname === '/enquiry' || pathname === '/hire-me') {
    return null
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      // Show after scrolling 300px down
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 
        md:hidden
        transform transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
        bg-gradient-to-r from-electric-500 to-cyan-500
        p-4 shadow-lg shadow-electric-500/50
        z-40 pointer-events-none
      `}
    >
      <Link
        href="/enquiry"
        className="w-full bg-navy-900 text-white py-3 px-4 rounded-lg 
                   font-semibold flex items-center justify-center gap-2
                   hover:bg-navy-800 transition-all pointer-events-auto
                   active:scale-95"
      >
        Request Quote <ArrowRight size={18} />
      </Link>
    </div>
  )
}
