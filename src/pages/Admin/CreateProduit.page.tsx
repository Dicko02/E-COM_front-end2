import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';
import { produitApi } from '../../api/Produit/produit.api';
import { categorieApi } from '../../api/Categorie/categorie.api';
import { useToast } from '../../context/ToastContext';
//import { Button } from '../../components/Complements/Button';

export const CreateProduitPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    categorie: '',
    prix: '',
    ancienPrix: '',
    nombreDisponible: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // loadCategories avec useCallback pour éviter les problèmes de dépendances
  const loadCategories = useCallback(async () => {
    try {
      const data = await categorieApi.getAll();
      setCategories(data);
    } catch {
      toast.error('Erreur chargement catégories');
    }
  }, [toast]);

  // useEffect appelle loadCategories au montage
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Format non supporté. Utilisez JPEG, PNG ou WebP.');
      e.target.value = '';
      return;
    }

    // Validation taille (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image trop lourde. Maximum 5MB.');
      e.target.value = '';
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!formData.nom || !formData.prix || !formData.categorie) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = '';

      if (imageFile) {
        const uploadResult = await produitApi.uploadImage(imageFile);
        // Stocker uniquement le nom de fichier, pas l'URL complète
        imageUrl = uploadResult.filename || uploadResult.imageUrl?.split('/uploads/').pop() || '';
      }

      const productData = {
        ...formData,
        image: imageUrl,
        prix: parseFloat(formData.prix),
        ancienPrix: formData.ancienPrix ? parseFloat(formData.ancienPrix) : undefined,
        nombreDisponible: parseInt(formData.nombreDisponible) || 0,
      };

      await produitApi.create(productData);
      toast.success('Produit créé');
      window.location.href = '/admin/produits';
    } catch {
      toast.error('Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 animate-fadeInDown">
        <h1 className="text-4xl font-light text-white mb-2 flex items-center gap-3">
          <Plus className="w-8 h-8 text-amber-500" />
          Nouveau produit
        </h1>
        <p className="text-slate-400 text-sm uppercase tracking-widest">Ajouter un nouveau produit à votre catalogue</p>
      </div>

      <div className="bg-gradient-to-b from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-amber-500/10 rounded-sm p-8 animate-fadeInUp delay-100">
        <div className="space-y-6">
          {/* Image */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Image du produit</label>
            {imagePreview && (
              <div className="mb-4 w-32 h-32 bg-black/40 rounded-sm overflow-hidden border border-amber-500/20 p-1">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xs" />
              </div>
            )}
            <div className="relative">
              <input
                aria-label="Télécharger une image du produit"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                className="w-full px-4 py-3 bg-black/40 border border-amber-500/20 rounded-sm text-slate-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500 transition file:hidden"
              />
              <ImageIcon className="w-5 h-5 text-amber-500/60 absolute right-4 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Nom */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Nom *</label>
            <input
              aria-label="Nom du produit"
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Entrez le nom du produit"
              className="w-full px-4 py-3 bg-black/40 border border-amber-500/20 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Description *</label>
            <textarea
              aria-label="Description du produit"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez votre produit en détail"
              rows={4}
              className="w-full px-4 py-3 bg-black/40 border border-amber-500/20 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition resize-none"
            ></textarea>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Catégorie *</label>
            <select
              aria-label="Catégorie du produit"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-amber-500/20 rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
            >
              <option value="" className="bg-slate-900">Sélectionner une catégorie</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id} className="bg-slate-900">{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Prix et Ancien prix */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Prix *</label>
              <input
                aria-label="Prix du produit"
                type="number"
                step="0.01"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-black/40 border border-amber-500/20 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Ancien prix</label>
              <input
                aria-label="Ancien prix du produit"
                type="number"
                step="0.01"
                name="ancienPrix"
                value={formData.ancienPrix}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-black/40 border border-amber-500/20 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Stock disponible</label>
            <input
              aria-label="Stock disponible du produit"
              type="number"
              name="nombreDisponible"
              value={formData.nombreDisponible}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-4 py-3 bg-black/40 border border-amber-500/20 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
            />
          </div>

          {/* Boutons avec effets shimmer */}
          <div className="flex gap-3 pt-6 border-t border-amber-500/10">
            <button 
              onClick={() => window.history.back()} 
              className="flex-1 px-6 py-3 bg-slate-900/40 border border-amber-500/10 rounded-sm text-white hover:bg-slate-900/60 hover:border-amber-500/20 transition font-bold uppercase tracking-widest relative overflow-hidden group"
            >
              <span className="relative z-10">Annuler</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={loading} 
              className="flex-1 px-6 py-3 bg-amber-500 rounded-sm text-black hover:bg-amber-400 disabled:bg-amber-500/50 disabled:cursor-not-allowed transition font-bold uppercase tracking-widest relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? 'Création...' : 'Créer le produit'}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

