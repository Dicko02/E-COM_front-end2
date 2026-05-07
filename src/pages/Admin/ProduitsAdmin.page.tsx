import { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, Edit, Trash2, TrendingUp, AlertTriangle } from 'lucide-react';
import { produitApi } from '../../api/Produit/produit.api';
import { categorieApi } from '../../api/Categorie/categorie.api';
import { ProductImage } from '../../components/Produit/ProductImage';
import { useToast } from '../../context/ToastContext';

interface Product {
  _id: string;
  nom: string;
  prix: number;
  ancienPrix?: number;
  stock: number;
  image?: string;
  categorie?: { name?: string; _id?: string };
  status: 'active' | 'low' | 'out';
}

export const ProduitsAdminPage = () => {
  const toast = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    lowStock: 0,
    outOfStock: 0
  });
  
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger produits et catégories en parallèle
        const [productsData, categoriesData] = await Promise.all([
          produitApi.getAll(),
          categorieApi?.getAll?.().catch(() => [])
        ]);

        // Créer une map ID → Catégorie pour enrichir les produits
        const categoryMap: any = {};
        const cData = Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || [];
        cData.forEach((cat: any) => {
          categoryMap[cat._id] = cat;
        });

        // Formater les produits avec catégories enrichies
        const pData = Array.isArray(productsData) ? productsData : productsData.data || [];
        const formattedProducts: Product[] = pData.map((p: any) => ({
          _id: p._id || p.id,
          nom: p.nom || 'Produit sans nom',
          prix: p.prix || 0,
          ancienPrix: p.ancienPrix,
          stock: p.nombreDisponible || 0,
          image: p.imageUrl,
          // ✅ Enrichir categorie: si c'est un ID, chercher dans la map
          categorie: typeof p.categorie === 'string' 
            ? categoryMap[p.categorie] || { name: 'N/A', _id: p.categorie }
            : p.categorie || { name: 'N/A', _id: '' },
          status: getProductStatus(p.nombreDisponible || 0)
        }));

        // Stocker les catégories
        //setCategories(cData);

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
        
        setStats({
          total: formattedProducts.length,
          active: formattedProducts.filter(p => p.status === 'active').length,
          lowStock: formattedProducts.filter(p => p.status === 'low').length,
          outOfStock: formattedProducts.filter(p => p.status === 'out').length
        });
      } catch (error) {
        console.error('Erreur chargement produits:', error);
      } finally {
        // chargement terminé
      }
    };

    fetchData();
  }, []);

  const getProductStatus = (stock: number): 'active' | 'low' | 'out' => {
    if (stock === 0) return 'out';
    if (stock <= 20) return 'low';
    return 'active';
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = products.filter(p => 
      p.nom.toLowerCase().includes(term.toLowerCase()) ||
      p.categorie?.name?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await produitApi.delete(id);
        setProducts(prev => prev.filter(p => p._id !== id));
        setFilteredProducts(prev => prev.filter(p => p._id !== id));
        toast.success('Produit supprimé');
      } catch {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-emerald-500/10 text-emerald-400', text: 'Actif', dot: 'bg-emerald-500' };
      case 'low':
        return { color: 'bg-amber-500/10 text-amber-400', text: 'Stock Faible', dot: 'bg-amber-500' };
      case 'out':
        return { color: 'bg-red-500/10 text-red-400', text: 'Rupture', dot: 'bg-red-500' };
      default:
        return { color: 'bg-slate-500/10 text-slate-400', text: 'N/A', dot: 'bg-slate-500' };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Stock Total", value: stats.total, icon: TrendingUp, text: "+8% ce mois", color: "text-emerald-400" },
          { label: "Produits Actifs", value: stats.active, icon: null, text: "Actuellement actifs", color: "text-slate-400" },
          { label: "Stock Faible", value: stats.lowStock, icon: AlertTriangle, text: "Réapprovisionner", color: "text-amber-400", valueColor: "text-amber-500" },
          { label: "Rupture", value: stats.outOfStock, icon: AlertTriangle, text: "Critique", color: "text-red-400", valueColor: "text-red-500" }
        ].map((stat, idx) => (
          <div key={stat.label} className="bg-slate-900/40 border border-amber-500/20 p-6 rounded-sm hover:border-amber-500/40 transition-all duration-300 hover:scale-105 animate-fadeInUp" style={{ animationDelay: (idx * 100) + 'ms' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
            <h3 className={`text-3xl font-black mb-4 ${stat.valueColor || 'text-white'}`}>{stat.value}</h3>
            <div className={`flex items-center gap-2 text-xs ${stat.color}`}>
              {stat.icon && <stat.icon size={14} />} {stat.text}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/40 border border-amber-500/20 rounded-sm overflow-hidden animate-fadeInUp delay-400">
        <div className="p-6 border-b border-amber-500/10 space-y-4 md:space-y-0 md:flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="relative w-full lg:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher par nom, catégorie..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-black/40 border border-amber-500/20 rounded-sm pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-slate-600 outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-300 bg-black/40 border border-amber-500/20 rounded-sm hover:border-amber-500/40 transition-all uppercase">
              <Filter size={14} /> Filtrer
            </button>
            <button className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-300 bg-black/40 border border-amber-500/20 rounded-sm hover:border-amber-500/40 transition-all uppercase">
              <Download size={14} /> Export
            </button>
            <a href="/admin/produits/nouveau" className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-black bg-amber-500 rounded-sm hover:bg-white transition-all uppercase tracking-widest relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <Plus size={14} /> Ajouter
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-black/20 border-b border-amber-500/10">
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400">Produit</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400">Catégorie</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400">Statut</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400">Stock</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400">Prix</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/10">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  const statusBadge = getStatusBadge(product.status);
                  return (
                    <tr key={product._id} className="hover:bg-amber-500/5 transition-all duration-300 hover:scale-[1.01]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 min-w-[64px] flex-shrink-0">
                            <ProductImage image={product.image} nom={product.nom} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-100 truncate max-w-[200px]" title={product.nom}>
                              {product.nom}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-400">{product.categorie?.name || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-bold ${statusBadge.color}`}>
                          <span className={`w-1 h-1 rounded-full ${statusBadge.dot} mr-2`}></span>
                          {statusBadge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32">
                          <div className="flex justify-between text-[10px] mb-1 text-slate-400">
                            <span>{product.stock}/100</span>
                            <span>{Math.round((product.stock / 100) * 100)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all ${
                                product.status === 'out' ? 'bg-red-500' :
                                product.status === 'low' ? 'bg-amber-500' :
                                'bg-emerald-500'
                              }`}
                              style={{width: `${Math.min(product.stock, 100)}%`}}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-100">{product.prix.toLocaleString()} €</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a 
                            href={`/admin/produits/modifier/${product._id}`}
                            className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded transition-all"
                            title="Éditer"
                          >
                            <Edit size={18} />
                          </a>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                            title="Supprimer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-slate-500 text-sm">Aucun produit trouvé</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-black/20 border-t border-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Affichage {(currentPage - 1) * itemsPerPage + 1} à {Math.min(currentPage * itemsPerPage, filteredProducts.length)} de {filteredProducts.length} produits
          </p>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded border border-amber-500/20 text-slate-400 hover:bg-amber-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-all ${
                    currentPage === pageNum
                      ? 'bg-amber-500 text-black'
                      : 'border border-amber-500/20 text-slate-400 hover:border-amber-500/40'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && (
              <>
                <span className="px-2 text-slate-500">...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-8 h-8 flex items-center justify-center rounded border border-amber-500/20 text-slate-400 hover:border-amber-500/40 transition-colors text-xs font-bold"
                >
                  {totalPages}
                </button>
              </>
            )}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded border border-amber-500/20 text-slate-400 hover:bg-amber-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
