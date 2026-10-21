# EmailJS Configuration Guide

The contact form on your portfolio is ready to send emails directly from the browser using EmailJS. Follow these steps to configure it:

## Setup Instructions

### 1. Create an EmailJS Account
- Go to [emailjs.com](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email address

### 2. Create an Email Service
- In the EmailJS dashboard, go to **Email Services**
- Click **Add Service**
- Select **Gmail** (or your preferred email provider)
- Follow the authentication steps
- Copy your **Service ID** (looks like: `service_xxxxx`)

### 3. Create an Email Template
- Go to **Email Templates**
- Click **Create New Template**
- Use this template structure:

```
Subject: {{subject}}
From: {{from_email}}

Name: {{from_name}}
Message:
{{message}}
```

- Save the template and copy your **Template ID** (looks like: `template_xxxxx`)

### 4. Get Your Public Key
- Go to **Account Settings** → **API Keys**
- Copy your **Public Key** (looks like: `xxxxxxxxxxxxx`)

### 5. Update the Contact Component
- Open `app/components/Contact.tsx`
- Find the EmailJS configuration section at the top
- Replace the three placeholder values:

```typescript
const EMAILJS_SERVICE_ID  = 'your_service_id_here'
const EMAILJS_TEMPLATE_ID = 'your_template_id_here'
const EMAILJS_PUBLIC_KEY  = 'your_public_key_here'
```

### 6. Deploy
- Commit and push your changes to GitHub
- Vercel will automatically redeploy your portfolio
- Test the contact form on the live site

## Current Status

✅ Contact form is fully functional with:
- Client-side validation
- Honeypot spam protection
- Success/error states
- Fallback email notice

⚠️ EmailJS not yet configured with credentials
- Form will show error message asking to email directly
- Once configured above, emails will send automatically

## Testing the Form

1. Fill out the form with test data
2. Click "Send Message"
3. Check your email for the submission
4. Try sending from different devices to verify functionality

## Troubleshooting

**"Failed to send message" error:**
- Verify all three credentials are correct in Contact.tsx
- Check that your EmailJS service is connected to your email provider
- Ensure your email provider allows third-party apps (Gmail: Less secure app access)

**Emails going to spam:**
- Add an SPF record to your email domain
- Configure DKIM if available in your email provider

**Rate limiting:**
- EmailJS free tier allows 200 emails/month
- Upgrade to paid plan if needed

## Support

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Contact Form Tutorial](https://www.emailjs.com/docs/tutorial/creating-contact-form/)
