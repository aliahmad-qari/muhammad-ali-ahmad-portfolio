'use client'
import { useEffect, useRef } from 'react'
import { GraduationCap, Calendar, BookOpen, Award } from 'lucide-react'

export default function Education() {
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

  const courses = [
    { name: 'Web Development', color: 'from-blue-500 to-cyan-500' },
    { name: 'Artificial Intelligence', color: 'from-purple-500 to-pink-500' },
    { name: 'Data Structures', color: 'from-green-500 to-emerald-500' },
    { name: 'OOP', color: 'from-orange-500 to-red-500' },
    { name: 'Operating Systems', color: 'from-indigo-500 to-purple-500' },
    { name: 'DBMS', color: 'from-cyan-500 to-blue-500' },
    { name: 'Digital Logic Design', color: 'from-pink-500 to-rose-500' },
    { name: 'Theory of Automata', color: 'from-teal-500 to-green-500' },
    { name: 'Linear Algebra', color: 'from-violet-500 to-purple-500' },
    { name: 'Differential Equations', color: 'from-amber-500 to-orange-500' },
    { name: 'PHP', color: 'from-blue-500 to-indigo-500' },
    { name: 'SQL', color: 'from-green-500 to-teal-500' },
    { name: 'MongoDB', color: 'from-emerald-500 to-green-500' },
    { name: 'React Native', color: 'from-cyan-500 to-blue-500' }
  ]

  return (
    <section id="education" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          Education
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">Academic background and qualifications</p>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 md:p-10 rounded-2xl hover-lift animate-on-scroll relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-6 mb-6">
                <div className="p-4 glass rounded-xl group hover:scale-110 transition-transform animate-float">
                  <GraduationCap size={40} className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Bachelor of Science in Computer Science</h3>
                  <p className="text-xl text-purple-400 mb-2">Bahauddin Zakariya University, Multan</p>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={18} className="text-blue-400 animate-pulse" />
                    <span>2022 – 2026</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={24} className="text-green-400 animate-bounce" />
                  <h4 className="text-xl font-semibold">Relevant Courses</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {courses.map((course, idx) => (
                    <span 
                      key={idx} 
                      className={`px-4 py-2 glass rounded-full text-sm font-medium border border-transparent hover:border-purple-500/50 transition-all duration-300 cursor-default group relative overflow-hidden hover:scale-110 animate-on-scroll`}
                      style={{animationDelay: `${idx * 0.05}s`}}
                    >
                      <span className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></span>
                      <span className="relative z-10">{course.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-purple-500/20">
                <Award size={24} className="text-yellow-400 animate-pulse" />
                <p className="text-gray-300">Currently pursuing degree with focus on Full-Stack Development and AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
