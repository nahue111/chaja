import { useEffect, useState } from 'react'
import { getSales, getProducts, STATUSES, fmt } from '../data'

function Bar({ label, value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <p className="text-xs w-28 flex-shrink-0 truncate" style={{ color: '#5C3D20' }}>{label}</p>
      <div className="flex-1 rounded-full overflow-hidden" style={{ background: '#F5EFE0', height: 8 }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <p className="font-mono text-xs font-semibold w-20 text-right flex-shrink-0" style={{ color: '#2C1A0E' }}>{fmt(value)}</p>
    </div>
  )
}

export default function Metricas() {
  const [sales, setSales] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    setSales(getSales())
    setProducts(getProducts())
  }, [])

  const now = new Date()
  const thisMonth = sales.filter(s => {
    const d = new Date(s.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const totalRevenue = sales.reduce((s, v) => s + v.total, 0)
  const monthRevenue = thisMonth.reduce((s, v) => s + v.total, 0)
  const avgOrder = sales.length ? Math.round(totalRevenue / sales.length) : 0
  const deliveryRate = sales.length ? Math.round((sales.filter(s => s.status === 'entregado').length / sales.length) * 100) : 0

  const statusCounts = {
    en_proceso: sales.filter(s => s.status === 'en_proceso').length,
    entregado: sales.filter(s => s.status === 'entregado').length,
    cancelado: sales.filter(s => s.status === 'cancelado').length,
  }

  // Revenue by product
  const revenueByProduct = {}
  sales.forEach(sale => {
    sale.items?.forEach(item => {
      revenueByProduct[item.name] = (revenueByProduct[item.name] || 0) + item.price * item.qty
    })
  })
  const topProducts = Object.entries(revenueByProduct)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
  const maxProductRevenue = topProducts[0]?.[1] || 1

  // Revenue by category
  const revenueByCategory = {}
  sales.forEach(sale => {
    sale.items?.forEach(item => {
      const product = products.find(p => p.id === item.id)
      const cat = product?.category || 'Otro'
      revenueByCategory[cat] = (revenueByCategory[cat] || 0) + item.price * item.qty
    })
  })
  const topCategories = Object.entries(revenueByCategory).sort((a, b) => b[1] - a[1])
  const maxCatRevenue = topCategories[0]?.[1] || 1

  // Sales by day (last 7 days)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d
  })
  const salesByDay = days.map(d => {
    const key = d.toLocaleDateString('es-UY', { weekday: 'short', day: 'numeric' })
    const total = sales
      .filter(s => {
        const sd = new Date(s.date)
        return sd.getDate() === d.getDate() && sd.getMonth() === d.getMonth()
      })
      .reduce((sum, s) => sum + s.total, 0)
    return { key, total }
  })
  const maxDay = Math.max(...salesByDay.map(d => d.total), 1)

  const kpis = [
    { label: 'Facturación total', value: fmt(totalRevenue), sub: 'Todos los tiempos' },
    { label: 'Este mes', value: fmt(monthRevenue), sub: `${thisMonth.length} pedidos` },
    { label: 'Ticket promedio', value: fmt(avgOrder), sub: 'Por pedido' },
    { label: 'Tasa de entrega', value: `${deliveryRate}%`, sub: 'Pedidos entregados' },
  ]

  return (
    <div className="space-y-7">
      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-2xl p-5" style={{ border: '1px solid #F5EFE0' }}>
            <p className="text-xs font-medium tracking-wide uppercase mb-2" style={{ color: '#7A5230' }}>{k.label}</p>
            <p className="font-display text-2xl font-semibold" style={{ color: '#2C1A0E' }}>{k.value}</p>
            <p className="text-xs mt-1" style={{ color: '#7A5230' }}>{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* State donut */}
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #F5EFE0' }}>
          <h3 className="font-display text-base font-semibold mb-5" style={{ color: '#2C1A0E' }}>Estado de pedidos</h3>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([key, count]) => {
              const s = STATUSES[key]
              const pct = sales.length ? Math.round((count / sales.length) * 100) : 0
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-sm" style={{ color: '#2C1A0E' }}>{s.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold" style={{ color: '#7A5230' }}>{pct}%</span>
                      <span
                        className="font-mono text-sm font-bold px-2.5 py-0.5 rounded-lg"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {count}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ background: '#F5EFE0', height: 6 }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: s.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Ventas por día */}
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #F5EFE0' }}>
          <h3 className="font-display text-base font-semibold mb-5" style={{ color: '#2C1A0E' }}>Ventas últimos 7 días</h3>
          <div className="flex items-end gap-2 h-32">
            {salesByDay.map(({ key, total }) => {
              const h = maxDay > 0 ? (total / maxDay) * 100 : 0
              return (
                <div key={key} className="flex-1 flex flex-col items-center gap-1.5">
                  <p className="font-mono text-[9px] font-semibold" style={{ color: total > 0 ? '#C8860A' : 'transparent' }}>
                    {total > 0 ? fmt(total).replace('$ ', '') : '·'}
                  </p>
                  <div className="w-full rounded-t-lg transition-all duration-700" style={{ height: `${Math.max(h, 4)}%`, background: total > 0 ? '#C8860A' : '#F5EFE0', minHeight: 4 }} />
                  <p className="text-[9px] capitalize text-center leading-tight" style={{ color: '#7A5230' }}>{key}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top productos */}
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #F5EFE0' }}>
          <h3 className="font-display text-base font-semibold mb-5" style={{ color: '#2C1A0E' }}>Top productos por facturación</h3>
          <div className="space-y-3">
            {topProducts.map(([name, value]) => (
              <Bar key={name} label={name} value={value} max={maxProductRevenue} color="#C8860A" />
            ))}
            {topProducts.length === 0 && <p className="text-sm text-center py-4" style={{ color: '#7A5230' }}>Sin datos</p>}
          </div>
        </div>

        {/* Top categorías */}
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #F5EFE0' }}>
          <h3 className="font-display text-base font-semibold mb-5" style={{ color: '#2C1A0E' }}>Facturación por categoría</h3>
          <div className="space-y-3">
            {topCategories.map(([cat, value]) => (
              <Bar key={cat} label={cat} value={value} max={maxCatRevenue} color="#5C3D20" />
            ))}
            {topCategories.length === 0 && <p className="text-sm text-center py-4" style={{ color: '#7A5230' }}>Sin datos</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
