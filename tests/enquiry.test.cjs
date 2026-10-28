
const { test } = require('node:test')
const assert = require('node:assert/strict')
const ts = require('typescript')
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename)
}
const fs = require('node:fs')
const { validateEnquiry } = require('../app/lib/enquiry-validation.ts')
const { createEnquiryHandlers } = require('../app/lib/enquiry-server.ts')
const origin = 'https://portfolio.example'
const valid = { name: 'Test Person', email: 'person@example.test', company: '', existingUrl: '', projectType: 'Business Website', projectStage: 'New project', currency: 'USD', budget: 'not-sure', timeline: 'Flexible / need advice', answers: { websiteGoal: 'Enquire about services', pageCount: '2–5 pages' }, description: 'A business website with clear service pages and an enquiry workflow.', consent: true }
function fixture(options = {}) {
  let time = 1800000000000
  const calls = []
  const env = { NODE_ENV: 'production', VERCEL: '1', NEXT_PUBLIC_SITE_URL: origin, RESEND_API_KEY: 'test-only', ENQUIRY_FROM_EMAIL: 'test@example.test', ENQUIRY_TO_EMAIL: 'owner@example.test', ENQUIRY_SIGNING_SECRET: 'test-secret-not-for-production-000000', UPSTASH_REDIS_REST_URL: 'https://redis.example', UPSTASH_REDIS_REST_TOKEN: 'test-only', TURNSTILE_SECRET_KEY: 'test-only', NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'test-only', ...options.env }
  let emailAttempt = 0
  const mockedFetch = async (url, init) => {
    calls.push({ url, init })
    if (url.includes('redis.example')) return Response.json({ result: options.count || 1 })
    if (url.includes('siteverify')) return Response.json(options.verification || { success: true, hostname: 'portfolio.example', action: 'project-enquiry' })
    emailAttempt++
    if (options.mailFailure || (options.transient && emailAttempt === 1)) return Response.json({ error: 'provider-private-detail' }, { status: 500 })
    if (options.duplicate && url.includes('brevo.com')) return Response.json({ code: 'duplicate_parameter' }, { status: 400 })
    return Response.json(url.includes('brevo.com') ? { messageId: '<mock-email@brevo.test>' } : { id: 'mock-email-id' })
  }
  const handlers = createEnquiryHandlers({ env, fetch: mockedFetch, now: () => time })
  return { calls, handlers, advance: n => { time += n }, async payload() { const response = await handlers.GET(new Request(origin + '/api/enquiry')); const config = await response.json(); time += 3000; return { ...valid, challenge: config.challenge, website: '', submissionId: '8cfb1f47-40d8-45df-a2df-875e0c87cadd', turnstileToken: 'valid-mock-token' } }, post(body, requestOrigin = origin) { return handlers.POST(new Request(origin + '/api/enquiry', { method: 'POST', headers: { Origin: requestOrigin, 'Content-Type': 'application/json', 'x-vercel-forwarded-for': '192.0.2.1' }, body: JSON.stringify(body) })) } }
}
test('shared validation normalizes email and requires explicit consent', () => {
  assert.equal(validateEnquiry({ ...valid, email: ' PERSON@EXAMPLE.TEST ' }).data.email, 'person@example.test')
  for (const consent of [false, 'true', 'on', undefined]) assert.ok(validateEnquiry({ ...valid, consent }).errors.consent)
  assert.ok(validateEnquiry({ ...valid, email: 'person@example.test\r\nBcc:other@example.test' }).errors.email)
  assert.ok(validateEnquiry({ ...valid, projectType: 'not-a-package' }).errors.projectType)
  assert.ok(validateEnquiry({ ...valid, description: 'x'.repeat(5001) }).errors.description)
  assert.equal(validateEnquiry(null).data, undefined)
})
test('unconfigured service fails closed and never contacts providers', async () => {
  const f = fixture({ env: { RESEND_API_KEY: '' } })
  assert.equal((await f.handlers.GET(new Request(origin + '/api/enquiry'))).status, 503)
  assert.equal((await f.post(valid)).status, 503)
  assert.equal(f.calls.length, 0)
})
test('cross-origin requests are rejected before provider access', async () => {
  const f = fixture()
  assert.equal((await f.post(valid, 'https://attacker.example')).status, 403)
  assert.equal(f.calls.length, 0)
})
test('honeypot, forged challenge, and expired challenge cannot send email', async () => {
  for (const change of [{ website: 'bot' }, { challenge: 'forged' }, { expired: true }]) {
    const f = fixture(); const body = await f.payload()
    if (change.expired) f.advance(3600001)
    else Object.assign(body, change)
    assert.equal((await f.post(body)).status, 400)
    assert.ok(!f.calls.some(call => call.url.includes('resend.com')))
  }
})
test('rate limit blocks further submission and stores no raw network address in its key', async () => {
  const f = fixture({ count: 6 }); const body = await f.payload()
  assert.equal((await f.post(body)).status, 429)
  assert.equal(f.calls.length, 1)
  assert.ok(!f.calls[0].init.body.includes('192.0.2.1'))
})
test('server field validation and challenge age reject bypassed client checks', async () => {
  const f = fixture(); const body = await f.payload()
  assert.equal((await f.post({ ...body, consent: false })).status, 400)
  assert.ok(!f.calls.some(call => call.url.includes('resend.com')))
})
test('Turnstile must succeed for the configured hostname and form action', async () => {
  for (const verification of [{ success: false }, { success: true, hostname: 'attacker.example', action: 'project-enquiry' }, { success: true, hostname: 'portfolio.example', action: 'another-form' }]) {
    const f = fixture({ verification }); const body = await f.payload()
    assert.equal((await f.post(body)).status, 400)
    assert.ok(!f.calls.some(call => call.url.includes('resend.com')))
  }
})
test('successful notification uses a verified sender, reply-to, plain text, and private credentials', async () => {
  const f = fixture(); const body = await f.payload()
  const response = await f.post(body)
  assert.equal(response.status, 200)
  const mail = f.calls.find(call => call.url.includes('resend.com'))
  const payload = JSON.parse(mail.init.body)
  assert.equal(payload.from, 'test@example.test'); assert.equal(payload.reply_to, valid.email)
  assert.ok(payload.text.includes(valid.description)); assert.equal(payload.html, undefined)
  assert.ok(!(await response.text()).includes('test-only'))
})
test('transient email errors retry with the same idempotency key', async () => {
  const f = fixture({ transient: true }); const body = await f.payload()
  assert.equal((await f.post(body)).status, 200)
  const mails = f.calls.filter(call => call.url.includes('resend.com'))
  assert.equal(mails.length, 2)
  assert.equal(mails[0].init.headers['Idempotency-Key'], mails[1].init.headers['Idempotency-Key'])
})
test('provider failures never report success or leak provider response bodies', async () => {
  const f = fixture({ mailFailure: true }); const body = await f.payload()
  const response = await f.post(body)
  assert.equal(response.status, 502)
  assert.ok(!(await response.text()).includes('provider-private-detail'))
})
test('oversized requests are rejected before email delivery', async () => {
  const f = fixture(); const body = await f.payload()
  assert.equal((await f.post({ ...body, description: 'x'.repeat(17000) })).status, 413)
  assert.ok(!f.calls.some(call => call.url.includes('resend.com')))
})


test('budget, currency, project stage, and conditional answers are validated on the server', () => {
  for (const currency of ['INVALID', 'constructor', '__proto__']) assert.ok(validateEnquiry({ ...valid, currency }).errors.currency)
  assert.ok(validateEnquiry({ ...valid, projectType: '__proto__' }).errors.projectType)
  assert.ok(validateEnquiry({ ...valid, budget: 'invented-range' }).errors.budget)
  assert.ok(validateEnquiry({ ...valid, projectStage: 'unknown' }).errors.projectStage)
  assert.ok(validateEnquiry({ ...valid, answers: {} }).errors.answers)
  assert.ok(validateEnquiry({ ...valid, answers: { websiteGoal: 'invalid', pageCount: '2–5 pages' } }).errors.answers)
  assert.ok(validateEnquiry({ ...valid, projectType: 'AI & Automation' }).errors.answers)
  assert.ok(validateEnquiry({ ...valid, existingUrl: 'javascript:alert(1)' }).errors.existingUrl)
  assert.equal(validateEnquiry({ ...valid, answers: { ...valid.answers, hidden: 'discard me' } }).data.answers.hidden, undefined)
})

test('Brevo sends the full discovery brief with safe HTML and visitor reply-to', async () => {
  const f = fixture({ env: { ENQUIRY_EMAIL_PROVIDER: 'brevo', BREVO_API_KEY: 'brevo-private-test' } })
  const body = await f.payload()
  body.description += ' <script>alert("unsafe")</script>'
  const response = await f.post(body)
  assert.equal(response.status, 200)
  const call = f.calls.find(call => call.url.includes('api.brevo.com'))
  const mail = JSON.parse(call.init.body)
  assert.equal(call.init.headers['api-key'], 'brevo-private-test')
  assert.equal(mail.sender.email, 'test@example.test')
  assert.equal(mail.to[0].email, 'owner@example.test')
  assert.equal(mail.replyTo.email, valid.email)
  assert.ok(mail.textContent.includes('Budget estimate: Not sure yet'))
  assert.ok(mail.textContent.includes(valid.answers.websiteGoal))
  assert.ok(mail.textContent.includes('USD'))
  assert.ok(mail.htmlContent.includes('&lt;script&gt;'))
  assert.ok(!mail.htmlContent.includes('<script>'))
  assert.match(mail.headers.idempotencyKey, /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-a[a-f0-9]{3}-[a-f0-9]{12}$/)
  assert.ok(!(await response.text()).includes('brevo-private-test'))
})

test('Brevo retry uses the same idempotency UUID; a processed duplicate is acknowledged', async () => {
  const env = { ENQUIRY_EMAIL_PROVIDER: 'brevo', BREVO_API_KEY: 'brevo-private-test' }
  const f = fixture({ env, transient: true }); const body = await f.payload()
  assert.equal((await f.post(body)).status, 200)
  const calls = f.calls.filter(call => call.url.includes('brevo.com'))
  assert.equal(calls.length, 2)
  assert.equal(JSON.parse(calls[0].init.body).headers.idempotencyKey, JSON.parse(calls[1].init.body).headers.idempotencyKey)
  const duplicate = fixture({ env, duplicate: true })
  assert.equal((await duplicate.post(await duplicate.payload())).status, 200)
})

test('selecting Brevo requires its own key; a Resend key does not silently substitute', async () => {
  const f = fixture({ env: { ENQUIRY_EMAIL_PROVIDER: 'brevo' } })
  assert.equal((await f.handlers.GET(new Request(origin + '/api/enquiry'))).status, 503)
  assert.equal(f.calls.length, 0)
})
