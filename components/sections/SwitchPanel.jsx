'use client'
import { useState, useRef, useEffect } from 'react'
import { SWITCHES } from '@/data/projects'

/* ── Individual toggle switch ── */
function ToggleSwitch({ label, on, onFlip }) {
  return (
    <div
      className={`tsw${on ? ' on' : ''}`}
      onClick={onFlip}
      role="switch"
      aria-checked={on}
      aria-label={`Toggle ${label} projects`}
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onFlip()}
    >
      <div className="tsw-body">
        <div className="tsw-lamp" />
        <div className="tsw-slot" />
        <div className="tsw-lev" />
        <div className="tsw-piv" />
      </div>
      <span className="tsw-lbl">{label}</span>

      <style>{`
        .tsw { display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer; user-select:none; -webkit-tap-highlight-color:transparent; outline:none; }
        .tsw-body { width:44px; height:76px; background:linear-gradient(180deg,#1C1C1C,#0A0A0A); border-radius:4px; border:1px solid #333; box-shadow:var(--bevel-out),0 6px 20px rgba(0,0,0,.9); position:relative; display:flex; justify-content:center; overflow:hidden; transition:box-shadow .2s; }
        .tsw-body::before { content:''; position:absolute; inset:3px; border-radius:3px; border:1px solid rgba(255,255,255,.06); pointer-events:none; }
        .tsw-slot { position:absolute; left:50%; transform:translateX(-50%); top:10px; bottom:10px; width:4px; background:#000; border-radius:2px; box-shadow:inset 0 1px 4px #000; }
        .tsw-lev { width:20px; height:34px; background:linear-gradient(90deg,#CCC,#FFF 35%,#E0E0E0 65%,#999); border-radius:4px 4px 3px 3px; box-shadow:inset 0 1px 0 rgba(255,255,255,.9),inset 0 -2px 4px rgba(0,0,0,.5),0 2px 8px rgba(0,0,0,.95),0 0 0 1px rgba(0,0,0,.7); position:absolute; top:8px; z-index:2; transition:top .18s cubic-bezier(.34,1.4,.64,1); }
        .tsw-lev::before { content:''; position:absolute; top:-6px; left:50%; transform:translateX(-50%); width:24px; height:12px; background:linear-gradient(180deg,#FFF,#DDD); border-radius:6px 6px 3px 3px; box-shadow:0 -1px 0 rgba(255,255,255,.9),0 2px 5px rgba(0,0,0,.7); }
        .tsw-lev::after { content:''; position:absolute; top:-5px; left:50%; transform:translateX(-50%); width:20px; height:10px; background:repeating-linear-gradient(90deg,transparent,transparent 2px,rgba(0,0,0,.12) 2px,rgba(0,0,0,.12) 3px); border-radius:4px 4px 2px 2px; }
        .tsw-piv { position:absolute; bottom:8px; left:50%; transform:translateX(-50%); width:20px; height:8px; background:linear-gradient(180deg,#444,#1A1A1A); border-radius:2px; box-shadow:inset 0 1px 0 rgba(255,255,255,.1); }
        .tsw-lamp { position:absolute; top:7px; left:50%; transform:translateX(-50%); width:6px; height:6px; border-radius:50%; background:#1A1A1A; box-shadow:inset 0 1px 2px rgba(0,0,0,.8); z-index:3; transition:background .2s,box-shadow .2s; }
        .tsw-lbl { font-family:var(--font-mono),monospace; font-size:8px; letter-spacing:.18em; text-transform:uppercase; color:var(--border); text-align:center; max-width:56px; line-height:1.3; transition:color .2s; }
        .tsw.on .tsw-lev { top:calc(100% - 52px); }
        .tsw.on .tsw-lamp { background:#FFF; box-shadow:0 0 8px rgba(255,255,255,.9),0 0 16px rgba(255,255,255,.4); }
        .tsw.on .tsw-lbl { color:var(--light); }
        .tsw.on .tsw-body { box-shadow:var(--bevel-out),0 6px 20px rgba(0,0,0,.9),0 0 20px rgba(255,255,255,.06); }
        .tsw:focus-visible .tsw-body { outline:1px solid var(--mid); outline-offset:3px; }
      `}</style>
    </div>
  )
}

/* ── Rotary knob ── */
function RotaryKnob({ label, initialRot = 0, onChange }) {
  const bodyRef = useRef(null)
  const rot = useRef(initialRot)

  useEffect(() => {
    const body = bodyRef.current
    if (!body) return
    let startY = 0, dragging = false

    const onDown = e => {
      dragging = true; startY = e.clientY
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp, { once: true })
      e.preventDefault()
    }
    const onMove = e => {
      if (!dragging) return
      rot.current = Math.max(-145, Math.min(145, rot.current + (startY - e.clientY) * 0.9))
      body.style.transform = `rotate(${rot.current}deg)`
      startY = e.clientY
      onChange?.(rot.current)
    }
    const onUp = () => { dragging = false; document.removeEventListener('mousemove', onMove) }

    body.addEventListener('mousedown', onDown)
    return () => body.removeEventListener('mousedown', onDown)
  }, [onChange])

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, cursor:'grab' }}>
      <div ref={bodyRef} className="rk-body" style={{ transform:`rotate(${initialRot}deg)` }} />
      <span style={{ fontFamily:'var(--font-mono),monospace', fontSize:8, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--border)' }}>
        {label}
      </span>
      <style>{`
        .rk-body { width:52px; height:52px; border-radius:50%; background:radial-gradient(circle at 38% 32%,#4A4A4A,#1A1A1A 55%,#000); border:2px solid #1A1A1A; box-shadow:0 0 0 3px #000,0 0 0 4px #333,0 0 0 5px #000,0 6px 20px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.15); position:relative; transition:transform .35s cubic-bezier(.34,1.2,.64,1); }
        .rk-body::after { content:''; position:absolute; top:5px; left:50%; transform:translateX(-50%); width:2px; height:12px; background:linear-gradient(180deg,#FFF,rgba(255,255,255,.3)); border-radius:1px; }
        .rk-body:hover { cursor:grab; }
      `}</style>
    </div>
  )
}

/* ── Push button ── */
function PushButton({ label, onClick }) {
  return (
    <div
      className="pb"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
    >
      <div className="pb-body" />
      <span style={{ fontFamily:'var(--font-mono),monospace', fontSize:8, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--border)' }}>
        {label}
      </span>
      <style>{`
        .pb { display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer; user-select:none; outline:none; }
        .pb-body { width:50px; height:34px; background:linear-gradient(180deg,#222,#111); border-radius:3px; border:1px solid #333; box-shadow:var(--bevel-out),0 5px 14px rgba(0,0,0,.8); position:relative; top:0; transition:top .08s,box-shadow .08s; }
        .pb-body::before { content:''; position:absolute; inset:4px; background:linear-gradient(180deg,#2A2A2A,#181818); border-radius:2px; border:1px solid #111; }
        .pb:hover .pb-body { top:2px; box-shadow:var(--bevel-in),0 2px 8px rgba(0,0,0,.8); }
        .pb:active .pb-body { top:4px; box-shadow:var(--bevel-in); }
        .pb:focus-visible .pb-body { outline:1px solid var(--mid); outline-offset:3px; }
      `}</style>
    </div>
  )
}

/* ── Main switch panel ── */
export default function SwitchPanel() {
  const [states, setStates] = useState(
    Object.fromEntries(SWITCHES.map(s => [s.cat, s.on]))
  )

  const flip = cat => {
    setStates(prev => {
      const next = { ...prev, [cat]: !prev[cat] }
      // dispatch custom event so Work section can react
      window.dispatchEvent(new CustomEvent('switchchange', { detail: next }))
      return next
    })
  }

  const activeCount = Object.values(states).filter(Boolean).length

  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const handleDotSize = rot => {
    const sz = 0.8 + ((rot + 145) / 290) * 2.2
    window.__setDotSize?.(sz)
  }

  return (
    <div style={{
      background:'var(--surface)',
      borderTop:'1px solid var(--border)',
      borderBottom:'1px solid var(--border)',
      padding:'clamp(28px,3vw,44px) 0',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(20px,4vw,64px)' }}>
        {/* header label */}
        <p style={{
          fontFamily:'var(--font-mono),monospace', fontSize:9,
          letterSpacing:'.3em', textTransform:'uppercase', color:'var(--border)',
          marginBottom:'clamp(16px,2vw,28px)', paddingBottom:12,
          borderBottom:'1px solid var(--border)',
          display:'flex', alignItems:'center', gap:8,
        }}>
          <span style={{ color:'var(--mid)' }}>◈</span>
          Dashboard Controls — Toggle categories to explore work
        </p>

        {/* switch row */}
        <div style={{ display:'flex', alignItems:'center', gap:'clamp(12px,2vw,24px)', flexWrap:'wrap' }}>
          {SWITCHES.map(sw => (
            <ToggleSwitch
              key={sw.cat}
              label={sw.label}
              on={states[sw.cat]}
              onFlip={() => flip(sw.cat)}
            />
          ))}

          {/* stem divider */}
          <div style={{ width:1, height:76, background:'linear-gradient(180deg,transparent,var(--border) 30%,var(--border) 70%,transparent)', margin:'0 clamp(4px,1vw,12px)', flexShrink:0 }} />

          <RotaryKnob label="Grain"    initialRot={0}  />
          <RotaryKnob label="Dot Size" initialRot={60} onChange={handleDotSize} />

          {/* stem divider */}
          <div style={{ width:1, height:76, background:'linear-gradient(180deg,transparent,var(--border) 30%,var(--border) 70%,transparent)', margin:'0 clamp(4px,1vw,12px)', flexShrink:0 }} />

          <PushButton label="About"   onClick={() => scrollTo('#about')}      />
          <PushButton label="Exp."    onClick={() => scrollTo('#experience')} />
          <PushButton label="Contact" onClick={() => scrollTo('#contact')}    />

          {/* live count */}
          <div style={{
            fontFamily:'var(--font-mono),monospace', fontSize:9,
            letterSpacing:'.16em', textTransform:'uppercase', color:'var(--mid)',
            marginLeft:'auto', padding:'5px 12px',
            border:'1px solid var(--border)', background:'var(--bg)',
            whiteSpace:'nowrap',
          }}>
            <span style={{ color:'var(--white)' }}>{activeCount}</span> / {SWITCHES.length} active
          </div>
        </div>
      </div>
    </div>
  )
}
