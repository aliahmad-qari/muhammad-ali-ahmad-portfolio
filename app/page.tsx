import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Experience from './components/Experience'
import WhyHireMe from './components/WhyHireMe'
import Services from './components/Services'
import Projects from './components/Projects'
import Workflow from './components/Workflow'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Experience />
      <WhyHireMe />
      <Services />
      <Projects />
      <Workflow />
      <Contact />
      <Footer />
    </main>
  )
}
