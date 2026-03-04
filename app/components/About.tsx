'use client'
import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          About Me
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">Passionate about creating exceptional digital experiences</p>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <div className="relative rounded-2xl overflow-hidden hover-lift group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all"></div>
              <img src="/ali.jpg" alt="Muhammad Ali Ahmad - Workspace" className="w-full h-auto rounded-2xl relative z-10" />
            </div>
          </div>

          <div className="animate-on-scroll">
            <div className="glass p-8 rounded-2xl hover-lift">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Professional Summary</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                I am a passionate Full-Stack Developer with 1.5+ years of hands-on experience building scalable web applications, SaaS platforms, admin dashboards, and enterprise solutions. I specialize in secure authentication systems, payment integrations (Stripe, PayPal, PayFast), RESTful API development, and cloud deployment using Vercel, AWS, Render, and MongoDB Atlas. I focus on writing clean, maintainable, and production-ready code.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass p-4 rounded-lg text-center hover:bg-purple-500/10 transition-colors">
                  <div className="text-3xl font-bold gradient-text">1.5+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="glass p-4 rounded-lg text-center hover:bg-purple-500/10 transition-colors">
                  <div className="text-3xl font-bold gradient-text">20+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-sm hover:border-purple-500/50 transition-colors">Remote Available</span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-sm hover:border-blue-500/50 transition-colors">Multan, Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
