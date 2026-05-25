'use client'
import { ShieldCheck, Layers, Globe, Plug, Zap, Code2 } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const reasons = [
  { icon: <ShieldCheck size={28} />, title: 'Production-Ready Code', desc: 'Every project is built with scalability, security, and maintainability in mind — not just to demo.', color: 'from-green-500 to-emerald-500', iconColor: 'text-green-400' },
  { icon: <Layers size={28} />, title: 'SaaS Architecture', desc: '3+ years building multi-tenant SaaS platforms, dashboards, and subscription-based systems.', color: 'from-blue-500 to-cyan-500', iconColor: 'text-blue-400' },
  { icon: <Globe size={28} />, title: 'Remote Collaboration', desc: 'Proven track record working with international teams across different time zones and cultures.', color: 'from-purple-500 to-pink-500', iconColor: 'text-purple-400' },
  { icon: <Plug size={28} />, title: 'API & Integrations', desc: 'Stripe, PayPal, OAuth, third-party APIs, payment gateways — seamlessly integrated and tested.', color: 'from-orange-500 to-red-500', iconColor: 'text-orange-400' },
  { icon: <Zap size={28} />, title: 'Performance Optimization', desc: 'Optimized APIs, lazy loading, caching strategies, and database query tuning for fast apps.', color: 'from-yellow-500 to-orange-500', iconColor: 'text-yellow-400' },
  { icon: <Code2 size={28} />, title: 'Clean Code Practices', desc: 'Readable, maintainable, well-structured code with proper separation of concerns and documentation.', color: 'from-indigo-500 to-purple-500', iconColor: 'text-indigo-400' },
]

export default function WhyHireMe() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="why-hire-me" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          Why Hire Me?
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">What sets me apart from other developers</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl hover-lift animate-on-scroll group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className={`${item.iconColor} mb-4 transition-colors duration-300`}>{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
