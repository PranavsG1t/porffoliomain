import Link from 'next/link'
import html from '@/content/humanoidArticle'

export const metadata = { title: 'Design and analysis of an AI-powered humanoid robot | GGpranav' }

export default function Humanoid() {
  return (
    <main className="proj">
      <article className="pj blog anim" id="pj-robot">
        <Link className="back" href="/#work">&larr; All work</Link>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  )
}
