import { PHOTOS } from '@/data/projects'

export default function Photography() {
  return (
    <section id="photography" style={{
      background:'var(--bg)', padding:'clamp(60px,8vw,120px) 0',
      borderTop:'1px solid var(--border)',
    }}>
      {/* header */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(20px,4vw,64px)' }}>
        <div className="reveal" style={{
          marginBottom:'clamp(28px,4vw,56px)',
          paddingBottom:'clamp(20px,2.5vw,32px)',
          borderBottom:'1px solid var(--border)',
        }}>
          <p className="eyebrow">◈ Visual Archive</p>
          <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:400, fontSize:'clamp(2.2rem,5vw,4.5rem)', lineHeight:.97, marginTop:8 }}>
            Photography &amp; Artwork
          </h2>
          <p style={{ marginTop:12, fontStyle:'italic', fontSize:15, fontWeight:300, color:'var(--mid)', lineHeight:1.65 }}>
            The art of perspective and observation. Mumbai, mountains, and in-between.
          </p>
        </div>
      </div>

      {/* masonry grid — full bleed */}
      <div style={{
        columns:'3 300px', columnGap:1,
        background:'var(--border)',
        maxWidth:1280, margin:'0 auto',
        padding:'0 clamp(20px,4vw,64px)',
      }}>
        {PHOTOS.map((photo, i) => (
          <div
            key={photo.id}
            className="ph-item reveal"
            style={{
              breakInside:'avoid',
              marginBottom:1,
              marginTop: photo.mt || 0,
              position:'relative',
              overflow:'hidden',
              cursor:'pointer',
              background:'var(--panel)',
            }}
          >
            {/* placeholder — replace with <Image> when you have real photos */}
            <div style={{
              width:'100%',
              aspectRatio: photo.ratio,
              background: photo.bg,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <span style={{
                fontFamily:'var(--font-mono),monospace', fontSize:9,
                letterSpacing:'.18em', textTransform:'uppercase',
                color:'rgba(255,255,255,.15)',
              }}>{photo.label}</span>
            </div>

            {/* halftone hover overlay */}
            <div className="ph-overlay" />

            {/* caption */}
            <div className="ph-cap">
              <p style={{
                fontFamily:'var(--font-mono),monospace', fontSize:9,
                letterSpacing:'.18em', textTransform:'uppercase',
                color:'rgba(255,255,255,.6)',
              }}>{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .ph-item::before { content:''; position:absolute; inset:0; z-index:1; background-image:radial-gradient(circle,rgba(255,255,255,.08) 1px,transparent 1px); background-size:5px 5px; pointer-events:none; opacity:0; transition:opacity .3s; }
        .ph-item:hover::before { opacity:1; }
        .ph-cap { position:absolute; bottom:0; left:0; right:0; z-index:2; background:linear-gradient(0deg,rgba(0,0,0,.9),transparent); padding:clamp(16px,2vw,24px) clamp(12px,1.5vw,16px) clamp(10px,1vw,14px); transform:translateY(100%); transition:transform .22s ease; }
        .ph-item:hover .ph-cap { transform:translateY(0); }
        @media(max-width:560px) { #photography div[style*='columns'] { columns:1 !important; } }
      `}</style>
    </section>
  )
}
