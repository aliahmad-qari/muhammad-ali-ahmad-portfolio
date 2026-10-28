'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Expand, X } from 'lucide-react'

export type ProjectScreen = { src: string; label: string }

export default function ProjectGallery({ title, screens }: { title: string; screens: ProjectScreen[] }) {
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const screen = screens[selected]

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label={`${title} screenshots`}>
        {screens.map((item, index) => (
          <button key={item.src} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${selected === index ? 'bg-electric-500/15 border-electric-500/50 text-electric-300' : 'border-slate-700 text-slate-400 hover:text-white'}`}>
            {item.label}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge ${title}: ${screen.label}`}
        className="relative block w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group">
        <Image src={screen.src} alt={`${title} — ${screen.label}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-slate-950/90 px-3 py-2 text-xs text-white"><Expand size={14} /> Explore screen</span>
      </button>
      <dialog ref={dialog} aria-label={`${title} — ${screen.label}`} className="w-[94vw] max-w-6xl max-h-[90vh] p-0 rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 backdrop:bg-black/80" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <div className="sticky top-0 z-10 bg-slate-950 flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-800">
          <p className="text-sm font-medium">{title} / {screen.label}</p>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close screenshot" className="p-2 rounded-lg hover:bg-slate-800"><X size={20} /></button>
        </div>
        {/* Native image retains the original aspect ratio inside the scrollable dialog. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={screen.src} alt={`${title} — ${screen.label}`} className="w-full h-auto" />
      </dialog>
    </div>
  )
}
