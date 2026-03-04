'use client'
import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Eye } from 'lucide-react'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Simulate loading for better UX
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const projects = [
    {
      id: 'clickopticx',
      title: 'ClickOpticX WiFi Management',
      description: 'Online WiFi management SaaS platform with package activation, user data records, and comprehensive admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'WiFi API'],
      link: 'https://clickopticx-b7xr.onrender.com/',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'dibnow',
      title: 'Dibnow Platform',
      description: 'Repair & shop management SaaS with authentication, online tracking system, and payment integrations.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      link: 'https://dibnow-repair-saas.vercel.app/',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'dibnow2',
      title: 'Dibnow v2',
      description: 'Improved backend architecture and scalable system deployment with enhanced performance.',
      tech: ['Express.js', 'MongoDB', 'JWT', 'Render', 'REST API'],
      link: 'https://dibnow-v6hj.onrender.com',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'lms',
      title: 'LMS Portal',
      description: 'Learning Management System with dashboard, course management, and authentication.',
      tech: ['Next.js', 'MongoDB', 'Tailwind CSS', 'TypeScript'],
      link: 'https://lms-portal-black-six.vercel.app/',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'digital',
      title: 'Digital Solutions',
      description: 'Modern business website with responsive UI and optimized performance.',
      tech: ['React', 'Tailwind CSS', 'Vercel', 'Responsive'],
      link: 'https://digital-solutions-one.vercel.app/',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'crypto',
      title: 'MetaCrypto Trading',
      description: 'Crypto-related responsive web application with modern interface and real-time data.',
      tech: ['React', 'CSS3', 'API Integration', 'Crypto'],
      link: 'https://metacryptotrading.vercel.app/',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          Featured Projects
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">Showcasing my best work in web development</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="glass rounded-2xl overflow-hidden hover-lift animate-on-scroll group" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : (
                  <>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/600x400/667eea/ffffff?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg hover:bg-purple-500/30 transition-colors">
                    <Eye size={18} />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs hover:bg-purple-500/30 hover:scale-105 transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="gradient-bg px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all relative z-10">
                  View Live <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
