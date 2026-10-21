import Navbar from './components/Navbar'
import ScrollIndicator from './components/ScrollIndicator'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Services from './components/Services'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Awards from './components/Awards'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ScrollIndicator />
      <Hero />
      <Projects />
      <Services />
      <Skills />
      <Experience />
      <Awards />
      <Resume />
      <Contact />
      <Footer />
    </main>
  )
}
