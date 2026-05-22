import { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { ADMIN_PASSWORD } from './data'

export default function AdminGate({ onSuccess }) {
  const [pwd, setPwd] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [flash, setFlash] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (pwd === ADMIN_PASSWORD) {
      onSuccess()
    } else {
      setError(true)
      setFlash(true)
      setTimeout(() => setFlash(false), 600)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#1A0E06' }}>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #C8860A 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative w-full max-w-sm">
        <div
          className="absolute -inset-10 rounded-[3rem] opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C8860A, transparent 70%)' }}
        />

        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-200 ${flash ? 'scale-[0.99]' : 'scale-100'}`}
          style={{
            background: 'linear-gradient(160deg, #2C1A0E 0%, #1A0E06 100%)',
            border: flash ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(212,168,67,0.12)',
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.7)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.4), transparent)' }} />

          <div className="px-10 py-12">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl opacity-50" style={{ background: '#C8860A' }} />
                <img
                  src="/logo.png"
                  alt="Chajá"
                  className="relative w-16 h-16 rounded-full object-cover"
                  onError={e => { e.target.style.display = 'none' }}
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2" style={{ color: '#C8860A' }}>
                Chajá Bistro
              </p>
              <h1 className="font-display text-2xl font-semibold" style={{ color: '#FDFBF7' }}>
                Panel de Administración
              </h1>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="relative">
                <Lock size={13} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(237,224,200,0.3)' }} />
                <input
                  type={show ? 'text' : 'password'}
                  value={pwd}
                  onChange={e => { setPwd(e.target.value); setError(false) }}
                  placeholder="Contraseña"
                  autoFocus
                  className="w-full rounded-xl pl-10 pr-12 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(44,26,14,0.6)',
                    border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(237,224,200,0.08)',
                    color: '#FDFBF7',
                  }}
                  onFocus={e => !error && (e.target.style.borderColor = 'rgba(200,134,10,0.35)')}
                  onBlur={e => !error && (e.target.style.borderColor = 'rgba(237,224,200,0.08)')}
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(237,224,200,0.3)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(237,224,200,0.6)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,224,200,0.3)')}
                >
                  {show ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>

              <div className="h-4 flex items-center justify-center">
                {error && (
                  <p className="text-red-400 text-xs">Contraseña incorrecta</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 active:scale-[0.98]"
                style={{ background: '#C8860A', color: '#1A0E06' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#E4A831')}
                onMouseLeave={e => (e.currentTarget.style.background = '#C8860A')}
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
