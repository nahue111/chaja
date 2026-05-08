import Layout from './components/Layout'
import Hero from './components/Hero'
import About from './components/About'
import PostresDestacados from './components/PostresDestacados'
import Products from './components/Products'
import Testimonials from './components/Testimonials'
import Order from './components/Order'

export default function App() {
  return (
    <Layout>
      <main>
        <Hero />
        <About />
        <PostresDestacados />
        <Products />
        <Testimonials />
        <Order />
      </main>
    </Layout>
  )
}
