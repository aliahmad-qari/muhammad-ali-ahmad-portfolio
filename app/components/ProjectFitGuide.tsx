import Link from 'next/link'

const cards = [
  {
    title: 'A good fit when you need',
    points: [
      'A business website, custom web application, or workflow automation.',
      'Clear project goals with room to agree the details together.',
      'A written scope, review points, and a planned handover.',
    ],
  },
  {
    title: 'Prepare before requesting a quote',
    points: [
      'The audience and the result you want the project to achieve.',
      'Must-have pages, workflows, integrations, or existing tools.',
      'A budget range, preferred start window, and who approves the work.',
    ],
  },
  {
    title: 'Clarify early if you need',
    points: [
      'A fixed delivery date before requirements or content are confirmed.',
      'Third-party services, hosting, paid APIs, or ongoing support included.',
      'Work outside the listed packages or a scope that may change often.',
    ],
  },
]

export default function ProjectFitGuide() {
  return <section id="project-fit" className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="eyebrow">Project fit guide</p>
      <h2 className="section-title">Know what to bring to the first conversation.</h2>
      <p className="text-slate-400 mt-4 max-w-3xl leading-relaxed">You do not need a complete specification. A few clear goals and constraints help us decide whether the work fits and what needs to be scoped.</p>
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {cards.map((card, index) => <article key={card.title} className="glass rounded-xl p-6">
          <p className="text-electric-400 text-xs font-semibold tracking-wider">0{index + 1}</p>
          <h3 className="text-lg font-semibold mt-3 mb-4">{card.title}</h3>
          <ul className="space-y-3 text-sm text-slate-400 leading-relaxed">{card.points.map(point => <li key={point} className="flex gap-3"><span className="text-electric-400" aria-hidden="true">•</span><span>{point}</span></li>)}</ul>
        </article>)}
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-700 p-5">
        <p className="text-sm text-slate-300">Not sure which package fits? Share what you know and we can define the scope first.</p>
        <Link href="/enquiry" className="gradient-bg px-5 py-3 rounded-lg font-semibold text-sm">Check project fit</Link>
      </div>
    </div>
  </section>
}
