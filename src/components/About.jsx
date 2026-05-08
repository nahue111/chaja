const pillars = [
  { number: '01', title: 'Merengue artesanal', body: 'Batido a mano durante 40 minutos hasta lograr la textura y el brillo exactos. Sin atajos.' },
  { number: '02', title: 'Crema chantilly', body: 'Crema doble uruguaya batida al momento del montaje. Nunca preelaborada.' },
  { number: '03', title: 'Durazno de temporada', body: 'Seleccionamos duraznos en su punto exacto de madurez. Cuando no es temporada, no hay atajos.' },
]

export default function About() {
  return (
    <section id="chaja" className="bg-cream-50 py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Mosaic */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-2" style={{ gridTemplateRows: 'repeat(4, 160px)' }}>
              {[
                '/catalogo/familia-clasica.webp',
                '/catalogo/helado-caja.webp',
                '/catalogo/x4-durazno.webp',
                '/catalogo/alfajores-yoyo.webp',
                '/catalogo/torta-charlotte.webp',
                '/catalogo/familia-gold.webp',
                '/catalogo/x12-frutilla.webp',
                '/catalogo/familia-chocolate.webp',
              ].map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-espresso-800 text-cream-50 rounded-2xl px-6 py-5 shadow-[0_20px_40px_-10px_rgba(44,26,14,0.4)]">
              <p className="font-mono text-3xl font-medium text-amber">72+</p>
              <p className="text-cream-300 text-xs tracking-wide mt-1">Años de receta</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-amber" />
              <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Nuestra historia</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl text-espresso-800 leading-tight tracking-tightest mb-6">
              Un postre con alma<br />
              <span className="italic font-medium">uruguaya</span>
            </h2>

            <p className="text-espresso-500 text-base leading-relaxed max-w-[55ch] mb-10">
              El Chajá nació en Paysandú en 1927, creado por Orlando Castellano. Lleva el nombre del ave nacional del Uruguay — majestuosa, liviana, con una nobleza que pocos pueden ignorar. En Chajá Bistro lo elaboramos con esa misma filosofía: sin apuros, sin atajos.
            </p>

            <div className="space-y-7">
              {pillars.map((p) => (
                <div key={p.number} className="flex items-start gap-5 pb-7 border-b border-cream-200 last:border-0 last:pb-0">
                  <span className="font-mono text-xs text-amber/70 mt-1 shrink-0">{p.number}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-espresso-800 mb-1">{p.title}</h3>
                    <p className="text-espresso-500 text-sm leading-relaxed">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
