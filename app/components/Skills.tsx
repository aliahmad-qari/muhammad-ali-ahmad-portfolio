'use client'
import { Code, Server, Database, CreditCard, Cloud } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const skillCategories = [
  {
    icon: <Code size={24} />,
    title: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'text-blue-400',
    core: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    more: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Design', 'Redux'],
  },
  {
    icon: <Server size={24} />,
    title: 'Backend',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-400',
    core: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'],
    more: ['GraphQL', 'WebSockets', 'Microservices', 'Serverless', 'bcrypt', 'PHP', 'Laravel'],
  },
  {
    icon: <Database size={24} />,
    title: 'Database',
    color: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-400',
    core: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    more: ['Mongoose', 'Firebase', 'Database Design', 'Query Optimization', 'ORM/ODM'],
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Payments & APIs',
    color: 'from-orange-500 to-red-500',
    iconColor: 'text-orange-400',
    core: ['Stripe', 'PayPal', 'OAuth', 'PayFast'],
    more: ['Webhooks', 'Subscription Billing', 'Third-party APIs', 'API Design'],
  },
  {
    icon: <Cloud size={24} />,
    title: 'DevOps & Tools',
    color: 'from-indigo-500 to-purple-500',
    iconColor: 'text-indigo-400',
    core: ['AWS', 'Vercel', 'Docker', 'Git / GitHub'],
    more: ['AWS Lambda', 'Render', 'MongoDB Atlas', 'Clever Cloud', 'Postman', 'Figma'],
  },
]

export default function Skills() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">My toolkit</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text">Technical Skills</h2>
          <p className="text-center text-gray-400 mt-3 text-sm">Technologies I work with daily</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl hover-lift animate-on-scroll group relative overflow-hidden flex flex-col"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Hover background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500`}></div>

              <div className="relative z-10 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10 relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-15`}></div>
                    <span className={`relative z-10 ${category.iconColor}`}>{category.icon}</span>
                  </div>
                  <h3 className="text-base font-bold group-hover:text-purple-400 transition-colors">{category.title}</h3>
                </div>

                {/* Core skills — prominent */}
                <div className="mb-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Core</p>
                  <div className="flex flex-wrap gap-2">
                    {category.core.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r ${category.color} bg-opacity-10 text-white border border-white/10 hover:border-white/20 transition-all cursor-default`}
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/5 my-3"></div>

                {/* More skills — subdued */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-2">Also</p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.more.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full text-xs text-gray-500 hover:text-gray-300 hover:border-purple-500/30 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
