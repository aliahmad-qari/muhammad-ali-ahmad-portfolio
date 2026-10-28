import Link from 'next/link'
import ProjectGallery from './ProjectGallery'
import { featuredProjects } from '../data/featuredProjects'
export default function CaseStudy({ id }: { id: string }) {
  const project = featuredProjects.find(project => project.id === id)!
  return <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
    <header><p className="eyebrow">{project.category}</p><h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{project.title}</h1><p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">{project.description}</p><a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-7 gradient-bg px-5 py-3 rounded-lg font-semibold">Visit public website</a></header>
    <section><h2 className="text-2xl font-semibold mb-4">Project context</h2><p className="text-slate-400 leading-relaxed">{project.context}</p></section>
    <section><h2 className="text-2xl font-semibold mb-4">Experience & workflows</h2><p className="text-slate-400 leading-relaxed mb-6">{project.delivery}</p><ul className="grid sm:grid-cols-2 gap-3">{project.features.map(feature => <li key={feature} className="glass rounded-lg p-4 text-slate-300">{feature}</li>)}</ul></section>
    <section><h2 className="text-2xl font-semibold mb-5">Public website preview</h2><ProjectGallery title={project.title} screens={project.screens} /></section>
    <section className="border-t border-slate-800 pt-8"><h2 className="text-2xl font-semibold mb-4">Have a similar project?</h2><p className="text-slate-400 mb-6">Share the workflows and users you need to support. We can define the requirements before selecting the architecture and delivery milestones.</p><Link href="/enquiry" className="text-electric-400 font-semibold">Discuss your requirements</Link></section>
  </article>
}
