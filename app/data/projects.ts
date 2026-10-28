type Portal = {
  name: string
  href: string
}

export type Project = {
  title: string
  description: string
  tech: string[]
  link: string
  github: string | null
  gradient: string
  category: string
  clientDelivered: boolean
  featured?: boolean
  id?: string
  publicLink?: string
  portals?: Portal[]
}

const LMS_URL = 'https://training.solbusinessconsultant.com.au'

export const projects: Project[] = [
  {
    id: 'sol-training-academy',
    title: 'SOL Training Academy',
    description:
      'Enterprise Learning Management System for an Australian NDIS training provider. Role-based portals for admins and students, course management, learning progress, quizzes, assignments, and certificates.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    link: `${LMS_URL}/`,
    portals: [
      { name: 'Course Catalog', href: `${LMS_URL}/training-courses` },
      { name: 'Student Portal', href: `${LMS_URL}/login` },
      { name: 'Admin Panel', href: `${LMS_URL}/lms-admin` },
    ],
    github: null,
    gradient: 'from-violet-500 to-fuchsia-500',
    category: 'Client Delivered · Enterprise LMS',
    clientDelivered: true,
    featured: true,
  },
  {
    id: 'palm-grace-memorials',
    title: 'Palm & Grace Memorials',
    description:
      'Digital memorial platform for preserving life stories, photographs, videos, and memories. Features distinctive memorial templates, searchable directory, moderated tributes, service & livestream information, separate family and Care Partner enquiries, and an admin dashboard for managing content, publication, sharing links, and QR codes.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Supabase', 'Cloudinary'],
    link: 'https://www.palmandgrace.org/',
    github: null,
    gradient: 'from-rose-500 to-pink-600',
    category: 'Client Delivered · Memorial Platform',
    clientDelivered: true,
    featured: true,
  },
  {
    id: 'ved-affiliate-marketing',
    title: 'VED Affiliate Pvt. Limited',
    description:
      'Full-stack affiliate marketing platform for financial campaigns. Partner registration, referral tracking, campaign management, customer lead capture, wallet & earnings tracking, and admin panel for lead verification and payout management. Live platform statistics and customer enquiry forms.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    link: 'https://vedaffiliatepvtltd.com/',
    github: null,
    gradient: 'from-amber-500 to-orange-600',
    category: 'Client Delivered · Affiliate / Fintech',
    clientDelivered: true,
  },
  {
    id: 'tmg180',
    publicLink: 'https://tmg180.solbusinessconsultant.com.au/',
    title: 'TMG180 - Support & Governance',
    description:
      'NDIS support and governance platform with participant profiles, worker directory browsing, evidence history, policy acknowledgements, and consent workflows.',
    tech: ['React.js', 'Node.js', 'Tailwind CSS', 'MongoDB'],
    link: 'https://tmg180.solbusinessconsultant.com.au/participant/browse-workers',
    github: null,
    gradient: 'from-sky-500 to-indigo-500',
    category: 'Client Delivered · Marketplace',
    clientDelivered: true,
  },
  {
    title: 'Quotex Marketing — Candle Probability Lab',
    description:
      'Quantitative research platform streaming live Binance candles with deterministic probability-based predictions. Interactive workstation across market and timeframe controls, prediction views, and indicator panels (EMA, RSI, MACD).',
    tech: ['React.js', 'Node.js', 'Binance API', 'WebSocket', 'Tailwind CSS'],
    link: 'https://quotex-marketing.vercel.app/',
    github: null,
    gradient: 'from-orange-500 to-rose-500',
    category: 'Client Delivered · Fintech / Trading',
    clientDelivered: true,
  },
  {
    title: 'SOL Business Consultant Hub',
    description:
      'Compliance-first consultancy hub for Australian NDIS providers and corporates. Offshore staffing, NDIS registration guidance, bookkeeping, digital transformation, and the SOL Support Academy with three progressive training levels.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'SEO', 'TypeScript'],
    link: 'https://hub.solbusinessconsultant.com.au/',
    github: null,
    gradient: 'from-teal-500 to-cyan-500',
    category: 'Client Delivered · Consultancy / NDIS',
    clientDelivered: true,
  },
  {
    title: 'Nexus Capital — Investment Platform',
    description: 'Professional investment platform for a financial services client. Clean, conversion-focused design with daily earnings tracking, investor onboarding flow, and modern UI built for trust and credibility in fintech.',
    tech: ['React.js', 'Node.js', 'Tailwind CSS'],
    link: 'https://www.nexuscapitalbusiness.com',
    github: null,
    gradient: 'from-emerald-500 to-teal-500',
    category: 'Client Delivered · Fintech',
    clientDelivered: true,
  },
  {
    title: 'Trade With Tayyab — LMS',
    description: 'Premium Learning Management System for a trading academy. Course management, student onboarding, and professional brand identity positioned as high-authority trading education platform.',
    tech: ['React.js', 'Node.js', 'Tailwind CSS'],
    link: 'https://www.tradewithtayyab.tech',
    github: null,
    gradient: 'from-yellow-500 to-amber-500',
    category: 'Client Delivered · EdTech',
    clientDelivered: true,
  },
  {
    title: 'We Care Disability Service',
    description: 'Professional Australian NDIS disability support services platform with responsive UI, SEO-focused pages, service management structure, and business branding optimization.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'SEO', 'TypeScript'],
    link: 'https://wecaredisabilityservice.com.au/',
    github: null,
    gradient: 'from-blue-500 to-cyan-500',
    category: 'Client Delivered · NDIS',
    clientDelivered: true,
  },
  {
    title: 'SOL Business Consultant',
    description: 'Modern business consultancy platform for SaaS solutions, automation systems, NDIS operations, digital business support, and management solutions.',
    tech: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'SEO'],
    link: 'https://www.solbusinessconsultant.com.au/',
    github: null,
    gradient: 'from-purple-500 to-pink-500',
    category: 'Client Delivered · Consultancy',
    clientDelivered: true,
  },
  {
    title: 'ClickOpticX WiFi Management',
    description: 'Online WiFi management SaaS platform with package activation, user data records, and comprehensive admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'WiFi API'],
    link: 'https://clickopticx-b7xr.onrender.com/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-cyan-500 to-blue-500',
    category: 'SaaS Platform',
    clientDelivered: false,
  },
  {
    title: 'Dibnow Repair & Shop SaaS',
    description: 'Repair & shop management SaaS with authentication, online tracking system, and payment integrations.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    link: 'https://dibnow-repair-saas.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-blue-500 to-indigo-500',
    category: 'SaaS Platform',
    clientDelivered: false,
  },
  {
    title: 'LMS Portal',
    description: 'Learning Management System with dashboard, course management, and authentication.',
    tech: ['Next.js', 'MongoDB', 'Tailwind CSS', 'TypeScript'],
    link: 'https://lms-portal-black-six.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-green-500 to-emerald-500',
    category: 'Web Application',
    clientDelivered: false,
  },
  {
    title: 'Real Estate Web App',
    description: 'Modern real estate marketplace with property listings, advanced search filters, pricing integration, and responsive design.',
    tech: ['Next.js', 'React', 'MongoDB', 'Stripe', 'TypeScript', 'Tailwind CSS'],
    link: 'https://real-estate-web-app-omega.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-amber-500 to-orange-500',
    category: 'Web Application',
    clientDelivered: false,
  },
  {
    title: 'MetaCrypto Trading',
    description: 'Crypto-related responsive web application with modern interface and real-time data.',
    tech: ['React', 'CSS3', 'API Integration', 'Crypto'],
    link: 'https://metacryptotrading.vercel.app/',
    github: 'https://github.com/aliahmad-qari',
    gradient: 'from-indigo-500 to-purple-500',
    category: 'Web Application',
    clientDelivered: false,
  },
]

