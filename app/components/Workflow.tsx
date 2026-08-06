'use client'
import { ExternalLink } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const steps = [
  { step: '01', title: 'Planning', desc: 'Requirements gathering, architecture design, and project roadmap definition.', color: 'from-blue-500 to-cyan-500' },
  { step: '02', title: 'UI/UX Design', desc: 'Wireframing, responsive design, and component structure planning with Figma.', color: 'from-purple-500 to-pink-500' },
  { step: '03', title: 'Development', desc: 'Clean, modular code with best practices, TypeScript, and proper state management.', color: 'from-green-500 to-emerald-500' },
  { step: '04', title: 'Testing', desc: 'API testing with Postman, cross-browser testing, and performance profiling.', color: 'from-orange-500 to-red-500' },
  { step: '05', title: 'Deployment', desc: 'CI/CD pipelines, Vercel/AWS deployment, environment configuration, and monitoring.', color: 'from-cyan-500 to-blue-500' },
  { step: '06', title: 'Optimization', desc: 'Performance tuning, SEO optimization, caching, and ongoing maintenance.', color: 'from-indigo-500 to-purple-500' },
]

const clients = [
  {
    name: 'SOL Training Academy',
    url: 'https://training.solbusinessconsultant.com.au/',
    desc: 'Enterprise MERN learning platform with DRM-protected courses, role-based portals & automated expiry reminders — Australia',
    badge: 'Current Client',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    name: 'SOL Business Consultant',
    url: 'https://www.solbusinessconsultant.com.au/',
    desc: 'SaaS solutions, automation, NDIS operations & digital business services — Australia',
    badge: 'Current Client',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    name: 'We Care Disability Service',
    url: 'https://wecaredisabilityservice.com.au/',
    desc: 'NDIS disability support services platform — Australia',
    badge: 'Client Project',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'ClickTake Technologies',
    url: 'https://www.clicktaketech.com/',
    desc: 'SaaS platforms, AI systems, WiFi management & business web applications',
    badge: 'Previous Employer',
    badgeColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    gradient: 'from-cyan-500 to-purple-500',
  },
]

export default function Workflow() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="workflow" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Development Workflow */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          Development Workflow
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">My structured approach to delivering quality software</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl hover-lift animate-on-scroll group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className={`text-4xl font-black mb-3 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>{step.step}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Client & Company Experience */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          Client & Company Experience
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">Trusted by real businesses and international companies</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl hover-lift animate-on-scroll group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${client.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className={`h-1 bg-gradient-to-r ${client.gradient} rounded-full mb-5`}></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors leading-tight">{client.name}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full border flex-shrink-0 ${client.badgeColor}`}>
                    {client.badge}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{client.desc}</p>
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors"
                >
                  Visit Website <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
