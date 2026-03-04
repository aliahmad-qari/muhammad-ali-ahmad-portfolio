'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass shadow-2xl py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="text-2xl font-bold gradient-text hover:scale-110 transition-transform">
            MAA
          </a>
          
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === link.href.slice(1) 
                    ? 'bg-purple-500/20 text-white font-semibold' 
                    : 'text-gray-300 hover:text-white hover:bg-purple-500/10'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass animate-slideDown">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className={`block px-4 py-3 rounded-lg transition-all ${
                  activeSection === link.href.slice(1)
                    ? 'bg-purple-500/20 text-white font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-purple-500/10'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
