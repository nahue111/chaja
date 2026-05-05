import { useRef, useState } from 'react'
import { ShoppingBag } from 'lucide-react'

const categories = {
  familia: {
    label: 'Chajá Familia',
    products: [
      {
        id: 'porcion-400',
        name: 'Porción Chajá',
        tag: 'Familiar',
        price: 'Consultar',
        weight: '400 gr · 4 porciones',
        description: 'Porción familiar de Chajá elaborado con la receta original. Merengue, bizcochuelo, crema y fruta.',
        img: '/catalogo/chaja-familia.png',
      },
      {
        id: 'familiar-600',
        name: 'Torta Chajá Familiar',
        tag: 'Familiar',
        price: 'Consultar',
        weight: '600 gr · 6 porciones',
        description: 'Torta familiar Chajá con merengue característico, bizcochuelo, crema y fruta. Ideal para compartir.',
        img: '/catalogo/chaja-familia-2.png',
      },
      {
        id: 'familiar-1200-10',
        name: 'Torta Chajá Familiar',
        tag: 'Familiar',
        price: 'Consultar',
        weight: '1,2 kg · 10 porciones',
        description: 'Torta familiar grande. Merengue, bizcochuelo, crema y fruta al estilo tradicional Chajá.',
        img: '/catalogo/chaja-familia-3.png',
      },
      {
        id: 'familiar-1200-12',
        name: 'Torta Chajá Familiar',
        tag: 'Familiar',
        price: 'Consultar',
        weight: '1,2 kg · 12 porciones',
        description: 'Versión generosa de la torta familiar, perfecta para celebraciones y reuniones.',
        img: '/catalogo/chaja-familia.png',
      },
      {
        id: 'familiar-1500',
        name: 'Torta Chajá Familiar',
        tag: 'Premium',
        price: 'Consultar',
        weight: '1,5 kg · 15 porciones',
        description: 'La torta más grande de la línea familiar. El Chajá en su versión más generosa para grandes ocasiones.',
        img: '/catalogo/chaja-familia-2.png',
      },
    ],
  },
  helado: {
    label: 'Chajá Helado',
    products: [
      {
        id: 'helado-ddl-350',
        name: 'Porción Chajá Helado con DDL',
        tag: 'Helado',
        price: 'Consultar',
        weight: '350 gr',
        description: 'Porción de Chajá helado con dulce de leche natural. Una versión refrescante del postre clásico uruguayo.',
        img: '/catalogo/chaja-helado.png',
      },
      {
        id: 'petit-helado-ddl',
        name: 'Chajá Petit Helado con DDL',
        tag: 'Helado',
        price: 'Consultar',
        weight: '100 gr',
        description: 'Petit Chajá helado con dulce de leche natural. El clásico en formato individual, perfecto para cualquier momento.',
        img: '/catalogo/chaja-helado-2.png',
      },
      {
        id: 'petit-helado-durazno',
        name: 'Chajá Petit Helado con Durazno',
        tag: 'Helado',
        price: 'Consultar',
        weight: '100 gr',
        description: 'Petit Chajá helado con durazno. Bizcochuelo, merengue, crema y durazno en una porción individual helada.',
        img: '/catalogo/chaja-helado-3.png',
      },
    ],
  },
  x4: {
    label: 'Caja x4',
    products: [
      {
        id: 'x4-generaciones',
        name: '4 Generaciones',
        tag: 'Caja x4',
        price: 'Consultar',
        weight: '120 gr c/u',
        description: 'Caja de 4 Chajá individuales edición 4 Generaciones. La historia del Chajá en un solo pack.',
        img: '/catalogo/chaja-x4.png',
      },
      {
        id: 'x4-durazno',
        name: 'Tradicional de Durazno',
        tag: 'Caja x4',
        price: 'Consultar',
        weight: '120 gr c/u',
        description: 'Caja de 4 Chajá individuales con el sabor clásico de durazno. Merengue, bizcochuelo y crema.',
        img: '/catalogo/chaja-x4-2.png',
      },
      {
        id: 'x4-clasico',
        name: 'Clásico sin Fruta',
        tag: 'Caja x4',
        price: 'Consultar',
        weight: '120 gr c/u',
        description: 'Caja de 4 Chajá individuales clásico sin fruta. El sabor puro del merengue, bizcochuelo y crema.',
        img: '/catalogo/chaja-x4.png',
      },
      {
        id: 'x4-frutilla',
        name: 'Frutilla',
        tag: 'Caja x4',
        price: 'Consultar',
        weight: '120 gr c/u',
        description: 'Caja de 4 Chajá individuales con frutilla. Merengue característico, bizcochuelo y crema con frutilla.',
        img: '/catalogo/chaja-x4-2.png',
      },
      {
        id: 'x4-bosque',
        name: 'Frutos del Bosque',
        tag: 'Caja x4',
        price: 'Consultar',
        weight: '120 gr c/u',
        description: 'Caja de 4 Chajá individuales con frutos del bosque. Una combinación de sabores intensos y frescos.',
        img: '/catalogo/chaja-x4.png',
      },
    ],
  },
  x12: {
    label: 'Caja x12',
    products: [
      {
        id: 'x12-durazno',
        name: 'Tradicional de Durazno',
        tag: 'Caja x12',
        price: 'Consultar',
        weight: '120 gr c/u',
        description: 'Caja de 12 Chajá individuales sabor durazno. Ideal para regalar o para eventos.',
        img: '/catalogo/chaja-x12.png',
      },
      {
        id: 'x12-clasico',
        name: 'Clásico sin Fruta',
        tag: 'Caja x12',
        price: 'Consultar',
        weight: '120 gr c/u',
        description: 'Caja de 12 Chajá individuales clásico sin fruta. El sabor original en su máxima expresión.',
        img: '/catalogo/chaja-x12-2.png',
      },
      {
        id: 'x12-frutilla',
        name: 'Frutilla',
        tag: 'Caja x12',
        price: 'Consultar',
        weight: '120 gr c/u',
        description: 'Caja de 12 Chajá individuales con frutilla. Perfectos para compartir en reuniones y celebraciones.',
        img: '/catalogo/chaja-x12.png',
      },
      {
        id: 'x12-bosque',
        name: 'Frutos del Bosque',
        tag: 'Caja x12',
        price: 'Consultar',
        weight: '120 gr c/u',
        description: 'Caja de 12 Chajá individuales con frutos del bosque. Un pack completo para los amantes del Chajá.',
        img: '/catalogo/chaja-x12-2.png',
      },
    ],
  },
  otros: {
    label: 'Alfajores & Tortas',
    products: [
      {
        id: 'alfajor-yoyo',
        name: 'Alfajor Chajá tipo Yoyo',
        tag: 'Alfajor',
        price: 'Consultar',
        weight: 'Individual · Caja x12',
        description: 'Alfajores Chajá tipo yoyo, disponibles por unidad o en caja de 12. Un clásico irresistible.',
        img: '/catalogo/alfajores.png',
      },
      {
        id: 'alfajor-maicena',
        name: 'Alfajor de Maicena',
        tag: 'Alfajor',
        price: 'Consultar',
        weight: 'Individual',
        description: 'Alfajor de maicena en versión común o con maní. Suave, delicado y con el sabor de siempre.',
        img: '/catalogo/alfajores-2.png',
      },
      {
        id: 'postre-repostero',
        name: 'Postre Repostero',
        tag: 'Torta',
        price: 'Consultar',
        weight: '6 a 8 porciones',
        description: 'Postre repostero elaborado por nuestro equipo. Una propuesta diferente para quienes buscan algo especial.',
        img: '/catalogo/tortas.png',
      },
      {
        id: 'mini-cake',
        name: 'Mini Cake',
        tag: 'Torta',
        price: 'Consultar',
        weight: '4 porciones',
        description: 'Mini cake de 4 porciones. Ideal para cumpleaños íntimos o para darse un gusto sin excusas.',
        img: '/catalogo/tortas-2.png',
      },
    ],
  },
}

function ProductCard({ product, index }) {
  return (
    <div
      className="group flex flex-col bg-white border border-cream-200/60 rounded-2xl overflow-hidden hover:shadow-[0_16px_40px_-12px_rgba(44,26,14,0.14)] transition-all duration-500"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Torta_chaj%C3%A1.jpg'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/30 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-medium tracking-[0.16em] uppercase px-3 py-1.5 rounded-full bg-amber/90 text-espresso-900">
          {product.tag}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-base md:text-lg text-espresso-800 leading-snug tracking-tight">
            {product.name}
          </h3>
          <div className="text-right shrink-0">
            <p className="font-mono text-sm font-semibold text-espresso-800">{product.price}</p>
            <p className="text-espresso-400 text-xs">{product.weight}</p>
          </div>
        </div>

        <p className="text-espresso-500 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>

        <a
          href="#pedidos"
          className="inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-full bg-espresso-800 text-cream-50 text-xs font-medium hover:bg-espresso-700 transition-all duration-300 active:scale-[0.98]"
        >
          <ShoppingBag size={12} strokeWidth={1.5} />
          Pedir este
        </a>
      </div>
    </div>
  )
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('familia')
  const gridRef = useRef(null)

  const handleTab = (key) => {
    if (key === activeTab) return
    setActiveTab(key)
  }

  const current = categories[activeTab]

  return (
    <section id="variedades" className="bg-cream-100 py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-amber" />
            <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Carta</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl text-espresso-800 tracking-tightest leading-tight">
              Nuestros productos
            </h2>
            <p className="text-espresso-500 text-sm leading-relaxed max-w-[44ch] md:text-right">
              Desde tortas familiares hasta alfajores, todos elaborados con la receta original Chajá.
            </p>
          </div>
        </div>

        <div className="flex gap-2 md:gap-6 mb-10 border-b border-cream-200 overflow-x-auto pb-0 scrollbar-none">
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => handleTab(key)}
              className={`relative pb-3 text-sm font-medium transition-colors duration-300 whitespace-nowrap shrink-0 ${
                activeTab === key
                  ? 'text-espresso-800'
                  : 'text-espresso-400 hover:text-espresso-600'
              }`}
            >
              {cat.label}
              <span className="ml-1.5 text-xs font-mono text-amber opacity-70">
                {cat.products.length}
              </span>
              {activeTab === key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-espresso-800 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {current.products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
