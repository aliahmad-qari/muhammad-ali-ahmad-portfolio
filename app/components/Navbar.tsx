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
      const sections = ['home', 'about', 'education', 'skills', 'experience', 'projects', 'contact']
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
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass shadow-2xl py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="text-2xl font-bold relative group overflow-visible">
            <span className="relative inline-flex items-center justify-center w-16 h-8">
              {/* Center M with ping effect and color change */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="text-purple-400 animate-ping opacity-20 text-2xl">M</span>
              </span>
              {/* Main M with color animation */}
              <span className="relative text-2xl z-10 animate-color-shift">M</span>
              {/* Orbiting A */}
              <span className="absolute left-1/2 top-1/2 animate-orbit text-cyan-400 text-xl font-bold">A</span>
            </span>
            {/* Final A with color animation */}
            <span className="text-2xl ml-1 group-hover:scale-110 transition-transform inline-block animate-color-shift">A</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`px-4 py-2 rounded-lg transition-all duration-300 relative group ${
                  activeSection === link.href.slice(1) 
                    ? 'text-white font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${
                  activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            ))}
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white p-2 hover:bg-purple-500/20 rounded-lg transition-all hover:scale-110 hover:rotate-90 duration-300"
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
                className={`block px-4 py-3 rounded-lg transition-all relative group ${
                  activeSection === link.href.slice(1)
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-purple-500/10'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${
                  activeSection === link.href.slice(1) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
