import { useEffect, useState } from 'react'
import { ShoppingBag, X } from 'lucide-react'

const STRAPI_URL = 'https://bangkok-sending-remedies-allowance.trycloudflare.com'

function SkeletonCard() {
  return (
    <div className="bg-white border border-cream-200/60 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-cream-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-cream-200 rounded w-3/4" />
        <div className="h-3 bg-cream-200 rounded w-full" />
        <div className="h-3 bg-cream-200 rounded w-2/3" />
        <div className="h-8 bg-cream-200 rounded-full w-1/3 mt-4" />
      </div>
    </div>
  )
}

function Modal({ postre, onClose }) {
  const imgUrl = postre.imagen?.url
    ? `${STRAPI_URL}${postre.imagen.url}`
    : 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Torta_chaj%C3%A1.jpg'

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-espresso-900/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-espresso-900/70 text-cream-50 hover:bg-espresso-800 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="md:w-2/5 shrink-0 overflow-hidden relative h-56 md:h-auto">
          <img
            src={imgUrl}
            alt={postre.nombre}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Torta_chaj%C3%A1.jpg' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/40 to-transparent md:bg-gradient-to-r" />
          {postre.tag && (
            <span className="absolute top-4 left-4 text-[10px] font-medium tracking-[0.16em] uppercase px-3 py-1.5 rounded-full bg-amber/90 text-espresso-900">
              {postre.tag}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-display text-2xl md:text-3xl text-espresso-800 leading-tight tracking-tight">
              {postre.nombre}
            </h3>
            <div className="text-right shrink-0">
              <p className="font-mono text-2xl font-semibold text-espresso-800">{postre.precio}</p>
              {postre.peso && <p className="text-espresso-400 text-sm">{postre.peso}</p>}
            </div>
          </div>

          <p className="text-espresso-500 text-base leading-relaxed mb-6 flex-1">{postre.descripcion}</p>

          <a
            href="#pedidos"
            onClick={onClose}
            className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full bg-espresso-800 text-cream-50 text-sm font-medium hover:bg-espresso-700 transition-all duration-300 active:scale-[0.98]"
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
            Hacer un pedido
          </a>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ postre, onClick }) {
  const imgUrl = postre.imagen?.url
    ? `${STRAPI_URL}${postre.imagen.url}`
    : 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Torta_chaj%C3%A1.jpg'

  return (
    <div
      className="group flex flex-col bg-white border border-cream-200/60 rounded-2xl overflow-hidden hover:shadow-[0_16px_40px_-12px_rgba(44,26,14,0.14)] transition-shadow duration-500 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={imgUrl}
          alt={postre.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Torta_chaj%C3%A1.jpg' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/30 to-transparent" />
        {postre.tag && (
          <span className="absolute top-3 left-3 text-[10px] font-medium tracking-[0.16em] uppercase px-3 py-1.5 rounded-full bg-amber/90 text-espresso-900">
            {postre.tag}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-base md:text-lg text-espresso-800 leading-snug tracking-tight">
            {postre.nombre}
          </h3>
          <div className="text-right shrink-0">
            <p className="font-mono text-xl font-semibold text-espresso-800">{postre.precio}</p>
            {postre.peso && <p className="text-espresso-400 text-xs">{postre.peso}</p>}
          </div>
        </div>

        <p className="text-espresso-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{postre.descripcion}</p>

        <span className="inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-full bg-espresso-800 text-cream-50 text-xs font-medium group-hover:bg-espresso-700 transition-all duration-300">
          <ShoppingBag size={12} strokeWidth={1.5} />
          Ver detalles
        </span>
      </div>
    </div>
  )
}

export default function PostresDestacados() {
  const [postres, setPostres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/postre-destacados?filters[disponible][$eq]=true&sort=orden:asc&populate=imagen`)
      .then((r) => {
        if (!r.ok) throw new Error('API error')
        return r.json()
      })
      .then((data) => {
        setPostres(data.data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('PostresDestacados fetch error:', err)
        setError(true)
        setLoading(false)
      })
  }, [])

  if (!loading && (error || postres.length === 0)) return null

  return (
    <section id="destacados" className="bg-cream-50 py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-amber" />
            <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Selección</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl text-espresso-800 tracking-tightest leading-tight">
              Postres destacados
            </h2>
            <p className="text-espresso-500 text-sm leading-relaxed max-w-[44ch] md:text-right">
              Una selección especial actualizada por el equipo de Chajá.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? [1, 2, 3].map((n) => <SkeletonCard key={n} />)
            : postres.map((p) => <ProductCard key={p.id} postre={p} onClick={() => setSelected(p)} />)
          }
        </div>
      </div>

      {selected && <Modal postre={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
