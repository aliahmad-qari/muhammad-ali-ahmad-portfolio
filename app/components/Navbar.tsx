'use client'
import { useState, useEffect } from 'react'
import { Menu, X, FileText } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'awards', 'resume', 'contact']
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
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg py-3' : 'py-4 bg-gradient-to-b from-navy-900 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="group relative">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-electric flex items-center justify-center">
                <span className="text-lg font-bold text-white">MA</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-100">Muhammad Ali</p>
                <p className="text-xs text-electric-400">Full Stack Dev</p>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === link.href.slice(1)
                    ? 'text-electric-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-electric rounded-full transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? 'w-6'
                      : 'w-0 group-hover:w-6'
                  }`}
                ></span>
              </a>
            ))}
          </div>

          {/* CTA Button + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Download Resume Button - Desktop */}
            <a
              href="/Muhammad-Ali-Ahmad-FullStackDev-Resume.pdf"
              download="Muhammad-Ali-Ahmad-FullStackDev-Resume.pdf"
              className="hidden sm:inline-flex gradient-bg px-4 py-2 rounded-lg text-sm font-semibold text-white items-center gap-2 hover:scale-105 transition-transform"
            >
              <FileText size={16} />
              Resume
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-slate-300 p-2 hover:bg-electric-500/10 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden glass border-t border-electric-500/20 animate-slideDown">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeSection === link.href.slice(1)
                    ? 'text-electric-400 bg-electric-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-electric-400"></span>
                {link.name}
              </a>
            ))}
            <a
              href="/Muhammad-Ali-Ahmad-FullStackDev-Resume.pdf"
              download="Muhammad-Ali-Ahmad-FullStackDev-Resume.pdf"
              className="gradient-bg px-4 py-3 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2 mt-4 w-full justify-center"
            >
              <FileText size={16} />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
