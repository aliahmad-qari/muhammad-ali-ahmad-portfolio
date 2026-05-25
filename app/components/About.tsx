'use client'
import Image from 'next/image'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function About() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          About Me
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">Passionate about creating exceptional digital experiences</p>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Image column — stretches to full height of the right column */}
          <div className="animate-on-scroll">
            <div className="relative rounded-2xl overflow-hidden hover-lift group w-full h-full min-h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all z-10 rounded-2xl"></div>
              <Image
                src="/ali2.jpeg"
                alt="Muhammad Ali Ahmad - Professional Web Developer"
                fill
                className="object-cover object-top rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text column */}
          <div className="animate-on-scroll">
            <div className="glass p-8 rounded-2xl hover-lift h-full">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Professional Summary</h3>
              <p className="text-gray-300 leading-relaxed text-base mb-6">
                Results-driven Full Stack Developer with 3+ years of professional experience building scalable, production-ready web applications, SaaS platforms, AI-powered systems, and enterprise solutions using React.js, Next.js, Node.js, Express.js, and MongoDB.
                <br /><br />
                Experienced in developing responsive user interfaces, secure backend systems, REST APIs, authentication systems, payment gateway integrations, and cloud-deployed applications for international clients and remote teams.
                <br /><br />
                Specialized in SaaS architecture, business automation systems, AI integrations, dashboards, and modern full-stack web development with clean architecture and scalable performance.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass p-4 rounded-lg text-center hover:bg-purple-500/10 transition-colors">
                  <div className="text-2xl font-bold gradient-text">3+</div>
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
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-sm hover:border-purple-500/50 transition-colors">🌍 Onsite, Hybrid &amp; Remote</span>
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
