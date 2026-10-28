'use client'
import { Trophy, Award } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const awards = [
  {
    icon: <Trophy size={28} />,
    title: 'Employee of the Year',
    issuer: 'ClickTake Technologies',
    year: '',
    description: 'Employee of the Year recognition listed in the supplied resume.',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: <Award size={28} />,
    title: 'Website Development Fundamentals',
    issuer: 'PNY Trainings',
    year: '2021',
    description: 'Completed comprehensive training in web development fundamentals, covering frontend and backend technologies.',
    color: 'from-blue-500 to-cyan-500',
  },
]

export default function Awards() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="awards" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-semibold uppercase tracking-widest text-electric-400 mb-3">Recognition</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="block text-slate-100">Awards &</span>
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Training and recognition listed in the supplied resume.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {awards.map((award, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover-lift animate-on-scroll group relative overflow-hidden border border-electric-500/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${award.color}`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${award.color} bg-opacity-10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`text-slate-100 group-hover:text-electric-400 transition-colors`}>
                    {award.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-electric-400 transition-colors">
                      {award.title}
                    </h3>
                    {award.year && <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${award.color} bg-opacity-10 text-slate-300`}>
                      {award.year}
                    </span>}
                  </div>
                  <p className="text-electric-400 font-semibold text-sm mb-3">
                    {award.issuer}
                  </p>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {award.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${award.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 pt-12 border-t border-slate-700/50 animate-on-scroll">
          <p className="text-slate-400 text-center">
            Continuously learning and developing skills through real-world project experience and professional development.
          </p>
        </div>
      </div>
    </section>
  )
}
