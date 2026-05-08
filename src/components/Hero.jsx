import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const wrapperRef = useRef(null)
  const [phase, setPhase] = useState(0) // 0=initial, 1=mid, 2=final
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect()
      const total = wrapper.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / total)

      if (progress < 0.3) setPhase(0)
      else if (progress < 0.7) setPhase(1)
      else setPhase(2)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const fadeClass = (show) =>
    `transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`

  return (
    <div ref={wrapperRef} className="relative h-[130vh] md:h-[200vh]">
      <div className="sticky top-0 w-full overflow-hidden bg-espresso-900" style={{ height: '100dvh' }}>

        {/* Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted playsInline preload="auto"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradients */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, rgba(26,14,6,0.78) 0%, rgba(26,14,6,0.40) 60%, rgba(26,14,6,0.15) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #FAF7F0 0%, transparent 100%)' }} />

        {/* Phase 1 — entry */}
        <div className={`absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-14 max-w-[1400px] mx-auto w-full ${fadeClass(entered && phase === 0)}`}>
          <div className="flex items-center gap-2 mb-5">
            <span className="block w-8 h-px bg-amber" />
            <span className="text-amber text-[11px] font-medium tracking-[0.22em] uppercase">Tradición uruguaya desde 1952</span>
          </div>
          <h1 className="font-display font-semibold text-cream-50 leading-none tracking-tightest">
            <span className="block text-6xl md:text-8xl lg:text-[6.5rem]">El postre</span>
            <span className="block text-6xl md:text-8xl lg:text-[6.5rem] italic font-medium text-amber-light">que enamora</span>
            <span className="block text-6xl md:text-8xl lg:text-[6.5rem]">Uruguay.</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href="#pedidos" className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-amber text-espresso-900 font-semibold text-sm tracking-wide hover:bg-amber-light transition-all duration-300 active:scale-[0.98]">Hacer mi pedido</a>
            <a href="#chaja" className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300 active:scale-[0.98]">Conocer más</a>
          </div>
        </div>

        {/* Phase 2 — mid */}
        <div className={`absolute inset-0 flex items-center px-6 md:px-14 max-w-[1400px] mx-auto w-full ${fadeClass(phase === 1)}`}>
          <div className="max-w-lg">
            <p className="font-display text-5xl md:text-6xl text-cream-50 leading-tight tracking-tightest">
              Capas de merengue,<br />
              <span className="italic text-amber-light">crema y durazno.</span>
            </p>
            <p className="text-cream-200/70 text-base mt-5 leading-relaxed max-w-[44ch]">
              Cada Chajá es elaborado a mano. Sin máquinas, sin atajos. La receta original de Orlando Castellano, intacta desde 1927.
            </p>
          </div>
        </div>

        {/* Phase 3 — final */}
        <div className={`absolute inset-0 flex flex-col items-end justify-end pb-24 md:pb-32 px-6 md:px-14 max-w-[1400px] mx-auto w-full ${fadeClass(phase === 2)}`}>
          <div className="text-right max-w-md">
            <p className="text-amber text-[11px] font-medium tracking-[0.22em] uppercase mb-4">Pedidos a todo Uruguay</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 leading-tight tracking-tightest mb-6">
              ¿Listo para<br /><span className="italic text-amber-light">pedirlo?</span>
            </h2>
            <a href="#pedidos" className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-amber text-espresso-900 font-semibold text-sm tracking-wide hover:bg-amber-light transition-all duration-300 active:scale-[0.98]">Ver nuestros Chajás</a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  )
}
