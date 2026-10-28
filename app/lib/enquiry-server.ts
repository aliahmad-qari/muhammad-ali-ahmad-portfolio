import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto'
import { validateEnquiry } from './enquiry-validation'
import { budgetLabel, followUpQuestions } from '../config/enquiry'

type Env = Record<string, string | undefined>
type Dependencies = { env: Env; fetch: typeof fetch; now: () => number }
class ServiceError extends Error { constructor(public status: number, message: string) { super(message) } }
const required = [ 'ENQUIRY_FROM_EMAIL', 'ENQUIRY_TO_EMAIL', 'ENQUIRY_SIGNING_SECRET', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'TURNSTILE_SECRET_KEY', 'NEXT_PUBLIC_TURNSTILE_SITE_KEY']
function signature(value: string, secret: string) { return createHmac('sha256', secret).update(value).digest('hex') }
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
function json(body: unknown, status = 200) { return Response.json(body, { status, headers }) }
async function limitedJson(request: Request) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new ServiceError(415, 'Send a JSON request.')
  const reader = request.body?.getReader()
  if (!reader) throw new ServiceError(400, 'A request body is required.')
  const chunks: Uint8Array[] = []; let size = 0
  while (true) { const { value, done } = await reader.read(); if (done) break; size += value.length; if (size > 16384) { await reader.cancel(); throw new ServiceError(413, 'Your message is too large.') } chunks.push(value) }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) as Record<string, unknown> } catch { throw new ServiceError(400, 'The request could not be read.') }
}
export function createEnquiryHandlers(deps: Dependencies) {
  const { env, now } = deps
  const origin = () => new URL(env.NEXT_PUBLIC_SITE_URL || 'https://muhammad-ali-ahmad-portfolio.vercel.app').origin
  function assertOrigin(request: Request, post: boolean) {
    const source = request.headers.get('origin')
    const allowed = new Set([origin()])
    if (env.NODE_ENV !== 'production') { allowed.add('http://localhost:3000'); allowed.add('http://127.0.0.1:3000') }
    if ((post && !source) || (source && !allowed.has(source))) throw new ServiceError(403, 'Please submit this form from the portfolio website.')
    if (request.headers.get('sec-fetch-site') === 'cross-site') throw new ServiceError(403, 'Cross-site submissions are not accepted.')
  }
  const emailProvider = env.ENQUIRY_EMAIL_PROVIDER || (env.BREVO_API_KEY ? 'brevo' : 'resend')
  function configured() {
    const key = emailProvider === 'brevo' ? env.BREVO_API_KEY : emailProvider === 'resend' ? env.RESEND_API_KEY : undefined
    return Boolean(key) && required.every(key => Boolean(env[key])) && (env.ENQUIRY_SIGNING_SECRET?.length || 0) >= 32
  }
  async function provider(url: string, options: RequestInit) {
    const response = await deps.fetch(url, { ...options, signal: AbortSignal.timeout(8000), cache: 'no-store' })
    return response
  }
  async function rateLimit(request: Request) {
    // Vercel overwrites x-vercel-forwarded-for. Do not trust a client-supplied x-forwarded-for.
    const address = env.VERCEL ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'unknown' : 'local'
    const key = 'portfolio:enquiry:' + signature(address, env.ENQUIRY_SIGNING_SECRET!)
    const script = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n"
    const response = await provider(env.UPSTASH_REDIS_REST_URL!, { method: 'POST', headers: { Authorization: 'Bearer ' + env.UPSTASH_REDIS_REST_TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify(['EVAL', script, '1', key]) })
    if (!response.ok) throw new ServiceError(503, 'Enquiries are temporarily unavailable. Please email me directly.')
    const result = await response.json()
    if (typeof result.result !== 'number') throw new ServiceError(503, 'Enquiries are temporarily unavailable. Please email me directly.')
    if (result.result > 5) throw new ServiceError(429, 'Too many attempts. Please wait ten minutes or email me directly.')
  }
  return {
    async GET(request: Request) {
      try {
        assertOrigin(request, false)
        if (!configured()) return json({ error: 'The enquiry form is not available yet. Please email me directly.' }, 503)
        const payload = String(now()) + '.' + randomUUID()
        return json({ challenge: payload + '.' + signature(payload, env.ENQUIRY_SIGNING_SECRET!), siteKey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY })
      } catch (error) { return json({ error: error instanceof ServiceError ? error.message : 'The form could not be loaded.' }, error instanceof ServiceError ? error.status : 503) }
    },
    async POST(request: Request) {
      try {
        assertOrigin(request, true)
        if (!configured()) throw new ServiceError(503, 'Enquiries are temporarily unavailable. Please email me directly.')
        await rateLimit(request)
        const body = await limitedJson(request)
        if (!body || typeof body !== 'object' || Array.isArray(body)) throw new ServiceError(400, 'Invalid enquiry.')
        if (typeof body.website !== 'string' || body.website !== '') throw new ServiceError(400, 'The enquiry could not be verified.')
        const challenge = typeof body.challenge === 'string' ? body.challenge : ''
        const parts = challenge.split('.')
        const payload = parts.slice(0, 2).join('.')
        const expected = signature(payload, env.ENQUIRY_SIGNING_SECRET!)
        if (parts.length !== 3 || !/^[a-f0-9]{64}$/.test(parts[2]) || !timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected))) throw new ServiceError(400, 'Please reload the form and try again.')
        const elapsed = now() - Number(parts[0])
        if (!Number.isFinite(elapsed) || elapsed < 2000 || elapsed > 3600000) throw new ServiceError(400, 'Please refresh the form and try again.')
        const result = validateEnquiry(body)
        if (!result.data) return json({ error: 'Please check the highlighted fields.', errors: result.errors }, 400)
        if (typeof body.turnstileToken !== 'string' || !body.turnstileToken || body.turnstileToken.length > 2048) throw new ServiceError(400, 'Please complete the spam check.')
        if (typeof body.submissionId !== 'string' || !/^[a-f0-9-]{36}$/i.test(body.submissionId)) throw new ServiceError(400, 'Please reload the form and try again.')
        const verification = await provider('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: body.turnstileToken }) })
        const verified = verification.ok ? await verification.json() : {}
        if (!verified.success || verified.hostname !== new URL(origin()).hostname || verified.action !== 'project-enquiry') throw new ServiceError(400, 'The spam check expired or failed. Please try again.')
        const data = result.data
        const details = [
          ['Name', data.name], ['Email', data.email], ['Business', data.company || 'Not provided'],
          ['Project', data.projectType], ['Project stage', data.projectStage], ['Existing website', data.existingUrl || 'Not provided'],
          ['Budget estimate', budgetLabel(data.currency, data.budget)], ['Preferred timeframe', data.timeline],
          ...(followUpQuestions[data.projectType] || []).map(question => [question.label, data.answers[question.id]]),
        ]
        const text = ['New project quote request', ...details.map(([label, value]) => label + ': ' + value), '', 'Project brief', data.description, '', 'Consent: agreed to contact about this enquiry', 'Received: ' + new Date(now()).toISOString()].join('\n')
        const digest = signature(JSON.stringify([body.submissionId, data]), env.ENQUIRY_SIGNING_SECRET!)
        const idempotencyKey = 'enquiry-' + digest
        const brevoKey = digest.slice(0, 8) + '-' + digest.slice(8, 12) + '-4' + digest.slice(13, 16) + '-a' + digest.slice(17, 20) + '-' + digest.slice(20, 32)
        const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!))
        const html = '<!doctype html><html><body style="margin:0;background:#f1f5f9;padding:24px;font-family:Arial,sans-serif;color:#0f172a"><div style="max-width:680px;margin:auto;background:white;padding:28px;border-radius:12px"><p style="color:#0284c7;font-size:12px;letter-spacing:2px">PORTFOLIO / NEW ENQUIRY</p><h1 style="font-size:24px">Project quote request</h1><table style="width:100%;border-collapse:collapse">' + details.map(([label, value]) => '<tr><th style="text-align:left;vertical-align:top;padding:10px 12px 10px 0;border-bottom:1px solid #e2e8f0;font-size:13px;width:40%">' + escape(label) + '</th><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:14px">' + escape(value) + '</td></tr>').join('') + '</table><h2 style="font-size:18px;margin-top:24px">Project brief</h2><p style="line-height:1.7;white-space:pre-wrap">' + escape(data.description) + '</p><p style="font-size:12px;color:#64748b">The visitor consented to follow-up about this enquiry. Reply to this email to contact them. The budget is their estimate, not an agreed quote.</p></div></body></html>'
        const isBrevo = emailProvider === 'brevo'
        const mail = isBrevo ? {
          sender: { email: env.ENQUIRY_FROM_EMAIL, name: env.ENQUIRY_FROM_NAME || 'Muhammad Ali Ahmad | Portfolio' },
          to: [{ email: env.ENQUIRY_TO_EMAIL }], replyTo: { email: data.email, name: data.name },
          subject: 'Quote request: ' + data.projectType, textContent: text, htmlContent: html,
          headers: { idempotencyKey: brevoKey },
        } : { from: env.ENQUIRY_FROM_EMAIL, to: [env.ENQUIRY_TO_EMAIL], reply_to: data.email, subject: 'Portfolio enquiry: ' + data.projectType, text }
        const endpoint = isBrevo ? 'https://api.brevo.com/v3/smtp/email' : 'https://api.resend.com/emails'
        const auth: Record<string, string> = isBrevo ? { 'api-key': env.BREVO_API_KEY! } : { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Idempotency-Key': idempotencyKey }
        let sent: Response | undefined
        // Both providers receive a stable idempotency key when retrying the same request.
        for (let attempt = 0; attempt < 2; attempt++) {
          try { sent = await provider(endpoint, { method: 'POST', headers: { ...auth, Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(mail) }) }
          catch (error) { if (attempt === 1) throw error; continue }
          if (sent.ok || (sent.status < 500 && sent.status !== 429)) break
        }
        if (!sent) throw new ServiceError(502, 'The notification could not be sent. Please retry or email me directly.')
        const receipt = await sent.json()
        if (isBrevo && sent.status === 400 && receipt.code === 'duplicate_parameter') return json({ message: 'This enquiry was already accepted for email delivery. Thank you.' })
        if (!sent.ok) throw new ServiceError(502, 'The notification could not be sent. Your message is still here; please retry or email me directly.')
        const receiptId = isBrevo ? receipt.messageId : receipt.id
        if (typeof receiptId !== 'string' || !receiptId) throw new ServiceError(502, 'Delivery could not be confirmed. Please email me directly.')
        return json({ message: 'Your enquiry was accepted for email delivery. Thank you.' })
      } catch (error) {
        // Never include provider bodies, credentials, or the enquiry itself in logs or responses.
        return json({ error: error instanceof ServiceError ? error.message : 'The enquiry service could not be reached. Please retry or email me directly.' }, error instanceof ServiceError ? error.status : 503)
      }
    },
  }
}
