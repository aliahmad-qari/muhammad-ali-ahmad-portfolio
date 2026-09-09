'use client'
import Image from 'next/image'
import { Download, Briefcase, ArrowRight, Sparkles, MapPin, Code2, Users, Star } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return

    const fragment = document.createDocumentFragment()
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.left = Math.random() * 100 + '%'
      p.style.animationDelay = Math.random() * 20 + 's'
      p.style.animationDuration = Math.random() * 10 + 15 + 's'
      fragment.appendChild(p)
    }
    container.appendChild(fragment)

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild)
    }
  }, [])

  const stats = [
    { icon: <Code2 size={18} />, value: '3+', label: 'Years Exp.' },
    { icon: <Star size={18} />, value: '20+', label: 'Projects' },
    { icon: <Users size={18} />, value: '100%', label: 'Satisfied' },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div ref={particlesRef} className="particles" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="order-2 md:order-1 animate-slideUp">
            <div className="flex items-center gap-2 mb-4 animate-fadeIn">
              <Sparkles className="text-purple-400 animate-pulse" size={20} />
              <span className="text-purple-400 font-medium text-sm tracking-wide uppercase">Full-Stack Developer</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              {['Muhammad', 'Ali', 'Ahmad'].map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block mr-4 animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.2}s`, opacity: 0, animationFillMode: 'forwards' }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="text-lg text-gray-300 mb-3 animate-fadeIn" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
              Building <span className="gradient-text font-semibold">Scalable Web & SaaS Applications</span> for international clients — React, Next.js, Node.js & MongoDB.
            </p>

            <div className="flex items-center gap-2 mb-8 text-gray-500 text-sm animate-fadeIn" style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}>
              <MapPin size={15} className="text-purple-400" />
              <span>Multan, Pakistan · Onsite · Hybrid · Remote</span>
            </div>

            {/* Stats row */}
            <div className="flex gap-4 mb-8 animate-fadeIn" style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}>
              {stats.map((s, i) => (
                <div key={i} className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-purple-500/10 transition-colors">
                  <span className="text-purple-400">{s.icon}</span>
                  <div>
                    <div className="text-xl font-bold gradient-text leading-none">{s.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Two CTAs only */}
            <div className="flex flex-wrap gap-4 animate-fadeIn" style={{ animationDelay: '0.9s', opacity: 0, animationFillMode: 'forwards' }}>
              <a href="#contact" className="gradient-bg px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition-all relative z-10">
                Hire Me <Briefcase size={18} />
              </a>
              <a href="#projects" className="glass px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all border border-white/10 relative z-10">
                View Projects <ArrowRight size={18} />
              </a>
            </div>

            {/* Resume link — subtle, below CTAs */}
            <a
              href="/Muhammad-Ali-Ahmad-FullStackDev-Resume.pdf"
              download="Muhammad-Ali-Ahmad-FullStackDev-Resume.pdf"
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-gray-500 hover:text-purple-400 transition-colors animate-fadeIn"
              style={{ animationDelay: '1s', opacity: 0, animationFillMode: 'forwards' }}
            >
              <Download size={14} /> Download Resume
            </a>
          </div>

          {/* Right — photo */}
          <div className="order-1 md:order-2 flex justify-center animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/50 glow">
                <Image
                  src="/ali2.jpeg"
                  alt="Muhammad Ali Ahmad - Full Stack Developer"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 glass px-5 py-3 rounded-full font-semibold flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="gradient-text">Available for Hire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
