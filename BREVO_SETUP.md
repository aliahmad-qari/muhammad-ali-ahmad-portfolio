# Brevo Email Integration Guide

Your portfolio uses **Brevo** (formerly Sendinblue) for quote request emails. Brevo is a professional, reliable email service that's perfect for your needs.

## Why Brevo?

✅ **Free tier:** 300 emails/day (unlimited)  
✅ **Professional infrastructure:** 99.9% uptime  
✅ **Already configured:** Backend routes use Brevo  
✅ **Auto confirmations:** Can send user confirmation emails  
✅ **Email templates:** Built-in template editor  

---

## Step-by-Step Setup (15 minutes)

### Step 1: Create Brevo Account
1. Go to **https://www.brevo.com**
2. Click **Sign up**
3. Enter your email and create password
4. Choose **"I want to send transactional emails"**
5. Verify your email address

**Time: 2-3 minutes**

---

### Step 2: Generate API Key
1. Login to Brevo dashboard
2. Click **Settings** (gear icon, top right)
3. Go to **SMTP & API**
4. Click **Transactional** tab
5. Click **"Create a new API key"**
6. Name it: `Portfolio Quote Requests`
7. **Copy the full API key** (very long string)
8. Save it somewhere safe (you'll need it next)

**Time: 2 minutes**

---

### Step 3: Verify Sender Email
1. In Brevo dashboard, click **Settings**
2. Go to **Senders & Signatures**
3. Click **Add a sender**
4. Enter email you want quotes sent FROM:
   - Option A: Your domain (noreply@yourdomain.com) - requires DNS verification
   - Option B: Gmail (yourname@gmail.com) - automatic
5. Click **Add sender**
6. **Verify the email link** they send

**Time: 5 minutes**

---

### Step 4: Add to Your Portfolio
1. Open `.env.local` file in your project root (or create if doesn't exist)
2. Add these lines:

```env
# Brevo Email Configuration
BREVO_API_KEY=paste_your_full_api_key_here
ENQUIRY_FROM_EMAIL=your-verified-sender@gmail.com
ENQUIRY_TO_EMAIL=your-personal-email@gmail.com
ENQUIRY_FROM_NAME=Muhammad Ali Ahmad | Portfolio
ENQUIRY_SIGNING_SECRET=generate_random_32_character_string_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=your_cloudflare_secret_key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_public_key
```

**For ENQUIRY_SIGNING_SECRET:** Generate a random string (any 32+ characters):
```
Example: aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1v3w5
```

3. Save the file

**Time: 2 minutes**

---

### Step 5: Deploy to Vercel
1. In terminal/Git:
```bash
git add .env.local
git commit -m "Configure Brevo email integration"
git push origin main
```

2. Vercel auto-deploys within 30 seconds

**Time: 1 minute**

---

### Step 6: Test It Works
1. Visit your live portfolio: https://yourdomain.com
2. Go to `/enquiry` form
3. Fill out and submit (test data OK)
4. Check your **ENQUIRY_TO_EMAIL** inbox
5. Should receive formatted email within 30 seconds

**Successful email looks like:**
```
Subject: Quote request: Web Application
From: Muhammad Ali Ahmad <noreply@yourname.com>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW QUOTE REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: John Smith
Email: john@company.com
Company: Tech Startup Inc
Project Type: Web Application
Budget: $5,000 - $10,000
Timeline: 3-6 months

[Full inquiry details...]
```

**Time: 5 minutes**

---

## Current Status

✅ **Enquiry form** (`/enquiry`): Uses Brevo (backend API)  
✅ **Quote request route** (`/api/enquiry`): Configured for Brevo  
✅ **Security**: Rate limiting + Turnstile CAPTCHA enabled  

🔄 **Next** (Optional): Email confirmations to users

---

## Troubleshooting

### Email Not Arriving?

**Check 1: API Key**
- Copy the **entire** key (don't cut off the end)
- No typos or extra spaces
- Redeploy after saving `.env.local`

**Check 2: Sender Email**
- Must be verified in Brevo first
- Check spam/promotions folder
- Wait 5 minutes (email can be delayed)

**Check 3: Recipient Email**
- Make sure `ENQUIRY_TO_EMAIL` is correct
- Check spam folder
- Add Brevo to safe senders

**Check 4: Vercel Deployment**
- Confirm `.env.local` was pushed to GitHub
- Check Vercel deployment status (should show "Ready")
- Clear browser cache and refresh

**Check 5: Form Submission**
- Check browser console (F12) for JavaScript errors
- Ensure Turnstile CAPTCHA passed
- Form must validate successfully

### "Failed to Send" Error?

1. Check `.env.local` has all required variables
2. Verify API key is correct (copy again from Brevo)
3. Check sender email is verified in Brevo
4. Try submitting again (sometimes temporary)

### Emails Going to Spam?

1. Add Brevo to safe senders in your email
2. In Brevo: Add SPF record to your domain (Settings → Senders)
3. Enable DKIM if available

---

## Optional: Add User Confirmation Emails

**Currently:** User submits → Admin gets email  
**Better:** User + Admin both get emails

This requires modifying the backend. We can enable this in Phase 2.

---

## Monitoring & Analytics

**In Brevo Dashboard:**
1. **Transactional Emails** → View all sent emails
2. **Logs** → Track delivery status
3. **Statistics** → Monitor bounce rates

---

## Cost & Limits

| Metric | Limit |
|--------|-------|
| Daily emails | 300/day |
| Monthly emails | Unlimited |
| Cost | FREE |
| Support | Community |

For your portfolio, free tier is more than enough (you'll get <50 emails/day).

---

## Support

- **Brevo Help:** https://help.brevo.com
- **API Docs:** https://developers.brevo.com
- **Status Page:** https://status.brevo.com

---

## Summary Checklist

- [ ] Created Brevo account (https://brevo.com)
- [ ] Generated API key
- [ ] Verified sender email (Gmail or custom domain)
- [ ] Added BREVO_API_KEY to `.env.local`
- [ ] Added ENQUIRY_FROM_EMAIL to `.env.local`
- [ ] Added ENQUIRY_TO_EMAIL to `.env.local`
- [ ] Pushed to GitHub (`git push origin main`)
- [ ] Waited for Vercel deployment
- [ ] Tested quote form submission
- [ ] Received email ✅

**You're done!** Emails now work reliably. 🚀

---

## Next Phase (Optional)

1. Add user confirmation email (sends to submitter)
2. Add email templates in Brevo
3. Setup Brevo webhooks for CRM sync
4. Add SMS notifications (advanced)
