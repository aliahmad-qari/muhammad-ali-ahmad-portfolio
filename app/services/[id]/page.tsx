import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { packages } from '../../config/services'
import ServiceCard from '../../components/ServiceCard'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

export async function generateStaticParams() {
  return packages.map((pkg) => ({
    id: pkg.id
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const pkg = packages.find((p) => p.id === params.id)

  if (!pkg) {
    return {
      title: 'Service Not Found'
    }
  }

  return {
    title: `${pkg.name} | Muhammad Ali Ahmad`,
    description: pkg.description,
    alternates: { canonical: `/services/${pkg.id}` }
  }
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const pkg = packages.find((p) => p.id === params.id)

  if (!pkg) {
    notFound()
  }

  // Get related services (other packages)
  const relatedPackages = packages.filter((p) => p.id !== pkg.id).slice(0, 2)

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-950 to-navy-900">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-b from-navy-900 to-navy-950 border-b border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-electric-400 hover:text-electric-300 transition-colors">
            <ArrowLeft size={18} />
            Back to Services
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-4xl mb-6">{pkg.icon}</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              <span className={`bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent`}>{pkg.name}</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-6">{pkg.description}</p>

            {/* Key Stats */}
            <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-slate-700/50">
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">Estimated Timeline</p>
                <p className="text-2xl font-bold text-electric-400">{pkg.estimatedTimeline}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">Starting Price</p>
                <p className="text-2xl font-bold text-slate-100">Custom Quote</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Deliverables */}
              <div>
                <h2 className="text-3xl font-bold text-slate-100 mb-6">What's Included</h2>
                <div className="space-y-4">
                  {pkg.deliverables.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-lg bg-slate-800/20 border border-slate-700/30 hover:border-electric-500/20 transition-all">
                      <Check size={24} className="text-electric-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div className="pt-6 border-t border-slate-700/50">
                <h2 className="text-3xl font-bold text-slate-100 mb-6">Out of Scope</h2>
                <p className="text-slate-400 mb-6">
                  These items are typically <span className="font-semibold text-slate-300">not included</span> in this package scope. We can discuss adding them as optional add-ons or separate projects.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pkg.exclusions.map((item, idx) => (
                    <div key={idx} className="flex gap-3 p-4 rounded-lg bg-rose-500/5 border border-rose-500/20">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              {pkg.addOns && pkg.addOns.length > 0 && (
                <div className="pt-6 border-t border-slate-700/50">
                  <h2 className="text-3xl font-bold text-slate-100 mb-6">Optional Add-ons</h2>
                  <p className="text-slate-400 mb-6">
                    Enhance your project with these optional additions, each available at an <span className="font-semibold text-slate-300">additional cost</span>.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {pkg.addOns.map((addon, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 hover:border-electric-500/30 transition-all"
                      >
                        <h3 className="font-bold text-slate-100 mb-2">{addon.name}</h3>
                        <p className="text-sm text-slate-400">{addon.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Section */}
              <div className="pt-6 border-t border-slate-700/50">
                <h2 className="text-3xl font-bold text-slate-100 mb-6">How It Works</h2>
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Enquiry', desc: 'You fill out a detailed enquiry form describing your project, goals, and requirements.' },
                    { step: 2, title: 'Consultation', desc: 'I review your requirements and we have a call to clarify scope, timeline, and budget.' },
                    { step: 3, title: 'Proposal', desc: 'You receive a formal proposal with breakdown, deliverables, timeline, and payment terms.' },
                    { step: 4, title: 'Development', desc: 'Upon agreement and deposit, I begin development with regular updates and check-ins.' },
                    { step: 5, title: 'Delivery', desc: 'Project is delivered with full code, documentation, and deployment support.' },
                    { step: 6, title: 'Support', desc: 'One month of post-launch support included. Optional ongoing maintenance available.' }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 text-navy-900 font-bold">
                          {item.step}
                        </div>
                      </div>
                      <div className="pt-1">
                        <h3 className="font-semibold text-slate-100">{item.title}</h3>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Package Card - Full Version */}
                <div className="mb-6 p-6 rounded-2xl border border-electric-500/30 bg-gradient-to-br from-navy-800/60 to-navy-900/60 shadow-xl shadow-electric-500/20">
                  <h3 className="text-2xl font-bold gradient-text mb-4">{pkg.name}</h3>

                  {/* Quick Stats */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-slate-700/50">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Timeline</p>
                      <p className="text-lg font-semibold text-slate-100">{pkg.estimatedTimeline}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Pricing</p>
                      <p className="text-lg font-semibold text-electric-400">Custom Quote</p>
                    </div>
                  </div>

                  {/* Deliverables Count */}
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-slate-300">
                      ✓ {pkg.deliverables.length} Key Deliverables
                    </p>
                    <p className="text-sm font-semibold text-slate-300">
                      ✓ {pkg.exclusions.length} Clearly Excluded Items
                    </p>
                    {pkg.addOns && (
                      <p className="text-sm font-semibold text-slate-300">
                        ✓ {pkg.addOns.length} Optional Add-ons
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href={`/enquiry?service=${pkg.id}`}
                    className="w-full block px-6 py-4 rounded-lg gradient-bg text-white font-semibold text-center hover:scale-105 transition-transform"
                  >
                    Request Custom Quote
                  </a>
                </div>

                {/* Info Box */}
                <div className="p-4 rounded-lg bg-slate-800/20 border border-slate-700/30">
                  <p className="text-sm text-slate-300">
                    <span className="font-semibold text-slate-100">💡 Pricing is confirmed after scope review.</span> Final costs depend on the agreed deliverables, complexity, and your requirements. Submitting an enquiry does not create a booking or payment obligation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedPackages.length > 0 && (
        <section className="py-16 md:py-24 border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-12">
              Explore Other <span className="gradient-text">Services</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPackages.map((relatedPkg) => (
                <ServiceCard key={relatedPkg.id} package={relatedPkg} isHighlighted={false} showFull={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Check out the <Link href="/services#faq" className="text-electric-400 hover:text-electric-300 underline">FAQ section</Link> or start an enquiry to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-slate-700 text-slate-300 hover:border-electric-500/40 hover:bg-electric-500/5 transition-all">
              View All Services <ArrowLeft size={18} />
            </Link>
            <a href="/enquiry" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg gradient-bg text-white font-semibold hover:scale-105 transition-transform">
              Start Your Enquiry <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
