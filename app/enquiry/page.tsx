import type { Metadata } from 'next'
import PageShell from '../components/PageShell'
import EnquiryForm from '../components/EnquiryForm'
import { packages } from '../config/services'
export const metadata: Metadata = { title: 'Project Enquiry', description: 'Share your project scope, budget, and preferred timeline to request a tailored development quote.', alternates: { canonical: '/enquiry' } }
export default function EnquiryPage({ searchParams }: { searchParams: { package?: string } }) {
  const selected = packages.find(item => item.id === searchParams.package)?.name || (['maintenance', 'application-support'].includes(searchParams.package || '') ? 'Maintenance & Support' : '')
  return <PageShell><header className="page-intro"><p className="eyebrow">Tell me about your project</p><h1>Start with a <span className="gradient-text">conversation.</span></h1><p>Share your goals, budget range, and timing. A quote and delivery plan follow a requirements review; submitting this form does not create a booking or payment obligation.</p></header><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"><EnquiryForm initialType={selected} /></div></PageShell>
}
