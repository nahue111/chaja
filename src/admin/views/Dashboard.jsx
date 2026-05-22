import { useEffect, useState } from 'react'
import { getProducts, getSales, fmt, fmtDate, fmtTime } from '../data'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])

  useEffect(() => {
    setProducts(getProducts())
    setSales(getSales())
  }, [])

  const now = new Date()
  const thisMonth = sales.filter(s => {
    const d = new Date(s.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const revenue = thisMonth.reduce((sum, s) => sum + s.total, 0)
  const lowStock = products.filter(p => p.stock <= 3)
  const uniqueCustomers = new Set(sales.map(s => s.customer?.email).filter(Boolean)).size
  const recent = sales.slice(0, 5)

  const stats = [
    {
      label: 'Ventas del mes',
      value: fmt(revenue),
      sub: `${thisMonth.length} pedidos`,
      accent: '#C8860A',
      bg: 'rgba(200,134,10,0.06)',
    },
    {
      label: 'Pedidos totales',
      value: sales.length,
      sub: `${thisMonth.length} este mes`,
      accent: '#2C1A0E',
      bg: 'rgba(44,26,14,0.04)',
    },
    {
      label: 'Clientes',
      value: uniqueCustomers,
      sub: 'Registrados',
      accent: '#0f766e',
      bg: 'rgba(15,118,110,0.05)',
    },
    {
      label: 'Stock bajo',
      value: lowStock.length,
      sub: 'Productos ≤ 3 u.',
      accent: '#dc2626',
      bg: 'rgba(220,38,38,0.05)',
    },
  ]

  return (
    <div className="space-y-7">
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <div
            key={s.label}
            className="rounded-2xl p-6"
            style={{ background: s.bg, border: '1px solid rgba(44,26,14,0.06)' }}
          >
            <p className="text-xs font-medium tracking-wide uppercase mb-3" style={{ color: '#7A5230' }}>
              {s.label}
            </p>
            <p className="font-display text-3xl font-semibold leading-none" style={{ color: s.accent }}>
              {s.value}
            </p>
            <p className="text-xs mt-2" style={{ color: '#7A5230' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent sales */}
        <div className="xl:col-span-2 bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F5EFE0' }}>
          <div className="px-6 py-5" style={{ borderBottom: '1px solid #F5EFE0' }}>
            <h2 className="font-display text-base font-semibold" style={{ color: '#2C1A0E' }}>Ventas recientes</h2>
          </div>
          <div>
            {recent.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm" style={{ color: '#7A5230' }}>Sin ventas registradas</div>
            ) : (
              recent.map((sale, i) => (
                <div
                  key={sale.id}
                  className="px-6 py-4 flex items-center gap-4 transition-colors"
                  style={{ borderTop: i === 0 ? 'none' : '1px solid #FAF7F0' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FDFBF7')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-display text-sm font-semibold"
                    style={{ background: 'rgba(200,134,10,0.08)', color: '#C8860A' }}
                  >
                    {sale.customer?.name?.[0] || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#2C1A0E' }}>{sale.customer?.name}</p>
                    <p className="text-xs" style={{ color: '#7A5230' }}>{fmtDate(sale.date)} · {fmtTime(sale.date)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-sm font-semibold" style={{ color: '#2C1A0E' }}>{fmt(sale.total)}</p>
                    <p className="text-xs" style={{ color: '#7A5230' }}>{sale.items?.length ?? 0} ítem{sale.items?.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stock alerts */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F5EFE0' }}>
          <div className="px-6 py-5" style={{ borderBottom: '1px solid #F5EFE0' }}>
            <h2 className="font-display text-base font-semibold" style={{ color: '#2C1A0E' }}>Alertas de stock</h2>
          </div>
          <div>
            {lowStock.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm" style={{ color: '#7A5230' }}>Todo el stock OK</div>
            ) : (
              lowStock.slice(0, 9).map((p, i) => (
                <div
                  key={p.id}
                  className="px-6 py-3 flex items-center justify-between gap-3"
                  style={{ borderTop: i === 0 ? 'none' : '1px solid #FAF7F0' }}
                >
                  <p className="text-sm truncate" style={{ color: '#2C1A0E' }}>{p.name}</p>
                  <span
                    className="font-mono text-sm font-bold flex-shrink-0 px-2 py-0.5 rounded-lg"
                    style={{
                      background: p.stock === 0 ? 'rgba(220,38,38,0.08)' : 'rgba(200,134,10,0.08)',
                      color: p.stock === 0 ? '#dc2626' : '#C8860A',
                    }}
                  >
                    {p.stock} u.
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
