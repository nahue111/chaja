import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { getSales, fmt, fmtDate, fmtTime } from '../data'

export default function Ventas() {
  const [sales, setSales] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => { setSales(getSales()) }, [])

  const filtered = sales.filter(s => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      s.customer?.name?.toLowerCase().includes(q) ||
      s.customer?.email?.toLowerCase().includes(q) ||
      s.id?.toLowerCase().includes(q)
    )
  })

  const total = filtered.reduce((s, v) => s + v.total, 0)

  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl" style={{ background: 'rgba(200,134,10,0.06)', border: '1px solid rgba(200,134,10,0.12)' }}>
        <div>
          <p className="text-xs font-medium tracking-wide uppercase" style={{ color: '#C8860A' }}>Total de ventas mostradas</p>
          <p className="font-display text-2xl font-semibold mt-1" style={{ color: '#2C1A0E' }}>{fmt(total)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: '#7A5230' }}>{filtered.length} pedido{filtered.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#7A5230' }} />
        <input
          type="text"
          placeholder="Buscar por cliente, email o ID..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: 'white', border: '1px solid #EDE0C8', color: '#2C1A0E' }}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F5EFE0' }}>
        {/* Header */}
        <div
          className="grid text-xs font-semibold tracking-wide uppercase px-6 py-3.5"
          style={{ gridTemplateColumns: '1fr 1fr 1fr auto', color: '#7A5230', borderBottom: '1px solid #F5EFE0', background: '#FDFBF7' }}
        >
          <span>Cliente</span>
          <span>Fecha y hora</span>
          <span>Total</span>
          <span className="w-6" />
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center text-sm" style={{ color: '#7A5230' }}>Sin ventas</div>
        ) : (
          filtered.map((sale, i) => (
            <div key={sale.id} style={{ borderTop: i === 0 ? 'none' : '1px solid #FAF7F0' }}>
              {/* Row */}
              <button
                onClick={() => setExpanded(expanded === sale.id ? null : sale.id)}
                className="w-full grid items-center px-6 py-4 transition-colors text-left"
                style={{ gridTemplateColumns: '1fr 1fr 1fr auto' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FDFBF7')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: '#2C1A0E' }}>{sale.customer?.name || '—'}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7A5230' }}>{sale.customer?.email || '—'}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#2C1A0E' }}>{fmtDate(sale.date)}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7A5230' }}>{fmtTime(sale.date)}</p>
                </div>
                <div>
                  <p className="font-mono text-sm font-semibold" style={{ color: '#2C1A0E' }}>{fmt(sale.total)}</p>
                  {sale.shipping > 0 && (
                    <p className="text-xs mt-0.5" style={{ color: '#7A5230' }}>+ {fmt(sale.shipping)} envío</p>
                  )}
                </div>
                <div style={{ color: '#C8860A' }}>
                  {expanded === sale.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </button>

              {/* Expanded */}
              {expanded === sale.id && (
                <div className="px-6 pb-5 pt-1" style={{ background: '#FDFBF7', borderTop: '1px solid #F5EFE0' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Customer info */}
                    <div className="rounded-xl p-4 space-y-2" style={{ background: 'white', border: '1px solid #F5EFE0' }}>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#C8860A' }}>Datos del cliente</p>
                      {[
                        ['Nombre', sale.customer?.name],
                        ['Email', sale.customer?.email],
                        ['Edad', sale.customer?.age ? `${sale.customer.age} años` : '—'],
                        ['Dirección', sale.customer?.address],
                      ].map(([label, val]) => (
                        <div key={label} className="flex gap-3">
                          <span className="text-xs w-16 flex-shrink-0 font-medium" style={{ color: '#7A5230' }}>{label}</span>
                          <span className="text-xs" style={{ color: '#2C1A0E' }}>{val || '—'}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order items */}
                    <div className="rounded-xl p-4" style={{ background: 'white', border: '1px solid #F5EFE0' }}>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#C8860A' }}>Productos</p>
                      <div className="space-y-2">
                        {sale.items?.map((item, j) => (
                          <div key={j} className="flex items-center justify-between gap-2">
                            <p className="text-xs flex-1" style={{ color: '#2C1A0E' }}>
                              {item.name} <span style={{ color: '#7A5230' }}>×{item.qty}</span>
                            </p>
                            <p className="font-mono text-xs font-semibold flex-shrink-0" style={{ color: '#5C3D20' }}>
                              {fmt(item.price * item.qty)}
                            </p>
                          </div>
                        ))}
                        {sale.shipping > 0 && (
                          <div className="flex items-center justify-between gap-2 pt-2" style={{ borderTop: '1px solid #F5EFE0' }}>
                            <p className="text-xs" style={{ color: '#7A5230' }}>Envío</p>
                            <p className="font-mono text-xs" style={{ color: '#7A5230' }}>{fmt(sale.shipping)}</p>
                          </div>
                        )}
                        <div className="flex items-center justify-between gap-2 pt-2" style={{ borderTop: '1px solid #EDE0C8' }}>
                          <p className="text-xs font-semibold" style={{ color: '#2C1A0E' }}>Total</p>
                          <p className="font-mono text-sm font-bold" style={{ color: '#C8860A' }}>{fmt(sale.total)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
