'use client'
import { useState, useEffect } from 'react'

const LINKS = [
  { href:'#about',       label:'About'       },
  { href:'#work',        label:'Work'        },
  { href:'#photography', label:'Photography' },
  { href:'#skills',      label:'Skills'      },
  { href:'#experience',  label:'Experience'  },
  { href:'#contact',     label:'Contact'     },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      background: scrolled ? 'rgba(0,0,0,0.97)' : 'rgba(0,0,0,0.85)',
      borderBottom:'1px solid #2A2A2A',
      backdropFilter:'blur(10px)',
      transition:'background 0.3s',
    }}>
      <div style={{
        maxWidth:1280, margin:'0 auto',
        padding:'0 clamp(20px,4vw,64px)',
        height:52, display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <a href="#hero" style={{
          fontFamily:'var(--font-mono),monospace', fontSize:13, fontWeight:700,
          color:'#fff', textDecoration:'none', letterSpacing:'0.08em',
        }}>
          PG<span style={{ animation:'blink 1.2s step-end infinite', color:'#555' }}>_</span>
        </a>

        <ul style={{ display:'flex', alignItems:'center', gap:2, listStyle:'none', margin:0, padding:0 }}>
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="nav-link">
                <span className="nav-pip" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .nav-link {
          font-family: var(--font-mono), monospace;
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          color: #555; text-decoration: none;
          padding: 6px 12px; border: 1px solid transparent; border-radius: 2px;
          display: flex; align-items: center; gap: 6px;
          transition: color 0.15s, border-color 0.15s;
        }
        .nav-link:hover { color: #fff; border-color: #2A2A2A; }
        .nav-pip { width:4px; height:4px; background:currentColor; display:inline-block; flex-shrink:0; opacity:0.4; }
        @media(max-width:900px) { nav ul { display:none !important; } }
      `}</style>
    </nav>
  )
}
