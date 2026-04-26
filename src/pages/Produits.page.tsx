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
      `}</style>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-4">
            Notre Collection
          </h1>
          <p className="text-slate-400 text-lg font-light">
            Découvrez notre sélection exclusive de pièces premium
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 flex gap-4 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-6 py-4 border border-amber-500/20 bg-slate-900 rounded-sm text-white focus:outline-none focus:border-amber-500 transition-colors placeholder-slate-600"
            />
            <Search className="absolute right-4 top-4 w-5 h-5 text-amber-500" />
          </div>
          <button
            type="button"
            onClick={() => handleSearch()}
            className="px-8 py-4 bg-amber-500 text-black rounded-sm hover:bg-white font-bold uppercase tracking-widest text-sm transition-colors"
          >
            Rechercher
          </button>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-6 py-4 border border-amber-500 text-amber-500 rounded-sm flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:bg-amber-500 hover:text-black transition-colors"
          >
            <Filter size={20} />
            Filtres
          </button>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-48 flex-shrink-0 sticky top-32 h-fit">
            <div className="space-y-8 bg-slate-900/30 p-6 rounded-sm border border-amber-500/10">
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
                      className={`w-full text-left px-3 py-2 rounded-sm transition-colors ${
                        !selectedCategory
                          ? 'bg-amber-500 text-black font-semibold'
                          : 'text-slate-400 hover:text-amber-500'
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
                        className={`w-full text-left px-3 py-2 rounded-sm transition-colors ${
                          selectedCategory === cat._id
                            ? 'bg-amber-500 text-black font-semibold'
                            : 'text-slate-400 hover:text-amber-500'
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
                      className="w-full bg-slate-800 border border-amber-500/20 rounded-sm px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-slate-400 flex items-center">-</span>
                    <input
                      type="number"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      placeholder="Max"
                      className="w-full bg-slate-800 border border-amber-500/20 rounded-sm px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500"
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
            <div className="fixed inset-0 bg-black/80 z-40 lg:hidden">
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900 border-l border-amber-500/20 p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold uppercase">Filtres</h2>
                  <button
                    type="button"
                    aria-label="Fermer les filtres"
                    onClick={() => setMobileFilterOpen(false)}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredByPrice.map((product: any) => (
                  <ProductCard key={product._id} product={product} />
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
                  className="text-amber-500 hover:text-white transition-colors font-semibold uppercase tracking-wider text-sm"
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
