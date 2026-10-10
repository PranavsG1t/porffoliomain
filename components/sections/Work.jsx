import Link from 'next/link'
import { PROJECTS } from '@/data/projects'

function Row({ p }) {
  const inner = (
    <>
      <div><h3>{p.title}</h3><p>{p.desc}</p><small>{p.tags}</small></div>
      <div className="yr">{p.year}</div>
    </>
  )
  return p.external
    ? <a className="row" href={p.href} target="_blank" rel="noopener noreferrer">{inner}</a>
    : <Link className="row" href={p.href}>{inner}</Link>
}

export default function Work() {
  return (
    <section className="s" id="work">
      <div className="wrap grid">
        <h2>Projects</h2>
        <div>{PROJECTS.map((p) => <Row key={p.title} p={p} />)}</div>
      </div>
    </section>
  )
}
