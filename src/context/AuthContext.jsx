import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const MEDAL_RATE = 60
const balKey  = (u) => `chaja_mbal_${u}`
const progKey = (u) => `chaja_mprog_${u}`

function loadMedalState(username) {
  const balance  = parseInt(localStorage.getItem(balKey(username))  || '0')
  const progress = parseInt(localStorage.getItem(progKey(username)) || '0')
  return { medals: balance, progress }
}

export function AuthProvider({ children }) {
  const [user, setUser]               = useState(null)
  const [loginOpen, setLoginOpen]     = useState(false)
  const [error, setError]             = useState('')
  const [toast, setToast]             = useState(false)
  const [medals, setMedals]           = useState(0)
  const [medalProgress, setMedalProgress] = useState(0)

  const login = (username, password) => {
    if (username === 'prueba' && password === '123') {
      const s = loadMedalState(username)
      setUser({ name: username })
      setMedals(s.medals)
      setMedalProgress(s.progress)
      setError('')
      setLoginOpen(false)
      setToast(true)
      setTimeout(() => setToast(false), 3000)
      return true
    }
    setError('Usuario o contraseña incorrectos')
    return false
  }

  const logout = () => { setUser(null); setMedals(0); setMedalProgress(0) }

  // Called on checkout confirm — adds earned medals from amount paid
  const earnMedals = (amount) => {
    if (!user) return { newMedals: 0, totalMedals: 0, progress: 0 }
    const prevBal  = parseInt(localStorage.getItem(balKey(user.name))  || '0')
    const prevProg = parseInt(localStorage.getItem(progKey(user.name)) || '0')
    const total    = prevProg + Math.round(amount)
    const earned   = Math.floor(total / MEDAL_RATE)
    const newProg  = total % MEDAL_RATE
    const newBal   = prevBal + earned
    localStorage.setItem(balKey(user.name),  String(newBal))
    localStorage.setItem(progKey(user.name), String(newProg))
    setMedals(newBal)
    setMedalProgress(newProg)
    return { newMedals: earned, totalMedals: newBal, progress: newProg }
  }

  // Called when user redeems medals as discount
  const redeemMedals = (count) => {
    if (!user || count <= 0) return
    const prevBal = parseInt(localStorage.getItem(balKey(user.name)) || '0')
    const newBal  = Math.max(0, prevBal - count)
    localStorage.setItem(balKey(user.name), String(newBal))
    setMedals(newBal)
  }

  return (
    <AuthContext.Provider value={{
      user, login, logout, error,
      loginOpen, setLoginOpen,
      toast,
      medals, medalProgress,
      earnMedals, redeemMedals,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
