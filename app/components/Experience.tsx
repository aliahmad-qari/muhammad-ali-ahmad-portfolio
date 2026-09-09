'use client'
import { Briefcase, CheckCircle, ExternalLink, MapPin, Calendar } from 'lucide-react'
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
        'Architected and shipped SOL Training Academy — a production MERN LMS with role-based admin/student portals, DRM-protected course delivery, and automated enrollment-expiry reminders',
        'Developing and maintaining modern business web applications and internal management systems',
        'Building scalable frontend applications using React.js and Next.js with optimized rendering',
        'Developing backend APIs and business logic using Node.js and Express.js',
        'Managing cloud deployment, performance optimization, and responsive UI/UX development',
        'Delivered scalable solutions for real-world clients across SaaS, dashboards & management platforms',
        'Improved application performance through API optimization and efficient database architecture',
      ],
      gradient: 'from-purple-500 to-blue-500',
      badge: 'Current',
      badgeStyle: 'bg-green-500/15 text-green-400 border-green-500/30',
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
      gradient: 'from-cyan-500 to-purple-500',
      badge: 'Previous',
      badgeStyle: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
    },
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Work history</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text">Professional Experience</h2>
          <p className="text-center text-gray-400 mt-3 text-sm">3+ years · Onsite · Hybrid · Remote</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline wrapper */}
          <div className="relative">
            {/* Vertical rail */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-transparent hidden md:block"></div>

            <div className="space-y-10">
              {jobs.map((job, index) => (
                <div key={index} className="relative animate-on-scroll" style={{ animationDelay: `${index * 0.15}s` }}>
                  {/* Timeline dot */}
                  <div className={`absolute left-3.5 top-8 w-5 h-5 rounded-full border-2 hidden md:flex items-center justify-center z-10 ${index === 0 ? 'border-purple-400 bg-purple-500/30' : 'border-gray-600 bg-gray-800'}`}>
                    {index === 0 && (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping absolute"></span>
                    )}
                    <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-purple-400' : 'bg-gray-500'}`}></span>
                  </div>

                  {/* Card — offset to the right of the rail on md+ */}
                  <div className="md:ml-16 glass rounded-2xl overflow-hidden hover-lift group relative">
                    {/* Top gradient bar */}
                    <div className={`h-1 bg-gradient-to-r ${job.gradient}`}></div>

                    <div className="p-7">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-500/15 rounded-xl flex-shrink-0">
                            <Briefcase size={22} className="text-purple-400" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold">{job.role}</h3>
                              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${job.badgeStyle}`}>
                                {job.badge}
                              </span>
                            </div>
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 font-semibold hover:text-purple-300 transition-colors inline-flex items-center gap-1 text-sm"
                            >
                              {job.company} <ExternalLink size={13} />
                            </a>
                          </div>
                        </div>

                        {/* Date + location chips */}
                        <div className="flex flex-col items-end gap-1.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} className="text-purple-400/70" /> {job.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-blue-400/70" /> {job.type}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm mb-5 leading-relaxed border-l-2 border-purple-500/30 pl-4">{job.description}</p>

                      {/* Responsibilities */}
                      <div className="space-y-2.5">
                        {job.responsibilities.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle size={15} className="text-green-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${job.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
