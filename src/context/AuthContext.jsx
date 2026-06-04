import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const MEDAL_RATE = 60
const medalKey = (u) => `chaja_medals_${u}`

function loadMedalState(username) {
  const spent = parseFloat(localStorage.getItem(medalKey(username)) || '0')
  return {
    medals: Math.floor(spent / MEDAL_RATE),
    progress: Math.round(spent % MEDAL_RATE),
    spent,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(false)
  const [medals, setMedals] = useState(0)
  const [medalProgress, setMedalProgress] = useState(0)

  const login = (username, password) => {
    if (username === 'prueba' && password === '123') {
      const state = loadMedalState(username)
      setUser({ name: username })
      setMedals(state.medals)
      setMedalProgress(state.progress)
      setError('')
      setLoginOpen(false)
      setToast(true)
      setTimeout(() => setToast(false), 3000)
      return true
    }
    setError('Usuario o contraseña incorrectos')
    return false
  }

  const logout = () => {
    setUser(null)
    setMedals(0)
    setMedalProgress(0)
  }

  const earnMedals = (amount) => {
    if (!user) return { newMedals: 0, totalMedals: 0, progress: 0 }
    const key = medalKey(user.name)
    const prevSpent = parseFloat(localStorage.getItem(key) || '0')
    const newSpent = prevSpent + amount
    localStorage.setItem(key, String(newSpent))
    const prevTotal = Math.floor(prevSpent / MEDAL_RATE)
    const newTotal = Math.floor(newSpent / MEDAL_RATE)
    const progress = Math.round(newSpent % MEDAL_RATE)
    setMedals(newTotal)
    setMedalProgress(progress)
    return { newMedals: newTotal - prevTotal, totalMedals: newTotal, progress }
  }

  return (
    <AuthContext.Provider value={{
      user, login, logout, error,
      loginOpen, setLoginOpen,
      toast,
      medals, medalProgress,
      earnMedals,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
