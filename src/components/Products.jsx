import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const categories = [
  { key: 'familia', label: 'Tortas Familiares', sub: '7 variedades', img: '/catalogo/familia-clasica.webp' },
  { key: 'helado', label: 'Chajá Helado', sub: '3 variedades', img: '/catalogo/helado-caja.webp' },
  { key: 'x4', label: 'Cajas x4', sub: '4 variedades', img: '/catalogo/x4-durazno.webp' },
  { key: 'x12', label: 'Cajas x12', sub: '3 variedades', img: '/catalogo/x12-frutilla.webp' },
  { key: 'alfajores', label: 'Alfajores', sub: '2 variedades', img: '/catalogo/alfajores-yoyo.webp' },
  { key: 'tortas', label: 'Tortas', sub: '6 variedades', img: '/catalogo/torta-charlotte.webp' },
]

export default function Products() {
  return (
    <section id="variedades" className="bg-cream-100 py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-amber" />
              <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Carta</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-espresso-800 tracking-tightest leading-tight">
              25 productos,<br />
              <span className="italic font-medium">una sola receta</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-espresso-500 text-sm leading-relaxed max-w-[44ch] md:text-right">
              Desde tortas familiares hasta alfajores. Todos elaborados a mano con la receta original Chajá de 1927.
            </p>
            <Link
              to="/carta"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso-800 text-cream-50 text-sm font-medium hover:bg-espresso-700 transition-all duration-300 active:scale-[0.98] shadow-md"
            >
              Ver carta completa
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Category tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={`/carta?tab=${cat.key}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[2/3]"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-[transform,opacity] duration-500 group-hover:scale-105 opacity-0"
                onLoad={(e) => e.target.classList.replace('opacity-0', 'opacity-100')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-espresso-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-cream-50 text-sm font-display font-semibold leading-tight">{cat.label}</p>
                <p className="text-cream-300 text-xs mt-0.5">{cat.sub}</p>
              </div>
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight size={12} className="text-white" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
