export type StartingPrice = { amount: number; currency: string } | null
export type ServicePackage = {
  id: string; name: string; summary: string; startingPrice: StartingPrice
  estimatedTimeline: string | null; deliverables: string[]; revisions: string | null; exclusions: string[]
}
// Set only approved rates and commitments. Null values display scope-based wording.
export const packages: ServicePackage[] = [
  { id: 'starter-website', name: 'Starter Website', summary: 'A focused web presence for one service, campaign, or new business.', startingPrice: null, estimatedTimeline: null, revisions: null,
    deliverables: ['Responsive landing page', 'Contact and enquiry links', 'Page titles and social sharing metadata', 'Deployment and handover for the agreed hosting platform'],
    exclusions: ['Brand identity and copywriting', 'E-commerce, user accounts, and custom backend', 'Domain, hosting, and paid third-party tools'] },
  { id: 'business-website', name: 'Business Website', summary: 'A multi-page website that explains your services and helps customers enquire.', startingPrice: null, estimatedTimeline: null, revisions: null,
    deliverables: ['Agreed page structure and reusable components', 'Responsive service and contact pages', 'Enquiry workflow', 'Technical SEO setup and launch handover'],
    exclusions: ['Unspecified pages or integrations', 'Ongoing content entry and marketing', 'Domain, hosting, and subscription fees'] },
  { id: 'custom-web-application', name: 'Custom Web Application', summary: 'A scoped business application with the interfaces and workflows your team needs.', startingPrice: null, estimatedTimeline: null, revisions: null,
    deliverables: ['Requirements and milestone plan', 'Agreed frontend, API, and data model', 'Authentication and roles where included in scope', 'Testing, deployment, and technical handover'],
    exclusions: ['Features outside the approved specification', 'Independent penetration testing or compliance certification', 'Cloud infrastructure and third-party usage fees'] },
  { id: 'ai-automation', name: 'AI & Automation', summary: 'Connect tools and reduce repetitive work through carefully scoped workflows.', startingPrice: null, estimatedTimeline: null, revisions: null,
    deliverables: ['Workflow and integration requirements', 'Agreed automation or AI integration', 'Failure handling and representative test scenarios', 'Setup documentation and handover'],
    exclusions: ['Model training unless separately agreed', 'Guaranteed AI accuracy or business outcomes', 'Model API, automation platform, and third-party fees'] },
]
export const maintenancePlans = [
  { id: 'maintenance', name: 'Website Maintenance', startingPrice: null as StartingPrice, cadence: 'Monthly scope agreed in writing', includes: ['Agreed dependency and compatibility checks', 'Small fixes within a defined time allowance', 'Scheduled health checks and a maintenance summary'], excludes: ['Redesigns and new features', 'Unlimited changes or 24/7 support', 'Hosting bills and third-party incident resolution'] },
  { id: 'application-support', name: 'Application & Automation Support', startingPrice: null as StartingPrice, cadence: 'Retainer or task-based scope', includes: ['Triage for the agreed application or workflows', 'Fixes and monitoring within the agreed allowance', 'Documented priorities and response windows'], excludes: ['Unspecified integrations and feature development', 'Guaranteed uptime or emergency cover without an SLA', 'Vendor outages and third-party usage charges'] },
]
export function formatPrice(price: StartingPrice) {
  return price ? 'From ' + new Intl.NumberFormat('en', { style: 'currency', currency: price.currency, maximumFractionDigits: 0 }).format(price.amount) : 'Request a quote'
}
