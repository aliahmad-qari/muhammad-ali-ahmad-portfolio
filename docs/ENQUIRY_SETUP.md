# Project quote enquiries

Request Quote opens /enquiry. It does not send an email until the visitor completes the guided brief, provides contact consent, passes the spam check, and submits.

## Brevo configuration

Copy .env.example to .env.local for local development. Add the same variables to the Vercel project environment for production, then redeploy. Do not commit .env.local or put keys in chat, browser code, or NEXT_PUBLIC_ variables.

- ENQUIRY_EMAIL_PROVIDER=brevo
- BREVO_API_KEY: your private Brevo API key, not an SMTP password.
- ENQUIRY_FROM_EMAIL: a bare email address verified as a sender in Brevo.
- ENQUIRY_FROM_NAME: the name you want shown on notifications.
- ENQUIRY_TO_EMAIL: the owner inbox that should receive quote requests.
- ENQUIRY_SIGNING_SECRET: at least 32 random characters.
- UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN: persistent spam rate limiting.
- TURNSTILE_SECRET_KEY and NEXT_PUBLIC_TURNSTILE_SITE_KEY: the server secret and public site key for your registered domain.
- NEXT_PUBLIC_SITE_URL: the exact production origin used by the form.

Only the Turnstile site key and canonical URL are public. Keep the other keys server-side. The form stays unavailable if required settings are missing and offers an email-app alternative that the visitor sends themselves.

Existing Resend configurations remain supported with ENQUIRY_EMAIL_PROVIDER=resend and RESEND_API_KEY.

## What arrives in the owner inbox

The email includes visitor name and email, business and public website if provided, project type and stage, project-specific discovery answers, budget range and currency, preferred timeline, full brief, and a consent note. Reply-To is the visitor's email; replying contacts the visitor. The From address stays your verified sender.

Provider acceptance is not proof of inbox delivery. Use Brevo Transactional email logs to check delivery, bounce, or block status. A real end-to-end test requires configured credentials and an explicitly authorized test submission; automated tests mock all providers and send no real messages.

## Budgets and questions

Edit app/config/enquiry.ts to change currencies, budget bands, timeline choices, and follow-up questions. Budget bands represent visitor estimates, not published service prices. Approved package pricing remains in app/config/services.ts. All selections and conditional answers are revalidated server-side.

## Verification

Run npm test, npm run lint, and npx tsc --noEmit. Tests cover both email providers, budget and conditional-answer validation, consent, spam protection, retry idempotency, and safe HTML rendering.
