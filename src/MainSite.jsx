import Header from './components/Header'
import Hero from './components/Hero'
import Especialidades from './components/Especialidades'
import Entregas from './components/Entregas'
import Portfolio from './components/Portfolio'
import ValueProposition from './components/ValueProposition'
import Clients from './components/Clients'
import Testimonials from './components/Testimonials'
import About from './components/About'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function MainSite() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Especialidades />
        <Entregas />
        <Portfolio />
        <ValueProposition />
        <Clients />
        <Testimonials />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
