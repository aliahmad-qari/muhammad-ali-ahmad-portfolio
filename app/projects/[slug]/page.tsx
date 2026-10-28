import TMGCaseStudy from './case-studies/TMG180'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Code2, Zap, Target, Users } from 'lucide-react'
import SOLCaseStudy from './case-studies/SOLTrainingAcademy'
import PalmGraceCaseStudy from './case-studies/PalmGraceMemorials'
import VEDCaseStudy from './case-studies/VEDAffiliateMarketing'

type CaseStudyContent = {
  slug: string
  component: React.ComponentType
}

const caseStudies: CaseStudyContent[] = [
  { slug: 'tmg180', component: TMGCaseStudy },
  { slug: 'sol-training-academy', component: SOLCaseStudy },
  { slug: 'palm-grace-memorials', component: PalmGraceCaseStudy },
  { slug: 'ved-affiliate-marketing', component: VEDCaseStudy },
]

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug)
  if (!study) return { title: 'Not Found' }

  const titles: { [key: string]: string } = {
    'sol-training-academy': 'SOL Business Platform Case Study',
    'tmg180': 'TMG180 Support & Governance Case Study',
    'palm-grace-memorials': 'Palm & Grace Memorials Case Study',
    'ved-affiliate-marketing': 'VED Affiliate Marketing Platform Case Study',
  }

  return {
    title: titles[params.slug] || 'Case Study',
    description: 'Explore the project context and public website for ' + titles[params.slug],
    alternates: { canonical: '/projects/' + params.slug },
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = caseStudies.find((s) => s.slug === params.slug)

  if (!caseStudy) {
    notFound()
  }

  const Component = caseStudy.component

  return (
    <div>
      {/* Breadcrumb & Back Button */}
      <div className="bg-gradient-to-b from-navy-900 to-navy-950 border-b border-slate-800 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#featured-projects"
            className="inline-flex items-center gap-2 text-electric-400 hover:text-electric-300 transition-colors mb-6 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Case Study Content */}
      <Component />
    </div>
  )
}
