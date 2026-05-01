import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { produitApi } from '../../api/Produit/produit.api';
import { ProductImage } from '../Produit/ProductImage';

export const Header = () => {
  const { user } = useAuth();
  const { cart, cartBump } = useCart();

  const [searchOpen, setSearchOpen]       = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const t = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const data = await produitApi.search({ q: searchQuery });
        const r = Array.isArray(data) ? data : ((data as { products?: unknown[] })?.products || []);
        setSearchResults((r as any[]).slice(0, 6));
      } catch { setSearchResults([]); }
      finally { setSearchLoading(false); }
    }, 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  return (
    <>
      {/* ── Panneau recherche ─────────────────────────────────────────
          ✅ SEUL CHANGEMENT PAR RAPPORT À LA VERSION PRÉCÉDENTE :
          Le conteneur est toujours fixed inset-0 pour le fond sombre,
          mais le panneau lui-même utilise position:absolute + right/top
          au lieu de flex-end (qui était annulé par le div absolute du fond).
      ──────────────────────────────────────────────────────────────── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[70]"
          onClick={() => setSearchOpen(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        >
          {/* Panneau ancré en haut à droite via position absolute */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position:        'absolute',
              top:             '72px',   // juste sous le header (64px) + petit gap
              right:           '16px',   // aligné avec le bord droit du header
              width:           '420px',
              maxWidth:        'calc(100vw - 32px)', // responsive mobile
              backgroundColor: '#0a0a14',
              border:          '1px solid rgba(34,197,94,0.25)',
              borderRadius:    '4px',
              boxShadow:       '0 25px 50px rgba(0,0,0,0.6)',
            }}
          >
            {/* Barre de saisie */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-green-500/15">
              <Search size={18} className="text-green-500 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim())
                    window.location.href = `/produits?search=${encodeURIComponent(searchQuery)}`;
                }}
                placeholder="Rechercher une formation..."
                className="flex-1 bg-transparent text-white text-base outline-none placeholder-slate-600"
              />
              <button type="button" onClick={() => setSearchOpen(false)}
                className="text-slate-500 hover:text-white transition-colors p-1 flex-shrink-0">
                <X size={20} />
              </button>
            </div>

            {/* Résultats */}
            <div className="px-3 py-3 max-h-[60vh] overflow-y-auto">
              {searchLoading && (
                <p className="text-slate-500 text-xs py-4 text-center animate-pulse uppercase tracking-widest">
                  Recherche...
                </p>
              )}
              {!searchLoading && searchResults.length > 0 && (
                <div className="space-y-0.5">
                  {searchResults.map((p: any) => (
                    <a key={p._id} href={`/produits/${p._id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-sm hover:bg-green-500/10 transition-colors group">
                      <div className="w-9 h-9 flex-shrink-0 rounded-sm overflow-hidden border border-green-500/10">
                        <ProductImage image={p.imageUrl} nom={p.nom} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-green-400 truncate">{p.nom}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{p.categorie?.name}</p>
                      </div>
                      <span className="text-green-400 font-bold text-sm flex-shrink-0">
                        {p.prix?.toFixed(2)}€
                      </span>
                    </a>
                  ))}
                  <a href={`/produits?search=${encodeURIComponent(searchQuery)}`}
                    className="block text-center text-[10px] text-green-500 hover:text-white uppercase tracking-[0.2em] font-bold pt-3 pb-1 border-t border-green-500/10 mt-2 transition-colors">
                    Voir tous les résultats →
                  </a>
                </div>
              )}
              {!searchLoading && searchQuery.trim() && searchResults.length === 0 && (
                <p className="text-slate-500 text-sm py-4 text-center">
                  Aucun résultat pour «&nbsp;<span className="text-white">{searchQuery}</span>&nbsp;»
                </p>
              )}
              {!searchQuery && (
                <p className="text-slate-700 text-[10px] py-3 text-center uppercase tracking-widest">
                  Entrée pour rechercher · Échap pour fermer
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Topbar — NE PAS TOUCHER (fonctionne déjà correctement) ── */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          backgroundColor: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(34,197,94,0.15)',
        }}
      >
        <div style={{ width: '56px', flexShrink: 0 }} />

        <a href="/" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#fff', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', lineHeight: 1, margin: 0 }}>
              Wayne
            </p>
            <p style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.5rem', letterSpacing: '0.35em', textTransform: 'uppercase', margin: 0 }}>
              Enterprize
            </p>
          </div>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          {!isAdmin && (
            <a href="/panier" aria-label="Mon panier"
              style={{ position: 'relative', padding: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', borderRadius: '4px', textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget as HTMLElement).style.color = '#22c55e'}
              onMouseOut={e  => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
            >
              <ShoppingCart size={18} style={{ color: cartBump ? '#22c55e' : 'inherit', transition: 'color 0.2s' }} />
              {cart.length > 0 && (
                <span style={{
                  position: 'absolute', top: 2, right: 2,
                  minWidth: '1.1rem', height: '1.1rem',
                  backgroundColor: '#22c55e', color: '#000',
                  fontSize: '9px', fontWeight: 900,
                  borderRadius: '9999px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #000', padding: '0 2px',
                  transform: cartBump ? 'scale(1.25)' : 'scale(1)',
                  transition: 'transform 0.3s',
                }}>
                  {cart.length > 99 ? '99+' : cart.length}
                </span>
              )}
            </a>
          )}

          <button type="button" onClick={() => setSearchOpen(true)} aria-label="Rechercher"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 12px', borderRadius: '4px',
              background: 'none', border: '1px solid transparent',
              color: '#94a3b8', cursor: 'pointer',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'color 0.2s, border-color 0.2s, background 0.2s',
            }}
            onMouseOver={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = '#22c55e';
              el.style.backgroundColor = 'rgba(34,197,94,0.1)';
              el.style.borderColor = 'rgba(34,197,94,0.2)';
            }}
            onMouseOut={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = '#94a3b8';
              el.style.backgroundColor = 'transparent';
              el.style.borderColor = 'transparent';
            }}
          >
            <Search size={18} style={{ flexShrink: 0 }} />
          </button>
        </div>
      </header>

      <div style={{ height: '64px', flexShrink: 0 }} />
    </>
  );
};