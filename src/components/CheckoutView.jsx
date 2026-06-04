import { useState } from 'react'
import { ArrowLeft, Truck, Store, CheckCircle, Medal } from 'lucide-react'
import { useCart, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const fmt = (n) => `$ ${n.toLocaleString('es-UY')}`

export default function CheckoutView() {
  const { items, totalPrice, shipping, setCheckoutOpen, setOpen, checkoutOpen } = useCart()
  const { user, earnMedals, medals, medalProgress, redeemMedals } = useAuth()
  const [delivery, setDelivery] = useState('envio')
  const [confirmed, setConfirmed] = useState(false)
  const [earnedResult, setEarnedResult] = useState({ newMedals: 0, totalMedals: 0, progress: 0, usedMedals: 0 })
  const [couponInput, setCouponInput] = useState('')
  const [coupon, setCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [usingMedals, setUsingMedals] = useState(false)

  const VALID_COUPONS = { 'CHAJA10': { label: '10% de descuento', pct: 0.10 }, 'BISTRO15': { label: '15% de descuento', pct: 0.15 } }

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase()
    if (VALID_COUPONS[code]) {
      setCoupon({ code, ...VALID_COUPONS[code] })
      setCouponError('')
    } else {
      setCoupon(null)
      setCouponError('Cupón inválido o expirado')
    }
  }

  const discount = coupon ? Math.round(totalPrice * coupon.pct) : 0
  const effectiveShipping = delivery === 'retiro' ? 0 : shipping
  const baseTotal = totalPrice - discount + effectiveShipping
  const maxRedeemable = user && medals > 0 ? Math.min(medals, Math.floor(baseTotal / 60)) : 0
  const medalDiscount = usingMedals && maxRedeemable > 0 ? maxRedeemable * 60 : 0
  const effectiveTotal = baseTotal - medalDiscount
  const medalsToEarn = Math.floor((medalProgress + effectiveTotal) / 60)

  if (!checkoutOpen) return null

  const handleBack = () => {
    setCheckoutOpen(false)
    setOpen(true)
  }

  if (confirmed) {
    const { newMedals, totalMedals, progress, usedMedals } = earnedResult
    return (
      <div className="fixed inset-0 bg-cream-50 z-[55] flex items-center justify-center p-6">
        <div className="text-center max-w-sm w-full">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-5" strokeWidth={1.5} />
          <h2 className="font-display text-3xl text-espresso-800 font-semibold mb-2">¡Pedido recibido!</h2>
          <p className="text-espresso-500 text-sm leading-relaxed mb-1">
            Gracias, <span className="font-medium text-espresso-700">{user?.name}</span>. Tu pedido fue registrado con éxito.
          </p>
          <p className="text-espresso-400 text-xs mb-6">En breve nos contactamos por WhatsApp para coordinar la entrega.</p>

          {user && (
            <div className="rounded-2xl px-6 py-5 mb-6 text-left space-y-3" style={{ background: 'rgba(200,134,10,0.07)', border: '1px solid rgba(200,134,10,0.18)' }}>
              <div className="flex items-center gap-2">
                <Medal size={14} strokeWidth={1.5} style={{ color: '#C8860A' }} />
                <p className="text-sm font-semibold" style={{ color: '#C8860A' }}>Tus medallas</p>
              </div>

              {usedMedals > 0 && (
                <div className="flex justify-between text-xs" style={{ color: '#5C3D20' }}>
                  <span>Usadas como descuento</span>
                  <span className="font-mono font-bold">−{usedMedals}</span>
                </div>
              )}
              {newMedals > 0 && (
                <div className="flex justify-between text-xs" style={{ color: '#5C3D20' }}>
                  <span>Ganadas en esta compra</span>
                  <span className="font-mono font-bold" style={{ color: '#C8860A' }}>+{newMedals}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold pt-1" style={{ borderTop: '1px solid rgba(200,134,10,0.15)', color: '#2C1A0E' }}>
                <span>Saldo actual</span>
                <span className="font-mono">{totalMedals} medalla{totalMedals !== 1 ? 's' : ''}</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5" style={{ color: '#7A5230' }}>
                  <span>Progreso a la próxima</span>
                  <span className="font-mono">{progress}/60 pesos</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ background: 'rgba(200,134,10,0.15)', height: 5 }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(progress / 60) * 100}%`, background: '#C8860A' }} />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => { setCheckoutOpen(false); setConfirmed(false) }}
            className="px-8 py-3 rounded-full bg-espresso-800 text-cream-50 text-sm font-medium hover:bg-espresso-700 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-cream-100 z-[55] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-cream-50/95 backdrop-blur-md border-b border-cream-200 z-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-espresso-600 hover:text-espresso-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Volver al carrito
          </button>
          <a href="#" className="flex items-center gap-2">
            <img src="/logo.png" alt="Chajá Bistro" className="w-7 h-7 rounded-full object-cover" />
            <span className="font-display text-lg font-semibold text-espresso-800">
              Chajá
            </span>
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="block w-5 h-px bg-amber" />
            <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Paso final</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-espresso-800 font-semibold">Finalizar compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">

          {/* Left: form */}
          <div className="space-y-6">

            {/* Delivery method */}
            <div className="bg-white rounded-2xl p-6 border border-cream-200/60">
              <h2 className="font-display text-lg text-espresso-800 font-semibold mb-4">Método de entrega</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setDelivery('envio')}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    delivery === 'envio'
                      ? 'border-espresso-800 bg-espresso-800/5'
                      : 'border-cream-200 hover:border-espresso-300'
                  }`}
                >
                  <Truck size={20} className={delivery === 'envio' ? 'text-espresso-800 mt-0.5' : 'text-espresso-400 mt-0.5'} strokeWidth={1.5} />
                  <div>
                    <p className={`text-sm font-semibold ${delivery === 'envio' ? 'text-espresso-800' : 'text-espresso-600'}`}>Envío a domicilio</p>
                    <p className="text-xs text-espresso-400 mt-0.5">
                      {totalPrice >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="text-green-600 font-medium">Gratis</span>
                      ) : (
                        fmt(SHIPPING_COST)
                      )}
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setDelivery('retiro')}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    delivery === 'retiro'
                      ? 'border-espresso-800 bg-espresso-800/5'
                      : 'border-cream-200 hover:border-espresso-300'
                  }`}
                >
                  <Store size={20} className={delivery === 'retiro' ? 'text-espresso-800 mt-0.5' : 'text-espresso-400 mt-0.5'} strokeWidth={1.5} />
                  <div>
                    <p className={`text-sm font-semibold ${delivery === 'retiro' ? 'text-espresso-800' : 'text-espresso-600'}`}>Retiro en local</p>
                    <p className="text-xs text-green-600 font-medium mt-0.5">Gratis</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white rounded-2xl p-6 border border-cream-200/60">
              <h2 className="font-display text-lg text-espresso-800 font-semibold mb-4">Datos de contacto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-espresso-500 mb-1.5 font-medium tracking-wide uppercase">Nombre</label>
                  <input
                    type="text"
                    defaultValue={user?.name === 'prueba' ? '' : user?.name}
                    className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 text-espresso-800 text-sm outline-none focus:border-espresso-400 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-xs text-espresso-500 mb-1.5 font-medium tracking-wide uppercase">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 text-espresso-800 text-sm outline-none focus:border-espresso-400 transition-colors"
                    placeholder="09X XXX XXX"
                  />
                </div>
                {delivery === 'envio' && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-espresso-500 mb-1.5 font-medium tracking-wide uppercase">Dirección de entrega</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 text-espresso-800 text-sm outline-none focus:border-espresso-400 transition-colors"
                      placeholder="Calle, número, barrio"
                    />
                  </div>
                )}
                <div className="sm:col-span-2">
                  <label className="block text-xs text-espresso-500 mb-1.5 font-medium tracking-wide uppercase">Notas (opcional)</label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 text-espresso-800 text-sm outline-none focus:border-espresso-400 transition-colors resize-none"
                    placeholder="Instrucciones especiales, horario preferido..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-cream-200/60 overflow-hidden sticky top-24">
              <div className="px-6 py-5 border-b border-cream-200">
                <h2 className="font-display text-lg text-espresso-800 font-semibold">Resumen del pedido</h2>
              </div>

              <ul className="divide-y divide-cream-100 max-h-72 overflow-y-auto">
                {items.map(item => (
                  <li key={item.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream-100">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-espresso-800 text-cream-50 text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-espresso-800 font-medium truncate">{item.name}</p>
                      <p className="text-xs text-espresso-400">{item.weight}</p>
                    </div>
                    <span className="font-mono text-sm text-espresso-700 shrink-0">{fmt(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>

              {/* Coupon */}
              <div className="px-6 py-4 border-t border-cream-200">
                <p className="text-xs text-espresso-500 font-medium tracking-wide uppercase mb-2">Cupón de descuento</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => { setCouponInput(e.target.value); setCouponError('') }}
                    onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                    placeholder="Ingresá tu código"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-cream-200 bg-cream-50 text-espresso-800 text-sm outline-none focus:border-espresso-400 transition-colors placeholder-espresso-300"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2.5 rounded-xl bg-espresso-800 text-cream-50 text-xs font-medium hover:bg-espresso-700 transition-colors active:scale-[0.98] shrink-0"
                  >
                    Aplicar
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-xs mt-1.5">{couponError}</p>}
                {coupon && (
                  <div className="flex items-center justify-between mt-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl">
                    <div>
                      <p className="text-green-700 text-xs font-semibold">{coupon.code}</p>
                      <p className="text-green-600 text-xs">{coupon.label}</p>
                    </div>
                    <button onClick={() => { setCoupon(null); setCouponInput('') }} className="text-green-500 hover:text-green-700 text-xs underline">
                      Quitar
                    </button>
                  </div>
                )}
              </div>

              {/* Medals section */}
              {user && (
                <div className="px-6 py-4 border-t border-cream-200">
                  {medals > 0 ? (
                    <div
                      className="rounded-xl p-3.5"
                      style={{ background: usingMedals ? 'rgba(200,134,10,0.08)' : 'rgba(200,134,10,0.04)', border: `1px solid ${usingMedals ? 'rgba(200,134,10,0.25)' : 'rgba(200,134,10,0.12)'}` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Medal size={13} strokeWidth={2} style={{ color: '#C8860A' }} />
                          <span className="text-sm font-medium" style={{ color: '#2C1A0E' }}>
                            {medals} medalla{medals !== 1 ? 's' : ''} disponibles
                          </span>
                          <span className="text-xs" style={{ color: '#7A5230' }}>= {fmt(maxRedeemable * 60)} de descuento</span>
                        </div>
                        <button
                          onClick={() => setUsingMedals(v => !v)}
                          className="relative w-10 h-5.5 rounded-full transition-colors duration-200 flex-shrink-0"
                          style={{ background: usingMedals ? '#C8860A' : '#D4C5AB', width: 40, height: 22 }}
                        >
                          <span
                            className="absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform duration-200"
                            style={{ width: 18, height: 18, top: 2, left: usingMedals ? 20 : 2 }}
                          />
                        </button>
                      </div>
                      {usingMedals && (
                        <p className="text-xs mt-2 font-medium" style={{ color: '#C8860A' }}>
                          − {fmt(medalDiscount)} aplicado · usás {maxRedeemable} medalla{maxRedeemable !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Medal size={12} strokeWidth={2} style={{ color: '#C8860A' }} />
                      <p className="text-xs" style={{ color: '#7A5230' }}>
                        Ganarás <span className="font-semibold" style={{ color: '#C8860A' }}>+{medalsToEarn} medalla{medalsToEarn !== 1 ? 's' : ''}</span> con esta compra
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="px-6 py-5 space-y-3 border-t border-cream-200 bg-cream-50/50">
                <div className="flex justify-between text-sm">
                  <span className="text-espresso-500">Subtotal</span>
                  <span className="font-mono text-espresso-700">{fmt(totalPrice)}</span>
                </div>
                {coupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Descuento ({coupon.label})</span>
                    <span className="font-mono text-green-600">− {fmt(discount)}</span>
                  </div>
                )}
                {medalDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#C8860A' }}>Medallas ({maxRedeemable}×$60)</span>
                    <span className="font-mono" style={{ color: '#C8860A' }}>− {fmt(medalDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-espresso-500">Envío</span>
                  {effectiveShipping === 0 ? (
                    <span className="text-green-600 font-medium text-xs">Gratis</span>
                  ) : (
                    <span className="font-mono text-espresso-700">{fmt(effectiveShipping)}</span>
                  )}
                </div>
                {totalPrice < FREE_SHIPPING_THRESHOLD && delivery === 'envio' && (
                  <p className="text-xs text-espresso-400">
                    Agregá <span className="font-medium text-espresso-600">{fmt(FREE_SHIPPING_THRESHOLD - totalPrice)}</span> más para envío gratis
                  </p>
                )}
                <div className="pt-3 border-t border-cream-200 flex justify-between items-center">
                  <span className="font-display text-base text-espresso-800 font-semibold">Total</span>
                  <span className="font-mono text-xl font-semibold text-espresso-800">{fmt(effectiveTotal)}</span>
                </div>
                {user && medals === 0 && medalsToEarn > 0 && (
                  <div className="flex items-center gap-1.5 pt-1">
                    <Medal size={11} strokeWidth={2} style={{ color: '#C8860A' }} />
                    <p className="text-xs" style={{ color: '#7A5230' }}>
                      Ganarás <span className="font-semibold" style={{ color: '#C8860A' }}>+{medalsToEarn} medalla{medalsToEarn !== 1 ? 's' : ''}</span> con esta compra
                    </p>
                  </div>
                )}
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={() => {
                    if (usingMedals && maxRedeemable > 0) redeemMedals(maxRedeemable)
                    const result = earnMedals(effectiveTotal)
                    setEarnedResult({ ...result, usedMedals: usingMedals ? maxRedeemable : 0 })
                    setConfirmed(true)
                  }}
                  className="w-full py-3.5 rounded-full bg-espresso-800 text-cream-50 text-sm font-medium hover:bg-espresso-700 transition-colors active:scale-[0.98] shadow-md"
                >
                  Confirmar pedido
                </button>
                <p className="text-xs text-center text-espresso-400 mt-3">
                  Al confirmar, Juan Manuel se pondrá en contacto por WhatsApp.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
