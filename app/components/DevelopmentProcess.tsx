const steps = [
  ['Discovery', 'Discuss your goals, audience, existing systems, and budget range.'],
  ['Requirements', 'Define deliverables, integrations, content needs, and acceptance criteria.'],
  ['Proposal', 'Agree the scope, starting date, milestones, payment schedule, and exclusions in writing.'],
  ['Design Approval', 'Review the proposed structure and visual direction before development.'],
  ['Development', 'Build the agreed features and share progress at milestone reviews.'],
  ['Testing', 'Check the agreed user journeys, responsive layouts, and integration behaviour.'],
  ['Launch', 'Complete approval, deployment, and a documented handover.'],
  ['Support', 'Resolve issues under the agreed handover terms; optional ongoing support is scoped separately.'],
]
export default function DevelopmentProcess() {
  return <section id="process" className="py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p className="eyebrow">How we work together</p><h2 className="section-title">A clear path from idea to launch.</h2>
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-9">{steps.map(([title, description], index) => <li key={title} className="glass rounded-xl p-6"><span className="text-electric-400 text-sm font-semibold">{String(index + 1).padStart(2, '0')}</span><h3 className="text-lg font-semibold mt-3 mb-2">{title}</h3><p className="text-sm text-slate-400 leading-relaxed">{description}</p></li>)}</ol>
  </div></section>
}
