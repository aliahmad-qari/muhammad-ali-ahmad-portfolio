'use client'
import { Download, Briefcase, ArrowRight, Sparkles, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [animatedTitle, setAnimatedTitle] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  
  const titleWords = ['Full-Stack', 'Developer', '|', 'Building', 'Scalable', 'Web', '&', 'SaaS', 'Applications']
  const colors = ['text-blue-400', 'text-purple-400', 'text-gray-400', 'text-cyan-400', 'text-pink-400', 'text-green-400', 'text-gray-400', 'text-orange-400', 'text-indigo-400']

  useEffect(() => {
    if (currentWordIndex < titleWords.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(currentWordIndex + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [currentWordIndex])

  useEffect(() => {
    // Create floating particles
    const particles = document.querySelector('.particles')
    if (particles) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.animationDelay = Math.random() * 20 + 's'
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's'
        particles.appendChild(particle)
      }
    }
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="particles"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-slideUp">
            <div className="flex items-center gap-2 mb-4 animate-fadeIn">
              <Sparkles className="text-purple-400 animate-pulse" size={24} />
              <span className="text-purple-400 font-semibold">Welcome to my portfolio</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              {['Muhammad', 'Ali', 'Ahmad'].map((word, idx) => (
                <span 
                  key={idx} 
                  className="inline-block mr-4 animate-fadeIn"
                  style={{animationDelay: `${idx * 0.2}s`, opacity: 0, animationFillMode: 'forwards'}}
                >
                  {word}
                </span>
              ))}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 min-h-[80px]">
              {titleWords.map((word, idx) => (
                <span 
                  key={idx}
                  className={`inline-block mr-2 transition-all duration-500 ${
                    idx < currentWordIndex ? `${colors[idx]} scale-100 opacity-100` : 'scale-0 opacity-0'
                  }`}
                >
                  {word}
                </span>
              ))}
            </h2>
            <div className="flex items-center gap-2 mb-6 text-gray-400">
              <MapPin size={18} className="text-purple-400" />
              <span>Multan, Pakistan • Available for Remote Work Worldwide</span>
            </div>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              I design and develop modern, high-performance, scalable digital solutions using React, Node.js, MongoDB, and cloud technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="gradient-bg px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition-all relative z-10">
                View Projects <ArrowRight size={20} />
              </a>
              <a href="#contact" className="glass px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover-lift">
                Hire Me <Briefcase size={20} />
              </a>
              <a href="/remote%20CV.pdf" download="Muhammad_Ali_Ahmad_CV.pdf" target="_blank" rel="noopener noreferrer" className="border-2 border-purple-500 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-500/20 hover:border-purple-400 transition-all">
                Download CV <Download size={20} />
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/50 glow">
                <img src="/ali.jpg" alt="Muhammad Ali Ahmad" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute -bottom-4 -right-4 glass px-6 py-3 rounded-full font-semibold animate-bounce">
                <span className="gradient-text">Available for Hire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
