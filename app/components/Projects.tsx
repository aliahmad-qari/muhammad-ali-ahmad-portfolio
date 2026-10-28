'use client'
import { ExternalLink, Github, Eye, ArrowUpRight, Briefcase, Filter } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useState } from 'react'

import { projects, type Project } from '../data/projects'
import { featuredProjects } from '../data/featuredProjects'
type FilterType = 'all' | 'client'

export default function Projects() {
  const sectionRef = useIntersectionObserver()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  
  const additionalProjects = projects.filter(p => !featuredProjects.some(featured => featured.id === p.id))
  const allProjects = additionalProjects.filter(p => {
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
              Project
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
            href={project.publicLink || project.link}
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
              <Github size={15} /> GitHub profile
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
    <section id="projects" ref={sectionRef} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-semibold uppercase tracking-widest text-electric-400 mb-3">More Work</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="block text-slate-100">More solutions for</span>
            <span className="gradient-text">international clients</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Explore additional work across learning platforms, business websites, and web applications. Selected case studies appear above.
          </p>
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
            All Projects ({additionalProjects.length})
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
            Client Delivered ({additionalProjects.filter(p => p.clientDelivered).length})
          </button>
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
          {allProjects.filter(p => !p.featured && !p.title.startsWith('VED Affiliate') && !p.title.startsWith('TMG180')).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 pt-12 border-t border-slate-700/50 flex flex-wrap gap-8 justify-center text-center animate-on-scroll">
          <div>
            <p className="text-3xl font-bold gradient-text">{projects.length}</p>
            <p className="text-slate-400 text-sm mt-1">Listed projects</p>
          </div>
          <div>
            <p className="text-3xl font-bold gradient-text">{projects.filter(p => p.clientDelivered).length}</p>
            <p className="text-slate-400 text-sm mt-1">Client Delivered</p>
          </div>
          <div>
            <p className="text-3xl font-bold gradient-text">{featuredProjects.length}</p>
            <p className="text-slate-400 text-sm mt-1">Case studies</p>
          </div>
        </div>
      </div>
    </section>
  )
}
