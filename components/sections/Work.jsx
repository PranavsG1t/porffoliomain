'use client'
import { useState, useEffect } from 'react'
import { PROJECTS, SWITCHES } from '@/data/projects'

function ProjectCard({ project, visible }) {
  return (
    <article
      className="pc"
      style={{
        background:'var(--bg)',
        overflow:'hidden',
        transition:'background .2s, opacity .35s, transform .35s',
        position: visible ? 'relative' : 'absolute',
        opacity:  visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(8px)',
        pointerEvents: visible ? 'auto' : 'none',
        height: visible ? 'auto' : 0,
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      {/* thumb */}
      <div style={{
        width:'100%', aspectRatio:'16/9',
        background: project.bg,
        overflow:'hidden', position:'relative',
      }}>
        <div style={{
          position:'absolute', inset:0, zIndex:1,
          backgroundImage:'radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px)',
          backgroundSize:'6px 6px', pointerEvents:'none',
        }} />
        <div style={{
          position:'absolute', inset:0, zIndex:2,
          background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.07) 2px,rgba(0,0,0,.07) 4px)',
          pointerEvents:'none',
        }} />
        <div style={{
          position:'absolute', inset:0, zIndex:3,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'var(--font-mono),monospace', fontSize:10,
          letterSpacing:'.22em', textTransform:'uppercase',
          color:'rgba(255,255,255,.2)',
        }}>{project.thumb_label}</div>
      </div>

      {/* meta */}
      <div style={{ padding:'clamp(16px,2vw,24px)' }}>
        <p style={{ fontFamily:'var(--font-mono),monospace', fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--mid)', marginBottom:8 }}>
          {project.cat_label}
        </p>
        <h3 style={{ fontFamily:'var(--font-display),serif', fontWeight:400, fontSize:'clamp(1.2rem,2vw,1.7rem)', color:'var(--white)', marginBottom:8, lineHeight:1.1 }}>
          {project.title}
        </h3>
        <p style={{ fontSize:13, fontWeight:300, color:'var(--mid)', lineHeight:1.55 }}>
          {project.desc}
        </p>
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          marginTop:'clamp(12px,1.5vw,20px)', paddingTop:'clamp(10px,1.2vw,16px)',
          borderTop:'1px solid var(--border)',
        }}>
          <span style={{ fontFamily:'var(--font-mono),monospace', fontSize:9, letterSpacing:'.14em', color:'var(--border)' }}>
            {project.year}
          </span>
          <div className="p-arrow">→</div>
        </div>
      </div>

      <style>{`
        .pc:hover { background: var(--surface) !important; }
        .p-arrow { width:26px; height:26px; border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:12px; color:var(--mid); transition:color .15s,border-color .15s,background .15s; }
        .pc:hover .p-arrow { color:var(--white); border-color:var(--mid); background:var(--panel); }
      `}</style>
    </article>
  )
}

export default function Work() {
  const [activeCategories, setActiveCategories] = useState(
    new Set(SWITCHES.filter(s => s.on).map(s => s.cat))
  )

  useEffect(() => {
    const handler = e => setActiveCategories(new Set(
      Object.entries(e.detail).filter(([, v]) => v).map(([k]) => k)
    ))
    window.addEventListener('switchchange', handler)
    return () => window.removeEventListener('switchchange', handler)
  }, [])

  const isVisible = project =>
    project.categories.some(c => activeCategories.has(c))

  const anyVisible = PROJECTS.some(isVisible)

  return (
    <section id="work" style={{
      background:'var(--surface)', padding:'clamp(60px,8vw,120px) 0',
      borderTop:'1px solid var(--border)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(20px,4vw,64px)' }}>

        {/* header */}
        <div className="reveal" style={{
          display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:16,
          marginBottom:'clamp(28px,4vw,48px)', paddingBottom:'clamp(16px,2vw,28px)',
          borderBottom:'1px solid var(--border)',
        }}>
          <div>
            <p className="eyebrow" style={{ marginBottom:8 }}>◈ Selected Work</p>
            <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:400, fontSize:'clamp(2.2rem,5vw,4.5rem)', lineHeight:.97 }}>
              Designs &amp; Systems
            </h2>
          </div>
          <p style={{ fontFamily:'var(--font-mono),monospace', fontSize:9, letterSpacing:'.16em', textTransform:'uppercase', color:'var(--border)', textAlign:'right', lineHeight:1.6 }}>
            Use the switches above<br />to filter by discipline
          </p>
        </div>

        {/* empty state */}
        {!anyVisible && (
          <div style={{ padding:'clamp(48px,6vw,80px) 0', textAlign:'center' }}>
            <p style={{ fontFamily:'var(--font-mono),monospace', fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--border)', margin:'0 auto' }}>
              — All switches off. Flip one to see work. —
            </p>
          </div>
        )}

        {/* project grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(360px,1fr))',
          gap:1,
          background: anyVisible ? 'var(--border)' : 'transparent',
          position:'relative',
        }}>
          {PROJECTS.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              visible={isVisible(project)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:560px) {
          #work .pgrid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  )
}
