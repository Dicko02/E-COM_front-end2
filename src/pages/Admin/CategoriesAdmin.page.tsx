import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, TrendingUp, X } from 'lucide-react';
import { categorieApi } from '../../api/Categorie/categorie.api';
import { useToast } from '../../context/ToastContext';

interface Category {
  _id: string;
  nom: string;
  description?: string;
  image?: string;
  productCount: number;
  status: 'active' | 'draft' | 'archived';
}

export const CategoriesAdminPage = () => {
  const toast = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, empty: 0, topPerformer: '' });
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortOrder, setSortOrder] = useState('Newest');
  // Modal création
  const [showModal, setShowModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categorieApi.getAll();
        const categoriesData = Array.isArray(data) ? data : data.data || [];
        
        const formattedCategories: Category[] = categoriesData.map((c: any) => ({
          _id: c._id || c.id,
          nom: c.nom || c.name,
          description: c.description,
          image: c.image,
          productCount: c.productCount || 0,
          status: c.status || 'active'
        }));

        setCategories(formattedCategories);
        setFilteredCategories(formattedCategories);
        
        setStats({
          total: formattedCategories.length,
          active: formattedCategories.filter(c => c.status === 'active').length,
          empty: formattedCategories.filter(c => c.productCount === 0).length,
          topPerformer: formattedCategories.length > 0 
            ? formattedCategories.sort((a, b) => b.productCount - a.productCount)[0].nom 
            : 'N/A'
        });
      } catch (error) {
        console.error('Erreur chargement catégories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    let filtered = categories.filter(c => 
      c.nom.toLowerCase().includes(term.toLowerCase()) ||
      c.description?.toLowerCase().includes(term.toLowerCase())
    );

    if (statusFilter !== 'All Statuses') {
      filtered = filtered.filter(c => c.status === statusFilter.toLowerCase());
    }

    if (sortOrder === 'Alphabetical') {
      filtered.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (sortOrder === 'Products High-Low') {
      filtered.sort((a, b) => b.productCount - a.productCount);
    } else if (sortOrder === 'Oldest') {
      filtered.reverse();
    }

    setFilteredCategories(filtered);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      categorieApi.delete(id).then(() => {
        setCategories(prev => prev.filter(c => c._id !== id));
        setFilteredCategories(prev => prev.filter(c => c._id !== id));
        toast.success('Catégorie supprimée');
      }).catch(() => toast.error('Erreur lors de la suppression'));
    }
  };

  const handleCreate = async () => {
    if (!newCatName.trim()) { toast.error('Entrez un nom de catégorie'); return; }
    setCreating(true);
    try {
      await categorieApi.create(newCatName.trim());
      toast.success('Catégorie créée !');
      setNewCatName('');
      setShowModal(false);
      // Recharger
      const data = await categorieApi.getAll();
      const list = Array.isArray(data) ? data : data.data || [];
      const formatted: Category[] = list.map((c: any) => ({
        _id: c._id || c.id,
        nom: c.nom || c.name,
        description: c.description,
        image: c.image,
        productCount: c.productCount || 0,
        status: c.status || 'active',
      }));
      setCategories(formatted);
      setFilteredCategories(formatted);
    } catch {
      toast.error('Erreur lors de la création');
    } finally {
      setCreating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-emerald-500/10 text-emerald-400', text: 'Actif', dot: 'bg-emerald-500' };
      case 'draft':
        return { color: 'bg-slate-500/10 text-slate-400', text: 'Brouillon', dot: 'bg-slate-500' };
      case 'archived':
        return { color: 'bg-slate-500/10 text-slate-400', text: 'Archivé', dot: 'bg-slate-500' };
      default:
        return { color: 'bg-slate-500/10 text-slate-400', text: 'N/A', dot: 'bg-slate-500' };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">

      {/* Modal création catégorie */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-slate-900 border border-green-500/30 rounded-sm shadow-2xl w-full max-w-md p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wider">Nouvelle Catégorie</h3>
              <button type="button" aria-label="Fermer" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-green-400 mb-2">
                  Nom de la catégorie *
                </label>
                <input
                  type="text"
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
                  placeholder="Ex: Formation, Livre, Coaching..."
                  className="w-full px-4 py-3 bg-black/40 border border-green-500/20 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-sm text-white hover:bg-slate-700 transition font-bold uppercase tracking-widest text-xs">
                  Annuler
                </button>
                <button type="button" onClick={handleCreate} disabled={creating}
                  className="flex-1 px-4 py-3 bg-green-500 rounded-sm text-black hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition font-black uppercase tracking-widest text-xs">
                  {creating ? 'Création...' : 'Créer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-amber-500/20 p-6 rounded-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">📊</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Catégories Totales</p>
          <h3 className="text-3xl font-black text-white mb-2">{stats.total}</h3>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <TrendingUp size={14} /> +2 ce mois
          </div>
        </div>

        <div className="bg-slate-900/40 border border-amber-500/20 p-6 rounded-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">📦</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Catégories Vides</p>
          <h3 className="text-3xl font-black text-white mb-2">{stats.empty}</h3>
          <div className="text-xs text-slate-400">Nécessite attention</div>
        </div>

        <div className="bg-slate-900/40 border border-amber-500/20 p-6 rounded-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">⭐</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Top Performance</p>
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{stats.topPerformer}</h3>
          <div className="flex items-center gap-2 text-xs text-amber-400">
            💰 Leader des revenus
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/40 border border-amber-500/20 p-4 rounded-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher par nom, ID ou tags..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-black/40 border border-amber-500/20 rounded-sm pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-slate-600 outline-none transition-all"
          />
        </div>
        
        <select
          aria-label="Filtrer par statut"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            handleSearch(searchTerm);
          }}
          className="bg-black/40 border border-amber-500/20 rounded-sm px-4 py-2 text-xs font-bold text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all cursor-pointer"
        >
          <option>All Statuses</option>
          <option>active</option>
          <option>draft</option>
          <option>archived</option>
        </select>

        <select
          aria-label="Trier les catégories"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            handleSearch(searchTerm);
          }}
          className="bg-black/40 border border-amber-500/20 rounded-sm px-4 py-2 text-xs font-bold text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all cursor-pointer"
        >
          <option>Sort: Newest</option>
          <option>Sort: Oldest</option>
          <option>Products High-Low</option>
          <option>Alphabetical</option>
        </select>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-black bg-green-500 rounded-sm hover:bg-green-400 transition-all uppercase tracking-widest"
        >
          <Plus size={14} /> + ADD NEW
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/40 border border-amber-500/20 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-black/20 border-b border-amber-500/10">
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400">Image</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400">Catégorie</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400">Produits</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400">Statut</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-xs text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/10">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => {
                  const statusBadge = getStatusBadge(category.status);
                  return (
                    <tr key={category._id} className="hover:bg-amber-500/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded border border-amber-500/20 overflow-hidden bg-slate-800">
                          {category.image ? (
                            <img src={category.image} alt={category.nom} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-amber-500/5">
                              🏷️
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-100">{category.nom}</span>
                          <span className="text-[11px] text-slate-500 italic">ID: {category._id.slice(-6).toUpperCase()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {category.productCount} Produits
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`}></span>
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">{statusBadge.text}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <a
                            href={`/admin/categories/edit/${category._id}`}
                            className="w-8 h-8 flex items-center justify-center rounded border border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-black transition-all"
                            title="Éditer"
                          >
                            <Edit size={16} />
                          </a>
                          <button
                            type="button"
                            aria-label={`Supprimer ${category.nom}`}
                            onClick={() => handleDelete(category._id)}
                            className="w-8 h-8 flex items-center justify-center rounded border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-slate-500 text-sm">Aucune catégorie trouvée</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-sm">
        <h3 className="text-sm font-bold text-amber-400 mb-2">💡 Pro Tip: Taxonomie</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Maintenez une structure hiérarchique propre pour améliorer le SEO. Les catégories imbriquées (ex: Accessories {'>'}  Montres) améliorent la navigation utilisateur et l'efficacité des filtres sur la vitrine.
        </p>
      </div>
    </div>
  );
};
