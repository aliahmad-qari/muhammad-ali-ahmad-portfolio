'use client'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// ── EmailJS config ──────────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Create a service (Gmail) → copy Service ID
// 3. Create an email template → copy Template ID
// 4. Copy your Public Key from Account → API Keys
// Replace the three values below with your own:
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
// ────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const sectionRef = useIntersectionObserver()
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [honeypot, setHoneypot] = useState('')   // spam trap

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const validate = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) return 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address.'
    if (!formData.message.trim() || formData.message.trim().length < 10) return 'Message must be at least 10 characters.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return   // bot detected

    const validationError = validate()
    if (validationError) { setErrorMsg(validationError); setStatus('error'); return }

    setStatus('loading')
    setErrorMsg('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    formData.name,
          from_email:   formData.email,
          subject:      formData.subject || 'Portfolio Contact',
          message:      formData.message,
          reply_to:     formData.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
      setErrorMsg('Failed to send message. Please try emailing me directly at ali.islamic.meh1@gmail.com')
    }
  }

  const contactInfo = [
    { icon: <Mail size={24} />, label: 'Email', value: 'ali.islamic.meh1@gmail.com', link: 'mailto:ali.islamic.meh1@gmail.com', color: 'from-blue-500 to-cyan-500', iconColor: 'text-blue-400 group-hover:text-cyan-400' },
    { icon: <Phone size={24} />, label: 'WhatsApp', value: '+92 307 9922301', link: 'https://wa.me/923079922301', color: 'from-green-500 to-emerald-500', iconColor: 'text-green-400 group-hover:text-emerald-400' },
    { icon: <Linkedin size={24} />, label: 'LinkedIn', value: 'muhammad-ali-ahmad-mern', link: 'https://linkedin.com/in/muhammad-ali-ahmad-mern', color: 'from-purple-500 to-pink-500', iconColor: 'text-purple-400 group-hover:text-pink-400' },
  ]

  const inputClass = 'w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all'

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500"></div>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Let's connect</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-3">Let's Work Together</h2>
          <p className="text-center text-gray-400 text-sm">
            Open to opportunities with international companies. Contact me to discuss your web development needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="animate-on-scroll">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="glass p-5 rounded-xl flex items-center gap-4 hover-lift group relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className={`${item.iconColor} relative z-10 transition-colors duration-300`}>{item.icon}</div>
                  <div className="relative z-10">
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <p className="font-semibold group-hover:text-purple-400 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-8 glass p-6 rounded-xl">
              <h4 className="font-bold mb-3">Available for:</h4>
              <ul className="space-y-2 text-gray-400">
                {['Full-time opportunities', 'Freelance projects', 'Onsite, Hybrid & Remote', 'SaaS & startup teams'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-on-scroll">
            <form ref={formRef} onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-5 hover-lift" noValidate>
              {status === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">I'll get back to you within 24 hours.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="mt-6 gradient-bg px-6 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-all">
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  {/* Honeypot – hidden from real users */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} className={inputClass} placeholder="Project inquiry, Job opportunity..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Message *</label>
                    <textarea name="message" required value={formData.message} onChange={handleChange} rows={5} className={`${inputClass} resize-none`} placeholder="Tell me about your project or opportunity..."></textarea>
                  </div>

                  {status === 'error' && errorMsg && (
                    <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full gradient-bg px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={20} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={20} /> Send Message</>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
