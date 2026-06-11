'use client'
import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger siblings slightly
          entry.target.style.transitionDelay = `${(i % 5) * 0.07}s`
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' })

    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
