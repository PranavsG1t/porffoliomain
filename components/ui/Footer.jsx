export default function Footer() {
  return (
    <footer style={{
      background:'var(--bg)', borderTop:'1px solid var(--border)',
      padding:'clamp(24px,3vw,40px) 0',
    }}>
      <div style={{
        maxWidth:1280, margin:'0 auto',
        padding:'0 clamp(20px,4vw,64px)',
        display:'grid', gridTemplateColumns:'1fr auto 1fr',
        alignItems:'center', gap:16,
      }}>
        <p style={{
          fontFamily:'var(--font-display),serif',
          fontStyle:'italic',
          fontSize:'clamp(1rem,2vw,1.4rem)',
          color:'var(--mid)',
        }}>...Chasing Curiosity</p>

        <div style={{ display:'flex', gap:6, justifyContent:'center' }}>
          {[true,true,false].map((on,i) => (
            <div key={i} style={{
              width:5, height:5, borderRadius:'50%',
              background: on ? 'var(--white)' : 'var(--border)',
              animation: on ? 'spulse-on 2.5s ease-in-out infinite' : 'none',
              animationDelay: `${i * 0.4}s`,
            }} />
          ))}
        </div>

        <p style={{
          fontFamily:'var(--font-mono),monospace',
          fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase',
          color:'var(--border)', textAlign:'right',
        }}>© 2025 Pranav Ghadigaonkar</p>
      </div>

      <style>{`
        @keyframes spulse-on {
          0%,100% { opacity:0.6; box-shadow:none; }
          50%     { opacity:1;   box-shadow:0 0 6px rgba(255,255,255,0.6); }
        }
        @media(max-width:900px) {
          footer > div { grid-template-columns:1fr !important; text-align:center; }
          footer p:last-child { text-align:center !important; }
        }
      `}</style>
    </footer>
  )
}
