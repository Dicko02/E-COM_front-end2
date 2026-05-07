import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { produitApi } from '../api/Produit/produit.api';
import { categorieApi } from '../api/Categorie/categorie.api';
import { ProductCard } from '../components/Produit/ProductCard';

export const ProduitsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [visible, setVisible] = useState(false);

  const loadProducts = async () => {
    try {
      const data = await produitApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Erreur chargement produits:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categorieApi?.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Erreur chargement catégories:', error);
    }
  };

  const handleSearch = async (query?: string) => {
    const q = query ?? searchQuery;
    if (!q.trim()) {
      loadProducts();
      return;
    }
    try {
      const data = await produitApi.search({ q });
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error('Erreur recherche:', error);
    }
  };

  const filterByCategory = async (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (!categoryId) { loadProducts(); return; }
    try {
      const data = await produitApi.getByCategory(categoryId);
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error('Erreur filtrage:', error);
    }
  };

  useEffect(() => {
    // Lire le paramètre ?search= dans l'URL (venant du header)
    const params = new URLSearchParams(window.location.search);
    const urlSearch = params.get('search') || '';
    if (urlSearch) {
      setSearchQuery(urlSearch);
      handleSearch(urlSearch);
    } else {
      loadProducts();
    }
    loadCategories();

    // Trigger animations
    setTimeout(() => setVisible(true), 100);
  }, []);

  const filteredByPrice = products.filter(
    (p: any) => p.prix >= priceRange[0] && p.prix <= priceRange[1]
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f2b90d;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Page Header */}
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-4">
            Notre Collection
          </h1>
          <p className="text-slate-400 text-lg font-light">
            Découvrez notre sélection exclusive de pièces premium
          </p>
        </div>

        {/* Search Bar */}
        <div className={`mb-12 flex gap-4 flex-col sm:flex-row transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex-1 relative group">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-6 py-4 border border-amber-500/20 bg-slate-900 rounded-sm text-white focus:outline-none focus:border-amber-500 transition-all placeholder-slate-600 group-hover:border-amber-500/40"
            />
            <Search className="absolute right-4 top-4 w-5 h-5 text-amber-500 transition-transform group-hover:scale-110" />
          </div>
          <button
            type="button"
            onClick={() => handleSearch()}
            className="px-8 py-4 bg-amber-500 text-black rounded-sm hover:bg-white font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Rechercher</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-6 py-4 border border-amber-500 text-amber-500 rounded-sm flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:bg-amber-500 hover:text-black transition-all"
          >
            <Filter size={20} />
            Filtres
          </button>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className={`hidden md:block w-48 flex-shrink-0 sticky top-32 h-fit transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="space-y-8 bg-slate-900/30 p-6 rounded-sm border border-amber-500/10 hover:border-amber-500/20 transition-all duration-300">
              {/* Categories */}
              <section>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-amber-500 mb-6">
                  Catégories
                </h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <button
                      type="button"
                      onClick={() => filterByCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-sm transition-all ${
                        !selectedCategory
                          ? 'bg-amber-500 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                          : 'text-slate-400 hover:text-amber-500 hover:bg-amber-500/5'
                      }`}
                    >
                      Tous les Produits
                    </button>
                  </li>
                  {categories.map((cat: any) => (
                    <li key={cat._id}>
                      <button
                        type="button"
                        onClick={() => filterByCategory(cat._id)}
                        className={`w-full text-left px-3 py-2 rounded-sm transition-all ${
                          selectedCategory === cat._id
                            ? 'bg-amber-500 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                            : 'text-slate-400 hover:text-amber-500 hover:bg-amber-500/5'
                        }`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Price Range */}
              <section>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-amber-500 mb-6">
                  Gamme de Prix
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      max="5000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      placeholder="Min"
                      className="w-full bg-slate-800 border border-amber-500/20 rounded-sm px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <span className="text-slate-400 flex items-center">-</span>
                    <input
                      type="number"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      placeholder="Max"
                      className="w-full bg-slate-800 border border-amber-500/20 rounded-sm px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    Budget: {priceRange[0]}€ - {priceRange[1]}€
                  </p>
                </div>
              </section>
            </div>
          </aside>

          {/* Mobile Filters */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 bg-black/80 z-40 lg:hidden animate-fadeIn">
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900 border-l border-amber-500/20 p-6 overflow-y-auto animate-slideInRight">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold uppercase">Filtres</h2>
                  <button
                    type="button"
                    aria-label="Fermer les filtres"
                    onClick={() => setMobileFilterOpen(false)}
                    className="hover:text-amber-500 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-amber-500 mb-6">
                      Catégories
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            filterByCategory(null);
                            setMobileFilterOpen(false);
                          }}
                          className="text-slate-400 hover:text-amber-500 transition-colors"
                        >
                          Tous
                        </button>
                      </li>
                      {categories.map((cat: any) => (
                        <li key={cat._id}>
                          <button
                            type="button"
                            onClick={() => {
                              filterByCategory(cat._id);
                              setMobileFilterOpen(false);
                            }}
                            className="text-slate-400 hover:text-amber-500 transition-colors"
                          >
                            {cat.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredByPrice.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
                {filteredByPrice.map((product: any, idx: number) => (
                  <div 
                    key={product._id} 
                    className="w-full animate-fadeInUp"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg mb-4">Aucun produit trouvé</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 5000]);
                    setSearchQuery('');
                    loadProducts();
                  }}
                  className="text-amber-500 hover:text-white transition-colors font-semibold uppercase tracking-wider text-sm hover:scale-105 inline-block"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
