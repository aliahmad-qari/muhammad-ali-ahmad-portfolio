'use client'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { featuredProjects } from '../data/featuredProjects'
import ProjectGallery from './ProjectGallery'

export default function FeaturedClientProjects() {
  const sectionRef = useIntersectionObserver()
  return (
    <section id="featured-projects" ref={sectionRef} className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl animate-on-scroll">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric-400 mb-4">Selected client work</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">Real businesses.<br /><span className="gradient-text">Purpose-built platforms.</span></h2>
          <p className="text-slate-400 text-lg leading-relaxed">Explore four projects across learning, digital memorials, affiliate marketing, and independent support. See the interfaces and the workflows behind them.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <article key={project.id} className="animate-on-scroll flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-electric-500/40 transition-colors">
              <div className="p-5 md:p-7 border-b border-slate-800"><ProjectGallery title={project.title} screens={project.screens} /></div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <p className="text-xs text-electric-400 mb-3 uppercase tracking-wider">0{index + 1} / {project.category}</p>
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-100 mb-4">{project.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{project.description}</p>
                <ul className="grid sm:grid-cols-2 gap-3 mb-6">{project.features.map(feature => <li key={feature} className="text-sm text-slate-300 flex gap-2"><span className="text-electric-400" aria-hidden="true">?</span>{feature}</li>)}</ul>
                <div className="flex flex-wrap gap-2 mb-7">{project.tech.map(tech => <span key={tech} className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-400">{tech}</span>)}</div>
                <div className="flex flex-wrap gap-5 mt-auto pt-5 border-t border-slate-800">
                  <Link href={'/projects/' + project.id} className="inline-flex items-center gap-2 text-sm font-semibold text-electric-400 hover:text-electric-300">Explore case study <ArrowRight size={16} /></Link>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">Visit website <ArrowUpRight size={16} /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
