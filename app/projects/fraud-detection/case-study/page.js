import Link from 'next/link'
import html from '@/content/fraudCaseStudy'
import CaseStudyStrip from '@/components/ui/CaseStudyStrip'
import { DEMO_URL } from '@/data/site'

export const metadata = { title: 'Teaching a fraud model to explain itself | GGpranav' }

export default function CaseStudy() {
  return (
    <main className="proj">
      <CaseStudyStrip />
      <article className="pj blog anim" id="pj-case">
        <Link className="back" href="/projects/fraud-detection">&larr; Back to project</Link>
        <div dangerouslySetInnerHTML={{ __html: html.replaceAll('__DEMO__', DEMO_URL) }} />
      </article>
    </main>
  )
}
