import { EXPERIENCE, EDUCATION } from '@/data/experience'

function Timeline({ list }) {
  return (
    <ol className="tl">
      {list.map((e) => (
        <li className="rv" key={e.title}>
          <div className="when">{e.when}</div>
          <h3>{e.title}</h3>
          <div className="org">{e.org}</div>
          {e.bullets ? <ul className="dots">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul> : <p>{e.text}</p>}
        </li>
      ))}
    </ol>
  )
}

export default function Experience() {
  return (
    <section className="s" id="experience">
      <div className="wrap grid">
        <h2>Experience</h2>
        <div>
          <Timeline list={EXPERIENCE} />
          <h3 className="sub-h">Education</h3>
          <Timeline list={EDUCATION} />
        </div>
      </div>
    </section>
  )
}
