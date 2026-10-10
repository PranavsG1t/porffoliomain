"use client"
import { useEffect } from 'react'
import { startCarousel } from '@/lib/carousel'
import { CREATIVE, GROUPS } from '@/data/creative'

export default function Creative() {
  useEffect(() => startCarousel(CREATIVE.map((i) => ({ t: i.title, g: i.group, s: i.card, f: i.full }))), [])
  return (
    <>
      <section className="s" id="creative">
        <div className="wrap cr">
          <div>
            <h2>Design &amp; creative</h2>
            <p>Before ML, I designed brands, apps and campaigns. I still do, and it shows in how I build products.</p>
            <ul className="subs" id="subs">
              {GROUPS.map((g, i) => <li key={g.name}><button type="button" data-g={i}>{g.name}<small>{g.desc}</small></button></li>)}
            </ul>
            <div className="ctl">
              <button type="button" id="pp" aria-label="Pause">&#10074;&#10074;</button>
              <button type="button" id="cp" aria-label="Previous">&larr;</button>
              <button type="button" id="cn" aria-label="Next">&rarr;</button>
            </div>
          </div>
          <div className="car" id="car" tabIndex={0} aria-label="Design and photography carousel. Arrow keys to move, Enter to enlarge." />
        </div>
      </section>
      <div id="lb" hidden role="dialog" aria-modal="true" aria-label="Viewer">
        <button className="x" type="button" aria-label="Close">&times;</button>
        <button className="pv" type="button" aria-label="Previous">&larr;</button>
        <button className="nx" type="button" aria-label="Next">&rarr;</button>
        <div className="stage" />
      </div>
    </>
  )
}
