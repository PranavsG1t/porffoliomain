'use client'
import { useEffect, useRef } from 'react'
import { SKILLS } from '@/data/projects'

function SkillBar({ name, level }) {
  const fillRef = useRef(null)

  useEffect(() => {
    const el = fillRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.width = `${level}%`
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [level])

  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'5px 0' }}>
      <span style={{
        fontFamily:'var(--font-mono),monospace', fontSize:9,
        letterSpacing:'.12em', textTransform:'uppercase',
        color:'var(--mid)', minWidth:74,
      }}>{name}</span>
      <div style={{ flex:1, height:2, background:'var(--border)', overflow:'hidden' }}>
        <div
          ref={fillRef}
          style={{
            height:'100%', width:'0%', background:'var(--white)',
            transition:`width 1.4s cubic-bezier(.4,0,.2,1)`,
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" style={{
      background:'var(--surface)', padding:'clamp(60px,8vw,120px) 0',
      borderTop:'1px solid var(--border)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(20px,4vw,64px)' }}>
        <div className="reveal" style={{
          marginBottom:'clamp(28px,4vw,56px)',
          paddingBottom:'clamp(20px,2.5vw,32px)',
          borderBottom:'1px solid var(--border)',
        }}>
          <p className="eyebrow">◈ Technical Specification</p>
          <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:400, fontSize:'clamp(2.2rem,5vw,4.5rem)', lineHeight:.97, marginTop:8 }}>
            Capabilities
          </h2>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',
          gap:1, background:'var(--border)',
        }}>
          {SKILLS.map(cluster => (
            <div key={cluster.cluster} className="reveal" style={{
              background:'var(--bg)',
              padding:'clamp(20px,2.5vw,32px)',
            }}>
              <p style={{
                fontFamily:'var(--font-mono),monospace', fontSize:9,
                letterSpacing:'.22em', textTransform:'uppercase', color:'var(--mid)',
                marginBottom:'clamp(14px,1.8vw,24px)',
                paddingBottom:10, borderBottom:'1px solid var(--border)',
              }}>{cluster.cluster}</p>
              {cluster.items.map(([name, level]) => (
                <SkillBar key={name} name={name} level={level} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
