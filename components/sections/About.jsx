import { EMAIL } from '@/data/site'

export default function About() {
  return (
    <section className="s" id="about">
      <div className="wrap grid">
        <h2>About</h2>
        <div>
          <p className="big">Just a curious guy building systems that solve problems for the greater good.</p>
          <p>Machine Learning Engineer with experience building workflow prediction systems for B2B SaaS, and an explainable fraud detection system that scores transactions and writes plain-English alerts for analysts. Skilled in Python, machine learning, predictive analytics and AI-driven automation.</p>
          <p>Mechanical engineer by training, with an M.Tech in robotics. When I&apos;m not tuning LightGBM pipelines, I&apos;m in Figma, behind a lens, or soldering something to a microcontroller. I&apos;ve also published research on IoT edge devices in industrial control systems.</p>
          <dl>
            <dt>Previously</dt><dd>Machine Learning Engineer, Vynqe Circle LLP</dd>
            <dt>Education</dt><dd>M.Tech Robotics &amp; Automation, K.J. Somaiya School of Engineering</dd>
            <dt>Also</dt><dd>Designer, photographer</dd>
            <dt>Based in</dt><dd>Mumbai, India</dd>
            <dt>Email</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
          </dl>
        </div>
      </div>
    </section>
  )
}
