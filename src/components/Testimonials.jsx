const testimonials = [
  {
    quote: 'Lo pedí medio sin esperar mucho y terminé comprando tres más al mes siguiente. El merengue es adictivo, no sé cómo lo hacen.',
    name: 'Lucía Fontana',
    role: 'Cliente, Montevideo',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    quote: 'Encargué 4 para el cumpleaños de mi madre. Llegaron impecables, en su caja, y el sabor era exactamente el que recordaba de chica.',
    name: 'Romina Castelló',
    role: 'Cliente, Paysandú',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
  {
    quote: 'El de frutos rojos es una revelación. La acidez de la frambuesa con el merengue crujiente es simplemente perfecta.',
    name: 'Matías Herrera',
    role: 'Cliente, Salto',
    avatar: 'https://i.pravatar.cc/80?img=11',
  },
]

const stats = [
  { value: '4.200+', label: 'Pedidos entregados' },
  { value: '98.7%', label: 'Satisfacción del cliente' },
  { value: '19', label: 'Departamentos alcanzados' },
]

export default function Testimonials() {
  return (
    <section className="bg-espresso-800 py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-amber" />
            <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Clientes</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 tracking-tightest leading-tight max-w-lg">
            Lo que dicen quienes<br />
            <span className="italic text-amber-light">ya lo probaron</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`flex flex-col justify-between p-7 md:p-8 rounded-2xl border border-white/10 bg-white/5 ${i === 1 ? 'md:mt-8' : ''}`}>
              <p className="text-cream-200/80 text-base leading-relaxed mb-8 font-light italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber/30" />
                <div>
                  <p className="text-cream-50 text-sm font-medium">{t.name}</p>
                  <p className="text-cream-300/50 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-3xl md:text-4xl font-medium text-amber mb-2">{s.value}</p>
              <p className="text-cream-300/60 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
