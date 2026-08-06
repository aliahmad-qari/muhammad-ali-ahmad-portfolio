# Muhammad Ali Ahmad — Full Stack Developer Portfolio

A premium, fully responsive developer portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

**Live Portfolio:** [muhammadaliahmad.dev](https://muhammadaliahmad.dev)

---

## 🚀 Flagship Project — SOL Training Academy Platform

An end-to-end Enterprise Learning Management System built on the MERN stack for an Australian NDIS training provider.

### 🔗 Live Demo

**[https://training.solbusinessconsultant.com.au/](https://training.solbusinessconsultant.com.au/)**

| Surface | Entry Point |
| --- | --- |
| 🏛️ Public Landing Page | [`/`](https://training.solbusinessconsultant.com.au/) |
| 📚 Course Catalog | [`/training-courses`](https://training.solbusinessconsultant.com.au/training-courses) |
| 🎓 Student Portal | [`/login`](https://training.solbusinessconsultant.com.au/login) |
| 💼 Admin Panel | [`/lms-admin`](https://training.solbusinessconsultant.com.au/lms-admin) |

> Student and admin surfaces are credential-gated — access is provisioned by the client. The public landing page and course catalog are open.

### 🏗️ Architecture Highlights

**MERN Stack**
End-to-end JavaScript: React.js SPA frontend, Node.js + Express.js REST API, MongoDB with Mongoose schemas for users, courses, and enrollments. Frontend deployed on Vercel, API services on Render.

**Role-Based Access**
JWT authentication with a refresh-token architecture. Distinct permission boundaries for public visitors, enrolled students, and administrators — enforced at both the route guard and API middleware layers, so the admin panel and student portal are isolated surfaces rather than conditional UI.

**DRM Protection**
Layered content protection across the course player: context-menu and shortcut blocking (`F12`, `Ctrl+C`, `Ctrl+Shift+I`), real-time identity watermarking that overlays student name and email onto protected materials, plus auto-blur and auto-pause triggers on screen-capture or window-blur events.

**Discussion Opt-Out**
Per-course discussion boards with granular opt-in/opt-out control, letting students withdraw from peer visibility and direct messaging on a course-by-course basis without leaving the course itself.

**Expiry Reminders**
An automated boundary/range reminder engine integrated with the Brevo email API. Detects approaching enrollment expiry windows and dispatches scheduled notifications, while admins retain manual override to grant extension periods.

### 🛠️ Tech Stack

`React.js` · `Node.js` · `Express.js` · `MongoDB` · `JWT` · `Tailwind CSS` · `Brevo API` · `Vercel` · `Render`

---

## ✨ Portfolio Features

- Ultra-modern SaaS-style design with a dark theme and blue/purple gradient accents
- Glassmorphism cards, scroll-triggered animations, and smooth-scroll navigation
- Fully responsive across mobile, tablet, and desktop
- SEO optimized — structured metadata, OpenGraph tags, sitemap, and manifest
- Multi-surface project cards that surface distinct platform entry points

## 🧰 Built With

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Contact Form:** EmailJS

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Structure

```text
├── app/
│   ├── components/     # Hero, About, Skills, Experience, Projects, Workflow, Contact
│   ├── hooks/          # useIntersectionObserver — scroll-reveal animations
│   ├── globals.css     # Theme tokens, glassmorphism & animation keyframes
│   ├── layout.tsx      # Root layout + SEO metadata
│   └── page.tsx        # Section composition
└── public/             # Static assets, resume, robots.txt, sitemap.xml
```

## ☁️ Deployment

Optimized for Vercel — push to GitHub, import the repository, and deploy.

## 📬 Contact

- **Email:** ali.islamic.meh1@gmail.com
- **WhatsApp:** +92 307 9922301
- **LinkedIn:** [muhammad-ali-ahmad-mern](https://linkedin.com/in/muhammad-ali-ahmad-mern)

## License

© 2026 Muhammad Ali Ahmad. All Rights Reserved.
