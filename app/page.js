import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import Creative from '@/components/sections/Creative'
import Marquee from '@/components/sections/Marquee'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Creative />
      <Marquee />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}
