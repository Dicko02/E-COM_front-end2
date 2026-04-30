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
      {/* ── Overlay recherche ────────────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] flex">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />

          <div className="relative z-10 ml-auto w-full max-w-lg h-fit mt-16 mr-4 bg-slate-950 border border-green-500/25 rounded-sm shadow-2xl shadow-black/60">
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
              <button
                type="button"
                aria-label="Fermer la recherche"
                onClick={() => setSearchOpen(false)}
                className="text-slate-500 hover:text-white transition-colors p-1 flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-3 py-3">
              {searchLoading && (
                <p className="text-slate-500 text-xs py-4 text-center animate-pulse uppercase tracking-widest">
                  Recherche en cours...
                </p>
              )}

              {!searchLoading && searchResults.length > 0 && (
                <div className="space-y-0.5">
                  {searchResults.map((p: any) => (
                    <a
                      key={p._id}
                      href={`/produits/${p._id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-sm hover:bg-green-500/10 transition-colors group"
                    >
                      <div className="w-9 h-9 flex-shrink-0 rounded-sm overflow-hidden border border-green-500/10">
                        <ProductImage image={p.imageUrl} nom={p.nom} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-green-400 truncate transition-colors">
                          {p.nom}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                          {p.categorie?.name}
                        </p>
                      </div>
                      <span className="text-green-400 font-bold text-sm whitespace-nowrap flex-shrink-0">
                        {p.prix?.toFixed(2)}€
                      </span>
                    </a>
                  ))}

                  <a
                    href={`/produits?search=${encodeURIComponent(searchQuery)}`}
                    className="block text-center text-[10px] text-green-500 hover:text-white uppercase tracking-[0.2em] font-bold pt-3 pb-1 border-t border-green-500/10 mt-2 transition-colors"
                  >
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

      {/* ── Topbar ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/92 backdrop-blur-md border-b border-green-500/15 h-16 flex items-center px-4">

        {/* Espace gauche — réservé au bouton ☰ de la Sidebar */}
        <div className="w-14 flex-shrink-0" />

        {/* Logo centré */}
        <a href="/" className="flex-1 flex justify-center items-center group">
          <div className="text-center">
            <p className="text-white font-black text-sm tracking-[0.2em] uppercase leading-none">Wayne</p>
            <p className="text-green-400 font-bold text-[8px] tracking-[0.35em] uppercase">Enterprize</p>
          </div>
        </a>

        {/* Actions droite */}
        <div className="flex items-center gap-1 flex-shrink-0">
          
          {/* Panier — Maintenant placé AVANT la recherche pour que la recherche soit à l'extrémité */}
          {!isAdmin && (
            <a
              href="/panier"
              className="relative p-2.5 text-slate-400 hover:text-green-400 transition-colors rounded-sm hover:bg-green-500/10 border border-transparent hover:border-green-500/20"
              aria-label="Mon panier"
            >
              <ShoppingCart
                size={18}
                className={`transition-colors duration-200 ${cartBump ? 'text-green-400' : ''}`}
              />
              {cart.length > 0 && (
                <span className={`
                  absolute -top-0.5 -right-0.5
                  min-w-[1.1rem] h-[1.1rem] px-[3px]
                  bg-green-500 text-black
                  text-[9px] font-black
                  rounded-full
                  flex items-center justify-center
                  border-2 border-black
                  transition-transform duration-300
                  ${cartBump ? 'scale-125' : 'scale-100'}
                `}>
                  {cart.length > 99 ? '99+' : cart.length}
                </span>
              )}
            </a>
          )}

          {/* Bouton recherche — Poussé au maximum à droite avec style inline */}
          <button
            type="button"
            aria-label="Rechercher"
            onClick={() => setSearchOpen(true)}
            style={{ marginLeft: '4px' }}
            className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-green-400 transition-all rounded-sm hover:bg-green-500/10 group border border-transparent hover:border-green-500/20"
          >
            <Search size={18} className="flex-shrink-0" />
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-green-400 transition-colors">
              Rechercher
            </span>
          </button>

        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 flex-shrink-0" />
    </>
  );
};