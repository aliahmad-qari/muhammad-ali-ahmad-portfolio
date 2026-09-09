'use client'
import { Github, Linkedin, Mail, ArrowUpRight, Phone } from 'lucide-react'

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: <Github size={20} />, href: 'https://github.com/aliahmad-qari', label: 'GitHub' },
  { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/muhammad-ali-ahmad-mern', label: 'LinkedIn' },
  { icon: <Mail size={20} />, href: 'mailto:ali.islamic.meh1@gmail.com', label: 'Email' },
  { icon: <Phone size={20} />, href: 'https://wa.me/923079922301', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Top hire-me CTA banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-blue-900/30 to-purple-900/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-1">Have a project in mind?</h3>
            <p className="text-gray-400 text-sm">Let's build something great together — available for full-time, freelance & remote.</p>
          </div>
          <a
            href="#contact"
            className="gradient-bg px-7 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all flex-shrink-0"
          >
            Get in touch <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold gradient-text mb-3">Muhammad Ali Ahmad</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Full-Stack Developer specializing in scalable SaaS, enterprise apps, and modern web solutions for international clients.
            </p>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/40 transition-all hover:scale-110 border border-white/5"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Quick Links</p>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-purple-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snapshot */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:ali.islamic.meh1@gmail.com" className="text-gray-400 text-sm hover:text-purple-400 transition-colors flex items-center gap-2">
                  <Mail size={14} className="text-purple-400/70" />
                  ali.islamic.meh1@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/923079922301" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-purple-400 transition-colors flex items-center gap-2">
                  <Phone size={14} className="text-green-400/70" />
                  +92 307 9922301
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/muhammad-ali-ahmad-mern" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-purple-400 transition-colors flex items-center gap-2">
                  <Linkedin size={14} className="text-blue-400/70" />
                  muhammad-ali-ahmad-mern
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2026 Muhammad Ali Ahmad. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <span className="text-purple-400/70">Next.js</span> · <span className="text-blue-400/70">TypeScript</span> · <span className="text-cyan-400/70">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
