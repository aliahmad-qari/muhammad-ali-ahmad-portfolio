import { Client } from '@upstash/qstash'
import { encryptRecord, decryptRecord, redisCommand, recordTtl, type StoredEnquiry } from '../../../lib/enquiry-persistence'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, ENQUIRY_DATA_ENCRYPTION_KEY, QSTASH_TOKEN, NEXT_PUBLIC_SITE_URL } = process.env
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN || !ENQUIRY_DATA_ENCRYPTION_KEY || !QSTASH_TOKEN) return Response.json({ error: 'Recovery is not configured' }, { status: 503 })
  const client = new Client({ token: QSTASH_TOKEN })
  const origin = new URL(NEXT_PUBLIC_SITE_URL || 'https://muhammad-ali-ahmad-portfolio.vercel.app').origin
  let members: unknown
  try { members = await redisCommand(process.env, ['ZRANGE', 'portfolio:enquiry:pending', '0', '99']) }
  catch { return Response.json({ error: 'Recovery lookup failed' }, { status: 503 }) }
  if (!Array.isArray(members)) return Response.json({ error: 'Recovery index is unavailable' }, { status: 503 })
  let queued = 0, skipped = 0
  for (const member of members) {
    if (typeof member !== 'string') { skipped++; continue }
    const [reference, kind] = member.split(':')
    if (!/^[A-F0-9]{12}$/.test(reference) || !['admin', 'ack'].includes(kind)) { await redisCommand(process.env, ['ZREM', 'portfolio:enquiry:pending', member]); skipped++; continue }
    const recordKey = `portfolio:enquiry:record:${reference}`
    try {
      const encrypted = await redisCommand(process.env, ['GET', recordKey])
      if (typeof encrypted !== 'string') { await redisCommand(process.env, ['ZREM', 'portfolio:enquiry:pending', member]); skipped++; continue }
      const record = decryptRecord<StoredEnquiry>(encrypted, ENQUIRY_DATA_ENCRYPTION_KEY)
      const delivery = record.deliveries.find(item => item.kind === kind)
      if (!delivery || delivery.status === 'accepted' || delivery.status === 'failed') { await redisCommand(process.env, ['ZREM', 'portfolio:enquiry:pending', member]); skipped++; continue }
      if (delivery.status === 'queued') {
        const score = Number(await redisCommand(process.env, ['ZSCORE', 'portfolio:enquiry:pending', member]))
        if (!Number.isFinite(score) || Date.now() - score < 6 * 60 * 60 * 1000) { skipped++; continue }
      } else if (delivery.status !== 'pending') { skipped++; continue }
      const recoveryBucket = Math.floor(Date.now() / (6 * 60 * 60 * 1000))
      await client.publishJSON({ url: origin + '/api/enquiry/deliver', body: { reference, kind }, delay: '60s', retries: 3, deduplicationId: `${reference}-${kind}-${recoveryBucket}` })
      delivery.status = 'queued'
      const ttl = String(recordTtl(record.createdAt))
      await redisCommand(process.env, ['SET', recordKey, encryptRecord(record, ENQUIRY_DATA_ENCRYPTION_KEY), 'EX', ttl])
      await redisCommand(process.env, ['SET', `portfolio:enquiry:delivery:${reference}:${kind}`, 'queued', 'EX', ttl])
      await redisCommand(process.env, ['ZADD', 'portfolio:enquiry:pending', String(Date.now()), member])
      queued++
    } catch (error) {
      console.error(JSON.stringify({ event: 'enquiry_reconcile_failed', reference, kind, errorType: error instanceof Error ? error.name : 'UnknownError' }))
      skipped++
    }
  }
  return Response.json({ queued, skipped })
}
