export const Footer = () => (
  <footer
    className="w-full mt-24"
    style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(34,197,94,0.08)' }}
  >
    {/* ── Bande verte fine tout en haut ── */}
    <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)' }} />

    <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">

      {/* ── Grille principale ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

        {/* Brand — prend 5 colonnes */}
        <div className="md:col-span-5">
          {/* Logo */}
          <a href="/" className="inline-block mb-6">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: 40, height: 40,
                background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))',
                border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: '#22c55e', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.05em' }}>W</span>
              </div>
              <div>
                <p style={{ margin: 0, color: '#fff', fontWeight: 900, fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1 }}>Wayne</p>
                <p style={{ margin: 0, color: '#22c55e', fontWeight: 700, fontSize: '0.5rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Enterprize</p>
              </div>
            </div>
          </a>

          {/* Tagline */}
          <p className="text-slate-400 text-sm leading-relaxed mb-2 font-light">
            Trade Smarter. Not Harder.
          </p>
          <p className="text-slate-600 text-xs leading-relaxed mb-8 font-light">
            Real Experience. Proven SMC Strategy. Total Transparency.
          </p>

          {/* Avertissement */}
          <div className="p-4 rounded" style={{ background: 'rgba(34,197,94,0.03)', border: '1px solid rgba(34,197,94,0.08)' }}>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              ⚠️ Le trading comporte un niveau élevé de risque. Les performances passées ne garantissent pas les résultats futurs.
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="hidden md:block md:col-span-1" />

        {/* Support — 3 colonnes */}
        <div className="md:col-span-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">
            Support
          </p>
          <ul className="space-y-4">
            {[
              { label: 'Nous Contacter',  href: '/contact' },
              { label: 'WhatsApp Direct', href: 'https://wa.me/221771938874' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm text-slate-500 hover:text-green-400 transition-colors duration-200"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Légal — 3 colonnes */}
        <div className="md:col-span-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">
            Légal
          </p>
          <ul className="space-y-4">
            {[
              { label: 'Confidentialité',      href: '/privacy' },
              { label: 'Conditions Générales', href: '/conditions-generales' },
              { label: 'Cookies',              href: '/cookies' },
              { label: 'Mentions Légales',     href: '/mentions-legales' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="text-sm text-slate-500 hover:text-green-400 transition-colors duration-200">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Séparateur ── */}
      <div className="h-px mb-8" style={{ background: 'rgba(255,255,255,0.05)' }} />

      {/* ── Bas de page ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Copyright + crédit */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <p className="text-[10px] text-slate-700 font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Wayne Enterprize
          </p>
          <span className="hidden md:block text-slate-800">·</span>
          <p className="text-[10px] text-slate-700 uppercase tracking-widest">
            AMD Development
          </p>
        </div>

        {/* Réseaux + paiements */}
        <div className="flex items-center gap-6">

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-2">
            {[
              {
                label: 'WhatsApp', href: 'https://wa.me/221771938874',
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ),
              },
              {
                label: 'Instagram', href: '#',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                ),
              },
              {
                label: 'Facebook', href: '#',
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} aria-label={label}
                target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:text-green-400 transition-colors duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                {icon}
              </a>
            ))}
          </div>

          {/* Séparateur vertical */}
          <div className="w-px h-5 bg-white/5" />

          {/* Modes de paiement */}
          <div className="flex items-center gap-2">
            {[
              { label: 'Wave',         color: '#1a6fff' },
              { label: 'Orange Money', color: '#ff6600' },
              { label: 'Livraison',    color: '#166534' },
            ].map(({ label, color }) => (
              <div key={label} title={label}
                className="text-white text-[8px] font-black px-2 py-1 rounded-sm uppercase tracking-wider"
                style={{ backgroundColor: color, opacity: 0.85 }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);