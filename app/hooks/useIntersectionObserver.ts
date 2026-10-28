'use client'
import { useEffect, useRef } from 'react'

export function useIntersectionObserver(threshold = 0) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
        })
      },
      { threshold, rootMargin: '0px 0px -24px 0px' }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold])

  return sectionRef
}
