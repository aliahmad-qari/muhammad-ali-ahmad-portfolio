import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Code2, Download, MapPin } from 'lucide-react'
import { projects } from '../data/projects'
import { resume } from '../config/site'

const capabilities = ['React & Next.js', 'Node.js', 'TypeScript', 'AI & Automation']

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-950 pt-32 pb-14 sm:pt-40 sm:pb-20 lg:min-h-[850px] lg:flex lg:items-center">
      {/* Local vector artwork stays crisp and has no external image dependency. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/hero-tech.svg')] bg-cover bg-right opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-electric-400/25 bg-electric-500/10 px-3.5 py-2 text-xs sm:text-sm text-electric-400">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
              Open to remote roles & freelance projects
            </div>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Muhammad Ali Ahmad</p>
            <h1 id="hero-title" className="mt-4 max-w-2xl text-[2.7rem] leading-[1.1] font-bold tracking-[-0.045em] text-slate-100 sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
              Building software.<br />
              <span className="gradient-text">Solving business problems.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-medium text-slate-200">Full Stack Developer & AI Automation Engineer</p>
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-400">
              I build web applications, SaaS platforms, and connected workflows with React, Next.js, and Node.js. From the first idea to launch, I help turn business requirements into useful digital products.
            </p>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Core technologies">
              {capabilities.map(item => <span key={item} className="rounded-md border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-300">{item}</span>)}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/#featured-projects" className="gradient-bg inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white">
                Explore my work <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/hire-me" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-electric-400 hover:text-white">
                Let's work together
              </Link>
            </div>
            <a href={resume.path} download={resume.filename} className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-electric-400">
              <Download size={15} aria-hidden="true" /> Download resume
            </a>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-slate-700/60 pt-6">
              <div><dt className="text-xs text-slate-400">Experience</dt><dd className="mt-1 text-xl font-semibold text-slate-100">3+ years</dd></div>
              <div><dt className="text-xs text-slate-400">Projects in portfolio</dt><dd className="mt-1 text-xl font-semibold text-slate-100">{projects.length}</dd></div>
              <div><dt className="text-xs text-slate-400">Based in</dt><dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-200"><MapPin size={14} className="text-electric-400" aria-hidden="true" />Multan, Pakistan</dd></div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[430px] lg:ml-auto lg:mr-0">
            <div aria-hidden="true" className="absolute -inset-5 rounded-[2.5rem] bg-electric-500/10 blur-2xl" />
            <div className="relative rounded-[1.75rem] border border-electric-400/30 bg-slate-900/80 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                <span className="flex items-center gap-2"><Code2 size={14} className="text-electric-400" aria-hidden="true" />Developer profile</span>
                <span className="text-electric-400">Web / AI / Automation</span>
              </div>
              {/* An explicit aspect ratio gives the fill image a reliable height at every breakpoint. */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.1rem] bg-slate-800">
                <Image src="/ali2.jpeg" alt="Muhammad Ali Ahmad, Full Stack Developer" fill priority sizes="(max-width: 480px) calc(100vw - 56px), (max-width: 1023px) 404px, 33vw" className="object-cover object-top" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <p className="text-2xl font-semibold tracking-tight text-white">Muhammad Ali Ahmad</p>
                  <p className="mt-1.5 text-sm text-slate-300">Full Stack Developer</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-electric-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />Available for a conversation</div>
                </div>
              </div>
            </div>
            <div className="relative mx-5 -mt-1 rounded-b-xl border border-t-0 border-slate-700/70 bg-slate-900 px-5 py-3.5 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">From requirements to deployment</span>
              <Code2 size={17} className="shrink-0 text-electric-400" aria-hidden="true" />
            </div>
          </div>
        </div>
        <a href="#featured-projects" className="mt-10 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-electric-400 lg:mt-12"><ArrowDown size={14} aria-hidden="true" />Discover selected work</a>
      </div>
    </section>
  )
}
