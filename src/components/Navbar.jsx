import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Nuestro Chajá', href: '#chaja' },
  { label: 'Productos', href: '#variedades' },
  { label: 'Pedidos', href: '#pedidos' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream-50/95 backdrop-blur-md shadow-[0_1px_0_rgba(44,26,14,0.08)]' : 'bg-transparent'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      style={{ transition: 'opacity 0.8s ease, transform 0.8s ease, background-color 0.5s ease, box-shadow 0.5s ease' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <a href="#" className={`font-display text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${scrolled ? 'text-espresso-800' : 'text-cream-50'}`}>
          Chajá<span className="font-normal italic"> Bistro</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group ${scrolled ? 'text-espresso-600 hover:text-espresso-900' : 'text-cream-200 hover:text-white'}`}>
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a href="#pedidos" className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-[0.98] ${scrolled ? 'bg-espresso-800 text-cream-50 hover:bg-espresso-700' : 'bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-white/25'}`}>
          Hacer pedido
        </a>

        <button className={`md:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-espresso-800' : 'text-white'}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className={`block w-5 h-px bg-current mb-1.5 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className="block w-5 h-px bg-current" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cream-50 border-t border-cream-200 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-espresso-700 font-medium text-lg" onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a href="#pedidos" className="mt-2 inline-flex justify-center px-5 py-3 rounded-full bg-espresso-800 text-cream-50 font-medium text-sm" onClick={() => setMenuOpen(false)}>Hacer pedido</a>
        </div>
      )}
    </nav>
  )
}
