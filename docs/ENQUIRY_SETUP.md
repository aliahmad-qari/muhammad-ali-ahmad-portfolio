# Project enquiry setup

The home page Contact form and `Request Quote` workflow both use the existing server-side email integration. The guided project form is at `/enquiry`. Both forms validate on the server, check Turnstile, apply an Upstash rate limit, and submit an admin notification through the selected transactional email provider.

## Required Vercel variables

In Vercel, open **Project → Settings → Environment Variables** and add the following to the **Production** environment (add Preview/Development only if you want the form enabled there). Use values from your own accounts; do not paste secrets into source code or chat.

| Name | Value to configure | Visibility |
| --- | --- | --- |
| `ENQUIRY_EMAIL_PROVIDER` | `brevo` | Server-side |
| `BREVO_API_KEY` | Private Brevo API key with transactional email access | Secret; server-side only |
| `ENQUIRY_FROM_EMAIL` | Email address verified as a sender in Brevo | Server-side |
| `ENQUIRY_FROM_NAME` | Display name (optional; defaults to portfolio name) | Server-side |
| `ENQUIRY_TO_EMAIL` | Inbox that should receive project enquiries | Server-side |
| `ENQUIRY_SIGNING_SECRET` | At least 32 random characters | Secret; server-side only |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint | Server-side |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash REST token | Secret; server-side only |
| `ENQUIRY_DATA_ENCRYPTION_KEY` | Base64-encoded random 32-byte AES key (`openssl rand -base64 32`) | Secret; server-side only |
| `QSTASH_TOKEN` | Upstash QStash publish token | Secret; server-side only |
| `QSTASH_CURRENT_SIGNING_KEY` | Current QStash callback signing key | Secret; server-side only |
| `QSTASH_NEXT_SIGNING_KEY` | Next QStash callback signing key | Secret; server-side only |
| `CRON_SECRET` | Random secret used to protect the recovery endpoint | Secret; server-side only |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret for the deployed domain | Secret; server-side only |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Matching Turnstile site key | Public; browser needs it |
| `NEXT_PUBLIC_SITE_URL` | Exact canonical deployed origin, e.g. `https://your-domain.example` | Public |

The `.env.example` file contains placeholders only. For local work, copy it to `.env.local` and fill in local/test values; never commit `.env.local`. In Vercel, mark secrets as sensitive where the UI offers that option. After configuring variables, a new deployment is required before the runtime sees changed values. No Vercel settings have been changed as part of this review.

`ENQUIRY_FROM_EMAIL` must be an authorized Brevo sender. `ENQUIRY_TO_EMAIL` is the destination for admin notifications. The visitor's address is set as Reply-To. The private Brevo key is sent only from the server to `https://api.brevo.com/v3/smtp/email` in the `api-key` header. It must not use a `NEXT_PUBLIC_` prefix.

The existing Resend alternative remains supported by setting `ENQUIRY_EMAIL_PROVIDER=resend` and configuring `RESEND_API_KEY`; no second email integration was created. Do not configure both providers expecting automatic failover: the code selects one provider.

## Persistence, retries, and delivery status

Before email processing, the server encrypts the enquiry and message payloads using AES-256-GCM and stores them in Upstash Redis. Records, deduplication keys, and delivery states expire after 90 days. Redis contains no plaintext contact fields. The API response includes a short enquiry reference; resubmitting the same submission ID returns that reference without creating another record.

Admin notification and visitor acknowledgement each have their own persisted status and stable provider idempotency value. Upstash QStash calls the private delivery route after a short delay and retries transient failures up to three times. A worker verifies QStash signatures, obtains a per-message Redis lease, skips already accepted deliveries, and records acceptance or failure. Provider acceptance means the provider accepted the message; it does not prove inbox delivery. Check Vercel runtime logs and the Brevo transactional email logs for final delivery/bounce information. QStash retry logs and its dead-letter UI are operational recovery tools; QStash retains its logs/dead-letter entries only for its plan's stated period.

The API sends immediate best-effort mail after the record and delayed retry jobs are safely created. If queue publishing is unavailable, submission processing fails closed and the saved record remains in Redis for support/recovery; it is not silently reported as delivered. Never delete the Redis database to clear a test: it also holds rate-limit counters and active enquiries. Access/deletion requests should be handled by the owner using the reference and Redis console, then separately from the inbox/provider.

Configure the three QStash values and encryption key in Vercel Production and redeploy before enabling the form. QStash retries are limited; they do not guarantee delivery if the record expires, credentials are invalid, the provider permanently rejects the message, or the queue's retry window is exhausted. No public enquiry-reading endpoint or payment handling is implemented.

The signed worker route is `/api/enquiry/deliver`. `/api/enquiry/reconcile` is protected by `Authorization: Bearer $CRON_SECRET`; it re-enqueues records that were saved but could not be published to QStash. `vercel.json` schedules this check daily at 08:00 UTC. Add a strong `CRON_SECRET` in Vercel before deploying; Vercel sends it as a bearer token to the scheduled route. No schedule is active in production until a deployment containing this config is made.

## Safe verification

`npm test` mocks Brevo/Resend and sends no real email. It checks provider selection, payload, validation, spam controls, retry idempotency, and failure behavior. A live end-to-end email check requires the account owner to configure Vercel variables and explicitly submit an authorized test enquiry; this review does not send production mail.

Edit `app/config/enquiry.ts` to change currencies, budget bands, timeline choices, and follow-up questions. These selections are revalidated on the server. Budget bands are visitor estimates, not published service prices.
