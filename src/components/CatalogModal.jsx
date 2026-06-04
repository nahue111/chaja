import { useState } from 'react'
import { X, Plus, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'

const categories = {
  familia: {
    label: 'Tortas Familiares',
    products: [
      { id: 'porcion-400', name: 'Porción Chajá', tag: 'Familiar', weight: '400 gr · 4 porciones', price: 400, description: 'Porción familiar del auténtico Chajá. Merengue, bizcochuelo, crema y fruta.', img: '/catalogo/familia-porcion.webp' },
      { id: 'familiar-600-durazno', name: 'Chajá con Durazno', tag: 'Familiar', weight: '600 gr · 6 porciones', price: 500, description: 'Torta familiar Chajá con durazno. Merengue característico, bizcochuelo y crema.', img: '/catalogo/familia-durazno.webp' },
      { id: 'familiar-600-ddl', name: 'Chajá con Dulce de Leche', tag: 'Familiar', weight: '600 gr', price: 500, description: 'Torta familiar con dulce de leche. Una versión irresistible del clásico uruguayo.', img: '/catalogo/familia-ddl.webp' },
      { id: 'familiar-chocolate', name: 'Chajá Sabor Chocolate', tag: 'Familiar', weight: '600 gr', price: 500, description: 'Torta familiar sabor chocolate. El Chajá en su versión más indulgente.', img: '/catalogo/familia-chocolate.webp' },
      { id: 'familiar-gold', name: 'Chajá Gold', tag: 'Premium', weight: '1,2 kg · 10–12 porciones', price: 1000, description: 'La línea Gold de Chajá. Presentación premium en caja negra, ideal para regalar.', img: '/catalogo/familia-gold.webp' },
      { id: 'familiar-especial', name: 'Chajá Especial Uruguayo', tag: 'Especial', weight: '1,5 kg · 15 porciones', price: 1300, description: 'La torta más grande de la línea familiar. Presentación especial con los colores de Uruguay.', img: '/catalogo/familia-especial.webp' },
      { id: 'familiar-clasica', name: 'Chajá Clásico', tag: 'Clásico', weight: '1,2 kg · 10 porciones', price: 800, description: 'El auténtico Chajá uruguayo en su presentación familiar clásica. Sin adornos, solo sabor.', img: '/catalogo/familia-clasica.webp' },
    ],
  },
  helado: {
    label: 'Chajá Helado',
    products: [
      { id: 'helado-caja', name: 'Chajá Helado', tag: 'Helado', weight: '350 gr con DDL natural', price: 400, description: 'Porción de Chajá helado con dulce de leche natural. Una versión refrescante del clásico uruguayo.', img: '/catalogo/helado-caja.webp' },
      { id: 'petit-helado-ddl', name: 'Chajá Petit Helado con DDL', tag: 'Helado', weight: '100 gr', price: 200, description: 'Petit Chajá helado con dulce de leche natural. El clásico en formato individual.', img: '/catalogo/helado-petit-ddl.webp' },
      { id: 'petit-helado-durazno', name: 'Chajá Petit Helado con Durazno', tag: 'Helado', weight: '100 gr', price: 200, description: 'Petit Chajá helado con durazno. Bizcochuelo, merengue, crema y durazno en formato individual.', img: '/catalogo/helado-petit-durazno.webp' },
    ],
  },
  x4: {
    label: 'Caja x4',
    products: [
      { id: 'x4-durazno', name: 'Tradicional de Durazno', tag: 'Caja x4', weight: '120 gr c/u', price: 500, description: 'Caja de 4 Chajá individuales con el sabor clásico de durazno.', img: '/catalogo/x4-durazno.webp' },
      { id: 'x4-clasico', name: 'Clásico sin Fruta', tag: 'Caja x4', weight: '120 gr c/u', price: 500, description: 'Caja de 4 Chajá individuales clásico sin fruta. El sabor puro del merengue y crema.', img: '/catalogo/x4-clasico.webp' },
      { id: 'x4-clasico2', name: '4 Generaciones', tag: 'Caja x4', weight: '120 gr c/u', price: 600, description: 'Caja de 4 Chajá individuales edición 4 Generaciones. La historia del Chajá en un solo pack.', img: '/catalogo/x4-clasico2.webp' },
      { id: 'x4-frutilla', name: 'Frutilla', tag: 'Caja x4', weight: '120 gr c/u', price: 500, description: 'Caja de 4 Chajá individuales con frutilla. Merengue, bizcochuelo y crema con frutilla fresca.', img: '/catalogo/x4-frutilla.webp' },
    ],
  },
  x12: {
    label: 'Caja x12',
    products: [
      { id: 'x12-clasico', name: 'Clásico', tag: 'Caja x12', weight: '120 gr c/u', price: 1200, description: 'Caja de 12 Chajá individuales clásico. Ideal para regalar o para eventos.', img: '/catalogo/x12-clasico.webp' },
      { id: 'x12-morado', name: 'Frutos del Bosque', tag: 'Caja x12', weight: '120 gr c/u', price: 1300, description: 'Caja de 12 Chajá individuales con frutos del bosque. Sabores intensos y frescos.', img: '/catalogo/x12-morado.webp' },
      { id: 'x12-frutilla', name: 'Frutilla', tag: 'Caja x12', weight: '120 gr c/u', price: 1200, description: 'Caja de 12 Chajá individuales con frutilla. Perfectos para compartir en cualquier celebración.', img: '/catalogo/x12-frutilla.webp' },
    ],
  },
  otros: {
    label: 'Alfajores & Tortas',
    products: [
      { id: 'alfajor-yoyo', name: 'Alfajor Chajá tipo Yoyo', tag: 'Alfajor', weight: 'Individual · Caja x12', price: 100, description: 'Alfajores Chajá tipo yoyo: chocolate, maicena y chocolate blanco. Disponibles por unidad o caja.', img: '/catalogo/alfajores-yoyo.webp' },
      { id: 'alfajor-caja', name: 'Alfajor de Maicena', tag: 'Alfajor', weight: 'Individual', price: 100, description: 'Alfajor de maicena común o con maní. También disponible en caja x12.', img: '/catalogo/alfajores-caja.webp' },
      { id: 'torta-charlotte', name: 'Charlotte de Frutos del Bosque', tag: 'Repostero', weight: '6 a 8 porciones', price: 800, description: 'Postre repostero estilo charlotte con vainillas y crema de frutos del bosque.', img: '/catalogo/torta-charlotte.webp' },
      { id: 'torta-oreo', name: 'Torta Oreo', tag: 'Repostero', weight: '6 a 8 porciones', price: 800, description: 'Postre repostero con Oreos, crema y chocolate. Una opción irresistible para los amantes del chocolate.', img: '/catalogo/torta-oreo.webp' },
      { id: 'torta-profiteroles', name: 'Profiteroles de DDL', tag: 'Repostero', weight: '6 a 8 porciones', price: 900, description: 'Postre repostero de profiteroles con dulce de leche. Crujiente por fuera, suave por dentro.', img: '/catalogo/torta-profiteroles.webp' },
      { id: 'torta-bosque', name: 'Torta Frutos del Bosque', tag: 'Mini Cake', weight: '4 porciones', price: 700, description: 'Mini cake blanco con frutos del bosque. Elegante y delicioso para ocasiones especiales.', img: '/catalogo/torta-bosque.webp' },
      { id: 'torta-selvanegra', name: 'Selva Negra', tag: 'Mini Cake', weight: '4 porciones', price: 700, description: 'Mini cake selva negra con chocolate, crema y cerezas. Un clásico de la repostería.', img: '/catalogo/torta-selvanegra.webp' },
      { id: 'torta-chocolate', name: 'Torta de Chocolate', tag: 'Mini Cake', weight: '4 porciones', price: 700, description: 'Mini cake de chocolate con crema. Para los amantes del chocolate en su máxima expresión.', img: '/catalogo/torta-chocolate.webp' },
    ],
  },
}

const fmt = (n) => `$ ${n.toLocaleString('es-UY')}`

function CatalogCard({ product }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group flex flex-col bg-white border border-cream-200/60 rounded-2xl overflow-hidden hover:shadow-[0_12px_32px_-8px_rgba(44,26,14,0.12)] transition-all duration-500">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Torta_chaj%C3%A1.jpg' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/30 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-medium tracking-[0.16em] uppercase px-3 py-1.5 rounded-full bg-amber/90 text-espresso-900">
          {product.tag}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-sm text-espresso-800 leading-snug tracking-tight">{product.name}</h3>
          <p className="text-espresso-400 text-xs text-right shrink-0 mt-0.5">{product.weight}</p>
        </div>
        <p className="text-espresso-500 text-xs leading-relaxed mb-3 flex-1">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-base font-semibold text-espresso-800">{fmt(product.price)}</span>
          <button
            onClick={handleAdd}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-300 active:scale-[0.98] ${
              added ? 'bg-green-600 text-white' : 'bg-espresso-800 text-cream-50 hover:bg-espresso-700'
            }`}
          >
            {added ? <Check size={11} strokeWidth={2} /> : <Plus size={11} strokeWidth={2} />}
            {added ? 'Agregado' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CatalogModal() {
  const { catalogOpen, setCatalogOpen } = useCart()
  const [activeTab, setActiveTab] = useState('familia')

  if (!catalogOpen) return null

  const current = categories[activeTab]

  return (
    <>
      <div
        className="fixed inset-0 bg-espresso-900/50 backdrop-blur-sm z-[55]"
        onClick={() => setCatalogOpen(false)}
      />
      <div className="fixed inset-0 z-[55] flex flex-col bg-cream-50 md:inset-4 md:rounded-2xl md:shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-cream-200 bg-cream-50 shrink-0">
          <div>
            <p className="text-amber text-xs font-medium tracking-[0.2em] uppercase mb-0.5">Chajá</p>
            <h2 className="font-display text-xl md:text-2xl text-espresso-800 font-semibold">Nuestra carta</h2>
          </div>
          <button
            onClick={() => setCatalogOpen(false)}
            className="p-2.5 rounded-full text-espresso-400 hover:text-espresso-700 hover:bg-cream-100 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 md:px-10 py-4 overflow-x-auto scrollbar-none border-b border-cream-100 shrink-0">
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${
                activeTab === key
                  ? 'bg-espresso-800 text-cream-50 shadow-md'
                  : 'bg-white border border-cream-200 text-espresso-500 hover:border-espresso-400 hover:text-espresso-700'
              }`}
            >
              {cat.label}
              <span className={`ml-1.5 text-xs font-mono ${activeTab === key ? 'text-amber opacity-80' : 'text-amber opacity-60'}`}>
                {cat.products.length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1200px] mx-auto">
            {current.products.map((product) => (
              <CatalogCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
