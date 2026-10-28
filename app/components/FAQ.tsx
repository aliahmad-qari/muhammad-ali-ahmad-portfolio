const questions = [
  ['How are payments scheduled?', 'The proposal defines payment milestones before work begins. Amounts, timing, and any deposit are agreed for your scope; this site does not collect payments.'],
  ['How many revisions are included?', 'The quote specifies revision rounds and what each round covers. Changes to approved requirements are estimated separately before work continues.'],
  ['Who provides the content?', 'You provide approved copy, logos, images, and the rights to use them unless content creation is explicitly included in the proposal. Delayed content can affect delivery.'],
  ['Are hosting and domains included?', 'Domain registration, hosting, paid services, and API usage are separate unless your quote says otherwise. Deployment responsibilities and account access are agreed before launch.'],
  ['Who owns the source code?', 'Ownership, third-party licences, and handover conditions are set out in the written agreement. Private client code is not published in this portfolio.'],
  ['What support is included?', 'The proposal defines the post-launch fix period and supported scope. Maintenance plans are optional; new features and emergency coverage need a separate agreement.'],
  ['When will my project be delivered?', 'A delivery estimate is confirmed after requirements, dependencies, and availability are reviewed. Content, access, feedback, and scope changes can move milestone dates.'],
]
export default function FAQ() {
  return <section id="faq" className="py-16 max-w-4xl mx-auto px-4 sm:px-6"><p className="eyebrow">Before we start</p><h2 className="section-title">Frequently asked questions</h2><div className="mt-8 space-y-3">{questions.map(([question, answer]) => <details key={question} className="glass rounded-xl p-5"><summary className="cursor-pointer font-semibold text-slate-200">{question}</summary><p className="mt-4 text-slate-400 leading-relaxed">{answer}</p></details>)}</div></section>
}
