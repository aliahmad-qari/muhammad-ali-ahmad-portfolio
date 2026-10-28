'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, FileText } from 'lucide-react'
import { resume } from '../config/site'
const links = [
  { name: 'Projects', href: '/#featured-projects' },
  { name: 'Services', href: '/services' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Hire Me', href: '/hire-me' },
  { name: 'Contact', href: '/#contact' },
]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  useEffect(() => { const update = () => setScrolled(window.scrollY > 40); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update) }, [])
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [open])
  return <nav aria-label="Main navigation" className={'fixed top-0 w-full z-50 border-b border-slate-800/60 ' + (scrolled || open ? 'bg-slate-950/95 backdrop-blur-md' : 'bg-slate-950/85')}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-20">
      <Link href="/" aria-label="Muhammad Ali Ahmad, home" className="flex items-center gap-3"><span className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center font-bold">MA</span><span className="hidden sm:block"><span className="block font-semibold text-sm">Muhammad Ali</span><span className="block text-xs text-electric-400">Full Stack Developer</span></span></Link>
      <div className="hidden lg:flex items-center gap-1">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined} className={'px-3 py-2 text-sm rounded-lg hover:bg-slate-800 hover:text-white ' + (pathname === link.href ? 'text-electric-400' : 'text-slate-300')}>{link.name}</Link>)}</div>
      <div className="flex items-center gap-2"><a href={resume.path} download={resume.filename} className="hidden sm:inline-flex items-center gap-2 text-sm border border-slate-600 px-4 py-2 rounded-lg"><FileText size={16} />Resume</a><Link href="/enquiry" className="gradient-bg px-4 py-2 rounded-lg text-sm font-semibold">Request Quote</Link><button type="button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)} className="lg:hidden p-2">{open ? <X /> : <Menu />}</button></div>
    </div>
    {open && <div id="mobile-navigation" className="lg:hidden border-t border-slate-800 p-4 space-y-2">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-3 py-3 rounded-lg hover:bg-slate-800">{link.name}</Link>)}<a href={resume.path} download={resume.filename} className="block px-3 py-3 text-electric-400">Download resume</a></div>}
  </nav>
}
