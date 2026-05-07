export const Footer = () => (
  <footer className="w-full border-t border-green-500/10 mt-16" style={{ backgroundColor: '#050a05' }}>
    <div className="w-full max-w-6xl mx-auto px-6 py-16">

      {/* ── Grille principale ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

        {/* Brand */}
        <div className="md:col-span-1 space-y-5">
          {/* Logo */}
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500/10 border border-green-500/30 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-green-400 font-black text-sm">W</span>
            </div>
            <div>
              <p className="text-white font-black text-sm tracking-[0.15em] uppercase leading-none">Wayne</p>
              <p className="text-green-400 font-bold text-[9px] tracking-[0.3em] uppercase">Enterprize</p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xs text-slate-500 leading-relaxed">
            Trade Smarter. Not Harder.<br />
            Real Experience. Proven SMC Strategy.<br />
            Total Transparency.
          </p>

          {/* Réseaux sociaux */}
          <div className="flex gap-2 pt-1">
            {[
              {
                label: 'WhatsApp',
                href: 'https://wa.me/221771938874',
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ),
              },
              {
                label: 'Instagram',
                href: '#',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                ),
              },
              {
                label: 'Facebook',
                href: '#',
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-green-500/15 rounded-sm text-slate-500 hover:text-green-400 hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Spacer col */}
        <div className="hidden md:block" />

        {/* Support */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Support</h3>
          <div className="h-px w-8 bg-green-500/30" />
          <ul className="space-y-3">
            {[
              { label: 'Nous Contacter',   href: '/contact' },
              { label: 'WhatsApp Direct',  href: 'https://wa.me/221771938874' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-xs text-slate-500 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-green-500 transition-all duration-300 inline-block flex-shrink-0" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Légal */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Légal</h3>
          <div className="h-px w-8 bg-green-500/30" />
          <ul className="space-y-3">
            {[
              { label: 'Confidentialité',      href: '/privacy' },
              { label: 'Conditions Générales', href: '/conditions-generales' },
              { label: 'Cookies',              href: '/cookies' },
              { label: 'Mentions Légales',     href: '/mentions-legales' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-xs text-slate-500 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-green-500 transition-all duration-300 inline-block flex-shrink-0" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Séparateur ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent mb-8" />

      {/* ── Modes de paiement ── */}
      <div className="mb-8">
        <p className="text-[9px] text-slate-600 uppercase tracking-[0.3em] text-center mb-4">
          Modes de paiement acceptés
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { label: 'Wave',                    bg: '#1a6fff', text: 'Wave' },
            { label: 'Orange Money',            bg: '#ff6600', text: 'Orange Money' },
            { label: 'Paiement à la livraison', bg: '#166534', text: 'Livraison' },
          ].map(({ label, bg, text }) => (
            <div
              key={label}
              title={label}
              className="text-white text-[9px] font-black px-3 py-1.5 rounded-sm uppercase tracking-widest"
              style={{ backgroundColor: bg }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Disclaimer trading ── */}
      <div className="mb-8 px-4 py-4 border border-green-500/8 rounded-sm" style={{ backgroundColor: 'rgba(34,197,94,0.02)' }}>
        <p className="text-[9px] text-slate-700 text-center leading-relaxed max-w-2xl mx-auto">
          Le trading comporte un niveau élevé de risque. Ne tradez jamais avec de l'argent que vous ne pouvez pas vous permettre de perdre.
          Les performances passées ne garantissent pas les résultats futurs. Formez-vous avant d'investir.
        </p>
      </div>

      {/* ── Bas de page ── */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700">
          © {new Date().getFullYear()} Wayne Enterprize. All rights reserved.
        </p>
        <p className="text-[9px] text-slate-700 uppercase tracking-widest">
          Conception & Développement — AMD Development
        </p>
      </div>
    </div>
  </footer>
);