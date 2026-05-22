export const ADMIN_PASSWORD = 'chaja2024'

const K = { products: 'chadmin_p', sales: 'chadmin_s', restocks: 'chadmin_r' }

export const CATALOG = [
  { id: 'familiar-600-durazno', name: 'Torta Chajá con Durazno', category: 'Tortas Familiares', price: 625, img: '/catalogo/familia-durazno.webp' },
  { id: 'familiar-600-ddl', name: 'Chajá con Dulce de Leche', category: 'Tortas Familiares', price: 625, img: '/catalogo/familia-ddl.webp' },
  { id: 'familiar-chocolate', name: 'Chajá Sabor Chocolate', category: 'Tortas Familiares', price: 625, img: '/catalogo/familia-chocolate.webp' },
  { id: 'familiar-clasica', name: 'Chajá Especial 1200 gr', category: 'Tortas Familiares', price: 1150, img: '/catalogo/familia-especial.webp' },
  { id: 'familiar-gold', name: 'Chajá Gold 1200 gr', category: 'Tortas Familiares', price: 1150, img: '/catalogo/familia-gold.webp' },
  { id: 'familiar-especial', name: 'Chajá Frágil 1500 gr', category: 'Tortas Familiares', price: 1590, img: '/catalogo/familia-clasica.webp' },
  { id: 'petit-helado-durazno', name: 'Petit Helado Durazno', category: 'Chajá Helado', price: 113, img: '/catalogo/helado-petit-durazno.webp' },
  { id: 'petit-helado-ddl', name: 'Petit Helado DDL', category: 'Chajá Helado', price: 113, img: '/catalogo/helado-petit-ddl.webp' },
  { id: 'helado-pack-durazno', name: 'Pack x3 Durazno', category: 'Chajá Helado', price: 396, img: '/catalogo/helado-caja.webp' },
  { id: 'helado-triple', name: 'Triple Sabor x3', category: 'Chajá Helado', price: 152, img: '/catalogo/helado-caja.webp' },
  { id: 'x4-clasico', name: 'Caja x4 Clásico', category: 'Caja x4', price: 536, img: '/catalogo/x4-clasico.webp' },
  { id: 'x4-durazno', name: 'Caja x4 Durazno', category: 'Caja x4', price: 608, img: '/catalogo/x4-durazno.webp' },
  { id: 'x4-frutilla', name: 'Caja x4 Frutilla', category: 'Caja x4', price: 608, img: '/catalogo/x4-frutilla.webp' },
  { id: 'x4-bosque', name: 'Caja x4 Frutos del Bosque', category: 'Caja x4', price: 608, img: '/catalogo/x4-bosque.webp' },
  { id: 'x4-clasico2', name: 'Caja x4 · 4 Generaciones', category: 'Caja x4', price: 608, img: '/catalogo/x4-generaciones.webp' },
  { id: 'x12-clasico', name: 'Caja x12 Clásico', category: 'Caja x12', price: 1608, img: '/catalogo/x12-sinfrutas.webp' },
  { id: 'x12-durazno', name: 'Caja x12 Durazno', category: 'Caja x12', price: 1824, img: '/catalogo/x12-durazno.webp' },
  { id: 'x12-frutilla', name: 'Caja x12 Frutilla', category: 'Caja x12', price: 1824, img: '/catalogo/x12-frutilla.webp' },
  { id: 'x12-morado', name: 'Caja x12 Frutos del Bosque', category: 'Caja x12', price: 1824, img: '/catalogo/x12-morado.webp' },
  { id: 'alfajor-yoyo', name: 'Alfajor tipo Yoyo', category: 'Alfajores', price: 100, img: '/catalogo/alfajores-yoyo.webp' },
  { id: 'alfajor-caja', name: 'Alfajor de Maicena', category: 'Alfajores', price: 100, img: '/catalogo/alfajores-caja.webp' },
  { id: 'torta-charlotte', name: 'Charlotte Frutos del Bosque', category: 'Tortas', price: 800, img: '/catalogo/torta-charlotte.webp' },
  { id: 'torta-oreo', name: 'Torta Oreo', category: 'Tortas', price: 800, img: '/catalogo/torta-oreo.webp' },
  { id: 'torta-profiteroles', name: 'Profiteroles de DDL', category: 'Tortas', price: 900, img: '/catalogo/torta-profiteroles.webp' },
  { id: 'torta-bosque', name: 'Mini Cake Frutos del Bosque', category: 'Tortas', price: 700, img: '/catalogo/torta-bosque.webp' },
  { id: 'torta-selvanegra', name: 'Mini Cake Selva Negra', category: 'Tortas', price: 700, img: '/catalogo/torta-selvanegra.webp' },
  { id: 'torta-chocolate', name: 'Mini Cake Chocolate', category: 'Tortas', price: 700, img: '/catalogo/torta-chocolate.webp' },
]

const INIT_STOCK = {
  'familiar-600-durazno': 12, 'familiar-600-ddl': 8, 'familiar-chocolate': 6,
  'familiar-clasica': 4, 'familiar-gold': 3, 'familiar-especial': 2,
  'petit-helado-durazno': 24, 'petit-helado-ddl': 18, 'helado-pack-durazno': 10, 'helado-triple': 7,
  'x4-clasico': 15, 'x4-durazno': 11, 'x4-frutilla': 9, 'x4-bosque': 5, 'x4-clasico2': 8,
  'x12-clasico': 4, 'x12-durazno': 3, 'x12-frutilla': 2, 'x12-morado': 1,
  'alfajor-yoyo': 30, 'alfajor-caja': 25,
  'torta-charlotte': 3, 'torta-oreo': 4, 'torta-profiteroles': 2,
  'torta-bosque': 3, 'torta-selvanegra': 5, 'torta-chocolate': 6,
}

const MOCK_SALES = [
  {
    id: 'vta-001', date: '2026-05-20T14:32:00',
    customer: { name: 'María González', email: 'maria.gonz@gmail.com', age: 34, address: 'Av. Italia 3420, Montevideo' },
    items: [
      { id: 'familiar-600-durazno', name: 'Torta Chajá con Durazno', qty: 1, price: 625 },
      { id: 'x4-durazno', name: 'Caja x4 Durazno', qty: 1, price: 608 },
    ],
    subtotal: 1233, shipping: 0, total: 1233,
  },
  {
    id: 'vta-002', date: '2026-05-19T10:15:00',
    customer: { name: 'Carlos Rodríguez', email: 'carlos.rod@hotmail.com', age: 42, address: 'Bulevar Artigas 1200, Montevideo' },
    items: [
      { id: 'x12-durazno', name: 'Caja x12 Durazno', qty: 1, price: 1824 },
    ],
    subtotal: 1824, shipping: 0, total: 1824,
  },
  {
    id: 'vta-003', date: '2026-05-18T16:45:00',
    customer: { name: 'Laura Fernández', email: 'laurita.fer@gmail.com', age: 29, address: 'Acevedo Díaz 2100, Montevideo' },
    items: [
      { id: 'familiar-gold', name: 'Chajá Gold 1200 gr', qty: 1, price: 1150 },
      { id: 'alfajor-yoyo', name: 'Alfajor tipo Yoyo', qty: 4, price: 100 },
    ],
    subtotal: 1550, shipping: 0, total: 1550,
  },
  {
    id: 'vta-004', date: '2026-05-17T09:20:00',
    customer: { name: 'Diego Martínez', email: 'diego.mtz@gmail.com', age: 38, address: 'J. Barrios Amorim 1500, Montevideo' },
    items: [
      { id: 'petit-helado-durazno', name: 'Petit Helado Durazno', qty: 3, price: 113 },
      { id: 'petit-helado-ddl', name: 'Petit Helado DDL', qty: 3, price: 113 },
    ],
    subtotal: 678, shipping: 250, total: 928,
  },
  {
    id: 'vta-005', date: '2026-05-16T12:00:00',
    customer: { name: 'Ana Pérez', email: 'ana.perez@gmail.com', age: 55, address: 'Luis Batlle Berres 4200, Montevideo' },
    items: [
      { id: 'familiar-especial', name: 'Chajá Frágil 1500 gr', qty: 1, price: 1590 },
    ],
    subtotal: 1590, shipping: 0, total: 1590,
  },
  {
    id: 'vta-006', date: '2026-05-15T18:30:00',
    customer: { name: 'Sebastián López', email: 'seba.lopez@outlook.com', age: 31, address: '18 de Julio 3200, Montevideo' },
    items: [
      { id: 'x4-frutilla', name: 'Caja x4 Frutilla', qty: 2, price: 608 },
      { id: 'torta-oreo', name: 'Torta Oreo', qty: 1, price: 800 },
    ],
    subtotal: 2016, shipping: 0, total: 2016,
  },
  {
    id: 'vta-007', date: '2026-05-13T11:10:00',
    customer: { name: 'Carolina Suárez', email: 'caro.suarez@gmail.com', age: 26, address: 'Rivera 2345, Montevideo' },
    items: [
      { id: 'torta-charlotte', name: 'Charlotte Frutos del Bosque', qty: 1, price: 800 },
      { id: 'alfajor-caja', name: 'Alfajor de Maicena', qty: 6, price: 100 },
    ],
    subtotal: 1400, shipping: 0, total: 1400,
  },
  {
    id: 'vta-008', date: '2026-05-10T15:50:00',
    customer: { name: 'Federico Cabrera', email: 'fede.cab@gmail.com', age: 45, address: 'Pablo de María 1100, Montevideo' },
    items: [
      { id: 'x12-clasico', name: 'Caja x12 Clásico', qty: 1, price: 1608 },
      { id: 'torta-profiteroles', name: 'Profiteroles de DDL', qty: 1, price: 900 },
    ],
    subtotal: 2508, shipping: 0, total: 2508,
  },
]

const MOCK_RESTOCKS = [
  {
    id: 'rst-001', date: '2026-05-18T08:00:00',
    items: [
      { id: 'familiar-600-durazno', name: 'Torta Chajá con Durazno', qty: 10 },
      { id: 'familiar-600-ddl', name: 'Chajá con Dulce de Leche', qty: 8 },
      { id: 'x4-durazno', name: 'Caja x4 Durazno', qty: 12 },
      { id: 'alfajor-yoyo', name: 'Alfajor tipo Yoyo', qty: 20 },
    ],
    note: 'Restock semanal — Semana del 18 al 24',
  },
  {
    id: 'rst-002', date: '2026-05-11T08:30:00',
    items: [
      { id: 'familiar-clasica', name: 'Chajá Especial 1200 gr', qty: 6 },
      { id: 'familiar-gold', name: 'Chajá Gold 1200 gr', qty: 5 },
      { id: 'x12-durazno', name: 'Caja x12 Durazno', qty: 4 },
      { id: 'petit-helado-durazno', name: 'Petit Helado Durazno', qty: 24 },
    ],
    note: 'Restock quincenal',
  },
  {
    id: 'rst-003', date: '2026-05-04T09:00:00',
    items: [
      { id: 'familiar-600-durazno', name: 'Torta Chajá con Durazno', qty: 15 },
      { id: 'torta-charlotte', name: 'Charlotte Frutos del Bosque', qty: 5 },
      { id: 'torta-oreo', name: 'Torta Oreo', qty: 5 },
      { id: 'alfajor-caja', name: 'Alfajor de Maicena', qty: 30 },
    ],
    note: 'Restock inicio de mes — Mayo 2026',
  },
]

export function seed() {
  if (!localStorage.getItem(K.products)) {
    localStorage.setItem(K.products, JSON.stringify(
      CATALOG.map(p => ({ ...p, stock: INIT_STOCK[p.id] ?? 5 }))
    ))
  }
  if (!localStorage.getItem(K.sales)) {
    localStorage.setItem(K.sales, JSON.stringify(MOCK_SALES))
  }
  if (!localStorage.getItem(K.restocks)) {
    localStorage.setItem(K.restocks, JSON.stringify(MOCK_RESTOCKS))
  }
}

export const getProducts = () =>
  JSON.parse(localStorage.getItem(K.products) || '[]')

export const getSales = () =>
  JSON.parse(localStorage.getItem(K.sales) || '[]')
    .sort((a, b) => new Date(b.date) - new Date(a.date))

export const getRestocks = () =>
  JSON.parse(localStorage.getItem(K.restocks) || '[]')
    .sort((a, b) => new Date(b.date) - new Date(a.date))

export function setStock(id, stock) {
  const products = getProducts().map(p => p.id === id ? { ...p, stock: Math.max(0, stock) } : p)
  localStorage.setItem(K.products, JSON.stringify(products))
  return products
}

export function addRestock(items, note) {
  const entry = { id: `rst-${Date.now()}`, date: new Date().toISOString(), items, note: note || '' }
  const restocks = getRestocks()
  restocks.unshift(entry)
  localStorage.setItem(K.restocks, JSON.stringify(restocks))
  const products = getProducts().map(p => {
    const item = items.find(i => i.id === p.id)
    return item ? { ...p, stock: p.stock + item.qty } : p
  })
  localStorage.setItem(K.products, JSON.stringify(products))
  return entry
}

export function addSale(sale) {
  const entry = { ...sale, id: `vta-${Date.now()}`, date: new Date().toISOString() }
  const sales = getSales()
  sales.unshift(entry)
  localStorage.setItem(K.sales, JSON.stringify(sales))
  if (sale.items) {
    const products = getProducts().map(p => {
      const item = sale.items.find(i => i.id === p.id)
      return item ? { ...p, stock: Math.max(0, p.stock - item.qty) } : p
    })
    localStorage.setItem(K.products, JSON.stringify(products))
  }
  return entry
}

export function getCustomers() {
  const map = new Map()
  getSales().forEach(({ customer, total, date }) => {
    if (!customer?.email) return
    if (!map.has(customer.email)) {
      map.set(customer.email, { ...customer, orders: 0, totalSpent: 0, lastOrder: date })
    }
    const c = map.get(customer.email)
    c.orders++
    c.totalSpent += total
    if (new Date(date) > new Date(c.lastOrder)) c.lastOrder = date
  })
  return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent)
}

export const fmt = (n) => `$ ${Number(n).toLocaleString('es-UY')}`
export const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('es-UY', { day: '2-digit', month: 'short', year: 'numeric' })
export const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' })
