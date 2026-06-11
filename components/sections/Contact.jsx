'use client'
import { useState } from 'react'
import { ABOUT } from '@/data/projects'

export default function Contact() {
  const [copyState, setCopyState] = useState('idle') // idle | copied

  const handleIgnition = async () => {
    try {
      await navigator.clipboard.writeText(ABOUT.email)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2400)
    } catch {
      window.location.href = `mailto:${ABOUT.email}`
    }
  }

  const links = [
    { label: ABOUT.email,  href: `mailto:${ABOUT.email}` },
    { label: ABOUT.phone,  href: `tel:${ABOUT.phone.replace(/\s/g,'')}` },
    { label: 'GitHub — ggpranav', href: ABOUT.github, target:'_blank' },
    { label: 'LinkedIn',   href: ABOUT.linkedin, target:'_blank' },
  ]

  return (
    <section id="contact" style={{
      background:'var(--surface)', padding:'clamp(60px,8vw,120px) 0',
      borderTop:'1px solid var(--border)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(20px,4vw,64px)' }}>
        <div className="contact-grid">

          {/* left — copy + links */}
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom:'clamp(12px,1.5vw,20px)' }}>◈ Open Channel</p>
            <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:400, fontSize:'clamp(2.2rem,5vw,4.5rem)', lineHeight:.97 }}>
              Let's build<br />something.
            </h2>
            <p style={{ fontSize:15, fontWeight:300, color:'var(--mid)', lineHeight:1.65, marginTop:'clamp(12px,1.5vw,20px)', marginBottom:0 }}>
              Available for freelance design, ML consulting, and collaborations.<br />
              Based in Mumbai — working globally.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:'clamp(20px,2.5vw,32px)' }}>
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.target ? 'noopener noreferrer' : undefined}
                  className="ct-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* right — ignition block */}
          <div className="reveal" style={{
            border:'1px solid var(--border)',
            background:'var(--bg)',
            padding:'clamp(28px,3.5vw,48px)',
            textAlign:'center',
          }}>
            <p style={{
              fontFamily:'var(--font-mono),monospace', fontSize:9,
              letterSpacing:'.28em', textTransform:'uppercase', color:'var(--mid)',
              marginBottom:'clamp(20px,2.5vw,36px)',
            }}>◈ Copy Email Address</p>

            <button
              onClick={handleIgnition}
              aria-label="Copy email address"
              className={`ign-btn${copyState === 'copied' ? ' pressed' : ''}`}
            />

            <p style={{
              fontFamily:'var(--font-mono),monospace', fontSize:9,
              letterSpacing:'.22em', textTransform:'uppercase',
              color: copyState === 'copied' ? 'var(--white)' : 'var(--border)',
              transition:'color .3s', marginTop:8,
            }}>
              {copyState === 'copied' ? 'Copied ✓' : 'Press to Copy'}
            </p>

            <p style={{
              fontFamily:'var(--font-mono),monospace', fontSize:9,
              letterSpacing:'.18em', textTransform:'uppercase',
              color:'var(--mid)', marginTop:8, minHeight:16,
              opacity: copyState === 'copied' ? 1 : 0,
              transition:'opacity .3s',
            }}>
              {ABOUT.email} — copied
            </p>

            <a
              href={`mailto:${ABOUT.email}`}
              style={{
                display:'inline-flex', marginTop:24,
                fontFamily:'var(--font-mono),monospace', fontSize:11,
                letterSpacing:'.16em', textTransform:'uppercase',
                textDecoration:'none', color:'var(--bg)',
                background:'var(--white)', padding:'13px 28px',
                borderRadius:2, border:'1px solid var(--white)',
                transition:'box-shadow .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px rgba(255,255,255,.15)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              Open Mail
            </a>
          </div>

        </div>
      </div>

      <style>{`
        .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,80px); align-items:start; }
        .ct-link { display:flex; align-items:center; gap:12px; text-decoration:none; font-family:var(--font-mono),monospace; font-size:11px; letter-spacing:.1em; color:var(--mid); padding:clamp(10px,1.2vw,14px) clamp(14px,1.5vw,20px); border:1px solid var(--border); background:var(--bg); transition:color .15s,border-color .15s,background .15s; }
        .ct-link::before { content:'→ '; opacity:0; transition:opacity .15s; }
        .ct-link:hover { color:var(--white); border-color:var(--mid); background:var(--panel); }
        .ct-link:hover::before { opacity:1; }
        .ign-btn {
          width:96px; height:96px; border-radius:50%; cursor:pointer; border:none;
          background:radial-gradient(circle at 38% 32%,#3A3A3A,#111 60%,#000 100%);
          box-shadow:0 0 0 4px #000,0 0 0 5px #333,0 0 0 6px #000,0 8px 28px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.12);
          display:flex; align-items:center; justify-content:center;
          margin:0 auto clamp(16px,2vw,28px);
          transition:transform .15s,box-shadow .15s,top .15s;
          position:relative; top:0;
        }
        .ign-btn::after { content:''; width:3px; height:24px; background:linear-gradient(180deg,#FFF,rgba(255,255,255,.4)); border-radius:1.5px; display:block; }
        .ign-btn:hover { box-shadow:0 0 0 4px #000,0 0 0 5px #666,0 0 0 6px #000,0 8px 28px rgba(0,0,0,.9),0 0 40px rgba(255,255,255,.08),inset 0 1px 0 rgba(255,255,255,.12); }
        .ign-btn:active, .ign-btn.pressed { top:3px; box-shadow:0 0 0 4px #000,0 0 0 5px #333,0 0 0 6px #000,0 3px 12px rgba(0,0,0,.9),inset 0 2px 8px rgba(0,0,0,.8); }
        @media(max-width:900px) { .contact-grid { grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  )
}
