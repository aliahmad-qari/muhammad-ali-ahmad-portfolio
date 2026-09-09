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

      const sections = ['home', 'about', 'education', 'skills', 'experience', 'why-hire-me', 'services', 'projects', 'workflow', 'contact']
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
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass shadow-2xl py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo — clean monogram, no orbit chaos */}
          <a href="#home" className="group flex items-center gap-2">
            <div className="relative w-9 h-9 flex items-center justify-center">
              {/* Soft pulsing ring */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 group-hover:from-purple-500/50 group-hover:to-blue-500/50 transition-all duration-500 animate-pulse-slow"></span>
              <span className="relative z-10 text-base font-black gradient-text">MA</span>
            </div>
            <span className="hidden sm:block text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
              Ali Ahmad
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition-all duration-300 relative group text-sm ${
                  activeSection === link.href.slice(1)
                    ? 'text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ${
                  activeSection === link.href.slice(1) ? 'w-4' : 'w-0 group-hover:w-4'
                }`}></span>
              </a>
            ))}
          </div>

          {/* Hire me CTA — desktop */}
          <a
            href="#contact"
            className="hidden md:inline-flex gradient-bg px-4 py-2 rounded-lg text-sm font-semibold items-center gap-1.5 hover:scale-105 transition-all"
          >
            Hire Me
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-purple-500/20 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass animate-slideDown border-t border-white/5">
          <div className="px-3 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                  activeSection === link.href.slice(1)
                    ? 'text-white font-semibold bg-purple-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeSection === link.href.slice(1) ? 'bg-purple-400' : 'bg-gray-600'}`}></span>
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-white/5 mt-2">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full gradient-bg px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-center"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
