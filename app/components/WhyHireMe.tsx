'use client'
import { ShieldCheck, Layers, Globe, Plug, Zap, Code2, BrainCircuit, ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const reasons = [
  {
    icon: <ShieldCheck size={22} />,
    title: 'Production-Ready Code',
    desc: 'Every project is built with scalability, security, and maintainability in mind — not just to demo.',
    color: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-400',
    highlight: false,
  },
  {
    icon: <Layers size={22} />,
    title: 'SaaS Architecture',
    desc: '3+ years building multi-tenant SaaS platforms, dashboards, and subscription-based systems.',
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'text-blue-400',
    highlight: false,
  },
  {
    icon: <BrainCircuit size={22} />,
    title: 'AI Integration & Automation',
    desc: 'I don\'t just integrate AI — I build full automation pipelines: OpenAI agents, n8n/Make workflows, email marketing systems, and intelligent document processing that run without human intervention.',
    color: 'from-violet-500 to-cyan-500',
    iconColor: 'text-violet-400',
    highlight: true,
  },
  {
    icon: <Globe size={22} />,
    title: 'Remote Collaboration',
    desc: 'Proven track record working with international teams across different time zones and cultures.',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-400',
    highlight: false,
  },
  {
    icon: <Plug size={22} />,
    title: 'API & Integrations',
    desc: 'Stripe, PayPal, OAuth, third-party APIs, payment gateways — seamlessly integrated and tested.',
    color: 'from-orange-500 to-red-500',
    iconColor: 'text-orange-400',
    highlight: false,
  },
  {
    icon: <Zap size={22} />,
    title: 'Performance Optimization',
    desc: 'Optimized APIs, lazy loading, caching strategies, and database query tuning for fast apps.',
    color: 'from-yellow-500 to-orange-500',
    iconColor: 'text-yellow-400',
    highlight: false,
  },
  {
    icon: <Code2 size={22} />,
    title: 'Clean Code Practices',
    desc: 'Readable, maintainable, well-structured code with proper separation of concerns and documentation.',
    color: 'from-indigo-500 to-purple-500',
    iconColor: 'text-indigo-400',
    highlight: false,
  },
]

export default function WhyHireMe() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="why-hire-me" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — left-aligned banner style */}
        <div className="animate-on-scroll mb-16">
          <div className="glass rounded-2xl px-8 py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-l-4 border-purple-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-1">The differentiator</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why hire me?</h2>
              <p className="text-gray-400 text-sm mt-1">Full-stack dev + AI automation + email marketing — one developer, full capability.</p>
            </div>
            <a
              href="#contact"
              className="relative z-10 gradient-bg px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all flex-shrink-0 self-start md:self-auto"
            >
              Let's talk <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Numbered horizontal rows */}
        <div className="space-y-4">
          {reasons.map((item, index) => (
            <div
              key={index}
              className={`glass rounded-xl overflow-hidden hover-lift animate-on-scroll group ${
                item.highlight
                  ? 'border border-violet-500/30 hover:border-violet-500/50'
                  : 'border border-white/5'
              }`}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {/* Highlight top bar */}
              {item.highlight && (
                <div className="h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"></div>
              )}

              <div className="flex items-start md:items-center gap-5 p-5">
                {/* Step number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg glass flex items-center justify-center text-xs font-bold text-gray-500 group-hover:text-purple-400 transition-colors border border-white/5">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-15`}></div>
                  <span className={`relative z-10 ${item.iconColor}`}>{item.icon}</span>
                </div>

                {/* Title */}
                <div className={`flex-shrink-0 hidden sm:block ${item.highlight ? 'w-56' : 'w-48'}`}>
                  <h3 className={`text-sm font-bold transition-colors ${item.highlight ? 'text-violet-300 group-hover:text-violet-200' : 'group-hover:text-purple-400'}`}>
                    {item.title}
                  </h3>
                  {item.highlight && (
                    <span className="text-[10px] font-semibold text-violet-400/70 uppercase tracking-wider">AI · Automation · Email</span>
                  )}
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-8 bg-white/5 flex-shrink-0"></div>

                {/* Description */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-bold transition-colors mb-1 sm:hidden ${item.highlight ? 'text-violet-300' : 'group-hover:text-purple-400'}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Hover arrow */}
                <ArrowRight
                  size={16}
                  className="flex-shrink-0 text-gray-700 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300 hidden md:block"
                />
              </div>

              {/* Bottom gradient bar on hover */}
              <div className={`h-0.5 bg-gradient-to-r ${item.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
