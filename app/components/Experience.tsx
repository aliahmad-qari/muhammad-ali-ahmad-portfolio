'use client'
import { useEffect, useRef } from 'react'
import { Briefcase, CheckCircle } from 'lucide-react'

export default function Experience() {
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

  const responsibilities = [
    'Developed scalable full-stack applications',
    'Implemented secure JWT authentication',
    'Integrated online payment systems',
    'Built responsive dashboards',
    'Optimized APIs for performance and scalability',
    'Deployed production apps to cloud platforms'
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text animate-on-scroll">
          Professional Experience
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 rounded-2xl animate-on-scroll">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Briefcase size={32} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">MERN Stack Developer</h3>
                <p className="text-purple-400 text-lg">ClickTake Technologies</p>
                <p className="text-gray-400">July 2023 – Present</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xl font-semibold mb-4">Key Responsibilities:</h4>
              {responsibilities.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
