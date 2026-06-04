import { useEffect, useState } from 'react'
import { Search, Plus, Trash2, Pencil, X, Check } from 'lucide-react'
import { getProducts, fmt } from '../data'

const K = 'chadmin_p'

function saveProducts(products) {
  localStorage.setItem(K, JSON.stringify(products))
}

const CATEGORIES = [
  'Tortas Familiares', 'Chajá Helado', 'Caja x4', 'Caja x12', 'Alfajores', 'Tortas',
]

const EMPTY_FORM = { name: '', category: 'Tortas Familiares', price: '', stock: '', img: '' }

export default function Productos() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editPrice, setEditPrice] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const load = () => setProducts(getProducts())
  useEffect(() => { load() }, [])

  const filtered = products.filter(p =>
    !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
  )

  const commitPrice = (id) => {
    const val = parseFloat(editPrice)
    if (!isNaN(val) && val > 0) {
      const updated = products.map(p => p.id === id ? { ...p, price: val } : p)
      saveProducts(updated)
      setProducts(updated)
    }
    setEditingId(null)
  }

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id)
    saveProducts(updated)
    setProducts(updated)
    setConfirmDelete(null)
  }

  const addProduct = () => {
    if (!form.name.trim() || !form.price) return
    const newProduct = {
      id: `custom-${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      img: form.img.trim() || '',
    }
    const updated = [...products, newProduct]
    saveProducts(updated)
    setProducts(updated)
    setForm(EMPTY_FORM)
    setShowForm(false)
  }

  const categories = ['Todos', ...CATEGORIES]
  const [activeCat, setActiveCat] = useState('Todos')
  const displayed = filtered.filter(p => activeCat === 'Todos' || p.category === activeCat)

  return (
    <div className="space-y-5">
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
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] flex-shrink-0"
          style={{ background: '#C8860A', color: '#1A0E06' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#E4A831')}
          onMouseLeave={e => (e.currentTarget.style.background = '#C8860A')}
        >
          <Plus size={13} strokeWidth={2.5} />
          Nuevo producto
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={{
              background: activeCat === cat ? '#2C1A0E' : 'white',
              color: activeCat === cat ? '#FDFBF7' : '#5C3D20',
              border: activeCat === cat ? '1px solid #2C1A0E' : '1px solid #EDE0C8',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add product form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE0C8', boxShadow: '0 4px 20px rgba(44,26,14,0.08)' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-base font-semibold" style={{ color: '#2C1A0E' }}>Nuevo producto</h3>
            <button onClick={() => setShowForm(false)} style={{ color: '#7A5230' }}>
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-medium block mb-1.5" style={{ color: '#5C3D20' }}>Nombre *</label>
              <input
                type="text"
                placeholder="Ej: Torta Chajá con Frutilla"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#FAF7F0', border: '1px solid #EDE0C8', color: '#2C1A0E' }}
              />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: '#5C3D20' }}>Categoría</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#FAF7F0', border: '1px solid #EDE0C8', color: '#2C1A0E' }}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: '#5C3D20' }}>Precio ($) *</label>
              <input
                type="number"
                placeholder="625"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#FAF7F0', border: '1px solid #EDE0C8', color: '#2C1A0E' }}
              />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: '#5C3D20' }}>Stock inicial</label>
              <input
                type="number"
                placeholder="0"
                value={form.stock}
                onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#FAF7F0', border: '1px solid #EDE0C8', color: '#2C1A0E' }}
              />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: '#5C3D20' }}>URL de imagen</label>
              <input
                type="text"
                placeholder="/catalogo/mi-imagen.webp"
                value={form.img}
                onChange={e => setForm(f => ({ ...f, img: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#FAF7F0', border: '1px solid #EDE0C8', color: '#2C1A0E' }}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{ background: '#F5EFE0', color: '#5C3D20' }}
            >
              Cancelar
            </button>
            <button
              onClick={addProduct}
              disabled={!form.name.trim() || !form.price}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-40"
              style={{ background: '#2C1A0E', color: '#FDFBF7' }}
            >
              Agregar producto
            </button>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F5EFE0' }}>
        <div
          className="grid text-xs font-semibold tracking-wide uppercase px-6 py-3.5"
          style={{ gridTemplateColumns: '1fr 160px 80px 100px 80px', color: '#7A5230', borderBottom: '1px solid #F5EFE0', background: '#FDFBF7' }}
        >
          <span>Producto</span>
          <span>Categoría</span>
          <span className="text-right">Stock</span>
          <span className="text-right">Precio</span>
          <span />
        </div>

        {displayed.length === 0 ? (
          <div className="py-14 text-center text-sm" style={{ color: '#7A5230' }}>Sin productos</div>
        ) : (
          displayed.map((p, i) => (
            <div
              key={p.id}
              className="grid items-center px-6 py-4"
              style={{ gridTemplateColumns: '1fr 160px 80px 100px 80px', borderTop: i === 0 ? 'none' : '1px solid #FAF7F0' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#FDFBF7')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <p className="text-sm font-medium truncate pr-4" style={{ color: '#2C1A0E' }}>{p.name}</p>
              <p className="text-xs truncate" style={{ color: '#7A5230' }}>{p.category}</p>
              <p className="font-mono text-sm text-right font-semibold" style={{ color: p.stock <= 3 ? '#dc2626' : p.stock <= 8 ? '#C8860A' : '#16a34a' }}>
                {p.stock}
              </p>

              {/* Editable price */}
              <div className="text-right">
                {editingId === p.id ? (
                  <div className="flex items-center justify-end gap-1">
                    <input
                      autoFocus
                      type="number"
                      value={editPrice}
                      onChange={e => setEditPrice(e.target.value)}
                      onBlur={() => commitPrice(p.id)}
                      onKeyDown={e => { if (e.key === 'Enter') commitPrice(p.id); if (e.key === 'Escape') setEditingId(null) }}
                      className="w-20 text-right rounded-lg py-1 px-2 text-sm font-mono font-semibold outline-none"
                      style={{ background: '#FAF7F0', border: '1px solid #C8860A', color: '#2C1A0E' }}
                    />
                    <button onClick={() => commitPrice(p.id)} style={{ color: '#16a34a' }}>
                      <Check size={13} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditingId(p.id); setEditPrice(String(p.price)) }}
                    className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold transition-all group"
                    style={{ color: '#2C1A0E' }}
                  >
                    {fmt(p.price)}
                    <Pencil size={10} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                  </button>
                )}
              </div>

              {/* Delete */}
              <div className="flex justify-end">
                {confirmDelete === p.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-xs px-2 py-1 rounded-lg font-semibold"
                      style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}
                    >
                      Confirmar
                    </button>
                    <button onClick={() => setConfirmDelete(null)} style={{ color: '#7A5230' }}>
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(p.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors opacity-0 hover:opacity-100"
                    style={{ color: '#dc2626' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.08)'; e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.opacity = '0' }}
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <p className="text-xs" style={{ color: 'rgba(122,82,48,0.4)' }}>
        Clic en el precio para editarlo · {products.length} productos en total
      </p>
    </div>
  )
}
