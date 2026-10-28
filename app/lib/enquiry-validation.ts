import { budgetOptions, currencies, followUpQuestions, projectStages, timelines } from '../config/enquiry'
export const projectTypes = ['Starter Website', 'Business Website', 'Custom Web Application', 'AI & Automation', 'Maintenance & Support', 'Other'] as const
export type Enquiry = {
  name: string; email: string; company: string; existingUrl: string; projectType: string; projectStage: string
  currency: string; budget: string; timeline: string; description: string; answers: Record<string, string>; consent: boolean
}
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>
export function emptyEnquiry(projectType = ''): Enquiry { return { name: '', email: '', company: '', existingUrl: '', projectType, projectStage: '', currency: 'USD', budget: '', timeline: '', description: '', answers: {}, consent: false } }
export function validateEnquiry(input: unknown): { data?: Enquiry; errors: EnquiryErrors } {
  const raw = input && typeof input === 'object' && !Array.isArray(input) ? input as Record<string, unknown> : {}
  const get = (key: string) => typeof raw[key] === 'string' ? (raw[key] as string).trim() : ''
  const data: Enquiry = { name: get('name'), email: get('email').toLowerCase(), company: get('company'), existingUrl: get('existingUrl'), projectType: get('projectType'), projectStage: get('projectStage'), currency: get('currency'), budget: get('budget'), timeline: get('timeline'), description: get('description'), answers: {}, consent: raw.consent === true }
  const errors: EnquiryErrors = {}
  if (data.name.length < 2 || data.name.length > 100 || /[\r\n\x00-\x1f]/.test(data.name)) errors.name = 'Enter your name (2–100 characters).'
  if (data.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) errors.email = 'Enter a valid email address.'
  if (data.company.length > 150 || /[\r\n\x00-\x1f]/.test(data.company)) errors.company = 'Use up to 150 characters for your business name.'
  if (data.existingUrl) {
    try { const url = new URL(data.existingUrl); if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || data.existingUrl.length > 500 || /[\x00-\x20]/.test(data.existingUrl)) throw new Error() }
    catch { errors.existingUrl = 'Enter a public website URL starting with https://, or leave it empty.' }
  }
  if (!projectTypes.some(type => type === data.projectType)) errors.projectType = 'Choose a project type.'
  if (!projectStages.some(stage => stage === data.projectStage)) errors.projectStage = 'Tell me where your project stands.'
  if (!currencies.some(currency => currency === data.currency)) errors.currency = 'Choose a supported currency.'
  if (!budgetOptions(data.currency).some(option => option.value === data.budget)) errors.budget = 'Choose your estimated budget range.'
  if (!timelines.some(timeline => timeline === data.timeline)) errors.timeline = 'Choose your preferred timeframe.'
  const answers = raw.answers && typeof raw.answers === 'object' && !Array.isArray(raw.answers) ? raw.answers as Record<string, unknown> : {}
  for (const question of projectTypes.some(type => type === data.projectType) ? followUpQuestions[data.projectType] || [] : []) {
    const answer = typeof answers[question.id] === 'string' ? (answers[question.id] as string).trim() : ''
    if (!question.options.includes(answer)) errors.answers = 'Please answer the project-specific questions.'
    else data.answers[question.id] = answer
  }
  if (data.description.length < 30 || data.description.length > 5000 || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(data.description)) errors.description = 'Describe your project in 30–5,000 characters.'
  if (!data.consent) errors.consent = 'Please consent to being contacted about this enquiry.'
  return Object.keys(errors).length ? { errors } : { data, errors }
}
