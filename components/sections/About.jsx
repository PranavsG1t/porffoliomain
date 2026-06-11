import { ABOUT } from '@/data/projects'

export default function About() {
  return (
    <section id="about" style={{
      background:'var(--bg)', padding:'clamp(60px,8vw,120px) 0',
      borderTop:'1px solid var(--border)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(20px,4vw,64px)' }}>
        <div className="about-grid reveal">
          {/* ID plate */}
          <div style={{ border:'1px solid var(--border)', background:'var(--surface)', padding:'clamp(20px,2.5vw,32px)' }}>
            <div style={{
              fontFamily:'var(--font-display),serif',
              fontSize:'clamp(1.4rem,2.5vw,2rem)',
              color:'var(--white)', lineHeight:1.1,
              marginBottom:'clamp(16px,2vw,24px)',
              paddingBottom:'clamp(12px,1.5vw,20px)',
              borderBottom:'1px solid var(--border)',
            }}>
              Pranav<br />Ghadigaonkar
            </div>
            {[
              ['Role',      ABOUT.role.split(' · ')[0]],
              ['Company',   ABOUT.company],
              ['Location',  ABOUT.location],
              ['Education', ABOUT.education],
              ['Also',      'Designer · Photographer'],
              ['Email',     ABOUT.email],
            ].map(([k, v]) => (
              <div key={k} style={{
                display:'flex', justifyContent:'space-between', alignItems:'baseline',
                padding:'8px 0', borderBottom:'1px solid var(--border)',
              }}>
                <span style={{ fontFamily:'var(--font-mono),monospace', fontSize:9, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--mid)' }}>{k}</span>
                <span style={{ fontFamily:'var(--font-body),sans-serif', fontSize: k === 'Email' ? 10 : 12, fontWeight:400, color:'var(--light)', textAlign:'right', maxWidth:160 }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div>
            <p className="eyebrow" style={{ marginBottom:'clamp(12px,1.5vw,20px)' }}>◈ Profile</p>
            <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:400, fontSize:'clamp(2.2rem,5vw,4.5rem)', lineHeight:.97, marginBottom:'clamp(16px,2vw,24px)' }}>
              Building systems<br />that think &amp; experiences<br />that feel.
            </h2>
            {ABOUT.bio.map((p, i) => (
              <p key={i} style={{ marginBottom:16, fontSize:15, fontWeight:300, color:'var(--light)', lineHeight:1.65, maxWidth:'58ch' }}>{p}</p>
            ))}
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:'clamp(16px,2vw,28px)' }}>
              {ABOUT.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily:'var(--font-mono),monospace', fontSize:9, letterSpacing:'.14em',
                  textTransform:'uppercase', color:'var(--mid)',
                  border:'1px solid var(--border)', padding:'4px 10px', background:'var(--surface)',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid { display:grid; grid-template-columns:minmax(240px,1fr) 2fr; gap:clamp(32px,5vw,80px); align-items:start; }
        @media(max-width:900px) { .about-grid { grid-template-columns:1fr; } }
      `}</style>
    </section>
  )
}
