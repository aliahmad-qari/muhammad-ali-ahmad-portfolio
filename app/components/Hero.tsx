'use client'
import Image from 'next/image'
import { Download, ArrowRight, Briefcase, Mail, Code2, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return

    const fragment = document.createDocumentFragment()
    for (let i = 0; i < 50; i++) {
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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Particle background */}
      <div ref={particlesRef} className="particles" aria-hidden="true"></div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-subtle pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text Content */}
          <div className="space-y-8 animate-slideUp">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-500/10 border border-electric-500/30 rounded-full text-sm text-electric-400 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-electric-400 opacity-75 animate-pulse"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-500"></span>
              </span>
              Available for Remote & Contract Opportunities
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-slate-100">Building Digital</span>
                <span className="block gradient-text">Products That Move</span>
                <span className="block text-slate-100">Businesses Forward</span>
              </h1>

              {/* Tagline */}
              <p className="text-xl text-slate-300 font-medium flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <Code2 size={20} className="text-electric-400" />
                  Full Stack Developer
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-electric-400">MERN Stack</span>
                <span className="text-slate-600">·</span>
                <span className="text-cyan-400">WordPress</span>
                <span className="text-slate-600">·</span>
                <span className="text-violet-400">AI Automation</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              I build scalable web applications, SaaS platforms, and business solutions with modern technologies. Specialized in MERN stack, WordPress development, AI integrations, and workflow automation for international clients.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 py-6 border-t border-b border-slate-700/50">
              <div className="space-y-1">
                <p className="text-3xl font-bold gradient-text">3+</p>
                <p className="text-sm text-slate-400">Years Experience</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold gradient-text">25+</p>
                <p className="text-sm text-slate-400">Projects Delivered</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold gradient-text">100%</p>
                <p className="text-sm text-slate-400">Client Satisfaction</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {/* Primary CTA */}
              <a
                href="#projects"
                className="gradient-bg px-7 py-3 rounded-lg font-semibold text-white inline-flex items-center gap-2 hover:scale-105 transition-transform"
              >
                View My Projects <ArrowRight size={18} />
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="px-7 py-3 rounded-lg font-semibold text-electric-400 inline-flex items-center gap-2 border border-electric-500/50 hover:bg-electric-500/10 transition-all"
              >
                <Mail size={18} />
                Get In Touch
              </a>

              {/* Resume Download */}
              <a
                href="/Muhammad-Ali-Ahmad-FullStackDev-Resume.pdf"
                download="Muhammad-Ali-Ahmad-FullStackDev-Resume.pdf"
                className="px-7 py-3 rounded-lg font-semibold text-slate-300 inline-flex items-center gap-2 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 transition-all"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative h-96 md:h-full min-h-96 animate-float">
            {/* Code Editor Mockup Background */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              {/* Dark gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950"></div>

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(14, 165, 233, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.2) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              ></div>

              {/* Glowing orbs */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-electric-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slow"></div>

              {/* Code lines visual */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="space-y-4 w-full">
                  <div className="h-2 bg-electric-500/30 rounded w-3/4"></div>
                  <div className="h-2 bg-electric-500/20 rounded"></div>
                  <div className="h-2 bg-electric-500/25 rounded w-5/6"></div>
                  <div className="mt-6 space-y-3">
                    <div className="h-1.5 bg-cyan-500/25 rounded w-2/3"></div>
                    <div className="h-1.5 bg-cyan-500/20 rounded"></div>
                    <div className="h-1.5 bg-cyan-500/30 rounded w-4/5"></div>
                  </div>
                </div>
              </div>

              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl border border-electric-500/20 shadow-electric"></div>
            </div>

            {/* Your Photo - Circular overlay */}
            <div className="absolute bottom-4 right-4 w-48 h-48 rounded-full overflow-hidden border-2 border-electric-500/40 shadow-lg shadow-electric-500/20">
              <Image
                src="/ali2.jpeg"
                alt="Muhammad Ali Ahmad"
                fill
                className="object-cover"
                priority
              />
              {/* Glow effect on photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-electric-500/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-slate-500">Scroll to explore</span>
            <div className="w-6 h-10 border border-electric-500/30 rounded-full flex items-center justify-center">
              <div className="w-1 h-2 bg-electric-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
