'use client'
import { MapPin, Globe, CheckCircle, Rocket, Coffee, Heart } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const highlights = [
  { icon: <Rocket size={18} />, title: 'What I build', desc: 'SaaS platforms, enterprise LMS, fintech tools, NDIS portals — production apps for real businesses.' },
  { icon: <Globe size={18} />, title: 'Who I work with', desc: 'International clients across Australia, UK, and Pakistan — remote-first, async-friendly.' },
  { icon: <Coffee size={18} />, title: 'How I work', desc: 'Clean architecture, CI/CD, proper docs. I treat your codebase like I\'ll maintain it forever.' },
  { icon: <Heart size={18} />, title: 'What drives me', desc: 'I get the most satisfaction shipping something real that solves a real problem — not just demos.' },
]

const coreStack = [
  { label: 'React / Next.js', level: 95 },
  { label: 'Node.js / Express', level: 92 },
  { label: 'MongoDB / SQL', level: 88 },
  { label: 'TypeScript', level: 85 },
  { label: 'AWS / DevOps', level: 75 },
]

export default function About() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Get to know me</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — story + highlights */}
          <div className="animate-on-scroll space-y-6">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-purple-400">The story</h3>
              <p className="text-gray-300 leading-relaxed text-base mb-4">
                I'm a Full Stack Developer based in Multan, Pakistan with 3+ years building production-ready web applications — SaaS platforms, enterprise systems, fintech tools, and AI-powered apps for international clients.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm">
                I started with freelance projects during university, grew into a full-time role at ClickTake Technologies, and now work remotely for SOL Business Consultant in Australia. Every project sharpened my ability to ship fast, scale right, and communicate clearly across time zones.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500/15 to-blue-500/15 border border-purple-500/25 rounded-full text-xs font-medium">
                  <MapPin size={12} className="text-purple-400" /> Multan, Pakistan
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500/15 to-emerald-500/15 border border-green-500/25 rounded-full text-xs font-medium text-green-300">
                  <CheckCircle size={12} /> Open to Opportunities
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 border border-blue-500/25 rounded-full text-xs font-medium">
                  <Globe size={12} className="text-blue-400" /> Onsite · Hybrid · Remote
                </span>
              </div>
            </div>

            {/* 4 personality highlights */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="glass p-5 rounded-xl group hover:bg-purple-500/5 transition-colors animate-on-scroll" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="text-purple-400 mb-2 group-hover:text-cyan-400 transition-colors">{h.icon}</div>
                  <p className="text-sm font-semibold mb-1">{h.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — core stack proficiency */}
          <div className="animate-on-scroll space-y-6">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6 text-purple-400">Core stack proficiency</h3>
              <div className="space-y-5">
                {coreStack.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-gray-200">{item.label}</span>
                      <span className="text-xs font-bold text-purple-400">{item.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-on-scroll"
                        style={{ width: `${item.level}%`, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What I'm currently doing */}
            <div className="glass p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/15 to-blue-500/15 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider">Currently</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Full Stack Developer at <span className="text-purple-400 font-semibold">SOL Business Consultant</span> (Australia, Remote) — building enterprise LMS, NDIS compliance portals, and AI-powered business automation systems.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Next.js', 'Node.js', 'MongoDB', 'AWS', 'Tailwind CSS'].map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
