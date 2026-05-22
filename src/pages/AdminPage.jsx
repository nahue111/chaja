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

seed()

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('chaja_admin') === '1')

  const login = () => {
    sessionStorage.setItem('chaja_admin', '1')
    setAuthed(true)
  }

  const logout = () => {
    sessionStorage.removeItem('chaja_admin')
    setAuthed(false)
  }

  if (!authed) return <AdminGate onSuccess={login} />

  return (
    <AdminShell onLogout={logout}>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="ventas" element={<Ventas />} />
        <Route path="restock" element={<Restock />} />
        <Route path="clientes" element={<Clientes />} />
      </Routes>
    </AdminShell>
  )
}
