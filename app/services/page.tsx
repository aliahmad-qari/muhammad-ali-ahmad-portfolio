import type { Metadata } from 'next'
import PageShell from '../components/PageShell'
import ServicePackageGrid from '../components/ServicePackageGrid'
import ServiceFAQ from '../components/ServiceFAQ'
import DevelopmentProcess from '../components/DevelopmentProcess'
import { MaintenancePlans } from '../components/PackageCards'
import ProjectFitGuide from '../components/ProjectFitGuide'

export const metadata: Metadata = {
  title: 'Services & Packages | Muhammad Ali Ahmad — Full Stack Developer',
  description: 'Explore web development, custom applications, AI automation, and support. Review scope, deliverables, and request a tailored quote.',
  alternates: { canonical: '/services' }
}

export default function ServicesPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-electric-400 mb-3">Services & Packages</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              <span className="block text-slate-100">Services Built For</span>
              <span className="block gradient-text">Your Business Stage</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Whether you're launching a landing page, building a business website, developing a custom application, or automating your workflows — I create transparent, scoped solutions with clear deliverables and realistic timelines.
            </p>
          </div>

          {/* Key Principles */}
          <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-slate-700/50">
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">🎯 Scoped Projects</h3>
              <p className="text-slate-400">Clear requirements, defined milestones, and realistic timelines. No surprise changes.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">💰 Transparent Pricing</h3>
              <p className="text-slate-400">Hosting, domains, and third-party services clearly excluded. You control your costs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">📋 Professional Handover</h3>
              <p className="text-slate-400">Documentation, source code handover, and deployment support are defined in the written scope.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Choose Your Package</h2>
            <p className="text-slate-400">Click any package for full details, add-ons, and to request a custom quote.</p>
          </div>
          <ServicePackageGrid showFull={false} />
        </div>
      </section>

      {/* Development Process */}
      <DevelopmentProcess />

      <ProjectFitGuide />

      {/* Optional post-launch support */}
      <MaintenancePlans />

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Common Questions</h2>
            <p className="text-slate-400">Answers about revisions, payments, delivery, hosting, maintenance, and ownership.</p>
          </div>
          <ServiceFAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-500/5 via-transparent to-cyan-500/5 rounded-2xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="block text-slate-100 mb-2">Ready to get started?</span>
              <span className="gradient-text">Let's discuss your project</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Choose a package above or send a project enquiry. I will review the scope and follow up with questions or a tailored proposal.
            </p>
            <a
              href="/enquiry"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg gradient-bg text-white font-semibold hover:scale-105 transition-transform"
            >
              Start Your Enquiry
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
