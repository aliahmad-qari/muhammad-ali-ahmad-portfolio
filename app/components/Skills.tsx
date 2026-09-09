'use client'
import { Code, Server, Database, CreditCard, Cloud, BrainCircuit } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const skillCategories = [
  {
    icon: <Code size={24} />,
    title: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'text-blue-400',
    core: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    more: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Design', 'Redux'],
    badge: null,
  },
  {
    icon: <Server size={24} />,
    title: 'Backend',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-400',
    core: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'],
    more: ['GraphQL', 'WebSockets', 'Microservices', 'Serverless', 'bcrypt', 'PHP', 'Laravel'],
    badge: null,
  },
  {
    icon: <BrainCircuit size={24} />,
    title: 'AI & Automation',
    color: 'from-violet-500 to-cyan-500',
    iconColor: 'text-violet-400',
    core: ['OpenAI API', 'n8n', 'Make (Integromat)', 'AI Agents'],
    more: ['LangChain', 'Email Marketing', 'Drip Campaigns', 'Webhook Automation', 'Chatbots', 'Prompt Engineering', 'Document AI'],
    badge: 'Featured',
  },
  {
    icon: <Database size={24} />,
    title: 'Database',
    color: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-400',
    core: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    more: ['Mongoose', 'Firebase', 'Database Design', 'Query Optimization', 'ORM/ODM'],
    badge: null,
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Payments & APIs',
    color: 'from-orange-500 to-red-500',
    iconColor: 'text-orange-400',
    core: ['Stripe', 'PayPal', 'OAuth', 'PayFast'],
    more: ['Webhooks', 'Subscription Billing', 'Third-party APIs', 'API Design'],
    badge: null,
  },
  {
    icon: <Cloud size={24} />,
    title: 'DevOps & Tools',
    color: 'from-indigo-500 to-purple-500',
    iconColor: 'text-indigo-400',
    core: ['AWS', 'Vercel', 'Docker', 'Git / GitHub'],
    more: ['AWS Lambda', 'Render', 'MongoDB Atlas', 'Clever Cloud', 'Postman', 'Figma'],
    badge: null,
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
          <p className="text-center text-gray-400 mt-3 text-sm">Full-stack development · AI automation · Email marketing</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`glass p-6 rounded-2xl hover-lift animate-on-scroll group relative overflow-hidden flex flex-col ${
                category.badge === 'Featured'
                  ? 'border border-violet-500/30 hover:border-violet-500/50'
                  : 'border border-white/5'
              }`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Hover background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500`}></div>

              {/* Featured card subtle top glow */}
              {category.badge === 'Featured' && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"></div>
              )}

              <div className="relative z-10 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-15`}></div>
                      <span className={`relative z-10 ${category.iconColor}`}>{category.icon}</span>
                    </div>
                    <h3 className="text-base font-bold group-hover:text-purple-400 transition-colors">{category.title}</h3>
                  </div>
                  {category.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 text-violet-300">
                      {category.badge}
                    </span>
                  )}
                </div>

                {/* Core skills — prominent */}
                <div className="mb-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Core</p>
                  <div className="flex flex-wrap gap-2">
                    {category.core.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.06] text-white border border-white/10 hover:border-white/20 transition-all cursor-default"
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
