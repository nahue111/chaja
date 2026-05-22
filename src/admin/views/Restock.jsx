import { useEffect, useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { getRestocks, fmtDate, fmtTime } from '../data'
import RestockModal from '../RestockModal'

export default function Restock() {
  const [restocks, setRestocks] = useState([])
  const [showModal, setShowModal] = useState(false)

  const load = () => setRestocks(getRestocks())
  useEffect(() => { load() }, [])

  const totalUnits = restocks.reduce(
    (sum, r) => sum + r.items.reduce((s, i) => s + i.qty, 0), 0
  )

  return (
    <>
      {showModal && (
        <RestockModal onClose={() => setShowModal(false)} onDone={load} />
      )}

      <div className="space-y-5">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-4 px-5 py-4 rounded-2xl"
            style={{ background: 'rgba(44,26,14,0.04)', border: '1px solid rgba(44,26,14,0.06)' }}
          >
            <div>
              <p className="text-xs font-medium tracking-wide uppercase" style={{ color: '#7A5230' }}>Eventos registrados</p>
              <p className="font-display text-2xl font-semibold mt-0.5" style={{ color: '#2C1A0E' }}>{restocks.length}</p>
            </div>
            <div style={{ width: 1, height: 36, background: '#EDE0C8' }} />
            <div>
              <p className="text-xs font-medium tracking-wide uppercase" style={{ color: '#7A5230' }}>Unidades repuestas</p>
              <p className="font-display text-2xl font-semibold mt-0.5" style={{ color: '#2C1A0E' }}>{totalUnits}</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
            style={{ background: '#2C1A0E', color: '#FDFBF7' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#3D2714')}
            onMouseLeave={e => (e.currentTarget.style.background = '#2C1A0E')}
          >
            <RefreshCcw size={13} strokeWidth={2} />
            Nuevo Restock
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F5EFE0' }}>
          <div
            className="grid text-xs font-semibold tracking-wide uppercase px-6 py-3.5"
            style={{ gridTemplateColumns: '160px 1fr auto', color: '#7A5230', borderBottom: '1px solid #F5EFE0', background: '#FDFBF7' }}
          >
            <span>Fecha</span>
            <span>Productos repuestos</span>
            <span>Total u.</span>
          </div>

          {restocks.length === 0 ? (
            <div className="py-14 text-center text-sm" style={{ color: '#7A5230' }}>Sin eventos de restock</div>
          ) : (
            restocks.map((r, i) => {
              const total = r.items.reduce((s, item) => s + item.qty, 0)
              return (
                <div
                  key={r.id}
                  className="grid items-start px-6 py-4"
                  style={{ gridTemplateColumns: '160px 1fr auto', borderTop: i === 0 ? 'none' : '1px solid #FAF7F0' }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#2C1A0E' }}>{fmtDate(r.date)}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#7A5230' }}>{fmtTime(r.date)}</p>
                    {r.note && (
                      <p className="text-xs mt-1 italic" style={{ color: '#7A5230' }}>{r.note}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pr-4">
                    {r.items.map(item => (
                      <span
                        key={item.id}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: '#FAF7F0', color: '#5C3D20', border: '1px solid #EDE0C8' }}
                      >
                        {item.name} <span className="font-mono font-semibold" style={{ color: '#C8860A' }}>+{item.qty}</span>
                      </span>
                    ))}
                  </div>
                  <span
                    className="font-mono text-sm font-bold px-3 py-1 rounded-xl"
                    style={{ background: 'rgba(44,26,14,0.05)', color: '#2C1A0E', whiteSpace: 'nowrap' }}
                  >
                    +{total} u.
                  </span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}
