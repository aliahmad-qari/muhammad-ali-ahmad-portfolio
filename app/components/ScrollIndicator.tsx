'use client'
import { useEffect, useState, useCallback } from 'react'

const sections = [
  { id: 'home', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('home')

  useEffect(() => {
    let ticking = false

    const update = () => {
      // Overall page scroll progress (0–100)
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)

      // Active section: the one whose top has passed roughly the viewport's upper third
      const marker = window.innerHeight * 0.35
      let current = sections[0].id
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= marker) current = id
      }
      setActive(current)

      // Toggle the animated left-border accent on the active section
      sections.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) el.classList.toggle('scroll-section-active', id === current)
      })

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      {/* Desktop: fixed vertical progress line with section dots */}
      <div
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center"
        aria-hidden="true"
      >
        <div className="relative w-0.5 rounded-full bg-white/10" style={{ height: '60vh' }}>
          {/* Progress fill */}
          <div
            className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-purple-500 to-blue-500 transition-[height] duration-150 ease-out"
            style={{ height: `${progress}%` }}
          />
          {/* Section dots evenly spaced along the line */}
          {sections.map((section, idx) => {
            const top = (idx / (sections.length - 1)) * 100
            const isActive = active === section.id
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
                style={{ top: `${top}%` }}
                aria-label={`Scroll to ${section.label}`}
              >
                <span
                  className={`block rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'w-4 h-4 bg-purple-500 border-purple-300 shadow-[0_0_12px_rgba(102,126,234,0.9)]'
                      : 'w-2.5 h-2.5 bg-[#0a0a0f] border-white/30 group-hover:border-purple-400 group-hover:scale-125'
                  }`}
                />
                {/* Label beside the dot */}
                <span
                  className={`absolute left-6 whitespace-nowrap text-xs font-medium px-2 py-1 rounded-md glass transition-all duration-300 ${
                    isActive
                      ? 'opacity-100 translate-x-0 text-white'
                      : 'opacity-0 -translate-x-2 text-gray-300 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  {section.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile: horizontal dot row pinned to the bottom */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2 rounded-full glass">
        {sections.map((section) => {
          const isActive = active === section.id
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              aria-label={`Scroll to ${section.label}`}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-6 h-2 bg-gradient-to-r from-purple-500 to-blue-500'
                  : 'w-2 h-2 bg-white/30'
              }`}
            />
          )
        })}
      </div>
    </>
  )
}
