'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Mail, ShieldCheck } from 'lucide-react'
import { emptyEnquiry, projectTypes, validateEnquiry, type Enquiry, type EnquiryErrors } from '../lib/enquiry-validation'
import { budgetLabel, budgetOptions, currencies, followUpQuestions, projectStages, timelines } from '../config/enquiry'
import { contactEmail } from '../config/site'

type Turnstile = { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void; reset: (id: string) => void }
declare global { interface Window { turnstile?: Turnstile } }
const steps = ['Your project', 'Budget & scope', 'Review & contact']
const stepFields: (keyof Enquiry)[][] = [
  ['projectType', 'projectStage', 'company', 'existingUrl', 'answers'],
  ['currency', 'budget', 'timeline', 'description'],
  ['name', 'email', 'consent'],
]
const serviceDescriptions: Record<string, string> = {
  'Starter Website': 'A landing page or focused web presence.', 'Business Website': 'A multi-page website for your services.',
  'Custom Web Application': 'A platform, portal, or business application.', 'AI & Automation': 'Connect tools and simplify repetitive work.',
  'Maintenance & Support': 'Improve and maintain an existing system.', 'Other': 'Let’s explore the right approach together.',
}

export default function EnquiryForm({ initialType = '' }: { initialType?: string }) {
  const [draft, setDraft] = useState<Enquiry>(() => emptyEnquiry(initialType))
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'loading' | 'ready' | 'sending' | 'sent' | 'unavailable'>('loading')
  const [config, setConfig] = useState<{ challenge: string; siteKey: string } | null>(null)
  const [scriptReady, setScriptReady] = useState(false)
  const [token, setToken] = useState('')
  const widget = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string>()
  const form = useRef<HTMLFormElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const submissionId = useRef('')
  const sent = status === 'sent'
  const field = 'w-full rounded-lg bg-slate-950/70 border border-slate-700 px-4 py-3 text-slate-100 focus:border-electric-400'

  const loadConfig = useCallback(async (signal?: AbortSignal) => {
    setStatus('loading'); setMessage(''); setToken(''); setConfig(null)
    try {
      const response = await fetch('/api/enquiry', { signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000), cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error('Unavailable')
      setConfig(data); setStatus('ready')
    } catch {
      if (!signal?.aborted) { setStatus('unavailable'); setMessage('Online submission is temporarily unavailable. Your brief can still be prepared and sent using the email option below.') }
    }
  }, [])
  useEffect(() => {
    const controller = new AbortController()
    submissionId.current = crypto.randomUUID()
    void loadConfig(controller.signal)
    return () => controller.abort()
  }, [loadConfig])
  useEffect(() => {
    if (!config || !scriptReady || step !== 2 || sent || !widget.current || !window.turnstile) return
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey: config.siteKey, action: 'project-enquiry', theme: 'dark', size: 'flexible',
      callback: (value: string) => setToken(value), 'expired-callback': () => setToken(''),
      'error-callback': () => { setToken(''); setMessage('Spam verification could not load. Please retry or use the email option.') },
    })
    return () => { if (widgetId.current) window.turnstile?.remove(widgetId.current); widgetId.current = undefined; setToken('') }
  }, [config, scriptReady, step, sent])

  function update<K extends keyof Enquiry>(key: K, value: Enquiry[K]) {
    setDraft(previous => ({ ...previous, [key]: value, ...(key === 'currency' ? { budget: '' } : {}), ...(key === 'projectType' ? { answers: {} } : {}) }))
    setErrors(previous => ({ ...previous, [key]: undefined, ...(key === 'projectType' ? { answers: undefined } : {}) }))
  }
  function moveTo(next: number) { setStep(next); setErrors({}); requestAnimationFrame(() => heading.current?.focus()) }
  function error(key: keyof Enquiry) { return errors[key] ? <p id={key + '-error'} className="text-sm text-red-300 mt-2">{errors[key]}</p> : null }
  function accessibility(key: keyof Enquiry) { return { 'aria-invalid': Boolean(errors[key]), 'aria-describedby': errors[key] ? key + '-error' : undefined } }
  function select(key: 'projectStage' | 'currency' | 'budget' | 'timeline', label: string, options: { value: string; label: string }[], hint?: string) {
    return <div><label htmlFor={key} className="block text-sm font-semibold mb-2">{label} <span className="text-electric-400">*</span></label><select id={key} name={key} value={draft[key]} onChange={event => update(key, event.target.value)} className={field} required {...accessibility(key)}><option value="">Choose an option</option>{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{hint && <p className="text-xs leading-relaxed text-slate-400 mt-2">{hint}</p>}{error(key)}</div>
  }
  function checkCurrentStep() {
    const result = validateEnquiry(draft)
    const relevant = Object.fromEntries(Object.entries(result.errors).filter(([key]) => stepFields[step].includes(key as keyof Enquiry))) as EnquiryErrors
    setErrors(relevant)
    if (Object.keys(relevant).length) { requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()); return false }
    return true
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step < 2) { if (checkCurrentStep()) moveTo(step + 1); return }
    const result = validateEnquiry(draft)
    setErrors(result.errors)
    if (!result.data) {
      const invalidStep = stepFields.findIndex(keys => keys.some(key => result.errors[key]))
      if (invalidStep >= 0 && invalidStep !== step) { setStep(invalidStep); requestAnimationFrame(() => heading.current?.focus()) }
      return
    }
    if (status !== 'ready' || !config || !token) { setMessage('Please complete the secure check, or use the email option.'); return }
    const website = new FormData(event.currentTarget).get('website') || ''
    setStatus('sending'); setMessage('')
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(35000),
        body: JSON.stringify({ ...result.data, website, challenge: config.challenge, turnstileToken: token, submissionId: submissionId.current }),
      })
      const data = await response.json()
      if (!response.ok) { setErrors(data.errors || {}); throw new Error(data.error || 'Please retry or email me directly.') }
      setStatus('sent'); setMessage(data.message)
    } catch (failure) { setStatus('ready'); setMessage(failure instanceof Error && !['TimeoutError', 'AbortError'].includes(failure.name) ? failure.message : 'The service took too long. Your brief is saved here; retry or use email.') }
    finally { setToken(''); if (widgetId.current) window.turnstile?.reset(widgetId.current) }
  }
  const questions = followUpQuestions[draft.projectType] || []
  const emailBody = [
    'Project quote request', 'Name: ' + draft.name, 'Email: ' + draft.email,
    'Business: ' + draft.company, 'Project: ' + draft.projectType, 'Stage: ' + draft.projectStage,
    'Website: ' + draft.existingUrl, 'Budget: ' + (draft.budget ? budgetLabel(draft.currency, draft.budget) : 'Not selected'), 'Timeline: ' + draft.timeline,
    ...questions.map(question => question.label + ': ' + (draft.answers[question.id] || 'Not answered')), '', draft.description,
  ].join('\n')
  const emailHref = 'mailto:' + contactEmail + '?subject=' + encodeURIComponent('Project quote request: ' + (draft.projectType || 'New project')) + '&body=' + encodeURIComponent(emailBody)

  if (sent) return <div className="glass rounded-2xl p-8 sm:p-12 text-center" role="status"><CheckCircle2 className="text-emerald-400 mx-auto mb-5" size={42} /><p className="eyebrow">Enquiry submitted</p><h2 className="text-3xl font-semibold mb-4">Thank you, {draft.name.trim().split(/\s+/)[0]}.</h2><p className="text-slate-300 max-w-xl mx-auto leading-relaxed">Your project brief has been accepted for email delivery. I’ll review the requirements and follow up at {draft.email}.</p><p className="text-sm text-slate-400 mt-4">No booking or payment has been made. Scope, price, and delivery dates are confirmed in a proposal.</p><Link href="/services" className="inline-flex mt-7 items-center gap-2 text-electric-400 font-semibold">Explore services <ArrowRight size={16} /></Link></div>

  return <>
    <noscript><p className="mb-6 text-slate-300">This guided form requires JavaScript. You can email <a href={'mailto:' + contactEmail} className="text-electric-400 underline">{contactEmail}</a> directly.</p></noscript>
    {config && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setScriptReady(true)} onError={() => setMessage('Spam verification could not load. Please use the email option.')} />}
    <div className="grid lg:grid-cols-[1fr_280px] gap-7 items-start">
      <form ref={form} onSubmit={submit} noValidate className="glass relative rounded-2xl overflow-hidden" aria-busy={status === 'sending'}>
        <div className="border-b border-slate-800 p-5 sm:p-7"><ol className="flex gap-2 sm:gap-6" aria-label="Quote request progress">{steps.map((label, index) => <li key={label} aria-current={index === step ? 'step' : undefined} className="flex-1"><div className="flex items-center gap-2"><span className={'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs border ' + (index <= step ? 'border-electric-400 bg-electric-500/15 text-electric-400' : 'border-slate-700 text-slate-500')}>{index < step ? <Check size={14} /> : index + 1}</span><span className={'text-xs sm:text-sm font-medium ' + (index === step ? 'text-slate-100' : 'text-slate-500')}>{label}</span></div></li>)}</ol></div>
        <fieldset disabled={status === 'sending'} className="p-5 sm:p-8 space-y-6">
          <div><p className="text-xs font-semibold uppercase tracking-widest text-electric-400 mb-2">Step {step + 1} of 3</p><h2 ref={heading} tabIndex={-1} className="text-2xl sm:text-3xl font-semibold tracking-tight">{['What are you planning?', 'Let’s define the scope.', 'A final check, then we talk.'][step]}</h2><p className="text-sm text-slate-400 mt-3 leading-relaxed">{['Choose a service and answer a few questions so I can understand what you need.', 'Share a budget range and the outcome you want. Estimates are welcome.', 'Review your brief and add your contact details.'][step]}</p></div>

          {step === 0 && <>
            <fieldset><legend className="text-sm font-semibold mb-3">What would you like to build? *</legend><div className="grid sm:grid-cols-2 gap-3">{projectTypes.map(type => <label key={type} className={'cursor-pointer rounded-xl border p-4 transition-colors ' + (draft.projectType === type ? 'border-electric-400 bg-electric-500/10' : 'border-slate-700 bg-slate-950/30 hover:border-slate-500')}><span className="flex items-center gap-3"><input type="radio" name="projectType" value={type} checked={draft.projectType === type} onChange={() => update('projectType', type)} className="accent-sky-500" required {...accessibility('projectType')} /><span className="text-sm font-semibold">{type}</span></span><span className="block text-xs leading-relaxed text-slate-400 ml-6 mt-2">{serviceDescriptions[type]}</span></label>)}</div>{error('projectType')}</fieldset>
            {select('projectStage', 'Where are you starting from?', projectStages.map(value => ({ value, label: value })))}
            {questions.length > 0 && <fieldset className="rounded-xl border border-slate-700/80 bg-slate-950/30 p-5 space-y-5"><legend className="px-2 text-xs font-semibold uppercase tracking-wider text-electric-400">A little more about your {draft.projectType === 'AI & Automation' ? 'workflow' : 'project'}</legend>{questions.map(question => <div key={question.id}><label htmlFor={question.id} className="block text-sm font-medium mb-2">{question.label} *</label><select id={question.id} name={question.id} required value={draft.answers[question.id] || ''} className={field} onChange={event => update('answers', { ...draft.answers, [question.id]: event.target.value })} {...accessibility('answers')}><option value="">Choose an option</option>{question.options.map(option => <option key={option}>{option}</option>)}</select></div>)}{error('answers')}</fieldset>}
            <div className="grid sm:grid-cols-2 gap-5"><div><label htmlFor="company" className="block text-sm font-medium mb-2">Business name <span className="text-slate-500">(optional)</span></label><input id="company" name="company" autoComplete="organization" maxLength={150} value={draft.company} onChange={event => update('company', event.target.value)} className={field} {...accessibility('company')} />{error('company')}</div><div><label htmlFor="existingUrl" className="block text-sm font-medium mb-2">Existing website <span className="text-slate-500">(optional)</span></label><input id="existingUrl" name="existingUrl" type="url" autoComplete="url" maxLength={500} placeholder="https://yourwebsite.com" value={draft.existingUrl} onChange={event => update('existingUrl', event.target.value)} className={field} {...accessibility('existingUrl')} />{error('existingUrl')}</div></div>
          </>}

          {step === 1 && <>
            <div className="grid sm:grid-cols-[140px_1fr] gap-5">{select('currency', 'Currency', currencies.map(value => ({ value, label: value })))}{select('budget', 'Estimated project budget', budgetOptions(draft.currency), 'This is your planning range, not a fixed price or payment commitment.')}</div>
            {select('timeline', 'When would you like to get started?', timelines.map(value => ({ value, label: value })), 'Your preferred timeframe. Availability and delivery are confirmed after scope review.')}
            <div><label htmlFor="description" className="block text-sm font-semibold mb-2">What would a successful result look like? *</label><textarea id="description" name="description" value={draft.description} onChange={event => update('description', event.target.value)} required minLength={30} maxLength={5000} rows={7} className={field} placeholder="Tell me about your audience, main challenge, must-have features, and tools that need to connect." {...accessibility('description')} /><div className="flex justify-between gap-4 mt-2 text-xs text-slate-400"><span>30–5,000 characters. Please don’t include credentials or private records.</span><span className="shrink-0">{draft.description.length}/5000</span></div>{error('description')}</div>
          </>}

          {step === 2 && <>
            <section className="rounded-xl border border-slate-700 bg-slate-950/40 p-5"><div className="flex items-center justify-between gap-3 mb-4"><h3 className="font-semibold">Your project brief</h3><button type="button" onClick={() => moveTo(0)} className="text-xs text-electric-400 underline">Edit details</button></div><dl className="grid sm:grid-cols-2 gap-x-5 gap-y-4 text-sm">{[['Service', draft.projectType], ['Starting point', draft.projectStage], ['Budget', budgetLabel(draft.currency, draft.budget)], ['Preferred timeframe', draft.timeline], ...questions.map(question => [question.label, draft.answers[question.id]])].map(([label, value]) => <div key={label}><dt className="text-xs text-slate-500 mb-1">{label}</dt><dd className="text-slate-200 break-words">{value}</dd></div>)}</dl><p className="text-sm text-slate-400 whitespace-pre-wrap break-words mt-5 pt-4 border-t border-slate-800">{draft.description}</p><button type="button" onClick={() => moveTo(1)} className="text-xs text-electric-400 underline mt-3">Edit budget and scope</button></section>
            <div className="grid sm:grid-cols-2 gap-5"><div><label htmlFor="name" className="block text-sm font-semibold mb-2">Your name *</label><input id="name" name="name" autoComplete="name" maxLength={100} required value={draft.name} onChange={event => update('name', event.target.value)} className={field} {...accessibility('name')} />{error('name')}</div><div><label htmlFor="email" className="block text-sm font-semibold mb-2">Email address *</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required value={draft.email} onChange={event => update('email', event.target.value)} className={field} {...accessibility('email')} />{error('email')}</div></div>
            <div><label htmlFor="consent" className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"><input id="consent" name="consent" type="checkbox" required checked={draft.consent} onChange={event => update('consent', event.target.checked)} className="accent-sky-500 mt-1" {...accessibility('consent')} /><span>I agree to be contacted about this enquiry, as described in the <Link href="/privacy" className="text-electric-400 underline">privacy notice</Link>.</span></label>{error('consent')}</div>
            <div ref={widget} className="min-h-[65px]" />
            <div aria-live="polite" className="text-sm text-slate-300 leading-relaxed">{status === 'loading' ? 'Loading secure submission…' : message}{status === 'unavailable' && <button type="button" onClick={() => void loadConfig()} className="block mt-3 text-electric-400 underline">Retry secure submission</button>}</div>
          </>}
          <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="website">Leave empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <div className="flex items-center justify-between gap-4 border-t border-slate-800 pt-6">{step > 0 ? <button type="button" disabled={status === 'sending'} onClick={() => moveTo(step - 1)} className="inline-flex items-center gap-2 text-sm text-slate-300 disabled:opacity-50"><ArrowLeft size={16} />Back</button> : <span className="text-xs text-slate-500">Required fields marked *</span>}<button type="submit" disabled={step === 2 && (status !== 'ready' || !token)} className="gradient-bg inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">{step < 2 ? 'Continue' : status === 'sending' ? 'Sending brief…' : 'Request my quote'}<ArrowRight size={16} /></button></div>
          {step === 2 && <p className="text-xs text-slate-400 leading-relaxed">Prefer to send it directly? <a href={emailHref} className="text-electric-400 underline">Open this brief in your email app</a>. You will review and send it yourself.</p>}
        </fieldset>
      </form>
      <aside className="space-y-5 lg:sticky lg:top-28"><div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6"><p className="eyebrow">What happens next</p><h2 className="text-xl font-semibold">A clear scope before a quote.</h2><ol className="mt-5 space-y-5 text-sm">{[['Review', 'I review your goals, constraints, and existing systems.'], ['Clarify', 'We discuss open questions and agree the priorities.'], ['Propose', 'You receive a scoped proposal with pricing and delivery milestones.']].map(([title, text], index) => <li key={title} className="flex gap-3"><span className="text-electric-400 text-xs font-semibold pt-0.5">0{index + 1}</span><div><p className="font-medium mb-1">{title}</p><p className="text-slate-400 leading-relaxed">{text}</p></div></li>)}</ol><p className="flex gap-2 mt-6 pt-5 border-t border-slate-700 text-xs text-slate-400 leading-relaxed"><ShieldCheck size={16} className="shrink-0 text-electric-400" />No payment or booking is made by submitting this request.</p></div><a href={'mailto:' + contactEmail} className="flex items-start gap-3 rounded-xl border border-slate-800 p-5 hover:border-electric-500/40 transition-colors"><Mail size={19} className="shrink-0 text-electric-400 mt-1" /><span><span className="block font-medium text-sm">Have a quick question?</span><span className="block text-xs text-slate-400 mt-1 break-all">{contactEmail}</span></span></a></aside>
    </div>
  </>
}
