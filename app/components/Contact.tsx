'use client'
import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, Linkedin, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    { icon: <Mail size={24} />, label: 'Email', value: 'ali.islamic.meh1@gmail.com', link: 'mailto:ali.islamic.meh1@gmail.com', color: 'from-blue-500 to-cyan-500', iconColor: 'text-blue-400 group-hover:text-cyan-400' },
    { icon: <Phone size={24} />, label: 'WhatsApp', value: '+92 307 9922301', link: 'https://wa.me/923079922301', color: 'from-green-500 to-emerald-500', iconColor: 'text-green-400 group-hover:text-emerald-400' },
    { icon: <Linkedin size={24} />, label: 'LinkedIn', value: 'muhammad-ali-ahmad-mern', link: 'https://linkedin.com/in/muhammad-ali-ahmad-mern', color: 'from-purple-500 to-pink-500', iconColor: 'text-purple-400 group-hover:text-pink-400' }
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text animate-on-scroll">
          Get In Touch
        </h2>
        <p className="text-center text-gray-400 mb-16 animate-on-scroll">Let's discuss your next project</p>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
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
              <h4 className="font-bold mb-2">Available for:</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Full-time opportunities</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Freelance projects</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Remote work worldwide</li>
              </ul>
            </div>
          </div>

          <div className="animate-on-scroll">
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6 hover-lift">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">I'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none" placeholder="Your message..."></textarea>
                  </div>
                  <button type="submit" className="w-full gradient-bg px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                    Send Message <Send size={20} />
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
