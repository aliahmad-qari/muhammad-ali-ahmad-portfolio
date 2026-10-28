import { createEnquiryHandlers } from '../../lib/enquiry-server'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const handlers = createEnquiryHandlers({ env: process.env, fetch: (...args) => fetch(...args), now: Date.now })
export const GET = handlers.GET
export const POST = handlers.POST
