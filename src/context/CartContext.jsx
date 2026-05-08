import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export const SHIPPING_COST = 250
export const FREE_SHIPPING_THRESHOLD = 2000

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)

  const add = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setOpen(true)
  }

  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) return remove(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0)
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const grandTotal = totalPrice + shipping

  return (
    <CartContext.Provider value={{
      items, add, remove, updateQty,
      totalItems, totalPrice, shipping, grandTotal,
      open, setOpen,
      checkoutOpen, setCheckoutOpen,
      catalogOpen, setCatalogOpen,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
