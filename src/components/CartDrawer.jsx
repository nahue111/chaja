import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCart, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const fmt = (n) => `$ ${n.toLocaleString('es-UY')}`

export default function CartDrawer() {
  const { items, remove, updateQty, totalItems, totalPrice, open, setOpen, setCheckoutOpen, setCatalogOpen } = useCart()
  const { user, setLoginOpen } = useAuth()

  const remaining = FREE_SHIPPING_THRESHOLD - totalPrice

  const handleClose = () => setOpen(false)

  const handleCheckout = () => {
    if (!user) {
      setLoginOpen(true)
      return
    }
    setOpen(false)
    setCheckoutOpen(true)
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-espresso-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />

      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-cream-50 z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-espresso-800" strokeWidth={1.5} />
            <h2 className="font-display text-lg text-espresso-800 font-semibold">Tu pedido</h2>
            {totalItems > 0 && (
              <span className="text-xs font-mono text-amber bg-amber/10 px-2 py-0.5 rounded-full">{totalItems}</span>
            )}
          </div>
          <button onClick={handleClose} className="p-2 text-espresso-400 hover:text-espresso-700 transition-colors rounded-full hover:bg-cream-100">
            <X size={18} />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && remaining > 0 && (
          <div className="px-6 py-3 bg-amber/5 border-b border-amber/10">
            <p className="text-xs text-espresso-600">
              Te faltan <span className="font-semibold text-espresso-800">{fmt(remaining)}</span> para envío gratis
            </p>
            <div className="mt-2 h-1.5 bg-cream-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
        {items.length > 0 && remaining <= 0 && (
          <div className="px-6 py-3 bg-green-50 border-b border-green-100">
            <p className="text-xs text-green-700 font-medium">¡Envío gratis aplicado!</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={40} className="text-cream-300" strokeWidth={1} />
              <p className="text-espresso-400 text-sm">Tu carrito está vacío</p>
              <button onClick={handleClose} className="text-xs text-amber underline underline-offset-2">
                Ver productos
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex gap-4 pb-4 border-b border-cream-200 last:border-0 last:pb-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-cream-100">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-espresso-800 leading-snug mb-0.5 truncate">{item.name}</p>
                    <p className="text-xs text-espresso-400 mb-2">{fmt(item.price)} c/u</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded-full border border-cream-200 flex items-center justify-center text-espresso-500 hover:border-espresso-400 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-mono text-sm text-espresso-800 w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded-full border border-cream-200 flex items-center justify-center text-espresso-500 hover:border-espresso-400 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-medium text-espresso-700">{fmt(item.price * item.qty)}</span>
                        <button onClick={() => remove(item.id)} className="p-1 text-espresso-300 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-cream-200 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-espresso-500">Subtotal</span>
              <span className="font-mono text-sm font-medium text-espresso-800">{fmt(totalPrice)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-espresso-500">Envío</span>
              <span className={`font-mono text-sm font-medium ${remaining <= 0 ? 'text-green-600' : 'text-espresso-800'}`}>
                {remaining <= 0 ? 'Gratis' : fmt(SHIPPING_COST)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { setOpen(false); setCatalogOpen(true) }}
                className="flex-1 py-3 rounded-full border border-espresso-800 text-espresso-800 text-xs font-medium hover:bg-espresso-800 hover:text-cream-50 transition-all duration-300 active:scale-[0.98]"
              >
                Seguir comprando
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 py-3 rounded-full bg-espresso-800 text-cream-50 text-xs font-medium hover:bg-espresso-700 transition-colors active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                Finalizar
                <ArrowRight size={12} />
              </button>
            </div>
            {!user && (
              <p className="text-xs text-center text-espresso-400">
                Necesitás{' '}
                <button onClick={() => setLoginOpen(true)} className="underline underline-offset-2 text-espresso-600 hover:text-espresso-800">
                  iniciar sesión
                </button>{' '}
                para continuar
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}
