import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus, Minus, Check, ShoppingBag } from 'lucide-react'
import Layout from '../components/Layout'
import { useCart } from '../context/CartContext'

const categories = {
  familia: {
    label: 'Tortas Familiares',
    products: [
      { id: 'familiar-600-durazno', name: 'Torta Chajá con Durazno', tag: '600 gr', weight: '600 gr · 6 porciones', price: 625, description: 'Torta Chajá 600 gr con durazno. Postre cilíndrico cubierto de merengue, bizcochuelo, durazno y crema vainilla. Hasta 45 días en heladera entre 4 y 7°C.', img: '/catalogo/familia-durazno.webp' },
      { id: 'familiar-600-ddl', name: 'Torta Chajá con Dulce de Leche', tag: '600 gr', weight: '600 gr · 6 porciones', price: 625, description: 'Torta Chajá 600 gr con dulce de leche. Merengue característico, bizcochuelo y crema vainilla. Hasta 45 días en heladera entre 4 y 7°C.', img: '/catalogo/familia-ddl.webp' },
      { id: 'familiar-chocolate', name: 'Torta Chajá Sabor Chocolate', tag: '600 gr', weight: '600 gr · 6 porciones', price: 625, description: 'Torta Chajá 600 gr sabor chocolate. Merengue característico, bizcochuelo y crema vainilla. Hasta 45 días en heladera entre 4 y 7°C.', img: '/catalogo/familia-chocolate.webp' },
      { id: 'familiar-clasica', name: 'Torta Chajá Especial 1200 gr', tag: 'Clásico', weight: '1,2 kg · Durazno o Frutilla', price: 1150, description: 'Torta Chajá especial clásico. Merengue característico, bizcochuelo, durazno o frutilla y chantilly. Hasta 45 días en heladera entre 4 y 7°C.', img: '/catalogo/familia-especial.webp' },
      { id: 'familiar-gold', name: 'Chajá Gold 1200 gr', tag: 'Premium', weight: '1,2 kg · Durazno y Ananá', price: 1150, description: 'Línea Gold. Chajá con durazno y ananá en presentación premium. Merengue, bizcochuelo y crema vainilla. Hasta 45 días en heladera entre 4 y 7°C.', img: '/catalogo/familia-gold.webp' },
      { id: 'familiar-especial', name: 'Torta Chajá Frágil 1500 gr', tag: 'Especial', weight: '1,5 kg · Durazno, Chocolate o DDL', price: 1590, description: 'La torta más grande. Merengue, bizcochuelo, durazno o chocolate o dulce de leche y crema vainilla. Hasta 45 días en heladera entre 4 y 7°C.', img: '/catalogo/familia-clasica.webp' },
    ],
  },
  helado: {
    label: 'Chajá Helado',
    products: [
      { id: 'petit-helado-durazno', name: 'Petit Chajá Helado con Durazno', tag: 'Helado', weight: '100 gr', price: 113, description: 'Postre Chajá clásico sabor bizcochuelo, durazno y crema vainilla. Recubierto en merengue característico. Vida útil: 6 meses en freezer a -18°C.', img: '/catalogo/helado-petit-durazno.webp' },
      { id: 'petit-helado-ddl', name: 'Petit Chajá Helado con DDL', tag: 'Helado', weight: '100 gr', price: 113, description: 'Postre Chajá sabor bizcochuelo, dulce de leche natural y crema vainilla. Recubierto en merengue característico. Vida útil: 6 meses en freezer a -18°C.', img: '/catalogo/helado-petit-ddl.webp' },
      { id: 'helado-pack-durazno', name: 'Pack x3 con Durazno', tag: 'Helado', weight: '95 gr c/u', price: 396, description: 'Pack de 3 Chajá helados con durazno. Merengue, bizcochuelo y crema vainilla. Vida útil: 45 días en heladera entre 4 y 7°C.', img: '/catalogo/helado-caja.webp' },
      { id: 'helado-triple', name: 'Chajá Triple Sabor x3', tag: 'Helado', weight: '50 gr c/u', price: 152, description: 'Pack de 3 Chajá individuales: vainilla sin fruta, dulce de leche y chocolate. Bizcochuelo y merengue en cada uno.', img: '/catalogo/helado-caja.webp' },
    ],
  },
  x4: {
    label: 'Caja x4',
    products: [
      { id: 'x4-clasico', name: 'Clásico sin Fruta', tag: 'Caja x4', weight: '120 gr c/u', price: 536, description: 'Caja de 4 Chajá individuales clásico sin fruta. Postre cilíndrico cubierto de merengue, bizcochuelo y crema vainilla.', img: '/catalogo/x4-clasico.webp' },
      { id: 'x4-durazno', name: 'Con Durazno', tag: 'Caja x4', weight: '120 gr c/u', price: 608, description: 'Caja de 4 Chajá individuales con durazno. Merengue, bizcochuelo, durazno y crema vainilla.', img: '/catalogo/x4-durazno.webp' },
      { id: 'x4-frutilla', name: 'Con Frutilla', tag: 'Caja x4', weight: '120 gr c/u', price: 608, description: 'Caja de 4 Chajá individuales con frutilla. Merengue, bizcochuelo, frutilla y crema vainilla.', img: '/catalogo/x4-frutilla.webp' },
      { id: 'x4-bosque', name: 'Frutos del Bosque', tag: 'Caja x4', weight: '120 gr c/u', price: 608, description: 'Caja de 4 Chajá individuales con frutos del bosque. Merengue, bizcochuelo y crema vainilla.', img: '/catalogo/x4-bosque.webp' },
      { id: 'x4-clasico2', name: '4 Generaciones', tag: 'Caja x4', weight: '120 gr c/u', price: 608, description: 'Caja de 4 Chajá individuales edición 4 Generaciones: frutilla, durazno, clásico y frutos del bosque.', img: '/catalogo/x4-generaciones.webp' },
    ],
  },
  x12: {
    label: 'Caja x12',
    products: [
      { id: 'x12-clasico', name: 'Clásico sin Fruta', tag: 'Caja x12', weight: '120 gr c/u', price: 1608, description: 'Caja de 12 Chajá individuales clásico sin fruta. Ideal para regalar o para eventos.', img: '/catalogo/x12-sinfrutas.webp' },
      { id: 'x12-durazno', name: 'Con Durazno', tag: 'Caja x12', weight: '120 gr c/u', price: 1824, description: 'Caja de 12 Chajá individuales con durazno. Merengue, bizcochuelo, durazno y crema vainilla.', img: '/catalogo/x12-durazno.webp' },
      { id: 'x12-frutilla', name: 'Con Frutilla', tag: 'Caja x12', weight: '120 gr c/u', price: 1824, description: 'Caja de 12 Chajá individuales con frutilla. Perfectos para compartir en cualquier celebración.', img: '/catalogo/x12-frutilla.webp' },
      { id: 'x12-morado', name: 'Con Frutos del Bosque', tag: 'Caja x12', weight: '120 gr c/u', price: 1824, description: 'Caja de 12 Chajá individuales con frutos del bosque. Sabores intensos y frescos.', img: '/catalogo/x12-morado.webp' },
    ],
  },
  alfajores: {
    label: 'Alfajores',
    products: [
      { id: 'alfajor-yoyo', name: 'Alfajor Chajá tipo Yoyo', tag: 'Alfajor', weight: 'Individual · Caja x12', price: 100, description: 'Alfajores Chajá tipo yoyo: chocolate, maicena y chocolate blanco. Disponibles por unidad o caja.', img: '/catalogo/alfajores-yoyo.webp' },
      { id: 'alfajor-caja', name: 'Alfajor de Maicena', tag: 'Alfajor', weight: 'Individual', price: 100, description: 'Alfajor de maicena común o con maní. También disponible en caja x12.', img: '/catalogo/alfajores-caja.webp' },
    ],
  },
  tortas: {
    label: 'Tortas',
    products: [
      { id: 'torta-charlotte', name: 'Charlotte de Frutos del Bosque', tag: 'Repostero', weight: '6 a 8 porciones', price: 800, description: 'Postre repostero estilo charlotte con vainillas y crema de frutos del bosque.', img: '/catalogo/torta-charlotte.webp' },
      { id: 'torta-oreo', name: 'Torta Oreo', tag: 'Repostero', weight: '6 a 8 porciones', price: 800, description: 'Postre repostero con Oreos, crema y chocolate.', img: '/catalogo/torta-oreo.webp' },
      { id: 'torta-profiteroles', name: 'Profiteroles de DDL', tag: 'Repostero', weight: '6 a 8 porciones', price: 900, description: 'Postre repostero de profiteroles con dulce de leche. Crujiente por fuera, suave por dentro.', img: '/catalogo/torta-profiteroles.webp' },
      { id: 'torta-bosque', name: 'Torta Frutos del Bosque', tag: 'Mini Cake', weight: '4 porciones', price: 700, description: 'Mini cake blanco con frutos del bosque. Elegante y delicioso para ocasiones especiales.', img: '/catalogo/torta-bosque.webp' },
      { id: 'torta-selvanegra', name: 'Selva Negra', tag: 'Mini Cake', weight: '4 porciones', price: 700, description: 'Mini cake selva negra con chocolate, crema y cerezas.', img: '/catalogo/torta-selvanegra.webp' },
      { id: 'torta-chocolate', name: 'Torta de Chocolate', tag: 'Mini Cake', weight: '4 porciones', price: 700, description: 'Mini cake de chocolate con crema. Para los amantes del chocolate en su máxima expresión.', img: '/catalogo/torta-chocolate.webp' },
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
      <div className="aspect-[4/3] overflow-hidden relative bg-cream-200">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-[transform,opacity] duration-500 group-hover:scale-105 opacity-0"
          onLoad={(e) => e.target.classList.replace('opacity-0', 'opacity-100')}
          onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Torta_chaj%C3%A1.jpg'; e.target.classList.replace('opacity-0', 'opacity-100') }}
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
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(
    initialTab && categories[initialTab] ? initialTab : 'familia'
  )
  const { totalItems, setOpen } = useCart()

  return (
    <Layout>
      <main className="min-h-screen bg-cream-100 pt-20 md:pt-24">

        {/* Page header */}
        <div className="bg-cream-50 border-b border-cream-200">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 md:py-12">
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
                  Ver carrito
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
