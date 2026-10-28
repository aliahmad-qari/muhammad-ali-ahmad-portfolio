import type { Metadata } from 'next'
import PageShell from '../components/PageShell'
import { PackageCards, MaintenancePlans } from '../components/PackageCards'
import DevelopmentProcess from '../components/DevelopmentProcess'
import FAQ from '../components/FAQ'
export const metadata: Metadata = { title: 'Services & Packages', description: 'Explore website, application, and automation services, delivery process, and optional support.', alternates: { canonical: '/services' } }
export default function ServicesPage() {
  return <PageShell><header className="page-intro"><p className="eyebrow">For founders and businesses</p><h1>Services & <span className="gradient-text">Packages</span></h1><p>Start with the right scope for your business. Explore what a project can include, then share your requirements for a tailored quote.</p></header><PackageCards /><DevelopmentProcess /><MaintenancePlans /><FAQ /></PageShell>
}
