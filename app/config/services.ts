export type StartingPrice = { amount: number; currency: string } | null

export type ServiceAddOn = {
  name: string
  description: string
  estimatedCost?: string
}

export type ServicePackage = {
  id: string
  name: string
  summary: string
  description: string
  startingPrice: StartingPrice
  estimatedTimeline: string
  deliverables: string[]
  revisions: string | null
  exclusions: string[]
  addOns?: ServiceAddOn[]
  gradient: string
  icon: string
  featured?: boolean
  color: string // For branding (different from gradient)
}

// Set only approved rates and commitments. Null values display scope-based wording.
export const packages: ServicePackage[] = [
  {
    id: 'landing-page',
    name: 'Starter Website',
    summary: 'A focused website for a new business, campaign, product, or service.',
    description: 'A practical first web presence with a responsive layout, clear content structure, and a defined enquiry path. Final scope and delivery estimate are confirmed after requirements are reviewed.',
    startingPrice: null,
    estimatedTimeline: 'Confirmed after scope review',
    gradient: 'from-blue-500 to-cyan-500',
    color: 'blue',
    icon: '🎯',
    featured: false,
    deliverables: [
      'Responsive single or multi-section landing page',
      'Contact/enquiry form with validation',
      'Basic SEO setup (meta tags, Open Graph)',
      'Mobile optimization and performance tuning',
      'Deployment to your hosting platform',
      'Handover and documentation'
    ],
    revisions: null,
    exclusions: [
      'Domain and hosting (charged separately by provider)',
      'Professional copywriting or photography',
      'Email campaign integration',
      'Advanced analytics beyond basic Google Analytics',
      'Paid advertising setup or configuration'
    ],
    addOns: [
      { name: 'Video Background', description: 'Auto-playing hero video with fallback' },
      { name: 'Stripe Integration', description: 'Direct payment collection on page' },
      { name: 'Email List Signup', description: 'ConvertKit or Mailchimp integration' },
      { name: 'Multi-language Support', description: 'i18n setup for 2–3 languages' }
    ]
  },
  {
    id: 'business-website',
    name: 'Business Website',
    summary: 'A multi-page professional website that explains your services and converts visitors into enquiries.',
    description: 'For businesses that need a clear, professional online presence. Page count, content, integrations, and delivery estimate are agreed in the written scope.',
    startingPrice: null,
    estimatedTimeline: 'Confirmed after scope review',
    gradient: 'from-violet-500 to-fuchsia-500',
    color: 'purple',
    icon: '🏢',
    featured: true,
    deliverables: [
      'Agreed page structure (typically 5–7 pages)',
      'Responsive design optimized for desktop, tablet, mobile',
      'Services/offerings showcase pages',
      'Enquiry form with backend email integration',
      'CMS options (Markdown-based or optional headless CMS)',
      'Technical SEO foundations (sitemaps, robots.txt, structured data)',
      'Performance optimization (images, caching, lazy loading)',
      'Deployment and handover documentation'
    ],
    revisions: null,
    exclusions: [
      'Content writing (you provide copy and images)',
      'Professional photography or video production',
      'Ongoing content updates or maintenance',
      'Paid advertising setup or configuration',
      'Domain, hosting, and SSL certificates (charged separately)',
      'Premium third-party integrations (e.g., booking systems, advanced CMS)'
    ],
    addOns: [
      { name: 'Testimonials Carousel', description: 'Auto-rotating client testimonials with animation' },
      { name: 'Blog Setup', description: 'MDX-based blog with search and filtering capability' },
      { name: 'Newsletter Integration', description: 'Brevo or Mailchimp email campaign setup' },
      { name: 'Team Members Page', description: 'Dynamic team profile management and filtering' },
      { name: 'Analytics Dashboard', description: 'Custom dashboards for traffic and performance insights' },
      { name: 'Advanced SEO Package', description: 'Structured data, schema markup, and optimization' }
    ]
  },
  {
    id: 'custom-web-application',
    name: 'Custom Web Application',
    summary: 'A full-stack business application tailored to your specific workflows and requirements.',
    description: 'For businesses needing custom functionality beyond a standard website. Architecture, deliverables, and delivery estimate are agreed after requirements and dependencies are reviewed.',
    startingPrice: null,
    estimatedTimeline: 'Confirmed after scope review',
    gradient: 'from-rose-500 to-pink-600',
    color: 'rose',
    icon: '⚙️',
    featured: true,
    deliverables: [
      'Requirements gathering and project scoping workshop',
      'Technical architecture and data model design',
      'Full-stack development (React/Next.js + Node.js + Database)',
      'User authentication and role-based access control',
      'REST API design and implementation',
      'Dashboard, admin panel, and user interfaces as scoped',
      'Comprehensive testing (unit, integration, end-to-end)',
      'Security review and deployment preparation',
      'Technical documentation and code handover',
      'Post-launch support as defined in the approved proposal'
    ],
    revisions: null,
    exclusions: [
      'Features outside the approved specification',
      'Third-party API integration fees (payment gateways, external services)',
      'Production infrastructure costs (AWS, Vercel, databases)',
      'SSL certificates, domain, and hosting (charged by provider)',
      'Ongoing maintenance and support beyond initial period (available as retainer)',
      'Compliance certifications (HIPAA, PCI-DSS, SOC 2, etc.)',
      'Mobile app development (separate project scope)'
    ],
    addOns: [
      { name: 'Advanced Security Audit', description: 'Penetration testing and security hardening' },
      { name: 'Payment Processing', description: 'Stripe, PayPal, or custom payment gateway integration' },
      { name: 'Real-time Features', description: 'WebSockets for live notifications and collaboration' },
      { name: 'Advanced Search', description: 'Full-text search, filtering, and faceted navigation' },
      { name: 'Reporting & Analytics', description: 'Custom dashboards and automated report generation' },
      { name: 'Extended Support', description: 'Additional 3 or 6 months of post-launch support (retainer)' }
    ]
  },
  {
    id: 'ai-automation',
    name: 'AI & Automation',
    summary: 'Connect your tools and automate repetitive workflows using AI and no-code platforms.',
    description: 'Connect existing tools or explore an AI-assisted workflow. The approach, integrations, and estimate depend on your current systems, access, and requirements.',
    startingPrice: null,
    estimatedTimeline: 'Confirmed after scope review',
    gradient: 'from-amber-500 to-orange-600',
    color: 'amber',
    icon: '🤖',
    featured: false,
    deliverables: [
      'Workflow analysis and automation opportunity assessment',
      'Process mapping and bottleneck identification',
      'No-code workflow design (n8n, Make, or similar)',
      'Third-party API integrations (Slack, Zapier, CRM, email, etc.)',
      'AI integration (ChatGPT, Claude, or custom models as applicable)',
      'Error handling, retry logic, and notifications',
      'Testing with representative scenarios and data',
      'Comprehensive documentation and team training',
      'Deployment, monitoring, and handover'
    ],
    revisions: null,
    exclusions: [
      'Custom AI model training (unless separately scoped)',
      'Unlimited revisions beyond agreed scope',
      'Third-party service subscriptions or costs (Slack, Zapier, Make paid plans)',
      'Ongoing monitoring, maintenance, or support (available as retainer)',
      'Guaranteed AI accuracy or business outcome results',
      'Compliance or audit requirements beyond standard setup'
    ],
    addOns: [
      { name: 'Advanced AI Prompting', description: 'Custom LLM prompt engineering and optimization' },
      { name: 'Data Processing Pipeline', description: 'Complex multi-step ETL workflows and transformations' },
      { name: 'Reporting Dashboard', description: 'Automated daily, weekly, or monthly reports' },
      { name: 'Monitoring & Alerts', description: 'Real-time workflow health monitoring and error alerts' },
      { name: 'Custom API Integration', description: 'Integration with proprietary or legacy systems' },
      { name: 'Ongoing Support', description: 'Monthly maintenance and workflow optimization retainer' }
    ]
  }
]

export const maintenancePlans = [
  {
    id: 'website-maintenance',
    name: 'Website Maintenance',
    summary: 'Monthly updates, fixes, and support for your production website.',
    startingPrice: null,
    cadence: 'Monthly scope agreed in writing',
    gradient: 'from-teal-500 to-cyan-500',
    color: 'teal',
    includes: [
      'Dependency and package security updates',
      'Bug fixes within the monthly time allowance agreed in writing',
      'Monthly health check and performance audit',
      'Uptime monitoring and alerts',
      'Maintenance summary report',
      'Priority support channel'
    ],
    excludes: [
      'Redesigns or feature additions',
      'Unlimited support or 24/7 on-call coverage',
      'Hosting, domain, and SSL costs (charged by provider)',
      'Third-party service incidents or failures'
    ]
  },
  {
    id: 'application-support',
    name: 'Application & Automation Support',
    summary: 'Ongoing support and maintenance for custom applications and automations.',
    startingPrice: null,
    cadence: 'Retainer or task-based scope',
    gradient: 'from-indigo-500 to-purple-500',
    color: 'indigo',
    includes: [
      'Triage and support for the agreed application or workflows',
      'Bug fixes and monitoring within the hours or allowance agreed in writing',
      'Documented priorities and response time SLA',
      'Ad-hoc enhancements and optimizations',
      'Regular status check-ins and quarterly reviews',
      'Proactive health monitoring and alerting'
    ],
    excludes: [
      'Unscoped feature development',
      'Guaranteed 24/7 uptime or emergency support (custom SLA available separately)',
      'Third-party service outages or vendor issues',
      'Infrastructure and cloud platform costs'
    ]
  }
]

export function formatPrice(price: StartingPrice) {
  return price
    ? 'From ' + new Intl.NumberFormat('en', { style: 'currency', currency: price.currency, maximumFractionDigits: 0 }).format(price.amount)
    : 'Custom Quote'
}
