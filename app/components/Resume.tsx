import { statSync } from 'node:fs'
import { join } from 'node:path'
import { Download, ExternalLink, FileText } from 'lucide-react'
import Link from 'next/link'
import { resume } from '../config/site'
export default function Resume() {
  const size = statSync(join(process.cwd(), 'public', resume.filename)).size
  const sizeLabel = size >= 1024 * 1024 ? (size / (1024 * 1024)).toFixed(1) + ' MB' : Math.round(size / 1024) + ' KB'
  const dateLabel = resume.updatedAt ? new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(resume.updatedAt)) : null
  return <section id="resume" className="py-16 md:py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p className="eyebrow">For hiring teams</p><h2 className="section-title">Experience, in one document.</h2><div className="glass rounded-2xl p-6 md:p-9 mt-8 grid md:grid-cols-[1fr_auto] gap-8 items-center">
    <div><FileText className="text-electric-400 mb-5" size={36} /><h3 className="text-2xl font-semibold mb-3">Muhammad Ali Ahmad - Resume</h3><p className="text-slate-400 max-w-2xl leading-relaxed">Review my professional experience, skills, education, and selected work. For role requirements and availability, contact me directly.</p><p className="text-sm text-slate-400 mt-4">PDF | {sizeLabel}{dateLabel ? ' | PDF metadata updated: ' + dateLabel : ''}</p><Link href="/hire-me" className="inline-block text-electric-400 mt-5 text-sm font-semibold">Explore the recruiter journey</Link></div>
    <div className="flex flex-col gap-3"><a href={resume.path} download={resume.filename} className="gradient-bg px-6 py-3 rounded-lg font-semibold inline-flex justify-center items-center gap-2"><Download size={18} />Download resume</a><a href={resume.path} target="_blank" rel="noopener noreferrer" className="border border-slate-600 px-6 py-3 rounded-lg inline-flex justify-center items-center gap-2"><ExternalLink size={18} />View PDF</a></div>
  </div></div></section>
}
