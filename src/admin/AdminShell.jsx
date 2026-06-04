import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, RefreshCcw, Users, LogOut, Shield, BarChart2, ClipboardList, Tag } from 'lucide-react'

const NAV_ADMIN = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/inventario', label: 'Inventario', icon: Package },
  { path: '/admin/ventas', label: 'Ventas', icon: ShoppingBag },
  { path: '/admin/restock', label: 'Historial Restock', icon: RefreshCcw },
  { path: '/admin/clientes', label: 'Clientes', icon: Users },
]

const NAV_SUPER = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/pedidos', label: 'Pedidos', icon: ClipboardList },
  { path: '/admin/metricas', label: 'Métricas', icon: BarChart2 },
  { path: '/admin/productos', label: 'Productos', icon: Tag },
  { path: '/admin/inventario', label: 'Inventario', icon: Package },
  { path: '/admin/ventas', label: 'Ventas', icon: ShoppingBag },
  { path: '/admin/restock', label: 'Historial Restock', icon: RefreshCcw },
  { path: '/admin/clientes', label: 'Clientes', icon: Users },
]

const TITLES = {
  '/admin': 'Panel General',
  '/admin/pedidos': 'Gestión de Pedidos',
  '/admin/metricas': 'Métricas',
  '/admin/productos': 'Productos',
  '/admin/inventario': 'Inventario',
  '/admin/ventas': 'Ventas',
  '/admin/restock': 'Historial de Restock',
  '/admin/clientes': 'Clientes',
}

export default function AdminShell({ children, onLogout, role }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isSuperAdmin = role === 'superadmin'
  const nav = isSuperAdmin ? NAV_SUPER : NAV_ADMIN

  const now = new Date().toLocaleDateString('es-UY', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  const title = TITLES[pathname] || 'Admin'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#FAF7F0' }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #1A0E06 0%, #2C1A0E 100%)',
          borderRight: '1px solid rgba(212,168,67,0.07)',
        }}
      >
        {/* Logo + role */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(212,168,67,0.07)' }}>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt=""
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              onError={e => { e.target.style.display = 'none' }}
            />
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold leading-none" style={{ color: '#FDFBF7' }}>Chajá Bistro</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                {isSuperAdmin
                  ? <Shield size={9} style={{ color: '#C8860A' }} />
                  : null
                }
                <p
                  className="text-[9px] tracking-[0.18em] uppercase font-semibold"
                  style={{ color: isSuperAdmin ? '#C8860A' : 'rgba(237,224,200,0.4)' }}
                >
                  {isSuperAdmin ? 'Super Admin' : 'Admin Panel'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {nav.map(({ path, label, icon: Icon, exact }) => {
            const active = exact ? pathname === path : pathname.startsWith(path)
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 text-left"
                style={{
                  background: active ? 'rgba(200,134,10,0.1)' : 'transparent',
                  color: active ? '#C8860A' : 'rgba(237,224,200,0.45)',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(237,224,200,0.75)' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(237,224,200,0.45)' } }}
              >
                <Icon size={14} strokeWidth={active ? 2 : 1.5} className="flex-shrink-0" />
                <span className="flex-1 truncate">{label}</span>
                {active && <div className="w-1 h-3.5 rounded-full flex-shrink-0" style={{ background: '#C8860A' }} />}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3" style={{ borderTop: '1px solid rgba(212,168,67,0.07)' }}>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200"
            style={{ color: 'rgba(237,224,200,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = 'rgba(248,113,113,0.8)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(237,224,200,0.3)' }}
          >
            <LogOut size={14} strokeWidth={1.5} className="flex-shrink-0" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex-shrink-0 bg-white px-8 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F5EFE0' }}>
          <h1 className="font-display text-xl font-semibold" style={{ color: '#2C1A0E' }}>{title}</h1>
          <p className="text-sm capitalize" style={{ color: '#7A5230' }}>{now}</p>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
