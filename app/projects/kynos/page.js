import Link from 'next/link'

export const metadata = { title: 'Kynos | GGpranav' }

export default function Kynos() {
  return (
    <main className="proj">
      <div className="pj blog" id="pj-kynos">
        <Link className="back" href="/#work">&larr; All work</Link>
        <div className="post"><p className="meta">Project</p><h1>Kynos</h1><p className="lede">This page is a placeholder. The write-up is coming soon.</p></div>
      </div>
    </main>
  )
}
