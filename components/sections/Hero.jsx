"use client"
import { useEffect, useRef } from 'react'
import { startAsciiHero } from '@/lib/asciiHero'

export default function Hero() {
  const a = useRef(null)
  const b = useRef(null)
  useEffect(() => startAsciiHero(a.current, b.current), [])
  return (
    <section id="hero">
      <div id="ascii" ref={a} aria-hidden="true" />
      <div id="ascii2" ref={b} aria-hidden="true" />
      <div className="veil" />
      <div className="hero-in">
        <p className="name">Pranav Ghadigaonkar, since 2022</p>
        <h1>Life is a<br />paradox,<br /><em>so is Art.</em></h1>
        <div className="btns"><a className="btn solid" href="#work">View work</a><a className="btn ghost" href="#contact">Get in touch</a></div>
      </div>
      <div className="hint"><span>Move your cursor, click to drop the needle</span><i /><span>Scroll</span></div>
    </section>
  )
}
