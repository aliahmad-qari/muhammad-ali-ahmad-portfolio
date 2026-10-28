import type { Metadata } from 'next'
import PageShell from '../components/PageShell'
import { contactEmail } from '../config/site'
export const metadata: Metadata = { title: 'Enquiry Privacy Notice', description: 'How project enquiry information is used and handled.', alternates: { canonical: '/privacy' } }
export default function PrivacyPage() {
  return <PageShell><article className="max-w-3xl mx-auto px-4 py-12 space-y-7 text-slate-300"><h1 className="text-4xl font-bold text-slate-100">Enquiry privacy notice</h1>
    <p>This portfolio is operated by Muhammad Ali Ahmad. Project enquiry details are used to review your requirements and respond to you, not to subscribe you to marketing.</p>
    <section><h2 className="text-xl font-semibold mb-3">Information you provide</h2><p>The enquiry collects your name, email, project type, discovery answers, budget range and currency, preferred timeline, description, optional business details, and contact consent. Please do not include sensitive personal information, client records, or credentials.</p></section>
    <section><h2 className="text-xl font-semibold mb-3">Delivery and spam protection</h2><p>When the form is enabled, Brevo (or Resend, if configured instead) processes the email notification, Cloudflare Turnstile verifies the spam check, and Upstash Redis stores a hashed network identifier and an attempt count for ten minutes. The hosting provider also processes requests and may maintain operational logs. These providers may process data outside your country.</p></section>
    <section><h2 className="text-xl font-semibold mb-3">Storage and requests</h2><p>The application does not maintain an enquiry database. Enquiries are sent to the portfolio owner's inbox and retained for the conversation or any resulting engagement. You can ask for access, correction, or deletion by emailing <a className="text-electric-400 underline" href={'mailto:' + contactEmail}>{contactEmail}</a>. Records needed for an active contract or legal obligation may need to be retained.</p></section>
    <section><h2 className="text-xl font-semibold mb-3">Your choice</h2><p>You may contact me directly by email instead of submitting the form. Withdrawing contact consent stops further enquiry follow-up; it does not undo messages already delivered.</p></section>
  </article></PageShell>
}
