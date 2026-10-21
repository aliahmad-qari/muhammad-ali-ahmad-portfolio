'use client'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Code2, Target, Users, Zap } from 'lucide-react'

export default function VEDAffiliateMarketingCaseStudy() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-pulse"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Live Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-slate-100">VED Affiliate</span>
            <span className="block bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Marketing Platform</span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
            Full-stack affiliate marketing and partner management platform for financial campaigns, featuring partner registration, lead tracking, earnings management, and comprehensive admin controls.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://vedaffiliatepvtltd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:scale-105 transition-transform"
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
              VED Affiliate Pvt. Limited is a comprehensive affiliate marketing and partner management platform built for financial services campaigns. The platform manages partner registration, campaign distribution, lead tracking, earnings calculations, and administrative operations.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              This full-stack solution handles complex workflows including partner authentication, referral tracking, lead verification, wallet management, and comprehensive reporting for campaign performance analysis.
            </p>
          </div>
        </section>

        {/* Business Challenge */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Business Challenge</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">The Problem</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Complex partner registration and authentication</li>
                <li>✓ Real-time lead tracking and verification</li>
                <li>✓ Accurate earnings calculation and wallet management</li>
                <li>✓ Campaign distribution and performance metrics</li>
                <li>✓ Comprehensive admin oversight and controls</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">Project Scope</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Partner onboarding & verification</li>
                <li>✓ Campaign management system</li>
                <li>✓ Referral link generation</li>
                <li>✓ Lead submission & tracking</li>
                <li>✓ Earnings & wallet system</li>
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/30">
                    <Target size={24} className="text-amber-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Partner Ecosystem</h3>
                  <p className="text-slate-300">
                    Built a complete partner management system with registration, verification, dashboard access, and real-time performance tracking for partners to monitor their campaigns and earnings.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/30">
                    <Code2 size={24} className="text-amber-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Lead Tracking System</h3>
                  <p className="text-slate-300">
                    Implemented sophisticated lead submission, tracking, and verification workflows with real-time updates, conversion tracking, and automated status management.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/30">
                    <Users size={24} className="text-amber-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Earnings Management</h3>
                  <p className="text-slate-300">
                    Built comprehensive wallet system with earnings tracking, payout calculations, transaction history, and financial reporting for accurate compensation management.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/30">
                    <Zap size={24} className="text-amber-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">Admin Dashboard</h3>
                  <p className="text-slate-300">
                    Created comprehensive admin platform for managing partners, campaigns, lead verification, earnings verification, and generating performance analytics.
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
              'Partner Registration & Authentication',
              'Partner Dashboard',
              'Campaign Management',
              'Campaign Listings & Distribution',
              'Referral Link Generation',
              'Lead Submission Workflow',
              'Lead Tracking & Verification',
              'Earnings Tracking',
              'Wallet & Payout System',
              'Admin Management Panel',
              'Live Platform Statistics',
              'Performance Analytics',
            ].map((feature) => (
              <div key={feature} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-amber-500/30 transition-all">
                <p className="text-slate-300 flex items-center gap-3">
                  <span className="text-amber-400">✓</span>
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
                {['React', 'TypeScript', 'Tailwind CSS', 'React Query', 'REST API'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-500/10 text-slate-300 border border-amber-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express', 'MongoDB', 'JWT Auth', 'Mongoose'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-500/10 text-slate-300 border border-amber-500/20"
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
              'Full Stack Development & Architecture',
              'Partner Registration & Authentication System',
              'Dashboard UI/UX Design & Implementation',
              'Lead Tracking Workflow Development',
              'Earnings Calculation & Wallet System',
              'Admin Panel Development',
              'Campaign Management System',
              'API Integration & Optimization',
              'Database Design & Optimization',
            ].map((item) => (
              <li key={item} className="flex gap-4 p-4 rounded-lg bg-slate-800/20 border border-slate-700/30">
                <span className="text-amber-400 flex-shrink-0">→</span>
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
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Partner Experience</h3>
              <p className="text-slate-300">
                Designed intuitive partner interfaces for campaign discovery, referral link management, lead submission, and real-time earnings tracking with transparent reporting.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Lead Verification</h3>
              <p className="text-slate-300">
                Implemented robust lead verification workflow with status tracking, admin approval process, and automated notifications for lead status changes.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-navy-800/30 to-navy-900/50">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Financial Accuracy</h3>
              <p className="text-slate-300">
                Built precise earnings calculation system with transparent accounting, transaction history, and payout management ensuring partner trust and accurate compensation.
              </p>
            </div>
          </div>
        </section>

        {/* Verified Outcomes */}
        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Platform Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20">
              <p className="text-3xl font-bold text-amber-400 mb-2">100%</p>
              <p className="text-slate-300">Live & Production</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20">
              <p className="text-3xl font-bold text-amber-400 mb-2">Active</p>
              <p className="text-slate-300">Partner Network</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20">
              <p className="text-3xl font-bold text-amber-400 mb-2">Verified</p>
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
