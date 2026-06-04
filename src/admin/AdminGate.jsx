import { useState } from 'react'
import { Eye, EyeOff, Lock, ChevronLeft, User, Shield } from 'lucide-react'
import { ADMIN_PASSWORD } from './data'

const ROLES = [
  {
    id: 'admin',
    label: 'Administrador',
    desc: 'Inventario, ventas y clientes',
    Icon: User,
    accent: '#EDE0C8',
    bg: 'rgba(237,224,200,0.07)',
    border: 'rgba(237,224,200,0.1)',
  },
  {
    id: 'superadmin',
    label: 'Super Admin',
    desc: 'Acceso completo + estado de pedidos y métricas',
    Icon: Shield,
    accent: '#C8860A',
    bg: 'rgba(200,134,10,0.1)',
    border: 'rgba(200,134,10,0.25)',
  },
]

export default function AdminGate({ onSuccess }) {
  const [step, setStep] = useState('role')
  const [role, setRole] = useState(null)
  const [pwd, setPwd] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [flash, setFlash] = useState(false)

  const selectRole = (id) => {
    setRole(id)
    setStep('password')
    setPwd('')
    setError(false)
  }

  const submit = (e) => {
    e.preventDefault()
    if (pwd === ADMIN_PASSWORD) {
      onSuccess(role)
    } else {
      setError(true)
      setFlash(true)
      setTimeout(() => setFlash(false), 500)
      setTimeout(() => setError(false), 3000)
    }
  }

  const selected = ROLES.find(r => r.id === role)

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
          className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${flash ? 'scale-[0.99]' : 'scale-100'}`}
          style={{
            background: 'linear-gradient(160deg, #2C1A0E 0%, #1A0E06 100%)',
            border: flash ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(212,168,67,0.12)',
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.7)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.4), transparent)' }} />

          <div className="px-10 py-10">
            {/* Logo */}
            <div className="flex justify-center mb-7">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl opacity-50" style={{ background: '#C8860A' }} />
                <img
                  src="/logo.png"
                  alt="Chajá"
                  className="relative w-14 h-14 rounded-full object-cover"
                  onError={e => { e.target.style.display = 'none' }}
                />
              </div>
            </div>

            {/* STEP 1 — Role selection */}
            {step === 'role' && (
              <>
                <div className="text-center mb-7">
                  <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2" style={{ color: '#C8860A' }}>
                    Chajá
                  </p>
                  <h1 className="font-display text-xl font-semibold" style={{ color: '#FDFBF7' }}>
                    Panel de Administración
                  </h1>
                  <p className="text-xs mt-1.5" style={{ color: 'rgba(237,224,200,0.35)' }}>
                    Seleccioná tu perfil
                  </p>
                </div>

                <div className="space-y-3">
                  {ROLES.map(({ id, label, desc, Icon, accent, bg, border }) => (
                    <button
                      key={id}
                      onClick={() => selectRole(id)}
                      className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-200 active:scale-[0.98]"
                      style={{ background: bg, border: `1px solid ${border}` }}
                      onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.15)')}
                      onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                      >
                        <Icon size={17} style={{ color: accent }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold" style={{ color: '#FDFBF7' }}>{label}</p>
                        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(237,224,200,0.4)' }}>{desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* STEP 2 — Password */}
            {step === 'password' && selected && (
              <>
                <button
                  onClick={() => setStep('role')}
                  className="flex items-center gap-1 text-xs mb-5 transition-colors"
                  style={{ color: 'rgba(237,224,200,0.35)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(237,224,200,0.65)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,224,200,0.35)')}
                >
                  <ChevronLeft size={12} /> Cambiar perfil
                </button>

                {/* Selected role badge */}
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6"
                  style={{ background: selected.bg, border: `1px solid ${selected.border}` }}
                >
                  <selected.Icon size={15} style={{ color: selected.accent }} />
                  <p className="text-sm font-semibold" style={{ color: '#FDFBF7' }}>{selected.label}</p>
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
                      onFocus={e => !error && (e.target.style.borderColor = `${selected.border}`)}
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
                    {error && <p className="text-red-400 text-xs">Contraseña incorrecta</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 active:scale-[0.98]"
                    style={{ background: selected.accent === '#C8860A' ? '#C8860A' : '#3D2714', color: selected.accent === '#C8860A' ? '#1A0E06' : '#FDFBF7' }}
                    onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                    onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
                  >
                    Ingresar
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
