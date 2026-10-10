"use client"
import { useEffect, useState } from 'react'

// Sticky bar under the nav: current section, contents menu, reading progress.
export default function CaseStudyStrip() {
  const [secs, setSecs] = useState([])
  const [cur, setCur] = useState(-1)
  const [pct, setPct] = useState(0)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const hs = [...document.querySelectorAll('#pj-case h2[id]')]
    const titles = [...document.querySelectorAll('#pj-case .toc a')].map((a) => a.textContent)
    setSecs(hs.map((h, i) => ({ id: h.id, title: titles[i] || h.textContent })))
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight
      setPct(h > 0 ? Math.min(100, (scrollY / h) * 100) : 0)
      let c = -1
      hs.forEach((x, i) => { if (x.getBoundingClientRect().top <= 140) c = i })
      setCur(c)
    }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onClick = (e) => { if (!e.target.closest('#cstrip')) setOpen(false) }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('keydown', onKey); addEventListener('click', onClick)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('keydown', onKey); removeEventListener('click', onClick) }
  }, [])
  const label = cur < 0 || !secs[cur] ? 'The story of building it' : `${String(cur + 1).padStart(2, '0')} / ${secs.length}  ${secs[cur].title}`
  return (
    <div id="cstrip">
      <div className="wrap cs-in">
        <span id="cslabel">{label}</span>
        <button type="button" id="csbtn" aria-expanded={open} aria-controls="csmenu" onClick={(e) => { e.stopPropagation(); setOpen(!open) }}>Contents &#9662;</button>
      </div>
      <div id="prog" style={{ width: pct + '%' }} />
      {open && (
        <ol id="csmenu">
          {secs.map((s, i) => <li key={s.id}><a href={'#' + s.id} className={i === cur ? 'cur' : ''} onClick={() => setOpen(false)}>{s.title}</a></li>)}
        </ol>
      )}
    </div>
  )
}
