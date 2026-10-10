import Link from 'next/link'
import { DEMO_URL } from '@/data/site'

export const metadata = { title: 'Fraud detection with NL alerts | GGpranav' }

export default function FraudProject() {
  return (
    <main className="proj">
      <div className="pj" id="pj-main">
        <Link className="back" href="/#work">&larr; All work</Link>
        <h1>Fraud detection <em>with NL alerts</em></h1>
        <p className="intro">A project in two parts. Read how I approached it, or open the live dashboard and try it yourself.</p>
        <div className="opts">
          <Link className="opt a rv" href="/projects/fraud-detection/case-study">
            <div><div className="n">01</div></div>
            <div><div className="t">Case study</div><div className="sub">The problem, the approach and the trade-offs behind turning model scores into alerts people can actually read.</div><span className="go">Read the case study &rarr;</span></div>
          </Link>
          <a className="opt b rv" href={DEMO_URL} target="_blank" rel="noopener noreferrer">
            <div><div className="n">02</div></div>
            <div><div className="t">Take a live demo</div><div className="sub">Explore the working dashboard yourself. It opens in a new tab.</div><span className="go">Open the dashboard &#8599;</span></div>
          </a>
        </div>
      </div>
    </main>
  )
}
