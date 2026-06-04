import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { getSales, updateSaleStatus, STATUSES, fmt, fmtDate, fmtTime } from '../data'

const STATUS_ORDER = ['en_proceso', 'entregado', 'cancelado']

function StatusBadge({ status, onClick }) {
  const s = STATUSES[status] || STATUSES.en_proceso
  return (
    <button
      onClick={e => { e.stopPropagation(); onClick() }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 active:scale-[0.96]"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}22` }}
      title="Clic para cambiar estado"
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
      {s.label}
    </button>
  )
}

export default function Pedidos() {
  const [sales, setSales] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('todos')

  const load = () => setSales(getSales())
  useEffect(() => { load() }, [])

  const cycleStatus = (id, current) => {
    const idx = STATUS_ORDER.indexOf(current ?? 'en_proceso')
    const next = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length]
    updateSaleStatus(id, next)
    load()
  }

  const filtered = sales.filter(s => {
    const matchStatus = filterStatus === 'todos' || s.status === filterStatus
    const q = query.toLowerCase()
    const matchQ = !query || s.customer?.name?.toLowerCase().includes(q) || s.customer?.email?.toLowerCase().includes(q) || s.id?.includes(q)
    return matchStatus && matchQ
  })

  const counts = {
    todos: sales.length,
    en_proceso: sales.filter(s => s.status === 'en_proceso').length,
    entregado: sales.filter(s => s.status === 'entregado').length,
    cancelado: sales.filter(s => s.status === 'cancelado').length,
  }

  return (
    <div className="space-y-5">
      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'todos', label: 'Todos', color: '#2C1A0E', bg: 'rgba(44,26,14,0.06)' },
          { key: 'en_proceso', ...STATUSES.en_proceso },
          { key: 'entregado', ...STATUSES.entregado },
          { key: 'cancelado', ...STATUSES.cancelado },
        ].map(({ key, label, color, bg }) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: filterStatus === key ? (key === 'todos' ? '#2C1A0E' : bg) : 'white',
              color: filterStatus === key ? (key === 'todos' ? '#FDFBF7' : color) : '#7A5230',
              border: filterStatus === key ? `1px solid ${key === 'todos' ? '#2C1A0E' : color + '44'}` : '1px solid #EDE0C8',
              boxShadow: filterStatus === key ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {label ?? (STATUSES[key]?.label)}
            <span
              className="font-mono text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(0,0,0,0.08)' }}
            >
              {counts[key]}
            </span>
          </button>
        ))}
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

      {/* Hint */}
      <p className="text-xs" style={{ color: 'rgba(122,82,48,0.5)' }}>
        Clic en el estado del pedido para cambiarlo · Clic en la fila para ver detalles
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F5EFE0' }}>
        <div
          className="grid text-xs font-semibold tracking-wide uppercase px-6 py-3.5"
          style={{ gridTemplateColumns: '40px 1fr 140px 100px 120px auto', color: '#7A5230', borderBottom: '1px solid #F5EFE0', background: '#FDFBF7' }}
        >
          <span>#</span>
          <span>Cliente</span>
          <span>Fecha</span>
          <span>Total</span>
          <span>Estado</span>
          <span className="w-4" />
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center text-sm" style={{ color: '#7A5230' }}>Sin pedidos</div>
        ) : (
          filtered.map((sale, i) => (
            <div key={sale.id} style={{ borderTop: i === 0 ? 'none' : '1px solid #FAF7F0' }}>
              <button
                onClick={() => setExpanded(expanded === sale.id ? null : sale.id)}
                className="w-full grid items-center px-6 py-4 transition-colors text-left"
                style={{ gridTemplateColumns: '40px 1fr 140px 100px 120px auto' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FDFBF7')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span className="font-mono text-xs" style={{ color: '#7A5230' }}>
                  {String(filtered.length - i).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#2C1A0E' }}>{sale.customer?.name || '—'}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7A5230' }}>{sale.customer?.email}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#2C1A0E' }}>{fmtDate(sale.date)}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7A5230' }}>{fmtTime(sale.date)}</p>
                </div>
                <p className="font-mono text-sm font-semibold" style={{ color: '#2C1A0E' }}>{fmt(sale.total)}</p>
                <StatusBadge
                  status={sale.status || 'en_proceso'}
                  onClick={() => cycleStatus(sale.id, sale.status)}
                />
                <span style={{ color: '#C8860A' }}>
                  {expanded === sale.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              {expanded === sale.id && (
                <div className="px-6 pb-5 pt-1" style={{ background: '#FDFBF7', borderTop: '1px solid #F5EFE0' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Customer */}
                    <div className="rounded-xl p-4" style={{ background: 'white', border: '1px solid #F5EFE0' }}>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#C8860A' }}>Cliente</p>
                      <div className="space-y-2">
                        {[
                          ['Nombre', sale.customer?.name],
                          ['Email', sale.customer?.email],
                          ['Edad', sale.customer?.age ? `${sale.customer.age} años` : '—'],
                        ].map(([label, val]) => (
                          <div key={label} className="flex gap-2">
                            <span className="text-xs w-12 flex-shrink-0 font-medium" style={{ color: '#7A5230' }}>{label}</span>
                            <span className="text-xs" style={{ color: '#2C1A0E' }}>{val || '—'}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery */}
                    <div className="rounded-xl p-4" style={{ background: 'white', border: '1px solid #F5EFE0' }}>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#C8860A' }}>Envío</p>
                      <p className="text-sm" style={{ color: '#2C1A0E' }}>{sale.customer?.address || '—'}</p>
                      <div className="mt-3 pt-3" style={{ borderTop: '1px solid #F5EFE0' }}>
                        <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-2" style={{ color: '#7A5230' }}>Estado actual</p>
                        <StatusBadge
                          status={sale.status || 'en_proceso'}
                          onClick={() => cycleStatus(sale.id, sale.status)}
                        />
                        <p className="text-[10px] mt-2" style={{ color: 'rgba(122,82,48,0.5)' }}>Clic para cambiar</p>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="rounded-xl p-4" style={{ background: 'white', border: '1px solid #F5EFE0' }}>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#C8860A' }}>Productos</p>
                      <div className="space-y-2">
                        {sale.items?.map((item, j) => (
                          <div key={j} className="flex items-center justify-between">
                            <p className="text-xs flex-1 pr-2" style={{ color: '#2C1A0E' }}>
                              {item.name} <span style={{ color: '#7A5230' }}>×{item.qty}</span>
                            </p>
                            <p className="font-mono text-xs font-semibold flex-shrink-0" style={{ color: '#5C3D20' }}>
                              {fmt(item.price * item.qty)}
                            </p>
                          </div>
                        ))}
                        <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #EDE0C8' }}>
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
