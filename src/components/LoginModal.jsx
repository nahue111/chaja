import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

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

          {/* Social buttons */}
          <div className="space-y-2.5 mb-6">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-cream-200 bg-white text-espresso-700 text-sm font-medium hover:border-espresso-300 hover:bg-cream-50 transition-all duration-200">
              <GoogleIcon />
              Continuar con Google
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-cream-200 bg-white text-espresso-700 text-sm font-medium hover:border-espresso-300 hover:bg-cream-50 transition-all duration-200">
              <FacebookIcon />
              Continuar con Facebook
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-cream-200 bg-white text-espresso-700 text-sm font-medium hover:border-espresso-300 hover:bg-cream-50 transition-all duration-200">
              <AppleIcon />
              Continuar con Apple
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-cream-200" />
            <span className="text-xs text-espresso-400">o ingresá con tu cuenta</span>
            <span className="flex-1 h-px bg-cream-200" />
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

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-espresso-800 text-cream-50 text-sm font-medium hover:bg-espresso-700 transition-colors active:scale-[0.98]"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
