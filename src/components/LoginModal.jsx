import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginModal() {
  const { login, error, loginOpen, setLoginOpen } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  if (!loginOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-espresso-900/50 backdrop-blur-sm z-[60]"
        onClick={() => setLoginOpen(false)}
      />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="bg-cream-50 rounded-2xl shadow-2xl w-full max-w-sm p-8 relative">
          <button
            onClick={() => setLoginOpen(false)}
            className="absolute top-4 right-4 p-2 text-espresso-400 hover:text-espresso-700 transition-colors rounded-full hover:bg-cream-100"
          >
            <X size={16} />
          </button>

          <div className="mb-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="block w-5 h-px bg-amber" />
              <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Acceso</span>
            </div>
            <h2 className="font-display text-2xl text-espresso-800 font-semibold">Iniciar sesión</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-espresso-500 mb-1.5 font-medium tracking-wide uppercase">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white text-espresso-800 text-sm outline-none focus:border-espresso-400 transition-colors"
                placeholder="Ingresá tu usuario"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-xs text-espresso-500 mb-1.5 font-medium tracking-wide uppercase">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white text-espresso-800 text-sm outline-none focus:border-espresso-400 transition-colors"
                placeholder="••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-espresso-800 text-cream-50 text-sm font-medium hover:bg-espresso-700 transition-colors active:scale-[0.98] mt-2"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
