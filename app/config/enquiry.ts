export const currencies = ['USD', 'PKR', 'GBP', 'EUR', 'AUD', 'CAD', 'AED'] as const
export const projectStages = ['New project', 'Redesign an existing product', 'Improve or extend an existing product', 'Exploring an idea'] as const
export const timelines = ['As soon as practical', 'Within 2–4 weeks', 'Within 1–2 months', 'Within 3–6 months', 'Flexible / need advice'] as const
export type FollowUpQuestion = { id: string; label: string; options: string[] }
const websiteQuestions: FollowUpQuestion[] = [
  { id: 'websiteGoal', label: 'What should your website help visitors do?', options: ['Enquire about services', 'Explore my business or portfolio', 'Buy products online', 'Book an appointment', 'I need guidance'] },
  { id: 'pageCount', label: 'How many pages do you expect?', options: ['A single landing page', '2–5 pages', '6–10 pages', 'More than 10 pages', 'Not sure yet'] },
]
export const followUpQuestions: Record<string, FollowUpQuestion[]> = {
  'Starter Website': websiteQuestions,
  'Business Website': websiteQuestions,
  'Custom Web Application': [
    { id: 'appUsers', label: 'Who will use the application?', options: ['Customers', 'An internal team', 'Partners or suppliers', 'Multiple user roles', 'Not decided yet'] },
    { id: 'appPriority', label: 'What is the most important capability?', options: ['Accounts and dashboards', 'Bookings or payments', 'Business operations and reporting', 'External system integrations', 'I need help defining the scope'] },
  ],
  'AI & Automation': [
    { id: 'automationTask', label: 'Which process would you like to improve?', options: ['Lead capture and follow-up', 'Document or data processing', 'Customer support', 'Connecting tools and syncing data', 'Another repetitive workflow'] },
    { id: 'automationTools', label: 'Do you already use tools for this process?', options: ['Yes — I will describe them below', 'No — I need recommendations', 'Some tools are already in place'] },
  ],
  'Maintenance & Support': [
    { id: 'supportSystem', label: 'What needs support?', options: ['A business website', 'A web application', 'An automation workflow', 'Multiple systems'] },
    { id: 'supportPriority', label: 'What is your main priority?', options: ['Fixing existing bugs', 'Updates and compatibility', 'Performance improvements', 'Monitoring and ongoing maintenance'] },
  ],
  'Other': [
    { id: 'helpNeeded', label: 'Where would you like help first?', options: ['Planning and technical advice', 'Design and frontend', 'Backend and integrations', 'A combination of services'] },
  ],
}
const defaultBands = [500, 1500, 3000, 5000, 10000]
const budgetBands: Record<string, number[]> = { PKR: [50000, 150000, 300000, 750000, 1500000], AED: [2000, 5000, 10000, 20000, 40000] }
export function budgetOptions(currency: string) {
  const bands = Object.prototype.hasOwnProperty.call(budgetBands, currency) ? budgetBands[currency] : defaultBands
  const format = (value: number) => new Intl.NumberFormat('en', { style: 'currency', currency: currencies.includes(currency as typeof currencies[number]) ? currency : 'USD', maximumFractionDigits: 0 }).format(value)
  return [
    { value: 'under-' + bands[0], label: 'Under ' + format(bands[0]) },
    ...bands.slice(0, -1).map((min, index) => ({ value: min + '-' + bands[index + 1], label: format(min) + ' – ' + format(bands[index + 1]) })),
    { value: 'over-' + bands[bands.length - 1], label: format(bands[bands.length - 1]) + '+' },
    { value: 'not-sure', label: 'Not sure yet — help me estimate' },
  ]
}
export function budgetLabel(currency: string, value: string) { return (budgetOptions(currency).find(option => option.value === value)?.label || value) + ' (' + currency + ')' }
