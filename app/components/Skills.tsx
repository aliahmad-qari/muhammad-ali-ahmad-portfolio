'use client'
import { Code, Server, Database, CreditCard, Cloud, BrainCircuit, Globe } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const skillCategories = [
  {
    icon: <Code size={24} />,
    title: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    core: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    more: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Design', 'Redux'],
  },
  {
    icon: <Server size={24} />,
    title: 'Backend',
    color: 'from-purple-500 to-pink-500',
    core: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'],
    more: ['GraphQL', 'WebSockets', 'Microservices', 'Serverless', 'bcrypt', 'PHP', 'Laravel'],
  },
  {
    icon: <BrainCircuit size={24} />,
    title: 'AI & Automation',
    color: 'from-violet-500 to-cyan-500',
    core: ['OpenAI API', 'n8n', 'Make (Integromat)', 'AI Agents'],
    more: ['LangChain', 'Email Marketing', 'Drip Campaigns', 'Webhook Automation', 'Chatbots', 'Prompt Engineering', 'Document AI'],
  },
  {
    icon: <Globe size={24} />,
    title: 'WordPress & CMS',
    color: 'from-sky-500 to-blue-500',
    core: ['WordPress', 'Elementor', 'WooCommerce', 'Custom Themes'],
    more: ['Custom Plugins', 'ACF', 'Yoast SEO', 'WPForms', 'cPanel', 'Namecheap', 'Domain Setup', 'SSL Config'],
  },
  {
    icon: <Database size={24} />,
    title: 'Database',
    color: 'from-green-500 to-emerald-500',
    core: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    more: ['Mongoose', 'Firebase', 'Database Design', 'Query Optimization', 'ORM/ODM'],
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Payments & APIs',
    color: 'from-orange-500 to-red-500',
    core: ['Stripe', 'PayPal', 'OAuth', 'PayFast'],
    more: ['Webhooks', 'Subscription Billing', 'Third-party APIs', 'API Design'],
  },
  {
    icon: <Cloud size={24} />,
    title: 'DevOps & Hosting',
    color: 'from-indigo-500 to-purple-500',
    core: ['AWS', 'Vercel', 'cPanel', 'Namecheap'],
    more: ['Docker', 'AWS Lambda', 'Render', 'MongoDB Atlas', 'Git / GitHub', 'Postman', 'Figma'],
  },
]

export default function Skills() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-semibold uppercase tracking-widest text-electric-400 mb-3">My Toolkit</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="block text-slate-100">Technologies I</span>
            <span className="gradient-text">work with daily</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Full-stack · MERN Stack specialist · WordPress · AI Automation · Cloud Infrastructure
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover-lift animate-on-scroll group relative overflow-hidden border border-electric-500/10 flex flex-col"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              <div className="relative z-10 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10`}>
                    <span className="text-slate-100 group-hover:text-electric-400 transition-colors">
                      {category.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-electric-400 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Core Skills */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Core</p>
                  <div className="flex flex-wrap gap-2">
                    {category.core.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-electric-500/10 text-slate-200 border border-electric-500/20 hover:bg-electric-500/20 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-700/30 my-3"></div>

                {/* More Skills */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">Also</p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.more.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs text-slate-400 hover:text-slate-300 hover:border-slate-600 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mt-4`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
