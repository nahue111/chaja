import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import LoginModal from './LoginModal'
import CheckoutView from './CheckoutView'
import { useAuth } from '../context/AuthContext'

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Layout({ children }) {
  const { toast } = useAuth()

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <CartDrawer />
      <LoginModal />
      <CheckoutView />
      <div className={`fixed inset-0 z-[80] flex items-center justify-center transition-all duration-700 pointer-events-none ${toast ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-espresso-900/60 backdrop-blur-sm" />
        <div className={`relative flex flex-col items-center text-center transition-all duration-700 ${toast ? 'scale-100 translate-y-0' : 'scale-90 translate-y-6'}`}>
          {/* Glow */}
          <div className="absolute inset-0 rounded-[2rem] blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #D4A843 0%, transparent 70%)' }} />

          <div className="relative rounded-[2rem] overflow-hidden px-14 py-12" style={{ background: 'linear-gradient(160deg, #1a0e06 0%, #2C1A0E 50%, #1a0e06 100%)', border: '1px solid rgba(212,168,67,0.2)', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(212,168,67,0.15)' }}>
            {/* Top shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.6), transparent)' }} />

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-xl opacity-50" style={{ background: '#D4A843' }} />
                <img src="/logo.png" alt="" className="relative w-20 h-20 rounded-full shadow-2xl" />
              </div>
            </div>

            {/* Check badge */}
            <div className="flex justify-center mb-5">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.25)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#D4A843' }}>Acceso verificado</span>
              </div>
            </div>

            <p className="font-display text-3xl font-semibold text-cream-50 mb-2">¡Bienvenido!</p>
            <p className="text-cream-300/60 text-sm leading-relaxed">Sesión iniciada correctamente.<br />Ya podés hacer tu pedido.</p>

            {/* Bottom line */}
            <div className="mt-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.3), transparent)' }} />
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/59898590509"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-0 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#20b958] transition-all duration-300 hover:shadow-xl group hover:gap-3 hover:pl-4 hover:pr-5 overflow-hidden"
        aria-label="Contactar a Juan Manuel por WhatsApp"
      >
        <WhatsAppIcon />
        <div className="leading-tight max-w-0 group-hover:max-w-[120px] overflow-hidden transition-all duration-300">
          <p className="text-[10px] font-medium opacity-80 tracking-wide uppercase whitespace-nowrap">Información</p>
          <p className="text-sm font-semibold whitespace-nowrap">Chajá Bistro</p>
        </div>
      </a>
    </>
  )
}
