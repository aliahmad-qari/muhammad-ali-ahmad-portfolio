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
              <img src="/ali2.jpeg" alt="Muhammad Ali Ahmad - Professional Web Developer" className="w-full h-auto rounded-2xl relative z-10" />
            </div>
          </div>

          <div className="animate-on-scroll">
            <div className="glass p-8 rounded-2xl hover-lift">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Professional Summary</h3>
              <p className="text-gray-300 leading-relaxed text-base mb-6">
                Full-Stack Web Developer with 2.5+ years of professional experience building scalable, high-performance web applications and SaaS platforms. I specialize in creating responsive user interfaces and robust backend systems using modern technologies. My expertise includes React, Next.js, Node.js, Express, MongoDB, PostgreSQL, and AWS. I have successfully delivered 20+ projects for diverse clients including SaaS platforms, real estate applications, WiFi management systems, and e-commerce solutions. I follow clean code practices, implement secure authentication systems, integrate payment gateways (Stripe, PayPal), and deploy applications to production-ready environments. Seeking opportunities with international companies to contribute to innovative digital solutions.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass p-4 rounded-lg text-center hover:bg-purple-500/10 transition-colors">
                  <div className="text-2xl font-bold gradient-text">2.5+</div>
                  <div className="text-xs text-gray-400">Yrs Experience</div>
                </div>
                <div className="glass p-4 rounded-lg text-center hover:bg-purple-500/10 transition-colors">
                  <div className="text-2xl font-bold gradient-text">20+</div>
                  <div className="text-xs text-gray-400">Projects Done</div>
                </div>
                <div className="glass p-4 rounded-lg text-center hover:bg-purple-500/10 transition-colors">
                  <div className="text-2xl font-bold gradient-text">100%</div>
                  <div className="text-xs text-gray-400">Client Satisfied</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-sm hover:border-purple-500/50 transition-colors">🌍 Remote Ready</span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-sm hover:border-blue-500/50 transition-colors">📍 Pakistan</span>
                <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-sm hover:border-green-500/50 transition-colors">✅ Open to Opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
