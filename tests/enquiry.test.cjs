
const { test } = require('node:test')
const assert = require('node:assert/strict')
const ts = require('typescript')
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename)
}
const fs = require('node:fs')
const { validateEnquiry } = require('../app/lib/enquiry-validation.ts')
const { createEnquiryHandlers } = require('../app/lib/enquiry-server.ts')
const { encryptRecord, decryptRecord } = require('../app/lib/enquiry-persistence.ts')
const origin = 'https://portfolio.example'
const valid = { name: 'Test Person', email: 'person@example.test', company: '', existingUrl: '', projectType: 'Business Website', projectStage: 'New project', currency: 'USD', budget: 'not-sure', timeline: 'Flexible / need advice', answers: { websiteGoal: 'Enquire about services', pageCount: '2–5 pages' }, description: 'A business website with clear service pages and an enquiry workflow.', consent: true }
function fixture(options = {}) {
  let time = 1800000000000
  const calls = []
  const logs = []
  const redis = new Map()
  const env = { NODE_ENV: 'production', VERCEL: '1', NEXT_PUBLIC_SITE_URL: origin, RESEND_API_KEY: 'test-only', ENQUIRY_FROM_EMAIL: 'test@example.test', ENQUIRY_TO_EMAIL: 'owner@example.test', ENQUIRY_SIGNING_SECRET: 'test-secret-not-for-production-000000', ENQUIRY_DATA_ENCRYPTION_KEY: Buffer.alloc(32, 7).toString('base64'), QSTASH_TOKEN: 'test-token', QSTASH_CURRENT_SIGNING_KEY: 'current-test', QSTASH_NEXT_SIGNING_KEY: 'next-test', UPSTASH_REDIS_REST_URL: 'https://redis.example', UPSTASH_REDIS_REST_TOKEN: 'test-only', TURNSTILE_SECRET_KEY: 'test-only', NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'test-only', ...options.env }
  let emailAttempt = 0
  const mockedFetch = async (url, init) => {
    calls.push({ url, init })
    if (url.includes('redis.example')) {
      const command = JSON.parse(init.body)
      if (command[0] === 'EVAL' && command[1].includes("local old=redis.call('GET'")) {
        const [recordKey, dedupeKey] = command.slice(3, 5)
        const prior = redis.get(dedupeKey)
        if (prior) return Response.json({ result: prior + ':old' })
        redis.set(recordKey, command[7]); redis.set(dedupeKey, command[8]); redis.set(command[5], command[9]); redis.set(command[6], command[9])
        return Response.json({ result: command[8] + ':new' })
      }
      if (command[0] === 'EVAL') return Response.json({ result: options.count || 1 })
      if (command[0] === 'GET') return Response.json({ result: redis.get(command[1]) || null })
      if (command[0] === 'SET') { redis.set(command[1], command[2]); return Response.json({ result: 'OK' }) }
      return Response.json({ result: 1 })
    }
    if (url.includes('siteverify')) return Response.json(options.verification || { success: true, hostname: 'portfolio.example', action: 'project-enquiry' })
    emailAttempt++
    if (options.mailFailure || (options.transient && emailAttempt === 1)) return Response.json({ error: 'provider-private-detail' }, { status: 500 })
    if (options.ackFailure && emailAttempt >= 2) return Response.json({ error: 'ack-private-detail' }, { status: 500 })
    if (options.duplicate && url.includes('brevo.com')) return Response.json({ code: 'duplicate_parameter' }, { status: 400 })
    return Response.json(url.includes('brevo.com') ? { messageId: '<mock-email@brevo.test>' } : { id: 'mock-email-id' })
  }
  const queue = []
  const handlers = createEnquiryHandlers({ env, fetch: mockedFetch, now: () => time, queue: async (reference, kind) => queue.push({ reference, kind }), log: (level, event, details) => logs.push({ level, event, details }) })
  return { calls, logs, queue, redis, handlers, advance: n => { time += n }, async payload() { const response = await handlers.GET(new Request(origin + '/api/enquiry')); const config = await response.json(); time += 3000; return { ...valid, challenge: config.challenge, website: '', submissionId: '8cfb1f47-40d8-45df-a2df-875e0c87cadd', turnstileToken: 'valid-mock-token' } }, post(body, requestOrigin = origin) { return handlers.POST(new Request(origin + '/api/enquiry', { method: 'POST', headers: { Origin: requestOrigin, 'Content-Type': 'application/json', 'x-vercel-forwarded-for': '192.0.2.1' }, body: JSON.stringify(body) })) } }
}
test('shared validation normalizes email and requires explicit consent', () => {
  assert.equal(validateEnquiry({ ...valid, email: ' PERSON@EXAMPLE.TEST ' }).data.email, 'person@example.test')
  for (const consent of [false, 'true', 'on', undefined]) assert.ok(validateEnquiry({ ...valid, consent }).errors.consent)
  assert.ok(validateEnquiry({ ...valid, email: 'person@example.test\r\nBcc:other@example.test' }).errors.email)
  assert.ok(validateEnquiry({ ...valid, projectType: 'not-a-package' }).errors.projectType)
  assert.ok(validateEnquiry({ ...valid, description: 'x'.repeat(5001) }).errors.description)
  assert.equal(validateEnquiry(null).data, undefined)
})
test('contact validation normalizes address and requires message and consent', () => {
  const { validateContact } = require('../app/lib/enquiry-validation.ts')
  assert.equal(validateContact({ name: 'Test Person', email: ' PERSON@EXAMPLE.TEST ', message: 'A sufficiently long message.', consent: true }).data.email, 'person@example.test')
  assert.ok(validateContact({ name: 'A', email: 'bad', message: 'short', consent: false }).errors.consent)
  assert.ok(validateContact({ name: 'Test Person', email: 'person@example.test\r\nBcc:attacker@example.test', message: 'A sufficiently long message.', consent: true }).errors.email)
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
  assert.equal(mails.length, 3)
  assert.equal(mails[0].init.headers['Idempotency-Key'], mails[1].init.headers['Idempotency-Key'])
  assert.notEqual(mails[1].init.headers['Idempotency-Key'], mails[2].init.headers['Idempotency-Key'])
})
test('provider failures remain persisted and queued without leaking provider response bodies', async () => {
  const f = fixture({ mailFailure: true }); const body = await f.payload()
  const response = await f.post(body)
  assert.equal(response.status, 200)
  assert.ok(!(await response.text()).includes('provider-private-detail'))
  assert.ok(f.logs.some(log => log.event === 'enquiry_email_rejected'))
  assert.equal(f.queue.length, 2)
  assert.equal([...f.redis.keys()].filter(key => key.startsWith('portfolio:enquiry:record:')).length, 1)
  const safeLog = JSON.stringify(f.logs)
  for (const privateValue of [valid.email, valid.description, 'provider-private-detail', 'test-only']) assert.ok(!safeLog.includes(privateValue))
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
test('home contact form submissions use the existing Brevo delivery and security path', async () => {
  const f = fixture({ env: { ENQUIRY_EMAIL_PROVIDER: 'brevo', BREVO_API_KEY: 'brevo-private-test' }, verification: { success: true, hostname: 'portfolio.example', action: 'portfolio-contact' } })
  const body = await f.payload()
  const response = await f.post({ kind: 'contact', name: 'Contact Person', email: 'visitor@example.test', subject: 'Role opportunity', message: 'I would like to discuss a role with your team.', consent: true, website: '', challenge: body.challenge, submissionId: body.submissionId, turnstileToken: body.turnstileToken })
  assert.equal(response.status, 200)
  const call = f.calls.find(entry => entry.url.includes('api.brevo.com'))
  assert.ok(call)
  const mail = JSON.parse(call.init.body)
  assert.equal(mail.replyTo.email, 'visitor@example.test')
  assert.equal(mail.subject, 'Portfolio contact: Role opportunity')
  assert.match(mail.textContent, /I would like to discuss a role with your team\./)
  assert.equal(call.init.headers['api-key'], 'brevo-private-test')
  const acknowledgement = f.calls.filter(entry => entry.url.includes('api.brevo.com'))[1]
  const ackMail = JSON.parse(acknowledgement.init.body)
  assert.equal(ackMail.to[0].email, 'visitor@example.test')
  assert.match(ackMail.subject, /We received your message/)
  assert.notEqual(ackMail.headers.idempotencyKey, mail.headers.idempotencyKey)
})

test('contact acknowledgement failures are logged while successful admin delivery stays successful', async () => {
  const f = fixture({ ackFailure: true, env: { ENQUIRY_EMAIL_PROVIDER: 'brevo', BREVO_API_KEY: 'brevo-private-test' }, verification: { success: true, hostname: 'portfolio.example', action: 'portfolio-contact' } })
  const body = await f.payload()
  const response = await f.post({ kind: 'contact', name: 'Contact Person', email: 'visitor@example.test', subject: 'Hello', message: 'A message to test acknowledgement retry behavior.', consent: true, website: '', challenge: body.challenge, submissionId: body.submissionId, turnstileToken: body.turnstileToken })
  assert.equal(response.status, 200)
  assert.ok(f.logs.some(entry => entry.event === 'enquiry_ack_email_rejected'))
  assert.ok(!JSON.stringify(f.logs).includes('ack-private-detail'))
})

test('Brevo retry uses the same idempotency UUID; a processed duplicate is acknowledged', async () => {
  const env = { ENQUIRY_EMAIL_PROVIDER: 'brevo', BREVO_API_KEY: 'brevo-private-test' }
  const f = fixture({ env, transient: true }); const body = await f.payload()
  assert.equal((await f.post(body)).status, 200)
  const calls = f.calls.filter(call => call.url.includes('brevo.com'))
  assert.equal(calls.length, 3)
  assert.equal(JSON.parse(calls[0].init.body).headers.idempotencyKey, JSON.parse(calls[1].init.body).headers.idempotencyKey)
  assert.notEqual(JSON.parse(calls[1].init.body).headers.idempotencyKey, JSON.parse(calls[2].init.body).headers.idempotencyKey)
  const duplicate = fixture({ env, duplicate: true })
  assert.equal((await duplicate.post(await duplicate.payload())).status, 200)
})

test('enquiry records are AES-GCM encrypted, queued per recipient, and deduplicated by submission ID', async () => {
  const f = fixture({ env: { ENQUIRY_EMAIL_PROVIDER: 'brevo', BREVO_API_KEY: 'brevo-private-test' } })
  const body = await f.payload()
  const response = await f.post(body)
  const accepted = await response.json()
  assert.equal(response.status, 200)
  assert.match(accepted.reference, /^[A-F0-9]{12}$/)
  assert.deepEqual(f.queue.map(item => item.kind), ['admin', 'ack'])
  const recordKey = [...f.redis.keys()].find(key => key.startsWith('portfolio:enquiry:record:'))
  const stored = f.redis.get(recordKey)
  assert.equal(typeof stored, 'string')
  assert.ok(!stored.includes(valid.email))
  assert.ok(!stored.includes(valid.description))
  const record = decryptRecord(stored, Buffer.alloc(32, 7).toString('base64'))
  assert.deepEqual(record.deliveries.map(delivery => delivery.status), ['accepted', 'accepted'])
  const sentBeforeDuplicate = f.calls.filter(call => call.url.includes('brevo.com')).length
  const duplicate = await f.post(body)
  assert.equal(duplicate.status, 200)
  assert.equal(f.calls.filter(call => call.url.includes('brevo.com')).length, sentBeforeDuplicate)
  assert.equal(f.queue.length, 2)
})

test('AES-GCM detects stored-record tampering', () => {
  const key = Buffer.alloc(32, 3).toString('base64')
  const encrypted = encryptRecord({ private: 'value' }, key)
  assert.deepEqual(decryptRecord(encrypted, key), { private: 'value' })
  assert.throws(() => decryptRecord(encrypted.slice(0, -2) + 'aa', key))
})

test('selecting Brevo requires its own key; a Resend key does not silently substitute', async () => {
  const f = fixture({ env: { ENQUIRY_EMAIL_PROVIDER: 'brevo' } })
  assert.equal((await f.handlers.GET(new Request(origin + '/api/enquiry'))).status, 503)
  assert.equal(f.calls.length, 0)
})
