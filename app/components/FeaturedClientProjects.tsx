'use client'
import { ExternalLink, ArrowRight, Briefcase } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

type FeaturedProject = {
  id: string
  title: string
  category: string
  description: string
  shortDescription: string
  features: string[]
  technologies: string[]
  role: string
  liveLink: string
  caseStudyLink: string
  gradient: string
  imageUrl: string
  accentColor: string
}

const featuredProjects: FeaturedProject[] = [
  {
    id: 'sol-training-academy',
    title: 'SOL Training Academy',
    category: 'LMS | SaaS | CRM | Business Management',
    shortDescription: 'Multi-module training and business management platform for enterprise learning',
    description:
      'Enterprise Learning Management System for an Australian NDIS training provider. A comprehensive platform featuring role-based portals for admins and students, an interactive course player with DRM content protection, per-course discussion boards, and an automated enrollment-expiry reminder engine. Built to scale for thousands of learners with full administrative oversight.',
    features: [
      'Learning Management System',
      'Student Dashboard & Portal',
      'Admin Management Panel',
      'Client Portal Management',
      'Marketing Automation CRM',
      'API Integrations',
      'DRM Content Protection',
      'Discussion Boards',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    role: 'Full Stack Developer — Dashboard development, API integration, platform improvements, business application features',
    liveLink: 'https://training.solbusinessconsultant.com.au/',
    caseStudyLink: '/projects/sol-training-academy',
    gradient: 'from-violet-500 to-fuchsia-500',
    imageUrl: '/projects/sol-training-academy.jpg',
    accentColor: 'violet',
  },
  {
    id: 'palm-grace-memorials',
    title: 'Palm & Grace Memorials',
    category: 'Full Stack Web Application | Memorial Management',
    shortDescription: 'Digital memorial management platform for preserving memories and life stories',
    description:
      'A thoughtfully designed digital memorial platform enabling families to preserve life stories through public memorial profiles, photo galleries, video tributes, and streamlined administrative workflows. Features distinctive memorial templates, searchable directory, moderated tribute system, service & livestream information, separate family and Care Partner enquiry management, and a comprehensive admin dashboard.',
    features: [
      'Public Memorial Profiles',
      'Media Galleries & Video Support',
      'Memorial Template System',
      'Tribute Moderation Workflow',
      'QR Code Access',
      'Admin Dashboard',
      'Enquiry Management',
      'Searchable Directory',
    ],
    technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Supabase', 'Cloudinary'],
    role: 'Full Stack Developer — Frontend interfaces, backend integrations, memorial management features, deployment optimization',
    liveLink: 'https://www.palmandgrace.org/',
    caseStudyLink: '/projects/palm-grace-memorials',
    gradient: 'from-rose-500 to-pink-600',
    imageUrl: '/projects/palm-grace-memorials.jpg',
    accentColor: 'rose',
  },
  {
    id: 'ved-affiliate-marketing',
    title: 'VED Affiliate Pvt. Limited',
    category: 'Affiliate Marketing | Partner Management | Lead Tracking',
    shortDescription: 'Full-stack affiliate marketing and partner management platform',
    description:
      'A robust full-stack affiliate marketing and partner management platform designed to manage promotional campaigns, partner accounts, lead submissions, tracking workflows, and business administration. Includes partner registration and authentication, comprehensive dashboard, campaign listings, referral link management, lead submission and tracking, earnings and wallet interfaces, and administrative management features with live platform statistics.',
    features: [
      'Partner Registration & Authentication',
      'Partner Dashboard',
      'Campaign Management',
      'Referral Link Generation',
      'Lead Submission & Tracking',
      'Earnings & Wallet System',
      'Admin Management Panel',
      'Live Platform Statistics',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    role: 'Full Stack Developer — Partner-facing interfaces, campaign functionality, authentication systems, API integration, deployment',
    liveLink: 'https://vedaffiliatepvtltd.com/',
    caseStudyLink: '/projects/ved-affiliate-marketing',
    gradient: 'from-amber-500 to-orange-600',
    imageUrl: '/projects/ved-affiliate-marketing.jpg',
    accentColor: 'amber',
  },
]

export default function FeaturedClientProjects() {
  const sectionRef = useIntersectionObserver()

  return (
    <section id="featured-projects" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-semibold uppercase tracking-widest text-electric-400 mb-3">Flagship Client Work</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="block text-slate-100">Featured Client</span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl">
            Three flagship projects showcasing full-stack development expertise across enterprise platforms, digital experiences, and business solutions.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="space-y-12 animate-on-scroll">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-electric-500/30 transition-all duration-500 bg-gradient-to-br from-navy-800/30 to-navy-900/50"
            >
              {/* Accent top bar */}
              <div className={`h-1 bg-gradient-to-r ${project.gradient}`}></div>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Left: Content */}
                <div className="p-8 md:p-10 flex flex-col justify-between order-2 md:order-1">
                  {/* Project Number & Category */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-electric-500/10 border border-electric-500/30">
                        <span className="text-electric-400 font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-electric-500/10 text-electric-400 border border-electric-500/20">
                        <Briefcase size={12} /> Client Delivered
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2 group-hover:text-electric-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* Category */}
                    <p className="text-electric-400 font-semibold text-sm mb-6">{project.category}</p>

                    {/* Description */}
                    <p className="text-slate-300 leading-relaxed mb-8 text-base">
                      {project.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Key Features</p>
                      <div className="grid grid-cols-2 gap-3">
                        {project.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-electric-400 mt-1 flex-shrink-0">✓</span>
                            <span className="text-slate-300 text-sm">{feature}</span>
                          </div>
                        ))}
                        {project.features.length > 4 && (
                          <div className="flex items-start gap-2">
                            <span className="text-electric-400 mt-1 flex-shrink-0">✓</span>
                            <span className="text-slate-300 text-sm">+ {project.features.length - 4} more</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* My Role */}
                    <div className="mb-8 pt-6 border-t border-slate-700/50">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">My Role</p>
                      <p className="text-slate-300 text-sm">{project.role}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-electric-500/10 border border-electric-500/20 text-slate-300 hover:bg-electric-500/20 transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gradient-bg px-6 py-3 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                      >
                        <ExternalLink size={16} /> View Live Website
                      </a>
                      <Link
                        href={project.caseStudyLink}
                        className="px-6 py-3 rounded-lg text-sm font-semibold text-slate-100 border border-slate-700 hover:border-electric-500/40 hover:bg-electric-500/5 inline-flex items-center justify-center gap-2 transition-all"
                      >
                        View Case Study <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right: Visual Element */}
                <div className="relative h-80 md:h-auto md:min-h-96 order-1 md:order-2 bg-gradient-to-br from-slate-800/20 to-slate-900/40 flex items-center justify-center overflow-hidden group/image">
                  {/* Decorative gradient blob */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover/image:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Project Icon/Visual - Using gradient-based design */}
                  <div className="relative z-10 text-center px-6">
                    <div
                      className={`mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-20 group-hover/image:opacity-30 transition-all duration-500 mb-6`}
                    ></div>
                    <p className="text-slate-400 text-sm font-medium opacity-60 group-hover/image:opacity-100 transition-opacity">
                      {project.title}
                    </p>
                  </div>

                  {/* Animated border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 via-transparent to-electric-500/0 group-hover/image:from-electric-500/10 group-hover/image:to-electric-500/5 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-20 pt-12 border-t border-slate-700/50 grid grid-cols-3 gap-6 text-center animate-on-scroll">
          <div>
            <p className="text-3xl md:text-4xl font-bold gradient-text">3</p>
            <p className="text-slate-400 text-sm mt-2">Flagship Projects</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold gradient-text">100%</p>
            <p className="text-slate-400 text-sm mt-2">Live & Production</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold gradient-text">15+</p>
            <p className="text-slate-400 text-sm mt-2">Team Members</p>
          </div>
        </div>
      </div>
    </section>
  )
}
