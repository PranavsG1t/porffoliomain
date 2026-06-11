'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const asciiRef = useRef(null)

  useEffect(() => {
    const el = asciiRef.current
    if (!el) return

    const RAMP = " .`':;-~=+*?!*#&21%@"
    let COLS, ROWS, CW, CH, aspect
    let t = 0
    let animId
    const mouse = { x: -1, y: -1 }
    let cursorOpacity = 0.12      // current opacity — starts dim
    let cursorActive  = false     // true while cursor is inside + moving
    let lastMoveTime  = 0         // timestamp of last mousemove
    const OPACITY_REST   = 0.12   // dim when idle
    const OPACITY_ACTIVE = 0.55   // bright when cursor moving
    const OPACITY_EASE   = 3.5    // how fast it transitions (higher = snappier)
    // ── Noise ──
    const hash = n => Math.abs((Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1)
    const fract = x => x - Math.floor(x)
    function noise2(x, y) {
      const ix = Math.floor(x), iy = Math.floor(y)
      const fx = fract(x), fy = fract(y)
      const ux = fx*fx*(3-2*fx), uy = fy*fy*(3-2*fy)
      const a = hash(ix   + iy    *57), b = hash(ix+1 + iy    *57)
      const c = hash(ix   + (iy+1)*57), d = hash(ix+1 + (iy+1)*57)
      return (a + (b-a)*ux + (c-a)*uy + (a-b-c+d)*ux*uy) * 2 - 1
    }
    const smoothstep = x => { x=Math.max(0,Math.min(1,x)); return x*x*(3-2*x) }

    // ── Chaos ──
    const CHAOS = [
      { bx:0.22, by:0.65, freq:9.5,  speed:0.72, phase:0,           driftR:0.13, driftSpeed:0.17, driftAngle:0 },
      { bx:0.78, by:0.30, freq:11.2, speed:0.88, phase:Math.PI*0.7, driftR:0.10, driftSpeed:0.23, driftAngle:Math.PI*0.8 },
      { bx:0.58, by:0.74, freq:7.8,  speed:0.55, phase:Math.PI*1.4, driftR:0.14, driftSpeed:0.13, driftAngle:Math.PI*1.6 },
    ]
    function chaosField(nx, ny, time) {
      const ax = nx * aspect
      let total = 0
      for (const s of CHAOS) {
        const sa = s.driftAngle + time * s.driftSpeed
        const px = (s.bx + Math.cos(sa)*s.driftR) * aspect
        const py =  s.by + Math.sin(sa)*s.driftR
        const dist = Math.sqrt((ax-px)**2 + (ny-py)**2)
        const amp  = 1.0 / (1.0 + dist * 4.2)
        total += amp * Math.sin(s.freq * Math.PI*2 * dist - s.speed * time + s.phase)
      }
      return total / 2.2
    }

    // ── Ripple ──
    const EXPAND_SPEED = 0.22
    const RING_THICK   = 0.018
    const MAX_RADIUS   = 0.52
    const RIPPLE_LIFE  = MAX_RADIUS / EXPAND_SPEED

    const ripples = []

    function spawnRipple(x, y) {
      for (const r of ripples) {
        const dx = r.x - x, dy = r.y - y
        if (Math.sqrt(dx*dx+dy*dy) < 0.015 && (t - r.born) < 0.18) return
      }
      if (ripples.length >= 8) ripples.shift()
      ripples.push({ x, y, born: t })
    }

    function rippleField(rip, nx, ny, time) {
      const age = time - rip.born
      if (age < 0) return 0
      const ringR = EXPAND_SPEED * age
      if (ringR > MAX_RADIUS) return 0
      const ax    = (nx - rip.x) * aspect
      const ay    = (ny - rip.y)
      const pixR  = Math.sqrt(ax*ax + ay*ay)
      const delta = Math.abs(pixR - ringR)
      if (delta > RING_THICK * 2.5) return 0
      const band       = Math.exp(-(delta*delta) / (RING_THICK*RING_THICK))
      const lifeFrac   = ringR / MAX_RADIUS
      const energyFade = Math.pow(1.0 - lifeFrac, 1.4)
      const inner      = smoothstep(ringR / 0.01)
      return band * energyFade * inner * 1.8
    }

    // ── Resize ──
    function resize() {
      const W = window.innerWidth, H = window.innerHeight
      const tmp = document.createElement('span')
      tmp.style.cssText = 'font-family:Space Mono,monospace;font-size:11px;line-height:1.18;letter-spacing:0.06em;position:absolute;visibility:hidden;white-space:pre'
      tmp.textContent = 'X'
      document.body.appendChild(tmp)
      CW = tmp.offsetWidth  || 7.2
      CH = tmp.offsetHeight || 13
      document.body.removeChild(tmp)
      COLS   = Math.ceil(W / CW) + 1
      ROWS   = Math.ceil(H / CH) + 1
      aspect = (COLS * CW) / (ROWS * CH)
      el.style.width  = W + 'px'
      el.style.height = H + 'px'
    }

    // ── Render ──
    let lastTime = 0
    function render(ts) {
      const dt = Math.min((ts - lastTime) / 1000, 0.05)
      lastTime = ts
      t += dt * 0.48

      for (let i = ripples.length - 1; i >= 0; i--) {
        if ((t - ripples[i].born) > RIPPLE_LIFE + 0.1) ripples.splice(i, 1)
      }

      const RL = RAMP.length - 1
      const lines = []
      for (let row = 0; row < ROWS; row++) {
        const ny = row / ROWS
        let line = ''
        for (let col = 0; col < COLS; col++) {
          const nx = col / COLS
          let w = chaosField(nx, ny, t)
          for (const rip of ripples) w += rippleField(rip, nx, ny, t)
          w += noise2(nx*9 + t*0.06, ny*9 + t*0.05) * 0.03
          const d = Math.pow(Math.min(1, Math.abs(w)), 0.62)
          line += RAMP[Math.round(d * RL)]
        }
        lines.push(line)
      }
       el.textContent = lines.join('\n')

        // Ease opacity toward target — dim at rest, bright on cursor activity
      const opacityTarget = cursorActive ? OPACITY_ACTIVE : OPACITY_REST
      cursorOpacity += (opacityTarget - cursorOpacity) * Math.min(1, dt * OPACITY_EASE)
      el.style.opacity = cursorOpacity

  // Auto-deactivate if cursor hasn't moved in 1.8s
  if (cursorActive && (t - lastMoveTime) > 1.8) cursorActive = false
      animId = requestAnimationFrame(render)
    }

    // ── Events ──
    const onMove = e => {
      const nx = e.clientX / window.innerWidth
      const ny = e.clientY / window.innerHeight
      const dx = nx - mouse.x, dy = ny - mouse.y
      mouse.x = nx; mouse.y = ny
      cursorActive = true
      lastMoveTime = t
      if (Math.sqrt(dx*dx+dy*dy) > 0.009) spawnRipple(nx, ny)
    }
    const onClick = e => spawnRipple(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
    const onEnter = e => {
      mouse.x = e.clientX / window.innerWidth
      mouse.y = e.clientY / window.innerHeight
      spawnRipple(mouse.x, mouse.y)
    }
    const onLeave = () => { cursorActive = false }


    window.addEventListener('resize',     resize)
    window.addEventListener('mousemove',  onMove)
    window.addEventListener('click',      onClick)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mouseleave', () => { cursorActive = false })

    resize()
    animId = requestAnimationFrame(ts => { lastTime = ts; render(ts) })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize',     resize)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('click',      onClick)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseleave', () => { cursorActive = false })  
    }
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateRows: '1fr auto',
      paddingTop: 52,
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>

      {/* ASCII canvas — back layer */}
      <div ref={asciiRef} style={{
        position: 'absolute', inset: 0,
        fontFamily: "'Space Mono', monospace",
        fontSize: '11px',
        lineHeight: '1.18',
        letterSpacing: '0.06em',
        whiteSpace: 'pre',
        color: '#fff',
        pointerEvents: 'none',
        overflow: 'hidden',
      }} />

      {/* Vignette — asymmetric, heavier right to anchor left-aligned text */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'radial-gradient(ellipse 90% 90% at 72% 50%, transparent 25%, rgba(0,0,0,0.80) 100%)',
          'linear-gradient(to right, rgba(0,0,0,0.52) 0%, transparent 38%, transparent 58%, rgba(0,0,0,0.72) 100%)',
        ].join(', '),
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'clamp(24px,4vw,64px)',
        alignItems: 'end',
        padding: 'clamp(60px,8vw,120px) clamp(20px,4vw,64px) clamp(40px,5vw,80px)',
        maxWidth: 1280,
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Left — headline */}
        <div>
          <p className="eyebrow" style={{
            marginBottom: 'clamp(16px,2vw,28px)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'block', width: 32, height: 1, background: 'var(--border)' }} />
            Pranav Ghadigaonkar — Est. 2022
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display),serif',
            fontWeight: 400,
            fontSize: 'clamp(3.2rem,9vw,9rem)',
            lineHeight: 0.93,
            letterSpacing: '-.02em',
            marginBottom: 'clamp(16px,2vw,28px)',
            textShadow: '0 0 80px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.9)',
          }}>
            Life is a<br />paradox,<br />
            <em style={{ fontStyle: 'italic', color: 'var(--bright)' }}>so is Art.</em>
          </h1>

          <p style={{
            fontFamily: 'var(--font-body),sans-serif',
            fontSize: 15, fontWeight: 300,
            color: 'var(--)', lineHeight: 1.6,
            maxWidth: '40ch',
            marginBottom: 'clamp(28px,4vw,48px)',
          }}>
            AI/ML Engineer · Graphic Designer · Photographer.<br />
            Building systems that think, and experiences that feel.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#work" className="btn-primary">View Work</a>
            <a href="#contact" className="btn-ghost">Get in Touch</a>
          </div>
        </div>
      </div>

      {/* Scroll strip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: 'clamp(16px,2vw,28px) clamp(20px,4vw,64px)',
        maxWidth: 1280, margin: '0 auto',
        position: 'relative', zIndex: 1, width: '100%',
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{
          fontFamily: 'var(--font-mono),monospace',
          fontSize: 9, letterSpacing: '.28em',
          textTransform: 'uppercase', color: 'var(--border)',
          animation: 'scrollblink 3s ease-in-out infinite',
        }}>▾ scroll</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(270deg,var(--border),transparent)' }} />
      </div>

      <style>{`
        .btn-primary {
          font-family: var(--font-mono),monospace; font-size:11px; letter-spacing:.16em;
          text-transform:uppercase; text-decoration:none;
          color:var(--bg); background:var(--white);
          padding:13px 28px; border-radius:2px; border:1px solid var(--white);
          cursor:pointer; transition:box-shadow .2s; display:inline-flex;
        }
        .btn-primary:hover { box-shadow:0 0 24px rgba(255,255,255,.15); }
        .btn-ghost {
          font-family: var(--font-mono),monospace; font-size:11px; letter-spacing:.16em;
          text-transform:uppercase; text-decoration:none;
          color:var(--mid); background:transparent;
          padding:13px 28px; border-radius:2px; border:1px solid var(--border);
          cursor:pointer; transition:color .15s,border-color .15s; display:inline-flex;
        }
        .btn-ghost:hover { color:var(--white); border-color:var(--mid); }
        .hero-stats {
          display:grid; grid-template-columns:1fr 1fr;
          gap:1px; background:var(--border); border:1px solid var(--border); align-self:end;
        }
        .stat-cell {
          background:var(--bg); padding:clamp(16px,2vw,28px); position:relative;
        }
        .stat-cell[data-lbl]::after {
          content:attr(data-lbl);
          font-family:var(--font-mono),monospace; font-size:8px;
          letter-spacing:.22em; text-transform:uppercase; color:var(--border);
          position:absolute; top:10px; right:12px;
        }
        .stat-cell.wide { grid-column:1/-1; }
        .stat-val {
          font-family:var(--font-display),serif;
          font-size:clamp(2rem,4vw,3.5rem); color:var(--white); line-height:1; margin-bottom:6px;
        }
        .stat-unit {
          font-family:var(--font-mono),monospace; font-size:9px;
          letter-spacing:.14em; text-transform:uppercase; color:var(--mid);
        }
        @media(max-width:900px) { .hero-stats { display:none !important; } }
      `}</style>
    </section>
  )
}
