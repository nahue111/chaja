import { useEffect, useState } from 'react'
import { Search, Plus, RefreshCcw } from 'lucide-react'
import { getProducts, setStock, fmt } from '../data'
import RestockModal from '../RestockModal'

function stockColor(n) {
  if (n === 0) return { bg: 'rgba(220,38,38,0.08)', text: '#dc2626' }
  if (n <= 3) return { bg: 'rgba(239,68,68,0.07)', text: '#ef4444' }
  if (n <= 8) return { bg: 'rgba(200,134,10,0.08)', text: '#C8860A' }
  return { bg: 'rgba(22,163,74,0.07)', text: '#16a34a' }
}

export default function Inventario() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [editingId, setEditingId] = useState(null)
  const [editVal, setEditVal] = useState('')
  const [showRestock, setShowRestock] = useState(false)

  const load = () => setProducts(getProducts())
  useEffect(() => { load() }, [])

  const categories = ['Todos', ...new Set(products.map(p => p.category))]

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  const startEdit = (p) => {
    setEditingId(p.id)
    setEditVal(String(p.stock))
  }

  const commitEdit = (id) => {
    const val = parseInt(editVal)
    if (!isNaN(val)) setProducts(setStock(id, val))
    setEditingId(null)
  }

  return (
    <>
      {showRestock && (
        <RestockModal onClose={() => setShowRestock(false)} onDone={load} />
      )}

      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#7A5230' }} />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'white', border: '1px solid #EDE0C8', color: '#2C1A0E' }}
            />
          </div>
          <button
            onClick={() => setShowRestock(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] flex-shrink-0"
            style={{ background: '#2C1A0E', color: '#FDFBF7' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#3D2714')}
            onMouseLeave={e => (e.currentTarget.style.background = '#2C1A0E')}
          >
            <RefreshCcw size={13} strokeWidth={2} />
            Nuevo Restock
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? '#2C1A0E' : 'white',
                color: activeCategory === cat ? '#FDFBF7' : '#5C3D20',
                border: activeCategory === cat ? '1px solid #2C1A0E' : '1px solid #EDE0C8',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => {
            const sc = stockColor(p.stock)
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden transition-all duration-300"
                style={{ border: '1px solid #F5EFE0', boxShadow: '0 1px 4px rgba(44,26,14,0.04)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,26,14,0.09)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(44,26,14,0.04)')}
              >
                <div className="aspect-[4/3] overflow-hidden relative" style={{ background: '#FAF7F0' }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                    onLoad={e => e.target.classList.replace('opacity-0', 'opacity-100')}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <span
                    className="absolute top-2.5 right-2.5 text-[10px] font-semibold px-2 py-1 rounded-full"
                    style={{ background: sc.bg, color: sc.text }}
                  >
                    {p.stock} u.
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium mb-0.5 truncate" style={{ color: '#C8860A' }}>{p.category}</p>
                  <p className="text-sm font-medium leading-snug mb-3" style={{ color: '#2C1A0E' }}>{p.name}</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-sm font-semibold" style={{ color: '#5C3D20' }}>{fmt(p.price)}</p>
                    {editingId === p.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          autoFocus
                          type="number"
                          min="0"
                          value={editVal}
                          onChange={e => setEditVal(e.target.value)}
                          onBlur={() => commitEdit(p.id)}
                          onKeyDown={e => e.key === 'Enter' && commitEdit(p.id)}
                          className="w-16 text-center rounded-lg py-1 text-sm font-mono font-semibold outline-none"
                          style={{ background: '#FAF7F0', border: '1px solid #C8860A', color: '#2C1A0E' }}
                        />
                        <button
                          onClick={() => commitEdit(p.id)}
                          className="text-xs px-2 py-1 rounded-lg font-medium"
                          style={{ background: '#C8860A', color: '#1A0E06' }}
                        >
                          OK
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(p)}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                        style={{ background: '#FAF7F0', color: '#5C3D20', border: '1px solid #EDE0C8' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#EDE0C8')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#FAF7F0')}
                      >
                        Editar stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm" style={{ color: '#7A5230' }}>Sin resultados</div>
        )}
      </div>
    </>
  )
}
