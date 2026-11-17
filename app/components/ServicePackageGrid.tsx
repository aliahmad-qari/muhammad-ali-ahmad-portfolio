'use client'
import { packages } from '../config/services'
import ServiceCard from './ServiceCard'

interface ServicePackageGridProps {
  limit?: number
  highlightId?: string
  showFull?: boolean
}

export default function ServicePackageGrid({
  limit,
  highlightId = 'custom-web-application',
  showFull = false
}: ServicePackageGridProps) {
  const displayedPackages = limit ? packages.slice(0, limit) : packages

  return (
    <div className="w-full">
      <div className={`grid gap-6 ${
        displayedPackages.length === 1
          ? 'grid-cols-1'
          : displayedPackages.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      }`}>
        {displayedPackages.map((pkg) => (
          <ServiceCard
            key={pkg.id}
            package={pkg}
            isHighlighted={pkg.id === highlightId}
            showFull={showFull}
          />
        ))}
      </div>
    </div>
  )
}
