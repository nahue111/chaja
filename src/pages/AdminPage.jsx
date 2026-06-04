import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { seed } from '../admin/data'
import AdminGate from '../admin/AdminGate'
import AdminShell from '../admin/AdminShell'
import Dashboard from '../admin/views/Dashboard'
import Inventario from '../admin/views/Inventario'
import Ventas from '../admin/views/Ventas'
import Restock from '../admin/views/Restock'
import Clientes from '../admin/views/Clientes'
import Pedidos from '../admin/views/Pedidos'
import Metricas from '../admin/views/Metricas'
import Productos from '../admin/views/Productos'

seed()

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('chaja_admin') === '1')
  const [role, setRole] = useState(() => sessionStorage.getItem('chaja_admin_role') || 'admin')

  const login = (selectedRole) => {
    sessionStorage.setItem('chaja_admin', '1')
    sessionStorage.setItem('chaja_admin_role', selectedRole)
    setRole(selectedRole)
    setAuthed(true)
  }

  const logout = () => {
    sessionStorage.removeItem('chaja_admin')
    sessionStorage.removeItem('chaja_admin_role')
    setAuthed(false)
  }

  if (!authed) return <AdminGate onSuccess={login} />

  return (
    <AdminShell onLogout={logout} role={role}>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="ventas" element={<Ventas />} />
        <Route path="restock" element={<Restock />} />
        <Route path="clientes" element={<Clientes role={role} />} />
        {role === 'superadmin' && (
          <>
            <Route path="pedidos" element={<Pedidos />} />
            <Route path="metricas" element={<Metricas />} />
            <Route path="productos" element={<Productos />} />
          </>
        )}
      </Routes>
    </AdminShell>
  )
}
