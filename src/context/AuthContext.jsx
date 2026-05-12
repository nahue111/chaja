import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(false)

  const login = (username, password) => {
    if (username === 'prueba' && password === '123') {
      setUser({ name: 'prueba' })
      setError('')
      setLoginOpen(false)
      setToast(true)
      setTimeout(() => setToast(false), 3000)
      return true
    }
    setError('Usuario o contraseña incorrectos')
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout, error, loginOpen, setLoginOpen, toast }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
