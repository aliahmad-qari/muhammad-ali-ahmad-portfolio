# Project enquiry setup

`Request Quote` opens `/enquiry`. The guided form validates the brief in the browser and again on the server, checks the Turnstile token, applies an Upstash rate limit, and submits one admin notification through the selected transactional email provider. The Brevo integration already exists; this setup does not add another provider.

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
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret for the deployed domain | Secret; server-side only |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Matching Turnstile site key | Public; browser needs it |
| `NEXT_PUBLIC_SITE_URL` | Exact canonical deployed origin, e.g. `https://your-domain.example` | Public |

The `.env.example` file contains placeholders only. For local work, copy it to `.env.local` and fill in local/test values; never commit `.env.local`. In Vercel, mark secrets as sensitive where the UI offers that option. After configuring variables, a new deployment is required before the runtime sees changed values. No Vercel settings have been changed as part of this review.

`ENQUIRY_FROM_EMAIL` must be an authorized Brevo sender. `ENQUIRY_TO_EMAIL` is the destination for admin notifications. The visitor's address is set as Reply-To. The private Brevo key is sent only from the server to `https://api.brevo.com/v3/smtp/email` in the `api-key` header. It must not use a `NEXT_PUBLIC_` prefix.

The existing Resend alternative remains supported by setting `ENQUIRY_EMAIL_PROVIDER=resend` and configuring `RESEND_API_KEY`; no second email integration was created. Do not configure both providers expecting automatic failover: the code selects one provider.

## Persistence, retries, and delivery status

Enquiries are **not persisted to a server-side database or durable queue** before email sending. The server performs up to two immediate attempts for a transient provider/network failure, using a stable idempotency value for the same submission. Brevo retry idempotency is time-limited by Brevo. Final provider failure returns an error to the form, and the visitor can retry while their draft remains in the open page. This is not a durable retry mechanism: if the visitor leaves and email was not accepted, the server has no saved enquiry to recover. A persistent store/queue and background retry worker would be needed for guaranteed recovery; neither is configured here.

The server logs provider acceptance and final failure with provider, HTTP status/attempt count, and a short HMAC-derived reference. Logs exclude the enquiry content, email addresses, network address, API credentials, and provider response body. Check Vercel runtime logs for failures and Brevo transactional email logs for accepted, delivered, bounced, or blocked messages. Provider acceptance means Brevo accepted the request; it does not guarantee inbox delivery.

Only one **admin notification** is sent. There is no client acknowledgement email template or delivery. Add one only if desired and tested separately.

## Safe verification

`npm test` mocks Brevo/Resend and sends no real email. It checks provider selection, payload, validation, spam controls, retry idempotency, and failure behavior. A live end-to-end email check requires the account owner to configure Vercel variables and explicitly submit an authorized test enquiry; this review does not send production mail.

Edit `app/config/enquiry.ts` to change currencies, budget bands, timeline choices, and follow-up questions. These selections are revalidated on the server. Budget bands are visitor estimates, not published service prices.
