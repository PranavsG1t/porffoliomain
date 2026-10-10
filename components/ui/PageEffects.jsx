"use client"
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Scroll reveals (.rv and .anim articles) and the red timeline progress lines.
export default function PageEffects() {
  const path = usePathname()
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    document.querySelectorAll('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el) })
    document.querySelectorAll('.anim').forEach((root) => {
      root.querySelectorAll('.stats,.cuts,.steps,.ba,.bugs,.facts,ul.dots,ol.road,.carry ul').forEach((box) => [...box.children].forEach((c, i) => c.style.setProperty('--i', i)))
      const targets = root.querySelectorAll('.post > *, .wide > *, .toc, :scope > div > .stats, :scope > div > .cmp')
      let first = 0
      targets.forEach((el) => {
        if (el.parentElement.classList.contains('post') && el.parentElement === root.querySelector('.post')) el.style.setProperty('--d', first++ * 90)
        if (reduce) el.classList.add('in'); else io.observe(el)
      })
    })
    const tls = [...document.querySelectorAll('.tl')]
    let tick = false
    const prog = () => {
      tick = false
      const m = innerHeight * 0.6
      tls.forEach((tl) => { const r = tl.getBoundingClientRect(); tl.style.setProperty('--p', Math.max(0, Math.min(1, (m - (r.top + 16)) / Math.max(1, r.height - 16)))) })
    }
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(prog) } }
    if (tls.length) { addEventListener('scroll', onScroll, { passive: true }); prog() }
    return () => { io.disconnect(); removeEventListener('scroll', onScroll) }
  }, [path])
  return null
}
