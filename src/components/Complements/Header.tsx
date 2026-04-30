import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { produitApi } from '../../api/Produit/produit.api';
import { ProductImage } from '../Produit/ProductImage';

export const Header = () => {
  const { user } = useAuth();
  const { cart, cartBump } = useCart();

  const [searchOpen, setSearchOpen]     = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isAdmin  = user?.role === 'admin';

  /* ── Recherche ────────────────────────────────────────────── */
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
      {/* ── Overlay recherche ─────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative z-10 bg-black/95 border-b border-green-500/20 px-6 py-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-4">
                <Search size={20} className="text-green-500 flex-shrink-0" />
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
                  className="flex-1 bg-transparent text-white text-xl outline-none placeholder-slate-600"
                />
                <button type="button" aria-label="Fermer" onClick={() => setSearchOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1">
                  <X size={24} />
                </button>
              </div>

              {searchLoading && (
                <p className="text-slate-500 text-sm mt-4 animate-pulse">Recherche...</p>
              )}

              {!searchLoading && searchResults.length > 0 && (
                <div className="mt-4 space-y-1">
                  {searchResults.map((p: any) => (
                    <a key={p._id} href={`/produits/${p._id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-sm hover:bg-green-500/10 transition-colors group">
                      <div className="w-10 h-10 flex-shrink-0">
                        <ProductImage image={p.imageUrl} nom={p.nom} className="rounded-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white group-hover:text-green-400 truncate">{p.nom}</p>
                        <p className="text-xs text-slate-500">{p.categorie?.name}</p>
                      </div>
                      <span className="text-green-400 font-bold text-sm whitespace-nowrap">
                        {p.prix?.toFixed(2)}€
                      </span>
                    </a>
                  ))}
                  <a href={`/produits?search=${encodeURIComponent(searchQuery)}`}
                    className="block text-center text-xs text-green-400 hover:text-white uppercase tracking-widest font-bold pt-3 pb-1 transition-colors">
                    Voir tous les résultats →
                  </a>
                </div>
              )}

              {!searchLoading && searchQuery.trim() && searchResults.length === 0 && (
                <p className="text-slate-500 text-sm mt-4">
                  Aucun résultat pour "<span className="text-white">{searchQuery}</span>"
                </p>
              )}

              {!searchQuery && (
                <p className="text-slate-600 text-xs mt-4 uppercase tracking-widest">
                  Entrée pour rechercher · Échap pour fermer
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Topbar ────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-green-500/15 h-16 flex items-center px-4">

        {/*
          Espace gauche — réservé au bouton ☰ de la Sidebar (fixé lui-même en position: fixed).
          On laisse 3.5rem pour ne pas chevaucher le bouton.
        */}
        <div className="w-14 flex-shrink-0" />

        {/* ── Logo centré ───────────────────────────────────── */}
        <a href="/" className="flex-1 flex justify-center items-center gap-2 group">
          <div className="text-center">
            <p className="text-white font-black text-sm tracking-[0.2em] uppercase leading-none">Wayne</p>
            <p className="text-green-400 font-bold text-[8px] tracking-[0.35em] uppercase">Enterprize</p>
          </div>
        </a>

        {/* ── Actions droite ────────────────────────────────── */}
        <div className="flex items-center gap-1 flex-shrink-0">

          {/* Recherche */}
          <button type="button" aria-label="Rechercher" onClick={() => setSearchOpen(true)}
            className="p-2.5 text-slate-400 hover:text-green-400 transition-colors rounded-sm hover:bg-green-500/10">
            <Search size={19} />
          </button>

          {/* Panier — masqué pour les admins */}
          {!isAdmin && (
            <a href="/panier"
              className="relative p-2.5 text-slate-400 hover:text-green-400 transition-colors rounded-sm hover:bg-green-500/10"
              aria-label="Mon panier"
            >
              <ShoppingCart
                size={19}
                className={`transition-colors duration-200 ${cartBump ? 'text-green-400' : ''}`}
              />

              {/* Badge nombre d'articles */}
              {cart.length > 0 && (
                <span className={`
                  absolute -top-0.5 -right-0.5
                  min-w-[1.1rem] h-[1.1rem] px-[3px]
                  bg-green-500 text-black
                  text-[9px] font-black
                  rounded-full
                  flex items-center justify-center
                  border border-black
                  transition-transform duration-300
                  ${cartBump ? 'scale-125' : 'scale-100'}
                `}>
                  {cart.length > 99 ? '99+' : cart.length}
                </span>
              )}
            </a>
          )}
        </div>
      </header>

      {/* Spacer pour compenser la topbar fixe */}
      <div className="h-16 flex-shrink-0" />
    </>
  );
};