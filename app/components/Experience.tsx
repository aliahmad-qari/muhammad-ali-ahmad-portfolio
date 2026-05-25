'use client'
import { Briefcase, CheckCircle, ExternalLink } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function Experience() {
  const sectionRef = useIntersectionObserver()

  const jobs = [
    {
      role: 'Full Stack Developer',
      company: 'SOL Business Consultant',
      url: 'https://www.solbusinessconsultant.com.au/',
      period: 'Dec 2025 – Present',
      type: 'Australia · Remote',
      description: 'Australian business consultancy providing NDIS compliance, company registration, payroll, bookkeeping, and digital solutions.',
      responsibilities: [
        'Developing and maintaining modern business web applications and internal management systems',
        'Building scalable frontend applications using React.js and Next.js with optimized rendering',
        'Developing backend APIs and business logic using Node.js and Express.js',
        'Managing cloud deployment, performance optimization, and responsive UI/UX development',
        'Delivered scalable solutions for real-world clients across SaaS, dashboards & management platforms',
        'Improved application performance through API optimization and efficient database architecture',
      ],
      color: 'from-purple-500 to-blue-500',
      badge: 'Current',
    },
    {
      role: 'Full Stack Developer',
      company: 'ClickTake Technologies',
      url: 'https://www.clicktaketech.com/',
      period: 'Jul 2023 – Nov 2025',
      type: 'Multan, Pakistan · Onsite',
      description: 'Software and digital solutions company specializing in full-stack web development, SaaS platforms, APIs, and business management systems.',
      responsibilities: [
        'Designed and developed full-stack web applications using React.js, Node.js, Express.js & MongoDB',
        'Built and deployed production-ready SaaS applications for real business clients',
        'Implemented secure authentication systems using JWT and bcrypt encryption',
        'Integrated payment gateways including Stripe, PayPal, and PayFast for e-commerce solutions',
        'Built responsive, mobile-first user interfaces using Tailwind CSS and Bootstrap',
        'Deployed and managed applications on Vercel, Render, AWS, and MongoDB Atlas',
      ],
      color: 'from-cyan-500 to-purple-500',
      badge: 'Previous',
    },
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          Professional Experience
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">3+ years building production-ready applications — Onsite, Hybrid & Remote</p>

        <div className="max-w-4xl mx-auto space-y-8">
          {jobs.map((job, index) => (
            <div key={index} className="glass p-8 rounded-2xl animate-on-scroll hover-lift relative overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${job.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-lg flex-shrink-0">
                    <Briefcase size={32} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="text-2xl font-bold">{job.role}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${job.badge === 'Current' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                        {job.badge}
                      </span>
                    </div>
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 text-lg font-semibold hover:text-purple-300 transition-colors inline-flex items-center gap-1">
                      {job.company} <ExternalLink size={14} />
                    </a>
                    <div className="flex flex-wrap gap-3 mt-1 text-gray-400 text-sm">
                      <span>{job.period}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">{job.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold mb-3">Key Responsibilities:</h4>
                  {job.responsibilities.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{item}</p>
                    </div>
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
