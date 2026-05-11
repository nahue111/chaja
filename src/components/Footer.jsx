const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const links = {
  Menú: ['Chajá Clásico', 'Frutos Rojos', 'Chocolate', 'Individual'],
  Empresa: ['Nuestra historia', 'Proceso artesanal', 'Contacto'],
  Legal: ['Política de privacidad', 'Términos de uso'],
}

export default function Footer() {
  return (
    <footer id="contacto" className="bg-espresso-900 text-cream-300/60">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="Chajá Bistro" className="w-9 h-9 rounded-full object-cover shrink-0" />
              <p className="font-display text-2xl text-cream-50 font-semibold tracking-tight">
                Chajá
              </p>
            </div>
            <p className="text-sm leading-relaxed max-w-[36ch] mb-7">
              Elaboramos el auténtico Chajá uruguayo de manera artesanal, con ingredientes frescos
              y la receta original de 1927.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-cream-300/60 hover:text-cream-50 hover:border-white/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-cream-300/60 hover:text-cream-50 hover:border-white/30 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-cream-50 text-xs font-medium tracking-[0.15em] uppercase mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-cream-50 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; 2026 Chajá. Paysandú, Uruguay. Todos los derechos reservados.</p>
          <p>
            Hecho con cuidado en Uruguay
            <span className="mx-2 opacity-30">·</span>
            Receta desde 1927
          </p>
        </div>
      </div>
    </footer>
  )
}
