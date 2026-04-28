import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { produitApi } from '../../api/Produit/produit.api';
import { categorieApi } from '../../api/Categorie/categorie.api';
import { ProductImage } from '../Produit/ProductImage';

export const Header = () => {
  const { user, logout } = useAuth();
  const { cart, cartBump } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [searchLoading, setSearchLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    categorieApi.getAll().then((data: unknown[]) => setCategories(data)).catch(() => {});
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setAccountDropdownOpen(false);
    };
    if (accountDropdownOpen) document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [accountDropdownOpen]);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setMenuOpen(false);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); setAccountDropdownOpen(false); }
    };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const t = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const data = await produitApi.search({ q: searchQuery });
        const r = Array.isArray(data) ? data : ((data as {products?: unknown[]})?.products || []);
        setSearchResults(r.slice(0, 6));
      } catch { setSearchResults([]); }
      finally { setSearchLoading(false); }
    }, 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  return (
    <>
      <style>{`
        .nav-link { position: relative; transition: color 0.3s ease; }
        .nav-link::after {
          content: ''; position: absolute; width: 0; height: 1px;
          bottom: -4px; left: 0; background-color: #22c55e;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .glass-effect {
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
        }
      `}</style>

      {/* Overlay recherche */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative z-10 bg-black/95 border-b border-green-500/20 px-6 py-6 animate-fadeInDown">
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
                  placeholder="Rechercher une formation, un livre..."
                  className="flex-1 bg-transparent text-white text-xl outline-none placeholder-slate-600"
                />
                <button type="button" aria-label="Fermer la recherche" onClick={() => setSearchOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1">
                  <X size={24} />
                </button>
              </div>
              {searchLoading && <p className="text-slate-500 text-sm mt-4 animate-pulse">Recherche...</p>}
              {!searchLoading && searchResults.length > 0 && (
                <div className="mt-4 space-y-1">
                  {searchResults.map((p: any) => (
                    <a key={p._id} href={`/produits/${p._id}`} onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-sm hover:bg-green-500/10 transition-colors group">
                      <div className="w-10 h-10 flex-shrink-0">
                        <ProductImage image={p.image} nom={p.nom} className="rounded-sm border border-green-500/10" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white group-hover:text-green-400 truncate">{p.nom}</p>
                        <p className="text-xs text-slate-500">{p.categorie?.name}</p>
                      </div>
                      <span className="text-green-400 font-bold text-sm whitespace-nowrap">{p.prix?.toFixed(2)}$</span>
                    </a>
                  ))}
                  <a href={`/produits?search=${encodeURIComponent(searchQuery)}`}
                    className="block text-center text-xs text-green-400 hover:text-white uppercase tracking-widest font-bold pt-3 pb-1 transition-colors">
                    Voir tous les résultats →
                  </a>
                </div>
              )}
              {!searchLoading && searchQuery.trim() && searchResults.length === 0 && (
                <p className="text-slate-500 text-sm mt-4">Aucun résultat pour "<span className="text-white">{searchQuery}</span>"</p>
              )}
              {!searchQuery && (
                <p className="text-slate-600 text-xs mt-4 uppercase tracking-widest">Entrée pour rechercher · Échap pour fermer</p>
              )}
            </div>
          </div>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 glass-effect border-b border-green-500/20">
        <div className="w-full px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="group flex items-center space-x-2">
              {/* <div className="w-9 h-9 bg-green-500 rounded-sm flex items-center justify-center group-hover:bg-green-400 transition-colors">
                <img src="/logo.jpeg" alt="W" className="w-full h-full object-contain rounded-sm"
                  onError={e => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                    t.parentElement!.innerHTML = '<span class="text-black font-black text-lg">W</span>';
                  }}
                />
              </div> */}
              <div className="hidden sm:block">
                <p className="text-white font-black text-sm tracking-widest uppercase leading-none">Wayne</p>
                <p className="text-green-400 font-bold text-[9px] tracking-[0.3em] uppercase">Enterprize</p>
              </div>
            </a>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="nav-link text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:text-green-400">
              Accueil
            </a>
            <a href="/produits" className="nav-link text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:text-green-400">
              Formations
            </a>
            {user?.role === 'admin' && (
              <a href="/admin/dashboard" className="nav-link text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:text-green-400">
                Admin
              </a>
            )}
            <a href="/contact" className="nav-link text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:text-green-400">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">

            {/* Recherche */}
            <button type="button" aria-label="Ouvrir la recherche" onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-300 hover:text-green-400 transition-colors hidden sm:block">
              <Search size={20} />
            </button>

            {/* Compte */}
            <div className="relative" ref={dropdownRef}>
              <button type="button" aria-label="Menu compte" onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="flex items-center space-x-2 p-2 text-slate-300 hover:text-green-400 transition-colors">
                <User size={20} />
                <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-widest">
                  {user ? 'Compte' : 'Login'}
                </span>
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-slate-900 border border-green-500/20 rounded-sm shadow-2xl shadow-black/50 animate-fadeInDown z-50">
                  <div className="p-4 space-y-3">
                    {user ? (
                      <>
                        <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-3 truncate">{user.email}</div>
                        {user.role === 'client' && (
                          <a href="/commandes" className="block text-[10px] uppercase tracking-widest text-slate-400 hover:text-green-400 transition-colors">
                            Mes Commandes
                          </a>
                        )}
                        <hr className="border-green-500/10" />
                        <button type="button" onClick={() => { logout(); setAccountDropdownOpen(false); }}
                          className="block w-full text-left text-[10px] uppercase tracking-widest text-green-400 hover:text-green-300 transition-colors">
                          Déconnexion
                        </button>
                      </>
                    ) : (
                      <>
                        <a href="/connexion" className="block text-[10px] uppercase tracking-widest text-slate-400 hover:text-green-400 transition-colors">Connexion</a>
                        <a href="/inscription" className="block text-[10px] uppercase tracking-widest text-slate-400 hover:text-green-400 transition-colors">Inscription</a>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Panier */}
            <a href="/panier" className="relative p-2 text-slate-300 hover:text-green-400 transition-colors">
              <ShoppingCart size={20} className={cartBump ? 'text-green-400' : ''} />
              {cart.length > 0 && (
                <span className={`absolute -top-1 -right-1 bg-green-500 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black transition-transform duration-300 ${cartBump ? 'scale-125' : 'scale-100'}`}>
                  {cart.length}
                </span>
              )}
            </a>

            {/* Menu mobile */}
            <button type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-green-400">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Barre de catégories */}
        {categories.length > 0 && (
          <div className="hidden lg:flex items-center gap-1 px-6 py-2 border-t border-green-500/10 overflow-x-auto scrollbar-hide">
            <a href="/produits"
              className="flex-shrink-0 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-sm transition-colors">
              Tous
            </a>
            {categories.map((cat: {_id: string; name: string}) => (
              <a key={cat._id} href={`/produits?category=${cat._id}`}
                className="flex-shrink-0 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-sm transition-colors whitespace-nowrap">
                {cat.name}
              </a>
            ))}
          </div>
        )}

        {/* Menu mobile */}
        {menuOpen && (
          <div className="border-t border-green-500/20 bg-black/95 backdrop-blur-md animate-fadeInDown">
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-900/40 rounded-sm border border-green-500/10">
                <Search size={16} className="text-green-500 flex-shrink-0" />
                <input type="text" placeholder="Rechercher..."
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const v = (e.target as HTMLInputElement).value;
                      if (v.trim()) window.location.href = `/produits?search=${encodeURIComponent(v)}`;
                    }
                  }}
                  className="bg-transparent text-white text-sm outline-none placeholder-slate-600 w-full" />
              </div>
              <a href="/" className="block px-4 py-3 text-slate-300 rounded-sm hover:bg-green-500/10 hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Accueil</a>
              <a href="/produits" className="block px-4 py-3 text-slate-300 rounded-sm hover:bg-green-500/10 hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Produits</a>
              <a href="/contact" className="block px-4 py-3 text-slate-300 rounded-sm hover:bg-green-500/10 hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Contact</a>
              {user?.role === 'admin' && (
                <a href="/admin/dashboard" className="block px-4 py-3 text-slate-300 rounded-sm hover:bg-green-500/10 hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Dashboard Admin</a>
              )}
              {user?.role === 'client' && (
                <a href="/commandes" className="block px-4 py-3 text-slate-300 rounded-sm hover:bg-green-500/10 hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Commandes</a>
              )}
              <a href="/panier" className="block px-4 py-3 text-slate-300 rounded-sm hover:bg-green-500/10 hover:text-green-400 transition-colors text-sm uppercase tracking-wider">
                Panier {cart.length > 0 && (
                  <span className="ml-2 bg-green-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cart.length}</span>
                )}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-20 flex-shrink-0" />
    </>
  );
};
