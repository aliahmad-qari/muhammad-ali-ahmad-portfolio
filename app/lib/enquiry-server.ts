import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto'
import { Client } from '@upstash/qstash'
import { validateContact, validateEnquiry } from './enquiry-validation'
import { budgetLabel, followUpQuestions } from '../config/enquiry'
import { persistEnquiry, loadEnquiry, markDelivery, saveDelivery, type StoredDelivery } from './enquiry-persistence'

type Env = Record<string, string | undefined>
type Dependencies = { env: Env; fetch: typeof fetch; now: () => number; queue?: (reference: string, kind: 'admin' | 'ack') => Promise<void>; log?: (level: 'info' | 'error', event: string, details: Record<string, string | number>) => void }
class ServiceError extends Error { constructor(public status: number, message: string) { super(message) } }
const required = [ 'ENQUIRY_FROM_EMAIL', 'ENQUIRY_TO_EMAIL', 'ENQUIRY_SIGNING_SECRET', 'ENQUIRY_DATA_ENCRYPTION_KEY', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'QSTASH_TOKEN', 'QSTASH_CURRENT_SIGNING_KEY', 'QSTASH_NEXT_SIGNING_KEY', 'TURNSTILE_SECRET_KEY', 'NEXT_PUBLIC_TURNSTILE_SITE_KEY']
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
  const log = deps.log || ((level, event, details) => console[level](JSON.stringify({ event, ...details })))
  const origin = () => new URL(env.NEXT_PUBLIC_SITE_URL || 'https://muhammad-ali-ahmad-portfolio.vercel.app').origin
  function assertOrigin(request: Request, post: boolean) {
    const source = request.headers.get('origin')
    const allowed = new Set([origin()])
    if (env.NODE_ENV !== 'production') { allowed.add('http://localhost:3000'); allowed.add('http://127.0.0.1:3000') }
    if ((post && !source) || (source && !allowed.has(source))) throw new ServiceError(403, 'Please submit this form from the portfolio website.')
    if (request.headers.get('sec-fetch-site') === 'cross-site') throw new ServiceError(403, 'Cross-site submissions are not accepted.')
  }
  const emailProvider = env.ENQUIRY_EMAIL_PROVIDER || (env.BREVO_API_KEY ? 'brevo' : 'resend')
  const enqueue = deps.queue || (async (reference: string, kind: 'admin' | 'ack') => {
    const client = new Client({ token: env.QSTASH_TOKEN! })
    await client.publishJSON({ url: origin() + '/api/enquiry/deliver', body: { reference, kind }, delay: '60s', retries: 3, deduplicationId: `${reference}-${kind}` })
  })
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
        const isContact = body.kind === 'contact'
        if (typeof body.website !== 'string' || body.website !== '') throw new ServiceError(400, 'The enquiry could not be verified.')
        const challenge = typeof body.challenge === 'string' ? body.challenge : ''
        const parts = challenge.split('.')
        const payload = parts.slice(0, 2).join('.')
        const expected = signature(payload, env.ENQUIRY_SIGNING_SECRET!)
        if (parts.length !== 3 || !/^[a-f0-9]{64}$/.test(parts[2]) || !timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected))) throw new ServiceError(400, 'Please reload the form and try again.')
        const elapsed = now() - Number(parts[0])
        if (!Number.isFinite(elapsed) || elapsed < 2000 || elapsed > 3600000) throw new ServiceError(400, 'Please refresh the form and try again.')
        const contactResult = isContact ? validateContact(body) : undefined
        const enquiryResult = isContact ? undefined : validateEnquiry(body)
        if (isContact && !contactResult?.data) return json({ error: 'Please check the highlighted fields.', errors: contactResult?.errors || {} }, 400)
        if (!isContact && !enquiryResult?.data) return json({ error: 'Please check the highlighted fields.', errors: enquiryResult?.errors || {} }, 400)
        if (typeof body.turnstileToken !== 'string' || !body.turnstileToken || body.turnstileToken.length > 2048) throw new ServiceError(400, 'Please complete the spam check.')
        if (typeof body.submissionId !== 'string' || !/^[a-f0-9-]{36}$/i.test(body.submissionId)) throw new ServiceError(400, 'Please reload the form and try again.')
        const verification = await provider('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: body.turnstileToken }) })
        const verified = verification.ok ? await verification.json() : {}
        const expectedAction = isContact ? 'portfolio-contact' : 'project-enquiry'
        if (!verified.success || verified.hostname !== new URL(origin()).hostname || verified.action !== expectedAction) throw new ServiceError(400, 'The spam check expired or failed. Please try again.')
        const contactData = contactResult?.data
        const enquiryData = enquiryResult?.data
        const recipientName = contactData?.name || enquiryData!.name
        const recipientEmail = contactData?.email || enquiryData!.email
        const messageBody = contactData?.message || enquiryData!.description
        const subjectLine = contactData ? 'Portfolio contact: ' + (contactData.subject || 'General message') : 'Quote request: ' + enquiryData!.projectType
        const details: string[][] = contactData
          ? [['Name', contactData.name], ['Email', contactData.email], ['Subject', contactData.subject || 'General message']]
          : [
            ['Name', enquiryData!.name], ['Email', enquiryData!.email], ['Business', enquiryData!.company || 'Not provided'],
            ['Project', enquiryData!.projectType], ['Project stage', enquiryData!.projectStage], ['Existing website', enquiryData!.existingUrl || 'Not provided'],
            ['Budget estimate', budgetLabel(enquiryData!.currency, enquiryData!.budget)], ['Preferred timeframe', enquiryData!.timeline],
            ...(followUpQuestions[enquiryData!.projectType] || []).map(question => [question.label, enquiryData!.answers[question.id]]),
          ]
        const text = [contactData ? 'New portfolio contact message' : 'New project quote request', ...details.map(([label, value]) => label + ': ' + value), '', contactData ? 'Message' : 'Project brief', messageBody, '', 'Consent: agreed to be contacted about this message', 'Received: ' + new Date(now()).toISOString()].join('\n')
        const digest = signature(JSON.stringify([body.submissionId, contactData || enquiryData]), env.ENQUIRY_SIGNING_SECRET!)
        const reference = digest.slice(0, 12)
        const idempotencyKey = 'enquiry-' + digest
        const brevoKey = digest.slice(0, 8) + '-' + digest.slice(8, 12) + '-4' + digest.slice(13, 16) + '-a' + digest.slice(17, 20) + '-' + digest.slice(20, 32)
        const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!))
        const html = '<!doctype html><html><body style="margin:0;background:#f1f5f9;padding:24px;font-family:Arial,sans-serif;color:#0f172a"><div style="max-width:680px;margin:auto;background:white;padding:28px;border-radius:12px"><p style="color:#0284c7;font-size:12px;letter-spacing:2px">PORTFOLIO / NEW MESSAGE</p><h1 style="font-size:24px">' + (contactData ? 'Contact message' : 'Project quote request') + '</h1><table style="width:100%;border-collapse:collapse">' + details.map(([label, value]) => '<tr><th style="text-align:left;vertical-align:top;padding:10px 12px 10px 0;border-bottom:1px solid #e2e8f0;font-size:13px;width:40%">' + escape(label) + '</th><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:14px">' + escape(value) + '</td></tr>').join('') + '</table><h2 style="font-size:18px;margin-top:24px">' + (contactData ? 'Message' : 'Project brief') + '</h2><p style="line-height:1.7;white-space:pre-wrap">' + escape(messageBody) + '</p><p style="font-size:12px;color:#64748b">The visitor consented to follow-up about this message. Reply to this email to contact them.</p></div></body></html>'
        const isBrevo = emailProvider === 'brevo'
        const mail = isBrevo ? {
          sender: { email: env.ENQUIRY_FROM_EMAIL, name: env.ENQUIRY_FROM_NAME || 'Muhammad Ali Ahmad | Portfolio' },
          to: [{ email: env.ENQUIRY_TO_EMAIL }], replyTo: { email: recipientEmail, name: recipientName },
          subject: subjectLine, textContent: text, htmlContent: html,
          headers: { idempotencyKey: brevoKey },
        } : { from: env.ENQUIRY_FROM_EMAIL, to: [env.ENQUIRY_TO_EMAIL], reply_to: recipientEmail, subject: subjectLine, text }
        const endpoint = isBrevo ? 'https://api.brevo.com/v3/smtp/email' : 'https://api.resend.com/emails'
        const auth: Record<string, string> = isBrevo ? { 'api-key': env.BREVO_API_KEY! } : { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Idempotency-Key': idempotencyKey }
        const adminDelivery: StoredDelivery = { kind: 'admin', provider: isBrevo ? 'brevo' : 'resend', endpoint, headers: {}, body: mail, status: 'pending', attempts: 0, idempotencyKey: isBrevo ? brevoKey : idempotencyKey }
        const stored = await persistEnquiry(env, env.ENQUIRY_DATA_ENCRYPTION_KEY!, env.ENQUIRY_SIGNING_SECRET!, body.submissionId as string, [adminDelivery], now(), deps.fetch)
        if (!stored.isNew) return json({ message: 'Your enquiry was already received.', reference: stored.reference })
        const jobReference = stored.reference
        const storeKeys = stored.keys
        const savedRecord = await loadEnquiry(env, env.ENQUIRY_DATA_ENCRYPTION_KEY!, storeKeys.record, deps.fetch)
        if (!savedRecord) throw new ServiceError(503, 'Your enquiry could not be loaded for email processing.')
        await enqueue(jobReference, 'admin')
        await markDelivery(env, env.ENQUIRY_DATA_ENCRYPTION_KEY!, storeKeys, savedRecord, 'admin', 'queued', deps.fetch)
        let sent: Response | undefined
        // Both providers receive a stable idempotency key when retrying the same request.
        for (let attempt = 0; attempt < 2; attempt++) {
          try { sent = await provider(endpoint, { method: 'POST', headers: { ...auth, Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(mail) }) }
          catch (error) {
            if (attempt === 1) {
              log('error', 'enquiry_email_transport_failed', { provider: emailProvider, reference, attempts: attempt + 1, errorType: error instanceof Error ? error.name : 'UnknownError' })
              break
            }
            continue
          }
          if (sent.ok || (sent.status < 500 && sent.status !== 429)) break
        }
        if (!sent) {
          log('error', 'enquiry_email_no_response', { provider: emailProvider, reference, attempts: 2 })
          sent = new Response(null, { status: 503 })
        }
        let receipt: Record<string, unknown>
        try { receipt = await sent.json() as Record<string, unknown> }
        catch {
          log('error', 'enquiry_email_invalid_receipt', { provider: emailProvider, reference, status: sent.status })
          receipt = {}
        }
        const alreadyAccepted = isBrevo && sent.status === 400 && receipt.code === 'duplicate_parameter'
        if (alreadyAccepted) log('info', 'enquiry_email_duplicate_accepted', { provider: emailProvider, reference })
        const adminAccepted = sent.ok || alreadyAccepted
        if (!adminAccepted) {
          log('error', 'enquiry_email_rejected', { provider: emailProvider, reference, attempts: sent.status >= 500 || sent.status === 429 ? 2 : 1, status: sent.status })
        }
        if (adminAccepted && !alreadyAccepted) {
          const receiptId = isBrevo ? receipt.messageId : receipt.id
          if (typeof receiptId !== 'string' || !receiptId) {
            log('error', 'enquiry_email_receipt_missing', { provider: emailProvider, reference, status: sent.status })
          }
          log('info', 'enquiry_email_accepted', { provider: emailProvider, reference, status: sent.status })
          await markDelivery(env, env.ENQUIRY_DATA_ENCRYPTION_KEY!, storeKeys, savedRecord, 'admin', 'accepted', deps.fetch)
        } else if (alreadyAccepted) await markDelivery(env, env.ENQUIRY_DATA_ENCRYPTION_KEY!, storeKeys, savedRecord, 'admin', 'accepted', deps.fetch)
        const acknowledgementText = contactData
          ? `Hello ${recipientName},\n\nThanks for reaching out. Your message has been received, and I will review it and reply to the email address you provided. If your request is about a project, you can share scope and budget details through the project enquiry form at ${origin()}/enquiry.\n\nThis is an automatic confirmation; no booking or payment has been made.\n\nMuhammad Ali Ahmad`
          : `Hello ${recipientName},\n\nThanks for your project enquiry. I have received your brief and will review the requirements before replying with any follow-up questions or a scoped proposal.\n\nYour submission does not create a booking or payment obligation.\n\nMuhammad Ali Ahmad`
        const ackDigest = signature(digest + ':client-acknowledgement', env.ENQUIRY_SIGNING_SECRET!)
        const ackBrevoKey = ackDigest.slice(0, 8) + '-' + ackDigest.slice(8, 12) + '-4' + ackDigest.slice(13, 16) + '-a' + ackDigest.slice(17, 20) + '-' + ackDigest.slice(20, 32)
        const acknowledgement = isBrevo ? {
          sender: { email: env.ENQUIRY_FROM_EMAIL, name: env.ENQUIRY_FROM_NAME || 'Muhammad Ali Ahmad | Portfolio' },
          to: [{ email: recipientEmail, name: recipientName }],
          replyTo: { email: env.ENQUIRY_TO_EMAIL },
          subject: contactData ? 'We received your message' : 'We received your project enquiry',
          textContent: acknowledgementText,
          htmlContent: '<!doctype html><html><body style="margin:0;background:#f1f5f9;padding:24px;font-family:Arial,sans-serif;color:#0f172a"><div style="max-width:620px;margin:auto;background:white;padding:28px;border-radius:12px"><p style="color:#0284c7;font-size:12px;letter-spacing:2px">MUHAMMAD ALI AHMAD / PORTFOLIO</p><h1 style="font-size:24px">' + (contactData ? 'Thanks for your message.' : 'Thanks for your project enquiry.') + '</h1><p style="line-height:1.7">' + (contactData ? 'Your message has been received. I will review it and reply to the email address you provided.' : 'I have received your brief and will review the requirements before replying with any follow-up questions or a scoped proposal.') + '</p><p style="line-height:1.7;color:#64748b">This is an automatic confirmation. No booking or payment has been made.</p><p style="margin-top:24px">Muhammad Ali Ahmad</p></div></body></html>',
          headers: { idempotencyKey: ackBrevoKey },
        } : {
          from: env.ENQUIRY_FROM_EMAIL, to: [recipientEmail], reply_to: env.ENQUIRY_TO_EMAIL,
          subject: contactData ? 'We received your message' : 'We received your project enquiry',
          text: acknowledgementText,
        }
        const ackDelivery: StoredDelivery = { kind: 'ack', provider: isBrevo ? 'brevo' : 'resend', endpoint, headers: {}, body: acknowledgement, status: 'pending', attempts: 0, idempotencyKey: isBrevo ? ackBrevoKey : idempotencyKey + '-client-ack' }
        await saveDelivery(env, env.ENQUIRY_DATA_ENCRYPTION_KEY!, storeKeys, savedRecord, ackDelivery, deps.fetch)
        await enqueue(jobReference, 'ack')
        await markDelivery(env, env.ENQUIRY_DATA_ENCRYPTION_KEY!, storeKeys, savedRecord, 'ack', 'queued', deps.fetch)
        let ackSent: Response | undefined
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            ackSent = await provider(endpoint, { method: 'POST', headers: { ...auth, ...(isBrevo ? {} : { 'Idempotency-Key': idempotencyKey + '-client-ack' }), Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(acknowledgement) })
          } catch (error) {
            if (attempt === 1) log('error', 'enquiry_ack_email_transport_failed', { provider: emailProvider, reference, attempts: 2, errorType: error instanceof Error ? error.name : 'UnknownError' })
            continue
          }
          if (ackSent.ok || (isBrevo && ackSent.status === 400) || (ackSent.status < 500 && ackSent.status !== 429)) break
        }
        if (ackSent?.ok) { log('info', 'enquiry_ack_email_accepted', { provider: emailProvider, reference, status: ackSent.status }); await markDelivery(env, env.ENQUIRY_DATA_ENCRYPTION_KEY!, storeKeys, savedRecord, 'ack', 'accepted', deps.fetch) }
        else if (isBrevo && ackSent?.status === 400) {
          let ackReceipt: Record<string, unknown> = {}
          try { ackReceipt = await ackSent.json() as Record<string, unknown> } catch { /* log below with status only */ }
          if (ackReceipt.code === 'duplicate_parameter') log('info', 'enquiry_ack_email_duplicate_accepted', { provider: emailProvider, reference })
          else log('error', 'enquiry_ack_email_rejected', { provider: emailProvider, reference, attempts: 1, status: ackSent.status })
        } else if (ackSent) log('error', 'enquiry_ack_email_rejected', { provider: emailProvider, reference, attempts: ackSent.status >= 500 || ackSent.status === 429 ? 2 : 1, status: ackSent.status })
        else log('error', 'enquiry_ack_email_no_response', { provider: emailProvider, reference, attempts: 2 })
        return json({ message: contactData ? 'Your message was saved and queued for email delivery. Thank you.' : 'Your enquiry was saved and queued for email delivery. Thank you.', reference: jobReference })
      } catch (error) {
        // Never include provider bodies, credentials, or the enquiry itself in logs or responses.
        return json({ error: error instanceof ServiceError ? error.message : 'The enquiry service could not be reached. Please retry or email me directly.' }, error instanceof ServiceError ? error.status : 503)
      }
    },
  }
}
