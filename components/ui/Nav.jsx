"use client"
import { useState } from 'react'
import Link from 'next/link'
import { NAV, RESUME_URL } from '@/data/site'

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav>
      <div className="wrap">
        <Link className="logo" href="/" onClick={() => setOpen(false)}>PG_</Link>
        <ul>{NAV.map(([t, h]) => <li key={h}><Link href={h}>{t}</Link></li>)}</ul>
        <div className="acts">
          <a className="nb o" href={RESUME_URL} target="_blank" rel="noopener noreferrer" aria-label="Get my resume (PDF)">Resume</a>
          <Link className="nb s" href="/#contact" onClick={() => setOpen(false)}>Get in touch</Link>
          <button className="burger" type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        </div>
      </div>
      {open && (
        <div className="mmenu">
          {NAV.map(([t, h]) => <Link key={h} href={h} onClick={() => setOpen(false)}>{t}</Link>)}
        </div>
      )}
    </nav>
  )
}
