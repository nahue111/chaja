import { useState } from 'react'
import { CheckCircle, Users, Gift, Truck, Star } from 'lucide-react'

const INITIAL = { name: '', phone: '', email: '', event: '', guests: '', date: '', notes: '' }

const perks = [
  { icon: Users, title: 'Para cualquier evento', desc: 'Cumpleaños, casamientos, empresas, 15 años y más.' },
  { icon: Gift, title: 'Presentación especial', desc: 'Packaging personalizado y dedicatoria incluida.' },
  { icon: Truck, title: 'Envío coordinado', desc: 'Entregamos en el horario y lugar que necesitás.' },
  { icon: Star, title: 'Desde 10 personas', desc: 'Cajas x4, x12 o tortas enteras según el grupo.' },
]

export default function Order() {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setSubmitted(true)
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl border border-cream-200 bg-white text-espresso-800 text-sm placeholder-espresso-300 focus:outline-none focus:border-espresso-400 transition-colors'
  const labelCls = 'block text-xs text-espresso-500 mb-1.5 font-medium tracking-wide uppercase'

  return (
    <section id="pedidos" className="bg-espresso-900 py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-amber" />
              <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Eventos & Fiestas</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 tracking-tightest leading-tight mb-5">
              ¿Organizás<br />
              <span className="italic font-medium text-amber">un evento?</span>
            </h2>
            <p className="text-cream-300/70 text-base leading-relaxed max-w-[48ch] mb-12">
              Llevamos el auténtico Chajá uruguayo a tu celebración. Dejanos tus datos y te contactamos para armar el pedido ideal para tu grupo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {perks.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-amber/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-amber" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-cream-100 text-sm font-semibold mb-0.5">{title}</p>
                    <p className="text-cream-300/60 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-5 py-16 px-8 bg-espresso-800/50 rounded-2xl border border-white/8">
                <CheckCircle size={44} strokeWidth={1.5} className="text-amber" />
                <h3 className="font-display text-2xl text-cream-50">¡Recibimos tu consulta!</h3>
                <p className="text-cream-300/70 text-sm leading-relaxed max-w-[36ch]">
                  Te contactamos en menos de 24 horas para armar el pedido de tu evento.
                </p>
                <button
                  className="mt-4 text-sm text-amber underline underline-offset-2"
                  onClick={() => { setForm(INITIAL); setSubmitted(false) }}
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-espresso-800/50 backdrop-blur-sm rounded-2xl border border-white/8 p-8 md:p-10 flex flex-col gap-5"
              >
                <div>
                  <h3 className="font-display text-2xl text-cream-50 font-semibold mb-1">Dejá tus datos</h3>
                  <p className="text-cream-300/60 text-sm">Te respondemos en menos de 24 horas.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls + ' text-cream-300/60'}>Nombre *</label>
                    <input type="text" value={form.name} onChange={set('name')} placeholder="Tu nombre completo" className={inputCls} required />
                  </div>
                  <div>
                    <label className={labelCls + ' text-cream-300/60'}>Teléfono *</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="09X XXX XXX" className={inputCls} required />
                  </div>
                </div>

                <div>
                  <label className={labelCls + ' text-cream-300/60'}>Email</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="tu@email.com" className={inputCls} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls + ' text-cream-300/60'}>Tipo de evento</label>
                    <select value={form.event} onChange={set('event')} className={inputCls + ' appearance-none'}>
                      <option value="">Seleccioná</option>
                      <option value="cumpleanos">Cumpleaños</option>
                      <option value="casamiento">Casamiento</option>
                      <option value="empresa">Evento empresarial</option>
                      <option value="15anos">15 años</option>
                      <option value="baby">Baby shower</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls + ' text-cream-300/60'}>Cantidad de personas</label>
                    <input type="number" min="1" value={form.guests} onChange={set('guests')} placeholder="Ej: 50" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className={labelCls + ' text-cream-300/60'}>Fecha del evento</label>
                  <input type="date" value={form.date} onChange={set('date')} className={inputCls} />
                </div>

                <div>
                  <label className={labelCls + ' text-cream-300/60'}>Comentarios adicionales</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={set('notes')}
                    placeholder="Sabores preferidos, lugar de entrega, presupuesto estimado..."
                    className={inputCls + ' resize-none'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-amber text-espresso-900 font-semibold text-sm tracking-wide hover:bg-amber/90 transition-all duration-300 active:scale-[0.98]"
                >
                  Enviar consulta
                </button>

                <p className="text-center text-cream-300/40 text-xs">
                  O escribinos directo por{' '}
                  <a href="https://wa.me/59898590509" className="text-amber/80 underline underline-offset-2" target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
