'use client'
import { useEffect, useRef } from 'react'
import { Code, Server, Database, CreditCard, Cloud } from 'lucide-react'

export default function Skills() {
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

  const skillCategories = [
    {
      icon: <Code size={32} />,
      title: 'Frontend',
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-400 group-hover:text-cyan-400',
      skills: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Responsive Design', 'Redux']
    },
    {
      icon: <Server size={32} />,
      title: 'Backend',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400 group-hover:text-pink-400',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'bcrypt', 'PHP', 'Laravel', 'GraphQL', 'WebSockets', 'API Integration', 'Microservices', 'Serverless Functions']
    },
    {
      icon: <Database size={32} />,
      title: 'Database',
      color: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-400 group-hover:text-emerald-400',
      skills: ['MongoDB', 'Mongoose', 'SQL', 'MySQL', 'PostgreSQL', 'Firebase', 'Redis', 'Database Design', 'Query Optimization', 'ORM/ODM Tools']
    },
    {
      icon: <CreditCard size={32} />,
      title: 'Payment & Integrations',
      color: 'from-orange-500 to-red-500',
      iconColor: 'text-orange-400 group-hover:text-red-400',
      skills: ['Stripe', 'PayPal', 'PayFast', 'Third-party APIs', 'OAuth', 'Payment Gateways']
    },
    {
      icon: <Cloud size={32} />,
      title: 'Deployment & Tools',
      color: 'from-indigo-500 to-purple-500',
      iconColor: 'text-indigo-400 group-hover:text-purple-400',
      skills: ['Git', 'GitHub', 'Postman', 'Figma', 'VS Code', 'Vercel', 'AWS', 'AWS Lambda', 'Render', 'Clever Cloud', 'MongoDB Atlas', 'Docker']
    }
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          Technical Skills
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">Technologies I work with daily</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="glass p-6 rounded-2xl hover-lift animate-on-scroll group relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className={`${category.iconColor} mb-4 transition-colors duration-300`}>{category.icon}</div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition-colors">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-gray-300 hover:bg-purple-500/20 hover:border-purple-500/50 hover:scale-105 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
