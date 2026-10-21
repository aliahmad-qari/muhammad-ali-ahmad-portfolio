'use client'
import { Code2, Layers, Zap, Server, Bot, Cloud, Database } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const services = [
  {
    icon: <Code2 size={32} />,
    title: 'Full Stack Development',
    desc: 'End-to-end web applications using React, Next.js, Node.js, Express, MongoDB, and modern development practices.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Layers size={32} />,
    title: 'MERN Stack Applications',
    desc: 'Specialized in building scalable, production-ready applications with MongoDB, Express, React, and Node.js.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <Database size={32} />,
    title: 'Headless WordPress & CMS',
    desc: 'Custom WordPress solutions, Elementor page builds, WooCommerce stores, and Tutor LMS integrations with full site management.',
    color: 'from-sky-500 to-blue-500',
  },
  {
    icon: <Zap size={32} />,
    title: 'SaaS & Business Platforms',
    desc: 'Multi-tenant SaaS systems, subscription management, admin dashboards, and scalable business automation platforms.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: <Bot size={32} />,
    title: 'AI Integration & Automation',
    desc: 'OpenAI integrations, AI agents, n8n/Make workflow automation, email marketing systems, and intelligent business processes.',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    icon: <Cloud size={32} />,
    title: 'Cloud Deployment & DevOps',
    desc: 'AWS, Vercel, Docker, cPanel hosting setup, domain management, SSL certificates, CI/CD pipelines, and performance optimization.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: <Server size={32} />,
    title: 'REST API Development',
    desc: 'Secure, scalable APIs with JWT authentication, rate limiting, payment gateway integration, and comprehensive documentation.',
    color: 'from-emerald-500 to-green-500',
  },
]

export default function Services() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="services" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-semibold uppercase tracking-widest text-electric-400 mb-3">What I Offer</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="block text-slate-100">Services that drive</span>
            <span className="gradient-text">business results</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Full-stack development, AI automation, WordPress, and cloud infrastructure—everything you need to build, scale, and grow your digital products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover-lift animate-on-scroll group relative overflow-hidden border border-electric-500/10"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`text-slate-100 group-hover:text-electric-400 transition-colors`}>
                    {service.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-electric-400 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Bottom accent bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center animate-on-scroll">
          <p className="text-slate-400 mb-6">Ready to build something great?</p>
          <a
            href="#contact"
            className="gradient-bg px-8 py-4 rounded-lg font-semibold text-white inline-flex items-center gap-2 hover:scale-105 transition-transform"
          >
            Let's Discuss Your Project →
          </a>
        </div>
      </div>
    </section>
  )
}
