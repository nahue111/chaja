import Layout from './components/Layout'
import Hero from './components/Hero'
import About from './components/About'
import Testimonials from './components/Testimonials'

export default function App() {
  return (
    <Layout>
      <main>
        <Hero />
        <About />
        <Testimonials />
      </main>
    </Layout>
  )
}
