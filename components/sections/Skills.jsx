import { SKILLS } from '@/data/skills'

const ROT = ['-2deg', '1.5deg', '-1deg', '2deg']

export default function Skills() {
  return (
    <section className="s" id="skills">
      <div className="wrap grid">
        <h2>Skills</h2>
        <div className="skg">
          {SKILLS.map((g, i) => (
            <div className="sk rv" key={g.name}>
              <b>{g.name}</b>
              <div className="chips">
                {g.items.map((c, j) => <span key={c} className={`chip ${g.cls}`} style={{ '--r': ROT[(i + j) % 4] }}>{c}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
