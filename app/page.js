import Nav           from '@/components/ui/Nav'
import Hero          from '@/components/sections/Hero'
import SwitchPanel   from '@/components/sections/SwitchPanel'
import About         from '@/components/sections/About'
import Work          from '@/components/sections/Work'
import Photography   from '@/components/sections/Photography'
import Skills        from '@/components/sections/Skills'
import Experience    from '@/components/sections/Experience'
import Contact       from '@/components/sections/Contact'
import Footer        from '@/components/ui/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SwitchPanel />
        <About />
        <Work />
        <Photography />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
