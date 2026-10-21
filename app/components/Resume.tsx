'use client'
import { Download, Eye, FileText, CheckCircle } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function Resume() {
  const sectionRef = useIntersectionObserver()
  const resumePath = '/Muhammad-Ali-Ahmad-FullStackAndAIENG-Resume.pdf'

  const resumeHighlights = [
    {
      icon: <CheckCircle size={18} />,
      text: 'Full Stack Developer with 3+ years experience',
    },
    {
      icon: <CheckCircle size={18} />,
      text: 'MERN Stack specialist | WordPress & AI Automation',
    },
    {
      icon: <CheckCircle size={18} />,
      text: '25+ production projects delivered for international clients',
    },
    {
      icon: <CheckCircle size={18} />,
      text: 'Currently: Full Stack Developer at SOL Business Consultant, Australia',
    },
    {
      icon: <CheckCircle size={18} />,
      text: 'Previously: MERN Stack Developer at ClickTake Technologies',
    },
    {
      icon: <CheckCircle size={18} />,
      text: 'Specialized in SaaS, LMS, fintech, and business automation',
    },
  ]

  return (
    <section id="resume" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-semibold uppercase tracking-widest text-electric-400 mb-3">Professional Document</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="block text-slate-100">Download My</span>
            <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Complete professional profile with experience, skills, education, awards, and project highlights.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Document Preview */}
          <div className="animate-on-scroll">
            {/* PDF Preview Card */}
            <div className="glass rounded-2xl p-8 hover-lift relative overflow-hidden border border-electric-500/10">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-500/5 to-cyan-500/5"></div>

              <div className="relative z-10">
                {/* Document Icon */}
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-32 bg-gradient-to-br from-electric-500/20 to-cyan-500/20 rounded-lg border-2 border-electric-500/30 flex flex-col items-center justify-center relative">
                    <FileText size={40} className="text-electric-400 mb-2" />
                    <span className="text-xs font-bold text-slate-400">PDF</span>
                    <div className="absolute top-2 right-2 w-3 h-3 bg-electric-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Document Info */}
                <div className="text-center mb-6">
                  <p className="text-sm font-semibold text-slate-300 mb-1">Muhammad-Ali-Ahmad-FullStackAndAIENG-Resume.pdf</p>
                  <p className="text-xs text-slate-500">Professional resume • Always up to date</p>
                </div>

                {/* Highlights */}
                <div className="space-y-3 pt-6 border-t border-slate-700/50">
                  {resumeHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-electric-400 flex-shrink-0 mt-0.5">{highlight.icon}</span>
                      <span className="text-slate-300">{highlight.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — CTAs & Info */}
          <div className="space-y-6 animate-on-scroll">
            {/* Primary CTA - Download */}
            <div>
              <p className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-widest">Download Resume</p>
              <a
                href={resumePath}
                download="Muhammad-Ali-Ahmad-FullStackAndAIENG-Resume.pdf"
                className="gradient-bg w-full px-8 py-5 rounded-lg font-bold text-white inline-flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg shadow-electric-500/30"
              >
                <Download size={22} />
                Download PDF (2.4 MB)
              </a>
              <p className="text-xs text-slate-500 mt-3 text-center">Works on desktop & mobile</p>
            </div>

            {/* Secondary CTA - View in Browser */}
            <div>
              <p className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-widest">View Online</p>
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-8 py-5 rounded-lg font-bold text-electric-400 inline-flex items-center justify-center gap-3 border-2 border-electric-500/50 hover:bg-electric-500/10 hover:border-electric-500 transition-all"
              >
                <Eye size={22} />
                Open in New Tab
              </a>
              <p className="text-xs text-slate-500 mt-3 text-center">View PDF in your browser</p>
            </div>

            {/* Info Box */}
            <div className="glass rounded-xl p-6 border border-slate-700/50">
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="text-electric-400 font-semibold">My resume is the source of truth</span> for professional experience, technical skills, project details, and certifications. Last updated: December 2025.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass rounded-lg p-4 text-center">
                <p className="text-2xl font-bold gradient-text">3+</p>
                <p className="text-xs text-slate-500 mt-1">Years Pro</p>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <p className="text-2xl font-bold gradient-text">25+</p>
                <p className="text-xs text-slate-500 mt-1">Projects</p>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <p className="text-2xl font-bold gradient-text">100%</p>
                <p className="text-xs text-slate-500 mt-1">Satisfied</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Contact */}
        <div className="mt-16 pt-12 border-t border-slate-700/50 text-center animate-on-scroll">
          <p className="text-slate-400 mb-4">
            Have questions about my background or experience?
          </p>
          <a
            href="#contact"
            className="text-electric-400 font-semibold hover:text-electric-300 transition-colors inline-flex items-center gap-2"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </section>
  )
}
