import CopyEmail from '@/components/ui/CopyEmail'
import { EMAIL, PHONE, LINKS, RESUME_URL } from '@/data/site'

export default function Contact() {
  return (
    <section className="s" id="contact">
      <div className="badge" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs><path id="ring" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" /></defs>
          <g className="spin"><text fontFamily="Space Mono,monospace" fontSize="15" letterSpacing="3.2" fill="#E9E1C9"><textPath href="#ring">AVAILABLE FOR WORK • LET&apos;S TALK • HELLO •</textPath></text></g>
          <g className="spin2">
            <circle cx="100" cy="100" r="62" fill="#1c120f" stroke="#E9E1C9" strokeWidth="2" />
            <circle cx="100" cy="100" r="52" fill="none" stroke="#3A2420" strokeWidth="2" />
            <circle cx="100" cy="100" r="42" fill="none" stroke="#3A2420" strokeWidth="2" />
            <circle cx="100" cy="100" r="22" fill="#F2B52B" />
            <path d="M100 100 L100 84" stroke="#2B1A17" strokeWidth="3" />
            <circle cx="100" cy="100" r="4" fill="#2B1A17" />
          </g>
        </svg>
      </div>
      <div className="wrap">
        <p style={{ marginBottom: 20 }}>Open to machine learning roles, and happy to talk freelance design and collaborations. Based in Mumbai.</p>
        <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <div className="links">
          <CopyEmail />
          <a href={PHONE.href}>{PHONE.label}</a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">Resume (PDF)</a>
        </div>
      </div>
    </section>
  )
}
