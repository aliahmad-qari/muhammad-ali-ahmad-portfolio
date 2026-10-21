'use client'
import { ExternalLink, Github, Eye, ArrowUpRight, Briefcase, Filter } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useState } from 'react'

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
  clientDelivered: boolean
  featured?: boolean
  portals?: Portal[]
}

const LMS_URL = 'https://training.solbusinessconsultant.com.au'

const projects: Project[] = [
  {
    title: 'SOL Training Academy',
    description:
      'Enterprise Learning Management System for an Australian NDIS training provider. Role-based portals for admins and students, an interactive course player with DRM content protection, per-course discussion boards, and an automated enrollment-expiry reminder engine. Built to scale for thousands of learners.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    link: `${LMS_URL}/`,
    portals: [
      { name: 'Course Catalog', href: `${LMS_URL}/training-courses` },
      { name: 'Student Portal', href: `${LMS_URL}/login` },
      { name: 'Admin Panel', href: `${LMS_URL}/lms-admin` },
    ],
    github: null,
    gradient: 'from-violet-500 to-fuchsia-500',
    category: 'Client Delivered · Enterprise LMS',
    clientDelivered: true,
    featured: true,
  },
  {
    title: 'Palm & Grace Memorials',
    description:
      'Digital memorial platform for preserving life stories, photographs, videos, and memories. Features distinctive memorial templates, searchable directory, moderated tributes, service & livestream information, separate family and Care Partner enquiries, and an admin dashboard for managing content, publication, sharing links, and QR codes.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Supabase', 'Cloudinary'],
    link: 'https://www.palmandgrace.org/',
    github: null,
    gradient: 'from-rose-500 to-pink-600',
    category: 'Client Delivered · Memorial Platform',
    clientDelivered: true,
    featured: true,
  },
  {
    title: 'VED Affiliate Marketing Platform',
    description:
      'Full-stack affiliate marketing platform for financial campaigns. Partner registration, referral tracking, campaign management, customer lead capture, wallet & earnings tracking, and admin panel for lead verification and payout management. Live platform statistics and customer enquiry forms.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    link: 'https://vedaffiliatepvtltd.com/',
    github: null,
    gradient: 'from-amber-500 to-orange-600',
    category: 'Client Delivered · Affiliate / Fintech',
    clientDelivered: true,
  },
  {
    title: 'TMG180 — Freelance Marketplace',
    description:
      'Full-featured freelance marketplace where participants browse and connect with skilled workers. Worker profiles, participant portal, advanced search, and structured engagement flow for service matching.',
    tech: ['React.js', 'Node.js', 'Tailwind CSS', 'MongoDB'],
    link: 'https://tmg180-web.vercel.app/participant/browse-workers',
    github: null,
    gradient: 'from-sky-500 to-indigo-500',
    category: 'Client Delivered · Marketplace',
    clientDelivered: true,
  },
  {
    title: 'Quotex Marketing — Candle Probability Lab',
    description:
      'Quantitative research platform streaming live Binance candles with deterministic probability-based predictions. Interactive workstation across 7 spot markets, 10 timeframes, immutable prediction locks, and indicator agreement meters (EMA, RSI, MACD).',
    tech: ['React.js', 'Node.js', 'Binance API', 'WebSocket', 'Tailwind CSS'],
    link: 'https://quotex-marketing.vercel.app/',
    github: null,
    gradient: 'from-orange-500 to-rose-500',
    category: 'Client Delivered · Fintech / Trading',
    clientDelivered: true,
  },
  {
    title: 'SOL Business Consultant Hub',
    description:
      'Compliance-first consultancy hub for Australian NDIS providers and corporates. Offshore staffing, NDIS registration guidance, bookkeeping, digital transformation, and the SOL Support Academy with three progressive training levels.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'SEO', 'TypeScript'],
    link: 'https://hub.solbusinessconsultant.com.au/',
    github: null,
    gradient: 'from-teal-500 to-cyan-500',
    category: 'Client Delivered · Consultancy / NDIS',
    clientDelivered: true,
  },
  {
    title: 'Nexus Capital — Investment Platform',
    description: 'Professional investment platform for a financial services client. Clean, conversion-focused design with daily earnings tracking, investor onboarding flow, and modern UI built for trust and credibility in fintech.',
    tech: ['React.js', 'Node.js', 'Tailwind CSS'],
    link: 'https://www.nexuscapitalbusiness.com',
    github: null,
    gradient: 'from-emerald-500 to-teal-500',
    category: 'Client Delivered · Fintech',
    clientDelivered: true,
  },
  {
    title: 'Trade With Tayyab — LMS',
    description: 'Premium Learning Management System for a trading academy. Course management, student onboarding, and professional brand identity positioned as high-authority trading education platform.',
    tech: ['React.js', 'Node.js', 'Tailwind CSS'],
    link: 'https://www.tradewithtayyab.tech',
    github: null,
    gradient: 'from-yellow-500 to-amber-500',
    category: 'Client Delivered · EdTech',
    clientDelivered: true,
  },
  {
    title: 'We Care Disability Service',
    description: 'Professional Australian NDIS disability support services platform with responsive UI, SEO-focused pages, service management structure, and business branding optimization.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'SEO', 'TypeScript'],
    link: 'https://wecaredisabilityservice.com.au/',
    github: null,
    gradient: 'from-blue-500 to-cyan-500',
    category: 'Client Delivered · NDIS',
    clientDelivered: true,
  },
  {
    title: 'SOL Business Consultant',
    description: 'Modern business consultancy platform for SaaS solutions, automation systems, NDIS operations, digital business support, and management solutions.',
    tech: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'SEO'],
    link: 'https://www.solbusinessconsultant.com.au/',
    github: null,
    gradient: 'from-purple-500 to-pink-500',
    category: 'Client Delivered · Consultancy',
    clientDelivered: true,
  },
  {
    title: 'ClickOpticX WiFi Management',
    description: 'Online WiFi management SaaS platform with package activation, user data records, and comprehensive admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'WiFi API'],
    link: 'https://clickopticx-b7xr.onrender.com/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-cyan-500 to-blue-500',
    category: 'SaaS Platform',
    clientDelivered: false,
  },
  {
    title: 'Dibnow Repair & Shop SaaS',
    description: 'Repair & shop management SaaS with authentication, online tracking system, and payment integrations.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    link: 'https://dibnow-repair-saas.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-blue-500 to-indigo-500',
    category: 'SaaS Platform',
    clientDelivered: false,
  },
  {
    title: 'LMS Portal',
    description: 'Learning Management System with dashboard, course management, and authentication.',
    tech: ['Next.js', 'MongoDB', 'Tailwind CSS', 'TypeScript'],
    link: 'https://lms-portal-black-six.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-green-500 to-emerald-500',
    category: 'Web Application',
    clientDelivered: false,
  },
  {
    title: 'Real Estate Web App',
    description: 'Modern real estate marketplace with property listings, advanced search filters, pricing integration, and responsive design.',
    tech: ['Next.js', 'React', 'MongoDB', 'Stripe', 'TypeScript', 'Tailwind CSS'],
    link: 'https://real-estate-web-app-omega.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-amber-500 to-orange-500',
    category: 'Web Application',
    clientDelivered: false,
  },
  {
    title: 'MetaCrypto Trading',
    description: 'Crypto-related responsive web application with modern interface and real-time data.',
    tech: ['React', 'CSS3', 'API Integration', 'Crypto'],
    link: 'https://metacryptotrading.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-indigo-500 to-purple-500',
    category: 'Web Application',
    clientDelivered: false,
  },
]

type FilterType = 'all' | 'client'

export default function Projects() {
  const sectionRef = useIntersectionObserver()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const featuredProjects = projects.filter(p => p.featured)
  const allProjects = projects.filter(p => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'client') return p.clientDelivered
    return true
  })

  const ProjectCard = ({ project, isFeatured = false }: { project: Project; isFeatured?: boolean }) => (
    <div
      className={`group relative overflow-hidden rounded-2xl hover-lift transition-all ${
        isFeatured
          ? 'lg:col-span-2 bg-gradient-to-br from-navy-800/50 to-navy-900/50 border border-electric-500/30'
          : 'glass'
      }`}
    >
      {/* Gradient bar */}
      <div className={`h-1 bg-gradient-to-r ${project.gradient}`}></div>

      <div className="p-6 md:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className={`font-bold text-slate-100 group-hover:text-electric-400 transition-colors ${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
            {project.title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full border bg-electric-500/10 text-electric-400 border-electric-500/30">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-electric-400 opacity-75 animate-pulse"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-electric-500"></span>
              </span>
              Live
            </span>
            {project.clientDelivered && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Briefcase size={10} /> Client
              </span>
            )}
          </div>
        </div>

        {/* Category */}
        <p className={`text-electric-400 font-medium mb-3 ${isFeatured ? 'text-base' : 'text-xs'}`}>
          {project.category}
        </p>

        {/* Description */}
        <p className={`text-slate-400 leading-relaxed flex-1 mb-4 ${isFeatured ? 'text-base' : 'text-sm'}`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium bg-electric-500/10 border border-electric-500/20 rounded-full text-slate-300 hover:bg-electric-500/20 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Portals */}
        {project.portals && (
          <div className="mb-6 pt-4 border-t border-slate-700/50">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Platform Access</p>
            <div className="flex flex-wrap gap-2">
              {project.portals.map((portal) => (
                <a
                  key={portal.href}
                  href={portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/50 border border-slate-700 hover:text-electric-400 hover:border-electric-500/40 hover:bg-electric-500/5 transition-all"
                >
                  {portal.name}
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex gap-3 mt-auto">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg px-4 py-2 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2 hover:scale-105 transition-transform flex-1 justify-center"
          >
            <Eye size={15} /> Live Demo
          </a>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 transition-all inline-flex items-center gap-2"
            >
              <Github size={15} /> Code
            </a>
          ) : (
            <span className="px-4 py-2 rounded-lg text-sm text-slate-600 border border-slate-700/50 inline-flex items-center gap-2 cursor-default">
              <ExternalLink size={15} /> Private
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-semibold uppercase tracking-widest text-electric-400 mb-3">Featured Work</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="block text-slate-100">Real projects for</span>
            <span className="gradient-text">international clients</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            25+ projects delivered. From enterprise LMS platforms to memorial sites, fintech systems to SaaS applications—all built to production standards.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-sm font-semibold text-slate-400 mb-6 uppercase tracking-widest">Flagship Projects</p>
          <div className="grid lg:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} isFeatured={true} />
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-10 animate-on-scroll">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === 'all'
                ? 'gradient-bg text-white'
                : 'glass text-slate-400 border border-slate-700 hover:text-slate-200'
            }`}
          >
            <Filter size={14} className="inline mr-2" />
            All Projects ({allProjects.length})
          </button>
          <button
            onClick={() => setActiveFilter('client')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-2 ${
              activeFilter === 'client'
                ? 'gradient-bg text-white'
                : 'glass text-slate-400 border border-slate-700 hover:text-slate-200'
            }`}
          >
            <Briefcase size={14} />
            Client Delivered ({projects.filter(p => p.clientDelivered).length})
          </button>
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
          {allProjects.filter(p => !p.featured).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 pt-12 border-t border-slate-700/50 flex flex-wrap gap-8 justify-center text-center animate-on-scroll">
          <div>
            <p className="text-3xl font-bold gradient-text">{projects.length}+</p>
            <p className="text-slate-400 text-sm mt-1">Projects</p>
          </div>
          <div>
            <p className="text-3xl font-bold gradient-text">{projects.filter(p => p.clientDelivered).length}</p>
            <p className="text-slate-400 text-sm mt-1">Client Delivered</p>
          </div>
          <div>
            <p className="text-3xl font-bold gradient-text">100%</p>
            <p className="text-slate-400 text-sm mt-1">Live & Production</p>
          </div>
        </div>
      </div>
    </section>
  )
}
