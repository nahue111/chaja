import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Minus, Check, ShoppingBag } from 'lucide-react'
import Layout from '../components/Layout'
import { useCart } from '../context/CartContext'

const categories = {
  familia: {
    label: 'Tortas Familiares',
    products: [
      { id: 'porcion-400', name: 'Porción Chajá', tag: 'Familiar', weight: '400 gr · 4 porciones', price: 400, description: 'Porción familiar del auténtico Chajá. Merengue, bizcochuelo, crema y fruta.', img: '/catalogo/familia-porcion.png' },
      { id: 'familiar-600-durazno', name: 'Chajá con Durazno', tag: 'Familiar', weight: '600 gr · 6 porciones', price: 500, description: 'Torta familiar Chajá con durazno. Merengue característico, bizcochuelo y crema.', img: '/catalogo/familia-durazno.png' },
      { id: 'familiar-600-ddl', name: 'Chajá con Dulce de Leche', tag: 'Familiar', weight: '600 gr', price: 500, description: 'Torta familiar con dulce de leche. Una versión irresistible del clásico uruguayo.', img: '/catalogo/familia-ddl.png' },
      { id: 'familiar-chocolate', name: 'Chajá Sabor Chocolate', tag: 'Familiar', weight: '600 gr', price: 500, description: 'Torta familiar sabor chocolate. El Chajá en su versión más indulgente.', img: '/catalogo/familia-chocolate.png' },
      { id: 'familiar-gold', name: 'Chajá Gold', tag: 'Premium', weight: '1,2 kg · 10–12 porciones', price: 1000, description: 'La línea Gold de Chajá. Presentación premium en caja negra, ideal para regalar.', img: '/catalogo/familia-gold.png' },
      { id: 'familiar-especial', name: 'Chajá Especial Uruguayo', tag: 'Especial', weight: '1,5 kg · 15 porciones', price: 1300, description: 'La torta más grande de la línea familiar. Presentación especial con los colores de Uruguay.', img: '/catalogo/familia-especial.png' },
      { id: 'familiar-clasica', name: 'Chajá Clásico', tag: 'Clásico', weight: '1,2 kg · 10 porciones', price: 800, description: 'El auténtico Chajá uruguayo en su presentación familiar clásica. Sin adornos, solo sabor.', img: '/catalogo/familia-clasica.png' },
    ],
  },
  helado: {
    label: 'Chajá Helado',
    products: [
      { id: 'helado-caja', name: 'Chajá Helado', tag: 'Helado', weight: '350 gr con DDL natural', price: 400, description: 'Porción de Chajá helado con dulce de leche natural. Una versión refrescante del clásico uruguayo.', img: '/catalogo/helado-caja.png' },
      { id: 'petit-helado-ddl', name: 'Chajá Petit Helado con DDL', tag: 'Helado', weight: '100 gr', price: 200, description: 'Petit Chajá helado con dulce de leche natural. El clásico en formato individual.', img: '/catalogo/helado-petit-ddl.png' },
      { id: 'petit-helado-durazno', name: 'Chajá Petit Helado con Durazno', tag: 'Helado', weight: '100 gr', price: 200, description: 'Petit Chajá helado con durazno. Bizcochuelo, merengue, crema y durazno en formato individual.', img: '/catalogo/helado-petit-durazno.png' },
    ],
  },
  x4: {
    label: 'Caja x4',
    products: [
      { id: 'x4-durazno', name: 'Tradicional de Durazno', tag: 'Caja x4', weight: '120 gr c/u', price: 500, description: 'Caja de 4 Chajá individuales con el sabor clásico de durazno.', img: '/catalogo/x4-durazno.png' },
      { id: 'x4-clasico', name: 'Clásico sin Fruta', tag: 'Caja x4', weight: '120 gr c/u', price: 500, description: 'Caja de 4 Chajá individuales clásico sin fruta. El sabor puro del merengue y crema.', img: '/catalogo/x4-clasico.png' },
      { id: 'x4-clasico2', name: '4 Generaciones', tag: 'Caja x4', weight: '120 gr c/u', price: 600, description: 'Caja de 4 Chajá individuales edición 4 Generaciones. La historia del Chajá en un solo pack.', img: '/catalogo/x4-clasico2.png' },
      { id: 'x4-frutilla', name: 'Frutilla', tag: 'Caja x4', weight: '120 gr c/u', price: 500, description: 'Caja de 4 Chajá individuales con frutilla. Merengue, bizcochuelo y crema con frutilla fresca.', img: '/catalogo/x4-frutilla.png' },
    ],
  },
  x12: {
    label: 'Caja x12',
    products: [
      { id: 'x12-clasico', name: 'Clásico', tag: 'Caja x12', weight: '120 gr c/u', price: 1200, description: 'Caja de 12 Chajá individuales clásico. Ideal para regalar o para eventos.', img: '/catalogo/x12-clasico.png' },
      { id: 'x12-morado', name: 'Frutos del Bosque', tag: 'Caja x12', weight: '120 gr c/u', price: 1300, description: 'Caja de 12 Chajá individuales con frutos del bosque. Sabores intensos y frescos.', img: '/catalogo/x12-morado.png' },
      { id: 'x12-frutilla', name: 'Frutilla', tag: 'Caja x12', weight: '120 gr c/u', price: 1200, description: 'Caja de 12 Chajá individuales con frutilla. Perfectos para compartir en cualquier celebración.', img: '/catalogo/x12-frutilla.png' },
    ],
  },
  otros: {
    label: 'Alfajores & Tortas',
    products: [
      { id: 'alfajor-yoyo', name: 'Alfajor Chajá tipo Yoyo', tag: 'Alfajor', weight: 'Individual · Caja x12', price: 100, description: 'Alfajores Chajá tipo yoyo: chocolate, maicena y chocolate blanco. Disponibles por unidad o caja.', img: '/catalogo/alfajores-yoyo.png' },
      { id: 'alfajor-caja', name: 'Alfajor de Maicena', tag: 'Alfajor', weight: 'Individual', price: 100, description: 'Alfajor de maicena común o con maní. También disponible en caja x12.', img: '/catalogo/alfajores-caja.png' },
      { id: 'torta-charlotte', name: 'Charlotte de Frutos del Bosque', tag: 'Repostero', weight: '6 a 8 porciones', price: 800, description: 'Postre repostero estilo charlotte con vainillas y crema de frutos del bosque.', img: '/catalogo/torta-charlotte.png' },
      { id: 'torta-oreo', name: 'Torta Oreo', tag: 'Repostero', weight: '6 a 8 porciones', price: 800, description: 'Postre repostero con Oreos, crema y chocolate.', img: '/catalogo/torta-oreo.png' },
      { id: 'torta-profiteroles', name: 'Profiteroles de DDL', tag: 'Repostero', weight: '6 a 8 porciones', price: 900, description: 'Postre repostero de profiteroles con dulce de leche. Crujiente por fuera, suave por dentro.', img: '/catalogo/torta-profiteroles.png' },
      { id: 'torta-bosque', name: 'Torta Frutos del Bosque', tag: 'Mini Cake', weight: '4 porciones', price: 700, description: 'Mini cake blanco con frutos del bosque. Elegante y delicioso para ocasiones especiales.', img: '/catalogo/torta-bosque.png' },
      { id: 'torta-selvanegra', name: 'Selva Negra', tag: 'Mini Cake', weight: '4 porciones', price: 700, description: 'Mini cake selva negra con chocolate, crema y cerezas.', img: '/catalogo/torta-selvanegra.png' },
      { id: 'torta-chocolate', name: 'Torta de Chocolate', tag: 'Mini Cake', weight: '4 porciones', price: 700, description: 'Mini cake de chocolate con crema. Para los amantes del chocolate en su máxima expresión.', img: '/catalogo/torta-chocolate.png' },
    ],
  },
}

const fmt = (n) => `$ ${n.toLocaleString('es-UY')}`

function ProductCard({ product }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(product)
    setAdded(true)
    setQty(1)
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
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-display text-base text-espresso-800 leading-snug tracking-tight">{product.name}</h3>
          <p className="text-espresso-400 text-xs text-right shrink-0 mt-0.5">{product.weight}</p>
        </div>
        <p className="text-espresso-500 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-lg font-semibold text-espresso-800">{fmt(product.price)}</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-cream-100 rounded-full px-1 py-1">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-6 h-6 rounded-full flex items-center justify-center text-espresso-500 hover:bg-white hover:text-espresso-800 transition-all"
              >
                <Minus size={10} strokeWidth={2} />
              </button>
              <span className="font-mono text-sm text-espresso-800 w-5 text-center">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-espresso-500 hover:bg-white hover:text-espresso-800 transition-all"
              >
                <Plus size={10} strokeWidth={2} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-300 active:scale-[0.98] ${
                added ? 'bg-green-600 text-white' : 'bg-espresso-800 text-cream-50 hover:bg-espresso-700'
              }`}
            >
              {added ? <Check size={11} strokeWidth={2} /> : null}
              {added ? 'Listo' : 'Agregar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartaPage() {
  const [activeTab, setActiveTab] = useState('familia')
  const { totalItems, setOpen } = useCart()

  return (
    <Layout>
      <main className="min-h-screen bg-cream-100 pt-20 md:pt-24">

        {/* Page header */}
        <div className="bg-cream-50 border-b border-cream-200">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 md:py-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-espresso-500 hover:text-espresso-800 transition-colors text-sm mb-6"
            >
              <ArrowLeft size={15} />
              Volver al inicio
            </Link>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="block w-6 h-px bg-amber" />
                  <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Carta completa</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl text-espresso-800 tracking-tightest leading-tight">
                  Nuestros productos
                </h1>
              </div>
              {totalItems > 0 && (
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-espresso-800 text-cream-50 text-sm font-medium hover:bg-espresso-700 transition-colors self-start md:self-auto"
                >
                  <ShoppingBag size={14} strokeWidth={1.5} />
                  Ver carrito · {totalItems}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-16 md:top-20 bg-cream-50/95 backdrop-blur-md border-b border-cream-200 z-10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex gap-2 py-4 overflow-x-auto scrollbar-none">
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
          </div>
        </div>

        {/* Products grid */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {categories[activeTab].products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </main>
    </Layout>
  )
}
