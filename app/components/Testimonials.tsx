'use client'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { testimonials } from '../data/testimonials'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function Testimonials() {
  const sectionRef = useIntersectionObserver()
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrent(index)
    setAutoPlay(false)
  }

  const testimonial = testimonials[current]

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-on-scroll">
          <p className="text-xs font-semibold uppercase tracking-widest text-electric-400 mb-3">Social Proof</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="block text-slate-100">What Clients</span>
            <span className="gradient-text">Say About Me</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Trusted by founders, CTOs, and product leaders at companies of all sizes.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto animate-on-scroll">
          {/* Main Testimonial Card */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-slate-700/50 hover-lift transition-all">
            {/* Star Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  fill="#F59E0B"
                  className="text-amber-500"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-slate-200 mb-8 italic leading-relaxed">
              "{testimonial.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-slate-100 text-lg">{testimonial.author}</p>
              <p className="text-slate-400">
                {testimonial.title} at {testimonial.company}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300
                         hover:bg-slate-700 hover:text-electric-400 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === current
                      ? 'bg-electric-500 w-8 h-2'
                      : 'bg-slate-600 w-2 h-2 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300
                         hover:bg-slate-700 hover:text-electric-400 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Counter */}
          <div className="text-center mt-6 text-sm text-slate-400">
            {current + 1} of {testimonials.length}
          </div>

          {/* Testimonial Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-slate-700/50">
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">{testimonials.length}</p>
              <p className="text-slate-400 text-sm mt-1">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">5.0</p>
              <p className="text-slate-400 text-sm mt-1">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">100%</p>
              <p className="text-slate-400 text-sm mt-1">Satisfied</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
