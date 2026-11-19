import { Receiver } from '@upstash/qstash'
import { decryptRecord, encryptRecord, recordTtl, redisCommand, type StoredEnquiry } from '../../../lib/enquiry-persistence'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const env = process.env

export async function POST(request: Request) {
  const currentSigningKey = env.QSTASH_CURRENT_SIGNING_KEY
  const nextSigningKey = env.QSTASH_NEXT_SIGNING_KEY
  if (!currentSigningKey || !nextSigningKey) return Response.json({ error: 'Worker is not configured' }, { status: 503 })
  const rawBody = await request.text()
  const origin = new URL(env.NEXT_PUBLIC_SITE_URL || 'https://muhammad-ali-ahmad-portfolio.vercel.app').origin
  try {
    const receiver = new Receiver({ currentSigningKey, nextSigningKey, devMode: false })
    await receiver.verify({ signature: request.headers.get('upstash-signature') || '', body: rawBody, url: origin + '/api/enquiry/deliver' })
  } catch { return Response.json({ error: 'Invalid queue signature' }, { status: 401 }) }
  let task: { reference?: unknown; kind?: unknown }
  try { task = JSON.parse(rawBody) } catch { return Response.json({ error: 'Invalid task' }, { status: 400 }) }
  if (typeof task.reference !== 'string' || !/^[A-F0-9]{12}$/.test(task.reference) || !['admin', 'ack'].includes(String(task.kind))) return Response.json({ error: 'Invalid task' }, { status: 400 })
  if (!env.ENQUIRY_DATA_ENCRYPTION_KEY) return Response.json({ error: 'Storage is not configured' }, { status: 503 })
  const recordKey = `portfolio:enquiry:record:${task.reference}`
  try {
    const encrypted = await redisCommand(env, ['GET', recordKey])
    if (typeof encrypted !== 'string') return Response.json({ error: 'Enquiry record not found' }, { status: 404 })
    const record = decryptRecord<StoredEnquiry>(encrypted, env.ENQUIRY_DATA_ENCRYPTION_KEY)
    const delivery = record.deliveries.find(item => item.kind === task.kind)
    if (!delivery || delivery.status === 'accepted') return Response.json({ ok: true, skipped: true })
    const lockKey = `portfolio:enquiry:lock:${task.reference}:${task.kind}`
    const acquired = await redisCommand(env, ['SET', lockKey, request.headers.get('upstash-message-id') || 'worker', 'NX', 'EX', '90'])
    if (acquired !== 'OK') return Response.json({ error: 'Delivery is already being processed' }, { status: 503 })
    delivery.attempts += 1
    await redisCommand(env, ['SET', recordKey, encryptRecord(record, env.ENQUIRY_DATA_ENCRYPTION_KEY), 'EX', String(recordTtl(record.createdAt))])
    const isBrevo = delivery.provider === 'brevo'
    const auth: Record<string, string> = isBrevo ? { 'api-key': env.BREVO_API_KEY || '' } : { Authorization: `Bearer ${env.RESEND_API_KEY || ''}` }
    if (Object.values(auth).some(value => !value)) return Response.json({ error: 'Email provider is not configured' }, { status: 503 })
    const headers = { ...auth, Accept: 'application/json', 'Content-Type': 'application/json', ...(isBrevo ? {} : { 'Idempotency-Key': delivery.idempotencyKey }) }
    const response = await fetch(delivery.endpoint, { method: 'POST', headers, body: JSON.stringify(delivery.body), cache: 'no-store', signal: AbortSignal.timeout(8000) })
    let receipt: Record<string, unknown> = {}
    try { receipt = await response.json() as Record<string, unknown> } catch { /* status is logged without provider response content */ }
    const accepted = response.ok || (isBrevo && response.status === 400 && receipt.code === 'duplicate_parameter')
    if (!accepted) {
      if (delivery.attempts >= 4) delivery.status = 'failed'
      const ttl = String(recordTtl(record.createdAt))
      await redisCommand(env, ['SET', recordKey, encryptRecord(record, env.ENQUIRY_DATA_ENCRYPTION_KEY), 'EX', ttl])
      await redisCommand(env, ['SET', `portfolio:enquiry:delivery:${task.reference}:${task.kind}`, delivery.status, 'EX', ttl])
      if (delivery.status === 'failed') await redisCommand(env, ['ZREM', 'portfolio:enquiry:pending', `${task.reference}:${task.kind}`])
      console.error(JSON.stringify({ event: 'enquiry_delivery_retry', reference: task.reference, kind: task.kind, provider: delivery.provider, attempt: delivery.attempts, status: response.status }))
      return Response.json({ error: 'Email provider rejected delivery' }, { status: delivery.attempts >= 4 ? 200 : 503 })
    }
    delivery.status = 'accepted'
    const ttl = String(recordTtl(record.createdAt))
    await redisCommand(env, ['SET', recordKey, encryptRecord(record, env.ENQUIRY_DATA_ENCRYPTION_KEY), 'EX', ttl])
    await redisCommand(env, ['SET', `portfolio:enquiry:delivery:${task.reference}:${task.kind}`, 'accepted', 'EX', ttl])
    await redisCommand(env, ['ZREM', 'portfolio:enquiry:pending', `${task.reference}:${task.kind}`])
    return Response.json({ ok: true })
  } catch (error) {
    console.error(JSON.stringify({ event: 'enquiry_worker_error', reference: task.reference, kind: task.kind, errorType: error instanceof Error ? error.name : 'UnknownError' }))
    return Response.json({ error: 'Delivery processing failed' }, { status: 503 })
  }
}
