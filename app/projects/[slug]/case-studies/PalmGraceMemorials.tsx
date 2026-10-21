'use client'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Code2, Target, Users, Zap } from 'lucide-react'

export default function PalmGraceMemorialsCaseStudy() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-pulse"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Live Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-slate-100">Palm & Grace</span>
            <span className="block bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Memorials</span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
            A digital memorial management platform enabling families to preserve life stories through public memorial profiles, photo galleries, and meaningful tribute management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.palmandgrace.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold hover:scale-105 transition-transform"
            >
              <ExternalLink size={18} /> Visit Live Platform
            </a>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Project Overview */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Project Overview</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Palm & Grace Memorials is a thoughtfully designed digital platform that helps families preserve and celebrate the lives of their loved ones. The platform provides a dignified space for public memorial profiles, photo and video galleries, tribute management, and administrative workflows.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              This is a sensitive application requiring careful attention to user experience, emotional resonance, and robust content management capabilities for a respectful digital memorial experience.
            </p>
          </div>
        </section>

        {/* Business Challenge */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Business Challenge</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-600/10 border border-rose-500/20">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">The Problem</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Need for sensitive, respectful digital memorial space</li>
                <li>✓ Media management with photo and video galleries</li>
                <li>✓ Moderation workflow for tributes and comments</li>
                <li>✓ Multiple enquiry channels (Family, Care Partners)</li>
                <li>✓ QR code access and sharing capabilities</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-600/10 border border-rose-500/20">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">Project Scope</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Public memorial profile templates</li>
                <li>✓ Media upload and gallery system</li>
                <li>✓ Tribute moderation & management</li>
                <li>✓ Admin dashboard for content control</li>
                <li>✓ Enquiry management workflows</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Solution Developed</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-500/20 border border-rose-500/30">
                    <Target size={24} className="text-rose-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Respectful Design</h3>
                  <p className="text-slate-300">
                    Built with emotional intelligence, creating a serene, dignified user experience that honors memories and celebrates lives. Beautiful typography, thoughtful spacing, and calming color palette.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-500/20 border border-rose-500/30">
                    <Code2 size={24} className="text-rose-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Media Management</h3>
                  <p className="text-slate-300">
                    Integrated Cloudinary for optimized image and video handling. Fast galleries, responsive layouts, and support for various media types to showcase memories beautifully.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-500/20 border border-rose-500/30">
                    <Users size={24} className="text-rose-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Tribute System</h3>
                  <p className="text-slate-300">
                    Implemented moderated tribute workflow allowing family members and friends to leave messages. Thoughtful moderation ensures respectful interactions and meaningful tributes.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-500/20 border border-rose-500/30">
                    <Zap size={24} className="text-rose-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Admin Dashboard</h3>
                  <p className="text-slate-300">
                    Created comprehensive admin interface for managing memorials, moderating tributes, handling enquiries from families and care partners, and controlling platform content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Public Memorial Profiles',
              'Photo & Video Galleries',
              'Memorial Template System',
              'Tribute Moderation',
              'QR Code Access',
              'Searchable Directory',
              'Service Information',
              'Livestream Support',
              'Family Enquiries',
              'Care Partner Enquiries',
              'Admin Dashboard',
              'Social Sharing',
            ].map((feature) => (
              <div key={feature} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-rose-500/30 transition-all">
                <p className="text-slate-300 flex items-center gap-3">
                  <span className="text-rose-400">✓</span>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Technologies & Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'React Router'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-rose-500/10 text-slate-300 border border-rose-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Backend & Services</h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Supabase', 'Cloudinary'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-rose-500/10 text-slate-300 border border-rose-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* My Responsibilities */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">My Responsibilities</h2>
          <ul className="space-y-4">
            {[
              'Full Stack Architecture & Development',
              'Frontend UI/UX Implementation',
              'Media Gallery Optimization',
              'Backend API Development',
              'Database Design (PostgreSQL)',
              'Cloudinary Integration',
              'Moderation Workflow System',
              'Admin Dashboard Development',
              'Deployment & Performance Optimization',
            ].map((item) => (
              <li key={item} className="flex gap-4 p-4 rounded-lg bg-slate-800/20 border border-slate-700/30">
                <span className="text-rose-400 flex-shrink-0">→</span>
                <span className="text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Implementation Highlights */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Implementation Highlights</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Emotional Design</h3>
              <p className="text-slate-300">
                Carefully crafted interface that respects the sensitive nature of memorials, using warm tones, elegant typography, and thoughtful spacing to create a meaningful experience.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Performance</h3>
              <p className="text-slate-300">
                Optimized image and video delivery through Cloudinary, lazy loading galleries, and fast page transitions for seamless browsing of memorial content.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Moderation System</h3>
              <p className="text-slate-300">
                Implemented workflow for respectful content moderation, allowing administrators to manage tributes, ensure appropriate interactions, and maintain platform integrity.
              </p>
            </div>
          </div>
        </section>

        {/* Verified Outcomes */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Platform Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-600/10 border border-rose-500/20">
              <p className="text-3xl font-bold text-rose-400 mb-2">100%</p>
              <p className="text-slate-300">Live & Production</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-600/10 border border-rose-500/20">
              <p className="text-3xl font-bold text-rose-400 mb-2">Active</p>
              <p className="text-slate-300">User Base</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-600/10 border border-rose-500/20">
              <p className="text-3xl font-bold text-rose-400 mb-2">Verified</p>
              <p className="text-slate-300">Fully Operational</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-10 border-t border-slate-700/50">
          <Link
            href="/#featured-projects"
            className="inline-flex items-center gap-2 text-electric-400 hover:text-electric-300 transition-colors font-semibold group"
          >
            View All Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>
      </div>
    </div>
  )
}
