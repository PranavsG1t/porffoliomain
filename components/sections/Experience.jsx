import { EXPERIENCE } from '@/data/projects'

export default function Experience() {
  return (
    <section id="experience" style={{
      background:'var(--bg)', padding:'clamp(60px,8vw,120px) 0',
      borderTop:'1px solid var(--border)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(20px,4vw,64px)' }}>
        <div className="reveal" style={{
          marginBottom:'clamp(28px,4vw,56px)',
          paddingBottom:'clamp(20px,2.5vw,32px)',
          borderBottom:'1px solid var(--border)',
        }}>
          <p className="eyebrow">◈ Service Record</p>
          <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:400, fontSize:'clamp(2.2rem,5vw,4.5rem)', lineHeight:.97, marginTop:8 }}>
            Experience
          </h2>
        </div>

        <div style={{ position:'relative', paddingLeft:'clamp(28px,3.5vw,48px)' }}>
          {/* vertical rail */}
          <div style={{
            position:'absolute', left:0, top:8, bottom:8, width:1,
            background:'linear-gradient(180deg,transparent,var(--border) 10%,var(--border) 90%,transparent)',
          }} />

          {EXPERIENCE.map((item, i) => (
            <div key={i} className="reveal" style={{
              position:'relative',
              marginBottom: i < EXPERIENCE.length - 1 ? 'clamp(36px,5vw,64px)' : 0,
            }}>
              {/* node */}
              <div style={{
                position:'absolute',
                left:'calc(-1 * clamp(28px,3.5vw,48px))',
                top:6, width:10, height:10, borderRadius:'50%',
                background:'var(--bg)', border:'1px solid var(--mid)',
                transform:'translateX(-4px)',
              }}>
                <div style={{ position:'absolute', inset:2, borderRadius:'50%', background:'var(--white)' }} />
              </div>

              <p style={{ fontFamily:'var(--font-mono),monospace', fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--mid)', marginBottom:8 }}>
                {item.period}
              </p>
              <h3 style={{ fontFamily:'var(--font-display),serif', fontWeight:400, fontSize:'clamp(1.4rem,2.5vw,2rem)', color:'var(--white)', marginBottom:4 }}>
                {item.role}
              </h3>
              <p style={{ fontFamily:'var(--font-mono),monospace', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--mid)', marginBottom:12 }}>
                {item.company}
              </p>
              <p style={{ fontSize:14, fontWeight:300, color:'var(--mid)', maxWidth:'55ch', lineHeight:1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
