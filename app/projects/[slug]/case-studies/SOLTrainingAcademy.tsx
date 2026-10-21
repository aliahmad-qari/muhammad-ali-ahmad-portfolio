'use client'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Code2, Target, Users, Zap } from 'lucide-react'

export default function SOLTrainingAcademyCaseStudy() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75 animate-pulse"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Live Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-slate-100">SOL Training</span>
            <span className="block bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Academy</span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
            Enterprise Learning Management System for an Australian NDIS training provider, scaling to thousands of learners with role-based access, DRM-protected content, and comprehensive administrative oversight.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://training.solbusinessconsultant.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition-transform"
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
              SOL Training Academy is a comprehensive Learning Management System built for a leading Australian NDIS training provider. The platform serves hundreds of students and administrators, providing a complete ecosystem for online learning, course management, student progress tracking, and business administration.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              This enterprise platform required sophisticated role-based access control, content protection mechanisms, real-time dashboards, and seamless integrations with existing business systems.
            </p>
          </div>
        </section>

        {/* Business Challenge */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Business Challenge</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">The Problem</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Need for scalable platform to serve hundreds of concurrent students</li>
                <li>✓ Complex role hierarchy (admin, instructors, students, partners)</li>
                <li>✓ DRM content protection requirements for course materials</li>
                <li>✓ Real-time progress tracking and administrative reporting</li>
                <li>✓ Integration with existing CRM and marketing systems</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">Project Scope</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Multi-portal architecture (Student, Admin, Instructor)</li>
                <li>✓ Video course player with DRM protection</li>
                <li>✓ Discussion boards and student engagement</li>
                <li>✓ Automated enrollment and expiry management</li>
                <li>✓ Comprehensive analytics and reporting</li>
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30">
                    <Target size={24} className="text-violet-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Robust Architecture</h3>
                  <p className="text-slate-300">
                    Built a scalable MERN stack foundation with JWT-based authentication, enabling independent portals for different user roles while maintaining data integrity and security.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30">
                    <Code2 size={24} className="text-violet-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Course Management System</h3>
                  <p className="text-slate-300">
                    Implemented a comprehensive course player with video streaming, progress tracking, module organization, and DRM content protection to safeguard premium course materials.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30">
                    <Users size={24} className="text-violet-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Student Engagement</h3>
                  <p className="text-slate-300">
                    Created per-course discussion boards, student dashboards with progress visualization, and automated enrollment-expiry notifications to maximize engagement and retention.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30">
                    <Zap size={24} className="text-violet-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Admin Dashboard</h3>
                  <p className="text-slate-300">
                    Developed real-time analytics, student performance tracking, enrollment management, and comprehensive reporting tools for administrators to monitor platform health and student progress.
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
              'Learning Management System',
              'Role-Based Access Control',
              'Interactive Course Player',
              'DRM Content Protection',
              'Student Dashboard',
              'Discussion Boards',
              'Admin Management Panel',
              'Enrollment Automation',
              'Progress Tracking',
              'Client Portal',
              'Analytics & Reporting',
              'API Integrations',
            ].map((feature) => (
              <div key={feature} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-violet-500/30 transition-all">
                <p className="text-slate-300 flex items-center gap-3">
                  <span className="text-violet-400">✓</span>
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
                {['React.js', 'JavaScript', 'Tailwind CSS', 'Redux', 'REST API'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-violet-500/10 text-slate-300 border border-violet-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Mongoose'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-violet-500/10 text-slate-300 border border-violet-500/20"
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
              'Dashboard UI/UX Design & Implementation',
              'Authentication & Security Implementation',
              'Course Player Development & Optimization',
              'API Design & Integration',
              'Database Schema Design',
              'Performance Optimization & Scaling',
              'Deployment & DevOps',
            ].map((item) => (
              <li key={item} className="flex gap-4 p-4 rounded-lg bg-slate-800/20 border border-slate-700/30">
                <span className="text-violet-400 flex-shrink-0">→</span>
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
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Scalability</h3>
              <p className="text-slate-300">
                Architected to handle hundreds of concurrent users with efficient database queries, caching strategies, and optimized API response times.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Security</h3>
              <p className="text-slate-300">
                Implemented JWT-based authentication, role-based access control, DRM content protection, and secure API endpoints to protect sensitive educational content.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">User Experience</h3>
              <p className="text-slate-300">
                Designed intuitive interfaces for different user roles, fast course loading, responsive design, and seamless navigation across portals.
              </p>
            </div>
          </div>
        </section>

        {/* Verified Outcomes */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Platform Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
              <p className="text-3xl font-bold text-violet-400 mb-2">100%</p>
              <p className="text-slate-300">Live & Production</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
              <p className="text-3xl font-bold text-violet-400 mb-2">Active</p>
              <p className="text-slate-300">User Base</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
              <p className="text-3xl font-bold text-violet-400 mb-2">Verified</p>
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
