const questions = [
  ['How are payments scheduled?', 'Payment milestones, due dates, and any deposit are agreed in the written proposal before work begins. This website does not collect payments.'],
  ['How many revisions are included?', 'The proposal defines the number and scope of revision rounds. Changes to approved requirements are reviewed and estimated before work continues.'],
  ['Who provides the content?', 'You provide approved copy, logos, images, and rights to use them unless content creation is explicitly included in the proposal.'],
  ['Are hosting and domains included?', 'Hosting, domain registration, paid services, and API usage are separate unless your proposal says otherwise. Ownership and deployment access are agreed before launch.'],
  ['Who owns the source code?', 'Code ownership, third-party licences, and handover conditions are documented in the project agreement. Private client code is not published in this portfolio.'],
  ['What support is included after launch?', 'The proposal defines any post-launch fix period. Optional maintenance plans have a separate agreed scope, time allowance, and response expectations.'],
  ['How long will my project take?', 'A delivery estimate is confirmed after requirements, dependencies, and availability are reviewed. Content delays, feedback, and scope changes can affect dates.'],
]

export default function ServiceFAQ() {
  return (
    <div className="space-y-3">
      {questions.map(([question, answer]) => (
        <details key={question} className="glass rounded-xl p-5">
          <summary className="cursor-pointer font-semibold text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-400">
            {question}
          </summary>
          <p className="mt-4 text-slate-400 leading-relaxed">{answer}</p>
        </details>
      ))}
    </div>
  )
}
