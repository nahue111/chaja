import { useState } from 'react'
import { X, Plus, Minus, Check } from 'lucide-react'
import { getProducts, addRestock } from './data'

export default function RestockModal({ onClose, onDone }) {
  const products = getProducts()
  const [qtys, setQtys] = useState({})
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  const set = (id, val) => {
    const n = Math.max(0, parseInt(val) || 0)
    setQtys(prev => ({ ...prev, [id]: n }))
  }

  const bump = (id, delta) => {
    setQtys(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }))
  }

  const totalItems = Object.values(qtys).reduce((s, v) => s + v, 0)

  const handleSave = () => {
    const items = products
      .filter(p => qtys[p.id] > 0)
      .map(p => ({ id: p.id, name: p.name, qty: qtys[p.id] }))
    if (!items.length) return
    addRestock(items, note)
    setSaved(true)
    setTimeout(() => { onDone?.(); onClose() }, 900)
  }

  const categories = [...new Set(products.map(p => p.category))]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(26,14,6,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden flex flex-col w-full max-w-2xl"
        style={{ maxHeight: '88vh', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.4)', border: '1px solid #F5EFE0' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: '1px solid #F5EFE0' }}>
          <div>
            <h2 className="font-display text-lg font-semibold" style={{ color: '#2C1A0E' }}>Registrar Restock</h2>
            <p className="text-xs mt-0.5" style={{ color: '#7A5230' }}>
              {totalItems > 0 ? `${totalItems} unidades seleccionadas` : 'Ingresá las cantidades a reponer'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: '#F5EFE0', color: '#5C3D20' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#EDE0C8')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F5EFE0')}
          >
            <X size={14} />
          </button>
        </div>

        {/* Product list */}
        <div className="flex-1 overflow-y-auto px-7 py-4 space-y-6">
          {categories.map(cat => (
            <div key={cat}>
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#C8860A' }}>{cat}</p>
              <div className="space-y-2">
                {products.filter(p => p.category === cat).map(p => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 rounded-xl px-4 py-3 transition-colors"
                    style={{ background: qtys[p.id] > 0 ? 'rgba(200,134,10,0.05)' : '#FAF7F0', border: `1px solid ${qtys[p.id] > 0 ? 'rgba(200,134,10,0.15)' : 'transparent'}` }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: '#2C1A0E' }}>{p.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#7A5230' }}>
                        Stock actual: <span className="font-mono font-semibold">{p.stock}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0" style={{ background: 'white', borderRadius: '999px', padding: '3px 4px', border: '1px solid #EDE0C8' }}>
                      <button
                        onClick={() => bump(p.id, -1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                        style={{ color: '#5C3D20' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F5EFE0')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Minus size={9} strokeWidth={2.5} />
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={qtys[p.id] || 0}
                        onChange={e => set(p.id, e.target.value)}
                        className="w-8 text-center text-sm font-mono font-semibold outline-none bg-transparent"
                        style={{ color: '#2C1A0E' }}
                      />
                      <button
                        onClick={() => bump(p.id, 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                        style={{ color: '#5C3D20' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F5EFE0')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Plus size={9} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-7 py-5 space-y-3" style={{ borderTop: '1px solid #F5EFE0' }}>
          <input
            type="text"
            placeholder="Nota (ej: Restock semanal)"
            value={note}
            onChange={e => setNote(e.target.value)}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={{ background: '#FAF7F0', border: '1px solid #EDE0C8', color: '#2C1A0E' }}
          />
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{ background: '#F5EFE0', color: '#5C3D20' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#EDE0C8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#F5EFE0')}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={totalItems === 0 || saved}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-40"
              style={{ background: saved ? '#16a34a' : '#2C1A0E', color: saved ? 'white' : '#FDFBF7' }}
            >
              {saved ? <><Check size={14} /> Guardado</> : `Confirmar (${totalItems} u.)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
