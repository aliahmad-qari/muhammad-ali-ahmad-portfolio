'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { AlertCircle, CheckCircle, Loader2, Mail, Phone, Send, Linkedin } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { contactEmail } from '../config/site'

type Turnstile = { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void; reset: (id: string) => void }
declare global { interface Window { turnstile?: Turnstile } }
type Status = 'loading' | 'ready' | 'sending' | 'success' | 'error' | 'unavailable'
type Message = { name: string; email: string; subject: string; message: string; consent: boolean }
const blank: Message = { name: '', email: '', subject: '', message: '', consent: false }

export default function Contact() {
  const sectionRef = useIntersectionObserver()
  const widget = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string>()
  const submissionId = useRef('')
  const [formData, setFormData] = useState<Message>(blank)
  const [status, setStatus] = useState<Status>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [reference, setReference] = useState('')
  const [config, setConfig] = useState<{ challenge: string; siteKey: string } | null>(null)
  const [scriptReady, setScriptReady] = useState(false)
  const [token, setToken] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const loadConfig = useCallback(async (signal?: AbortSignal) => {
    setStatus('loading')
    try {
      const response = await fetch('/api/enquiry', { cache: 'no-store', signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Secure contact is not configured.')
      submissionId.current = crypto.randomUUID()
      setConfig(data)
      setStatus('ready')
      setErrorMsg('')
    } catch (error) {
      if (!signal?.aborted) {
        setConfig(null)
        setStatus('unavailable')
        setErrorMsg(error instanceof Error ? error.message : 'Online contact is temporarily unavailable.')
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void loadConfig(controller.signal)
    return () => controller.abort()
  }, [loadConfig])

  useEffect(() => {
    if (!config || !scriptReady || !widget.current || !window.turnstile) return
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey: config.siteKey, action: 'portfolio-contact', theme: 'dark', size: 'flexible',
      callback: (value: string) => setToken(value), 'expired-callback': () => setToken(''),
      'error-callback': () => { setToken(''); setErrorMsg('Spam verification could not load. Please retry or email me directly.') },
    })
    return () => { if (widgetId.current) window.turnstile?.remove(widgetId.current); widgetId.current = undefined; setToken('') }
  }, [config, scriptReady])

  function update<K extends keyof Message>(key: K, value: Message[K]) {
    setFormData(previous => ({ ...previous, [key]: value }))
    setErrorMsg('')
    if (status === 'error') setStatus(config ? 'ready' : 'unavailable')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (honeypot) return
    if (formData.name.trim().length < 2 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(formData.email.trim()) || formData.subject.length > 120 || formData.message.trim().length < 10 || formData.message.trim().length > 4000 || !formData.consent) {
      setStatus('error')
      setErrorMsg('Check your name, email, message (10–4,000 characters), and contact consent.')
      return
    }
    if (!config || !token || status === 'unavailable') {
      setErrorMsg('Complete the spam check before sending, or email me directly.')
      return
    }
    setStatus('sending')
    setErrorMsg('')
    try {
      const challengeResponse = await fetch('/api/enquiry', { cache: 'no-store', signal: AbortSignal.timeout(10000) })
      const freshChallenge = await challengeResponse.json()
      if (!challengeResponse.ok || typeof freshChallenge.challenge !== 'string') throw new Error(freshChallenge.error || 'Secure verification expired. Please retry.')
      const response = await fetch('/api/enquiry', {
        method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(35000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'contact', ...formData, name: formData.name.trim(), email: formData.email.trim(), subject: formData.subject.trim(), message: formData.message.trim(), website: new FormData(event.currentTarget).get('website') || '', challenge: freshChallenge.challenge, turnstileToken: token, submissionId: submissionId.current }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Your message could not be sent. Please retry.')
      setReference(typeof data.reference === 'string' ? data.reference : '')
      setStatus('success')
      setFormData(blank)
    } catch (error) {
      setStatus('ready')
      setErrorMsg(error instanceof Error && !['TimeoutError', 'AbortError'].includes(error.name) ? error.message : 'The service took too long. Your message remains in the form; retry or email me directly.')
    } finally {
      setToken('')
      if (widgetId.current) window.turnstile?.reset(widgetId.current)
    }
  }

  const contactInfo = [
    { icon: <Mail size={24} />, label: 'Email', value: contactEmail, link: 'mailto:' + contactEmail, color: 'from-blue-500 to-cyan-500', iconColor: 'text-blue-400 group-hover:text-cyan-400' },
    { icon: <Phone size={24} />, label: 'WhatsApp', value: '+92 307 9922301', link: 'https://wa.me/923079922301', color: 'from-green-500 to-emerald-500', iconColor: 'text-green-400 group-hover:text-emerald-400' },
    { icon: <Linkedin size={24} />, label: 'LinkedIn', value: 'muhammad-ali-ahmad-mern', link: 'https://linkedin.com/in/muhammad-ali-ahmad-mern', color: 'from-purple-500 to-pink-500', iconColor: 'text-purple-400 group-hover:text-pink-400' },
  ]
  const inputClass = 'w-full px-4 py-3 bg-black/30 border border-slate-700 rounded-lg focus:outline-none focus:border-electric-400 focus:ring-2 focus:ring-electric-500/20 transition-all'

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      {config && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setScriptReady(true)} onError={() => { setStatus('error'); setErrorMsg('Spam verification could not load. Please email me directly.') }} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-12 bg-gradient-to-r from-transparent to-electric-500" /><span className="text-xs font-semibold uppercase tracking-widest text-electric-400">Let&apos;s connect</span><div className="h-px w-12 bg-gradient-to-l from-transparent to-electric-500" /></div>
          <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-3">Let&apos;s Work Together</h2>
          <p className="text-center text-gray-400 text-sm">Open to professional roles and freelance projects. Send a message or share your project requirements.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="animate-on-scroll">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3><Link href="/enquiry" className="inline-block mb-6 gradient-bg px-5 py-3 rounded-lg font-semibold">Send a project enquiry</Link>
            <div className="space-y-6">{contactInfo.map(item => <a key={item.label} href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="glass p-5 rounded-xl flex items-center gap-4 hover-lift group relative overflow-hidden"><div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} /><div className={`${item.iconColor} relative z-10 transition-colors duration-300`}>{item.icon}</div><div className="relative z-10"><p className="text-gray-400 text-sm">{item.label}</p><p className="font-semibold group-hover:text-electric-400 transition-colors break-all">{item.value}</p></div></a>)}</div>
            <div className="mt-8 glass p-6 rounded-xl"><h4 className="font-bold mb-3">Available for:</h4><ul className="space-y-2 text-gray-400">{['Full-time opportunities', 'Freelance projects', 'Onsite, hybrid & remote roles', 'SaaS and product teams'].map(item => <li key={item} className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400 flex-shrink-0" />{item}</li>)}</ul></div>
          </div>

          <div className="animate-on-scroll">
            {status === 'success' ? <div className="glass p-8 rounded-2xl text-center" role="status"><CheckCircle size={56} className="text-green-400 mx-auto mb-4" /><h3 className="text-2xl font-bold mb-2">Message received</h3><p className="text-gray-400">Your message has been saved, and email delivery is queued. If the confirmation email does not arrive, check your spam folder.</p>{reference && <p className="text-sm text-gray-500 mt-3">Reference: {reference}</p>}<button type="button" onClick={() => { setStatus('ready'); setReference(''); void loadConfig() }} className="mt-6 gradient-bg px-6 py-3 rounded-lg text-sm font-semibold">Send another</button></div> : <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-5" noValidate aria-busy={status === 'sending'}>
              <h3 className="text-2xl font-bold">Send a message</h3>
              <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="contact-website">Leave empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={event => setHoneypot(event.target.value)} /></div>
              <div className="grid sm:grid-cols-2 gap-4"><div><label htmlFor="contact-name" className="block text-sm font-semibold mb-2">Name *</label><input id="contact-name" autoComplete="name" maxLength={100} required value={formData.name} onChange={event => update('name', event.target.value)} className={inputClass} placeholder="Your name" /></div><div><label htmlFor="contact-email" className="block text-sm font-semibold mb-2">Email *</label><input id="contact-email" type="email" autoComplete="email" maxLength={254} required value={formData.email} onChange={event => update('email', event.target.value)} className={inputClass} placeholder="you@example.com" /></div></div>
              <div><label htmlFor="contact-subject" className="block text-sm font-semibold mb-2">Subject</label><input id="contact-subject" maxLength={120} value={formData.subject} onChange={event => update('subject', event.target.value)} className={inputClass} placeholder="Project, role, or question" /></div>
              <div><label htmlFor="contact-message" className="block text-sm font-semibold mb-2">Message *</label><textarea id="contact-message" required minLength={10} maxLength={4000} rows={5} value={formData.message} onChange={event => update('message', event.target.value)} className={inputClass + ' resize-y'} placeholder="How can I help?" /><p className="text-xs text-slate-500 mt-1">{formData.message.length}/4000</p></div>
              <label className="flex items-start gap-3 text-sm text-slate-300"><input type="checkbox" required checked={formData.consent} onChange={event => update('consent', event.target.checked)} className="accent-sky-500 mt-1" /><span>I agree to be contacted in response to this message. See the <Link href="/privacy" className="text-electric-400 underline">privacy notice</Link>.</span></label>
              <div ref={widget} className="min-h-[65px]" />
              <div aria-live="polite" className="text-sm text-slate-300">{status === 'loading' && <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" />Preparing secure form…</span>}{Boolean(errorMsg) && status !== 'loading' && <span className="flex items-start gap-2 text-red-300"><AlertCircle size={16} className="shrink-0 mt-0.5" />{errorMsg}</span>}</div>
              {status === 'unavailable' && <button type="button" onClick={() => void loadConfig()} className="text-sm text-electric-400 underline">Retry secure setup</button>}
              <button type="submit" disabled={status !== 'ready' || !token} className="w-full gradient-bg px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">{status === 'sending' ? <><Loader2 size={20} className="animate-spin" />Sending…</> : <><Send size={20} />Send message</>}</button>
              <p className="text-xs text-slate-400">Secure delivery is powered by the same server-side email service as project enquiries. If it is unavailable, email <a className="text-electric-400 underline" href={'mailto:' + contactEmail}>{contactEmail}</a>.</p>
            </form>}
          </div>
        </div>
      </div>
    </section>
  )
}
