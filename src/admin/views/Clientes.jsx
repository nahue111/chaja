import { useEffect, useState } from 'react'
import { Search, Mail, MapPin } from 'lucide-react'
import { getCustomers, fmt, fmtDate } from '../data'

export default function Clientes() {
  const [customers, setCustomers] = useState([])
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { setCustomers(getCustomers()) }, [])

  const filtered = customers.filter(c => {
    if (!query) return true
    const q = query.toLowerCase()
    return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
  })

  const totalSpent = filtered.reduce((s, c) => s + c.totalSpent, 0)

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Clientes registrados', value: customers.length },
          { label: 'Total facturado', value: fmt(customers.reduce((s, c) => s + c.totalSpent, 0)) },
          { label: 'Pedido promedio', value: customers.length ? fmt(Math.round(customers.reduce((s, c) => s + c.totalSpent, 0) / customers.length)) : '—' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5" style={{ background: 'rgba(44,26,14,0.04)', border: '1px solid rgba(44,26,14,0.06)' }}>
            <p className="text-xs font-medium tracking-wide uppercase" style={{ color: '#7A5230' }}>{s.label}</p>
            <p className="font-display text-2xl font-semibold mt-1" style={{ color: '#2C1A0E' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#7A5230' }} />
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: 'white', border: '1px solid #EDE0C8', color: '#2C1A0E' }}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F5EFE0' }}>
        <div
          className="grid text-xs font-semibold tracking-wide uppercase px-6 py-3.5"
          style={{
            gridTemplateColumns: '2fr 2fr 60px 80px 100px',
            color: '#7A5230',
            borderBottom: '1px solid #F5EFE0',
            background: '#FDFBF7',
          }}
        >
          <span>Nombre</span>
          <span>Email</span>
          <span className="text-center">Edad</span>
          <span className="text-center">Pedidos</span>
          <span className="text-right">Total</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center text-sm" style={{ color: '#7A5230' }}>Sin clientes registrados</div>
        ) : (
          filtered.map((c, i) => (
            <div key={c.email} style={{ borderTop: i === 0 ? 'none' : '1px solid #FAF7F0' }}>
              <button
                onClick={() => setExpanded(expanded === c.email ? null : c.email)}
                className="w-full grid items-center px-6 py-4 transition-colors text-left"
                style={{ gridTemplateColumns: '2fr 2fr 60px 80px 100px' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FDFBF7')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-display text-sm font-semibold"
                    style={{ background: 'rgba(200,134,10,0.08)', color: '#C8860A' }}
                  >
                    {c.name?.[0] || '?'}
                  </div>
                  <p className="text-sm font-medium truncate" style={{ color: '#2C1A0E' }}>{c.name}</p>
                </div>
                <p className="text-sm truncate pr-4" style={{ color: '#5C3D20' }}>{c.email}</p>
                <p className="text-sm text-center" style={{ color: '#5C3D20' }}>{c.age ?? '—'}</p>
                <p className="font-mono text-sm font-semibold text-center" style={{ color: '#2C1A0E' }}>{c.orders}</p>
                <p className="font-mono text-sm font-semibold text-right" style={{ color: '#C8860A' }}>{fmt(c.totalSpent)}</p>
              </button>

              {expanded === c.email && (
                <div className="px-6 pb-4" style={{ background: '#FDFBF7', borderTop: '1px solid #F5EFE0' }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <div className="rounded-xl p-4 space-y-2" style={{ background: 'white', border: '1px solid #F5EFE0' }}>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#C8860A' }}>Información</p>
                      {[
                        ['Nombre completo', c.name],
                        ['Email', c.email],
                        ['Edad', c.age ? `${c.age} años` : '—'],
                        ['Último pedido', c.lastOrder ? fmtDate(c.lastOrder) : '—'],
                      ].map(([label, val]) => (
                        <div key={label} className="flex gap-3">
                          <span className="text-xs w-24 flex-shrink-0 font-medium" style={{ color: '#7A5230' }}>{label}</span>
                          <span className="text-xs" style={{ color: '#2C1A0E' }}>{val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl p-4" style={{ background: 'white', border: '1px solid #F5EFE0' }}>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#C8860A' }}>Dirección de envío</p>
                      <div className="flex items-start gap-2">
                        <MapPin size={12} className="flex-shrink-0 mt-0.5" style={{ color: '#C8860A' }} />
                        <p className="text-sm" style={{ color: '#2C1A0E' }}>{c.address || '—'}</p>
                      </div>
                      <div className="mt-4 pt-3" style={{ borderTop: '1px solid #F5EFE0' }}>
                        <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-2" style={{ color: '#7A5230' }}>Resumen</p>
                        <div className="flex gap-6">
                          <div>
                            <p className="text-xs" style={{ color: '#7A5230' }}>Pedidos</p>
                            <p className="font-mono text-lg font-bold" style={{ color: '#2C1A0E' }}>{c.orders}</p>
                          </div>
                          <div>
                            <p className="text-xs" style={{ color: '#7A5230' }}>Total gastado</p>
                            <p className="font-mono text-lg font-bold" style={{ color: '#C8860A' }}>{fmt(c.totalSpent)}</p>
                          </div>
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
