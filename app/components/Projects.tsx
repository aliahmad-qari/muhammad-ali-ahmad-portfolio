'use client'
import { ExternalLink, Github, Eye, ArrowUpRight } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

type Portal = {
  name: string
  href: string
}

type Project = {
  title: string
  description: string
  tech: string[]
  link: string
  github: string | null
  gradient: string
  category: string
  /** Additional entry points (portals, dashboards) for multi-surface platforms. */
  portals?: Portal[]
}

const LMS_URL = 'https://training.solbusinessconsultant.com.au'

const projects: Project[] = [
  {
    title: 'SOL Training Academy — Enterprise LMS',
    description:
      'End-to-end Learning Management System for an Australian NDIS training provider. Role-based portals for admins and students, an interactive course player with DRM content protection and dynamic watermarking, per-course discussion boards with opt-out control, and an automated enrollment-expiry reminder engine.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    link: `${LMS_URL}/`,
    portals: [
      { name: 'Course Catalog', href: `${LMS_URL}/training-courses` },
      { name: 'Student Portal', href: `${LMS_URL}/login` },
      { name: 'Admin Panel', href: `${LMS_URL}/lms-admin` },
    ],
    github: null,
    gradient: 'from-violet-500 to-fuchsia-500',
    category: 'Client Project · Enterprise LMS',
  },
  {
    title: 'Nexus Capital — Investment Platform',
    description: 'A professional investment platform built for a financial services client. Features a clean, conversion-focused design with daily earnings tracking, investor onboarding flow, and a modern UI built for trust and credibility in the fintech space.',
    tech: ['React.js', 'Node.js', 'Tailwind CSS'],
    link: 'https://www.nexuscapitalbusiness.com',
    github: null,
    gradient: 'from-emerald-500 to-teal-500',
    category: 'Client Project · Fintech',
  },
  {
    title: 'Trade With Tayyab — LMS & Trading Academy',
    description: 'A premium Learning Management System (LMS) built for a trading academy. Includes course management, student onboarding, and a professional brand identity. Designed to position the client as a high-authority trading education platform.',
    tech: ['React.js', 'Node.js', 'Tailwind CSS'],
    link: 'https://www.tradewithtayyab.tech',
    github: null,
    gradient: 'from-yellow-500 to-amber-500',
    category: 'Client Project · EdTech',
  },
  {
    title: 'We Care Disability Service',
    description: 'Professional Australian NDIS disability support services platform with responsive UI, SEO-focused pages, service management structure, and business branding optimization.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'SEO', 'TypeScript'],
    link: 'https://wecaredisabilityservice.com.au/',
    github: null,
    gradient: 'from-blue-500 to-cyan-500',
    category: 'Client Project · NDIS',
  },
  {
    title: 'SOL Business Consultant',
    description: 'Modern business consultancy platform for SaaS solutions, automation systems, NDIS operations, digital business support, and management solutions.',
    tech: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'SEO'],
    link: 'https://www.solbusinessconsultant.com.au/',
    github: null,
    gradient: 'from-purple-500 to-pink-500',
    category: 'Client Project · Consultancy',
  },
  {
    title: 'ClickOpticX WiFi Management',
    description: 'Online WiFi management SaaS platform with package activation, user data records, and comprehensive admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'WiFi API'],
    link: 'https://clickopticx-b7xr.onrender.com/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-cyan-500 to-blue-500',
    category: 'SaaS Platform',
  },
  {
    title: 'Dibnow Repair & Shop SaaS',
    description: 'Repair & shop management SaaS with authentication, online tracking system, and payment integrations.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    link: 'https://dibnow-repair-saas.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-blue-500 to-indigo-500',
    category: 'SaaS Platform',
  },
  {
    title: 'LMS Portal',
    description: 'Learning Management System with dashboard, course management, and authentication.',
    tech: ['Next.js', 'MongoDB', 'Tailwind CSS', 'TypeScript'],
    link: 'https://lms-portal-black-six.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-green-500 to-emerald-500',
    category: 'Web Application',
  },
  {
    title: 'Real Estate Web App',
    description: 'Modern real estate marketplace with property listings, advanced search filters, pricing integration, and responsive design.',
    tech: ['Next.js', 'React', 'MongoDB', 'Stripe', 'TypeScript', 'Tailwind CSS'],
    link: 'https://real-estate-web-app-omega.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-amber-500 to-orange-500',
    category: 'Web Application',
  },
  {
    title: 'MetaCrypto Trading',
    description: 'Crypto-related responsive web application with modern interface and real-time data.',
    tech: ['React', 'CSS3', 'API Integration', 'Crypto'],
    link: 'https://metacryptotrading.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-indigo-500 to-purple-500',
    category: 'Web Application',
  },
]

export default function Projects() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          Featured Projects
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">Real-world production applications for international clients</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden hover-lift animate-on-scroll group flex flex-col"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors leading-tight">{project.title}</h3>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full border flex-shrink-0 bg-green-500/10 text-green-400 border-green-500/30">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    Live
                  </span>
                </div>
                <span className="text-xs font-medium text-purple-300/80 mb-3 block">{project.category}</span>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs hover:bg-purple-500/30 transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.portals && (
                  <div className="mb-5 pt-4 border-t border-purple-500/15">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2.5 block">
                      Platform Access
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.portals.map((portal) => (
                        <a
                          key={portal.href}
                          href={portal.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 bg-white/[0.04] border border-white/10 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all relative z-10"
                        >
                          {portal.name}
                          <ArrowUpRight size={12} className="opacity-60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-bg px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all relative z-10 flex-1 justify-center"
                  >
                    <Eye size={15} /> Live Demo
                  </a>
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:bg-purple-500/20 transition-all relative z-10 border border-purple-500/30"
                    >
                      <Github size={15} /> GitHub
                    </a>
                  ) : (
                    <span className="glass px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 border border-gray-700/50 text-gray-500 cursor-default">
                      <ExternalLink size={15} /> Private
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
