'use client'
import { Monitor, LayoutDashboard, Server, Bot, CreditCard, Settings2, Layers, Mail, Workflow, BrainCircuit } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const services = [
  {
    icon: <Monitor size={32} />,
    title: 'Full Stack Development',
    desc: 'End-to-end web applications using React.js, Next.js, Node.js, Express.js, and MongoDB.',
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'text-blue-400',
    tag: null,
  },
  {
    icon: <Layers size={32} />,
    title: 'SaaS Platforms',
    desc: 'Multi-tenant SaaS systems with subscription management, role-based access, and scalable architecture.',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-400',
    tag: null,
  },
  {
    icon: <BrainCircuit size={32} />,
    title: 'AI Integration',
    desc: 'OpenAI GPT, Claude, Gemini integrations — AI chatbots, document intelligence, smart search, and AI-powered features built directly into your web apps.',
    color: 'from-violet-500 to-purple-500',
    iconColor: 'text-violet-400',
    tag: 'New',
  },
  {
    icon: <Workflow size={32} />,
    title: 'AI Automation Workflows',
    desc: 'End-to-end business automation using n8n, Make (Integromat), and custom pipelines — inbox triage, report generation, data processing, and workflow orchestration.',
    color: 'from-cyan-500 to-teal-500',
    iconColor: 'text-cyan-400',
    tag: 'New',
  },
  {
    icon: <Mail size={32} />,
    title: 'Email Marketing Systems',
    desc: 'Automated drip campaigns, lead nurturing sequences, list segmentation, broadcast management, and full email funnel infrastructure for client businesses.',
    color: 'from-pink-500 to-rose-500',
    iconColor: 'text-pink-400',
    tag: 'New',
  },
  {
    icon: <LayoutDashboard size={32} />,
    title: 'Admin Dashboards',
    desc: 'Feature-rich admin panels with real-time data, analytics, charts, and user management.',
    color: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-400',
    tag: null,
  },
  {
    icon: <Server size={32} />,
    title: 'REST APIs',
    desc: 'Secure, scalable, and well-documented REST APIs with JWT authentication and rate limiting.',
    color: 'from-orange-500 to-red-500',
    iconColor: 'text-orange-400',
    tag: null,
  },
  {
    icon: <CreditCard size={32} />,
    title: 'Payment Gateway Integration',
    desc: 'Stripe, PayPal, PayFast, and custom payment flows with webhooks and subscription billing.',
    color: 'from-yellow-500 to-orange-500',
    iconColor: 'text-yellow-400',
    tag: null,
  },
  {
    icon: <Settings2 size={32} />,
    title: 'Business Automation Systems',
    desc: 'Custom automation workflows, CRM integrations, and business process digitization.',
    color: 'from-indigo-500 to-purple-500',
    iconColor: 'text-indigo-400',
    tag: null,
  },
]

export default function Services() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="services" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 animate-on-scroll">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">What I offer</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text">Services I Provide</h2>
          <p className="text-center text-gray-400 mt-3 text-sm">Full-stack development · AI automation · Email marketing — all under one roof</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl hover-lift animate-on-scroll group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${service.iconColor} transition-colors duration-300`}>{service.icon}</div>
                  {service.tag && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-300">
                      {service.tag}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <a href="#contact" className="gradient-bg px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all">
            Discuss Your Project →
          </a>
        </div>
      </div>
    </section>
  )
}
