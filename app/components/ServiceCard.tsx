'use client'
import { ArrowRight, Check, X } from 'lucide-react'
import Link from 'next/link'
import { ServicePackage, formatPrice } from '../config/services'

interface ServiceCardProps {
  package: ServicePackage
  isHighlighted?: boolean
  showFull?: boolean
}

export default function ServiceCard({ package: pkg, isHighlighted = false, showFull = false }: ServiceCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isHighlighted
          ? 'border-electric-500 bg-gradient-to-br from-navy-800/60 to-navy-900/60 shadow-xl shadow-electric-500/20 hover:shadow-2xl hover:shadow-electric-500/30'
          : 'border-slate-700/50 bg-gradient-to-br from-navy-800/30 to-navy-900/40 hover:border-electric-500/40 hover:shadow-lg hover:shadow-electric-500/10'
      }`}
    >
      {/* Accent bar at top */}
      <div className={`h-1 bg-gradient-to-r ${pkg.gradient}`}></div>

      <div className="p-6 md:p-8 flex flex-col h-full">
        {/* Icon and Title */}
        <div className="mb-4">
          <span className="text-4xl mb-3 inline-block">{pkg.icon}</span>
          <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isHighlighted ? 'gradient-text' : 'text-slate-100'}`}>
            {pkg.name}
          </h3>
        </div>

        {/* Price */}
        <div className="mb-4 pb-4 border-b border-slate-700/50">
          <p className={`text-lg font-bold mb-1 ${isHighlighted ? 'text-electric-400' : 'text-slate-300'}`}>
            {formatPrice(pkg.startingPrice)}
          </p>
          <p className="text-xs text-slate-400">Estimated timeline: {pkg.estimatedTimeline}</p>
          <p className="text-xs text-slate-400 mt-1">Revisions: {pkg.revisions || 'Defined in the proposal'}</p>
        </div>

        {/* Summary */}
        <p className="text-slate-300 mb-6 flex-1">{pkg.summary}</p>

        {/* Deliverables Preview */}
        {!showFull && (
          <div className="mb-6 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Key Deliverables</p>
            {pkg.deliverables.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check size={16} className="text-electric-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
            {pkg.deliverables.length > 3 && (
              <p className="text-xs text-slate-400 pt-2">+ {pkg.deliverables.length - 3} more deliverables</p>
            )}
          </div>
        )}

        {/* Full Deliverables */}
        {showFull && (
          <>
            {/* Deliverables Section */}
            <div className="mb-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Deliverables</h4>
              <div className="space-y-3">
                {pkg.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check size={18} className="text-electric-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusions Section */}
            <div className="mb-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Excluded from Scope</h4>
              <div className="space-y-3">
                {pkg.exclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <X size={18} className="text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons Section */}
            {pkg.addOns && pkg.addOns.length > 0 && (
              <div className="mb-8 pt-6 border-t border-slate-700/50">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Optional Add-ons</h4>
                <div className="space-y-3">
                  {pkg.addOns.map((addon, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                      <p className="font-medium text-slate-200 text-sm">{addon.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{addon.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="flex gap-3 mt-auto pt-4">
          <Link
            href={`/services/${pkg.id}`}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all ${
              isHighlighted
                ? 'gradient-bg text-white hover:scale-105'
                : 'border border-slate-700 text-slate-300 hover:border-electric-500/40 hover:bg-electric-500/5'
            }`}
          >
            View Details <ArrowRight size={16} />
          </Link>
          <Link
            href={`/enquiry?package=${pkg.id}`}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all ${
              isHighlighted
                ? 'border border-electric-500/40 text-electric-400 hover:bg-electric-500/10'
                : 'gradient-bg text-white hover:scale-105'
            }`}
          >
            Request Quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
