import { useEffect, useState } from 'react'
import { ShoppingBag, User, Medal } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Productos', href: '/', isRoute: true },
  { label: 'Nosotros', href: '/nosotros', isRoute: true },
  { label: 'Contacto', href: '/contacto', isRoute: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const { totalItems, setOpen: setCartOpen } = useCart()
  const { user, setLoginOpen, logout, medals, medalProgress } = useAuth()
  const { pathname } = useLocation()
  const isNosotros = pathname === '/nosotros'

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll) }
  }, [])

  const solid = !isNosotros || scrolled

  const iconCls = `transition-colors duration-300 ${solid ? 'text-espresso-600 hover:text-espresso-900' : 'text-cream-200 hover:text-white'}`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? 'bg-cream-50/95 backdrop-blur-md shadow-[0_1px_0_rgba(44,26,14,0.08)]' : 'bg-transparent'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      style={{ transition: 'opacity 0.8s ease, transform 0.8s ease, background-color 0.5s ease, box-shadow 0.5s ease' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Chajá Bistro" className="h-20 w-auto shrink-0 select-none" />
          <span className={`font-display text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${solid ? 'text-espresso-800' : 'text-cream-50'}`}>
            Chajá
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.isRoute ? (
                <Link to={link.href} className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group ${solid ? 'text-espresso-600 hover:text-espresso-900' : 'text-cream-200 hover:text-white'}`}>
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a href={link.href} className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group ${solid ? 'text-espresso-600 hover:text-espresso-900' : 'text-cream-200 hover:text-white'}`}>
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber transition-all duration-300 group-hover:w-full" />
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className={`relative p-2.5 rounded-full ${iconCls}`}
            aria-label="Carrito"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber text-espresso-900 text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </button>

          {/* Login / User (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                {/* Medals badge */}
                <div
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full"
                  style={{ background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.2)' }}
                  title={`${medals} medalla${medals !== 1 ? 's' : ''} · ${medalProgress}/60 pesos para la próxima`}
                >
                  <Medal size={12} strokeWidth={2} style={{ color: '#C8860A' }} />
                  <span className="font-mono text-xs font-bold" style={{ color: '#C8860A' }}>{medals}</span>
                </div>
                <button
                  onClick={logout}
                  className={`text-xs font-medium px-3 py-2 rounded-full transition-colors duration-300 ${solid ? 'text-espresso-500 hover:text-espresso-800' : 'text-cream-300 hover:text-white'}`}
                >
                  {user.name} · Salir
                </button>
              </>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className={`p-2.5 rounded-full ${iconCls}`}
                aria-label="Iniciar sesión"
              >
                <User size={18} strokeWidth={1.5} />
              </button>
            )}
          </div>

          {user ? (
            <Link
              to="/"
              className={`hidden md:inline-flex items-center gap-2 ml-1 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-[0.98] ${solid ? 'bg-espresso-800 text-cream-50 hover:bg-espresso-700' : 'bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-white/25'}`}
            >
              Hacer pedido
            </Link>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className={`hidden md:inline-flex items-center gap-2 ml-1 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-[0.98] ${solid ? 'bg-espresso-800 text-cream-50 hover:bg-espresso-700' : 'bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-white/25'}`}
            >
              Iniciar sesión
            </button>
          )}

          <button
            className={`md:hidden p-2 transition-colors duration-300 ${solid ? 'text-espresso-800' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className={`block w-5 h-px bg-current mb-1.5 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cream-50 border-t border-cream-200 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            link.isRoute
              ? <Link key={link.label} to={link.href} className="text-espresso-700 font-medium text-lg" onClick={() => setMenuOpen(false)}>{link.label}</Link>
              : <a key={link.label} href={link.href} className="text-espresso-700 font-medium text-lg" onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full" style={{ background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.2)' }}>
                  <Medal size={12} strokeWidth={2} style={{ color: '#C8860A' }} />
                  <span className="font-mono text-xs font-bold" style={{ color: '#C8860A' }}>{medals} medalla{medals !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <button onClick={() => { logout(); setMenuOpen(false) }} className="text-espresso-500 text-sm">
                {user.name} · Salir
              </button>
            </div>
          ) : (
            <button onClick={() => { setLoginOpen(true); setMenuOpen(false) }} className="text-espresso-700 font-medium text-lg text-left">
              Iniciar sesión
            </button>
          )}
          <Link to="/" className="mt-2 inline-flex justify-center px-5 py-3 rounded-full bg-espresso-800 text-cream-50 font-medium text-sm" onClick={() => setMenuOpen(false)}>
            Hacer pedido
          </Link>
        </div>
      )}
    </nav>
  )
}
