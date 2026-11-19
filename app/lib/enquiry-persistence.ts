import { createCipheriv, createDecipheriv, createHmac, randomBytes } from 'node:crypto'

export const RETENTION_SECONDS = 60 * 60 * 24 * 90
export function recordTtl(createdAt: string) {
  return Math.max(1, RETENTION_SECONDS - Math.floor((Date.now() - Date.parse(createdAt)) / 1000))
}
export type DeliveryKind = 'admin' | 'ack'
export type StoredDelivery = { kind: DeliveryKind; provider: 'brevo' | 'resend'; endpoint: string; headers: Record<string, string>; body: unknown; status: 'pending' | 'queued' | 'accepted' | 'failed'; attempts: number; idempotencyKey: string }
export type StoredEnquiry = { reference: string; createdAt: string; deliveries: StoredDelivery[] }

function keyFromEnv(value: string | undefined) {
  if (!value) throw new Error('ENQUIRY_DATA_ENCRYPTION_KEY is required')
  const key = Buffer.from(value, 'base64')
  if (key.length !== 32) throw new Error('ENQUIRY_DATA_ENCRYPTION_KEY must be base64 encoded 32-byte key')
  return key
}
export function encryptRecord(value: unknown, encodedKey: string) {
  const iv = randomBytes(12), cipher = createCipheriv('aes-256-gcm', keyFromEnv(encodedKey), iv)
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()])
  return [iv.toString('base64'), cipher.getAuthTag().toString('base64'), encrypted.toString('base64')].join('.')
}
export function decryptRecord<T>(value: string, encodedKey: string): T {
  const [iv, tag, data] = value.split('.')
  const decipher = createDecipheriv('aes-256-gcm', keyFromEnv(encodedKey), Buffer.from(iv, 'base64'))
  decipher.setAuthTag(Buffer.from(tag, 'base64'))
  return JSON.parse(Buffer.concat([decipher.update(Buffer.from(data, 'base64')), decipher.final()]).toString('utf8')) as T
}
export function referenceFor(submissionId: string, secret: string) {
  return createHmac('sha256', secret).update('reference:' + submissionId).digest('hex').slice(0, 12).toUpperCase()
}
export function enquiryKeys(submissionId: string, secret: string, reference: string) {
  const dedupe = createHmac('sha256', secret).update('submission:' + submissionId).digest('hex')
  return { record: `portfolio:enquiry:record:${reference}`, dedupe: `portfolio:enquiry:dedupe:${dedupe}`, delivery: (kind: DeliveryKind) => `portfolio:enquiry:delivery:${reference}:${kind}`, index: 'portfolio:enquiry:pending' }
}

type RedisEnv = Record<string, string | undefined> & { UPSTASH_REDIS_REST_URL?: string; UPSTASH_REDIS_REST_TOKEN?: string }
export async function redisCommand(env: RedisEnv, command: unknown[], fetcher: typeof fetch = fetch) {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) throw new Error('Redis is not configured')
  const response = await fetcher(env.UPSTASH_REDIS_REST_URL, { method: 'POST', headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(command), cache: 'no-store', signal: AbortSignal.timeout(8000) })
  if (!response.ok) throw new Error('Redis request failed')
  const result = await response.json() as { result?: unknown; error?: string }
  if (result.error) throw new Error('Redis command failed')
  return result.result
}
export async function persistEnquiry(env: RedisEnv, dataKey: string, secret: string, submissionId: string, deliveries: StoredDelivery[], now: number, fetcher: typeof fetch = fetch) {
  const reference = referenceFor(submissionId, secret), keys = enquiryKeys(submissionId, secret, reference)
  const record: StoredEnquiry = { reference, createdAt: new Date(now).toISOString(), deliveries }
  const encrypted = encryptRecord(record, dataKey)
  const script = "local old=redis.call('GET',KEYS[2]); if old then return old..':old' end; redis.call('SET',KEYS[1],ARGV[1],'EX',ARGV[4]); redis.call('SET',KEYS[2],ARGV[2],'EX',ARGV[4]); for i=3,#KEYS do redis.call('SET',KEYS[i],ARGV[3],'EX',ARGV[4]) end; for _,kind in ipairs({'admin','ack'}) do redis.call('ZADD',ARGV[5],ARGV[6],ARGV[2]..':'..kind) end; return ARGV[2]..':new'"
  const result = String(await redisCommand(env, ['EVAL', script, '4', keys.record, keys.dedupe, keys.delivery('admin'), keys.delivery('ack'), encrypted, reference, 'pending', String(RETENTION_SECONDS), keys.index, String(now)], fetcher) || '')
  return { reference: result.split(':')[0] || reference, keys, isNew: result.endsWith(':new') }
}
export async function loadEnquiry(env: RedisEnv, dataKey: string, recordKey: string, fetcher: typeof fetch = fetch) {
  const value = await redisCommand(env, ['GET', recordKey], fetcher)
  return typeof value === 'string' ? decryptRecord<StoredEnquiry>(value, dataKey) : null
}
export async function markDelivery(env: RedisEnv, dataKey: string, keys: ReturnType<typeof enquiryKeys>, record: StoredEnquiry, kind: DeliveryKind, status: StoredDelivery['status'], fetcher: typeof fetch = fetch) {
  const delivery = record.deliveries.find(item => item.kind === kind)
  if (!delivery) throw new Error('Delivery does not exist')
  delivery.status = status
  if (status === 'accepted' || status === 'failed') await redisCommand(env, ['ZREM', keys.index, `${record.reference}:${kind}`], fetcher)
  else await redisCommand(env, ['ZADD', keys.index, String(Date.now()), `${record.reference}:${kind}`], fetcher)
  const ttl = String(recordTtl(record.createdAt))
  await redisCommand(env, ['SET', keys.record, encryptRecord(record, dataKey), 'EX', ttl], fetcher)
  await redisCommand(env, ['SET', keys.delivery(kind), status, 'EX', ttl], fetcher)
}
export async function saveDelivery(env: RedisEnv, dataKey: string, keys: ReturnType<typeof enquiryKeys>, record: StoredEnquiry, delivery: StoredDelivery, fetcher: typeof fetch = fetch) {
  const index = record.deliveries.findIndex(item => item.kind === delivery.kind)
  if (index < 0) record.deliveries.push(delivery)
  else record.deliveries[index] = delivery
  const ttl = String(recordTtl(record.createdAt))
  await redisCommand(env, ['SET', keys.record, encryptRecord(record, dataKey), 'EX', ttl], fetcher)
  await redisCommand(env, ['SET', keys.delivery(delivery.kind), delivery.status, 'EX', ttl], fetcher)
  await redisCommand(env, ['ZADD', keys.index, String(Date.now()), `${record.reference}:${delivery.kind}`], fetcher)
}
