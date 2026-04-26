import React, { useState, useEffect, useCallback } from 'react';
import { Edit, Image as ImageIcon } from 'lucide-react';
import { produitApi } from '../../api/Produit/produit.api';
import { categorieApi } from '../../api/Categorie/categorie.api';
import { useToast } from '../../context/ToastContext';
import { Loading } from '../../components/Complements/Loading';
import { useParams } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUrl';


export const EditProduitPage: React.FC = () => {
  const { id: productId } = useParams<{ id: string }>(); // Récupérer l'ID du produit depuis les paramètres d'URL
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
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  // Charger les catégories
  const loadCategories = useCallback(async () => {
    try {
      const data = await categorieApi.getAll();
      setCategories(data);
    } catch {
      toast.error('Erreur chargement catégories');
    }
  }, [toast]);

  // Charger le produit
  const loadProduct = useCallback(async () => {
    try {
      console.log('Loading product with ID:', productId);
      const data = await produitApi.getById(productId!);
      setFormData({
        nom: data.nom || '',
        description: data.description || '',
        categorie: data.categorie?._id || '',
        prix: data.prix || '',
        ancienPrix: data.ancienPrix || '',
        nombreDisponible: data.nombreDisponible || '',
      });
      // Construire l'URL complète de l'image existante
      setImagePreview(data.image ? getImageUrl(data.image) : '');
    } catch {
      toast.error('Erreur chargement produit');
    } finally {
      setLoading(false);
    }
  }, [productId, toast]);

  // Effet pour charger les données au montage
  useEffect(() => {
    loadCategories();
    loadProduct();
  }, [loadCategories, loadProduct]);

  // Gestion des changements de formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

    setSaving(true);
    try {
      let imageUrl = imagePreview;

      if (imageFile) {
        const uploadResult = await produitApi.uploadImage(imageFile);
        // Stocker uniquement le nom de fichier, pas l'URL complète
        imageUrl = uploadResult.filename || uploadResult.imageUrl?.split('/uploads/').pop() || imagePreview;
      }

      const productData = {
        ...formData,
        image: imageUrl,
        prix: parseFloat(formData.prix),
        ancienPrix: formData.ancienPrix ? parseFloat(formData.ancienPrix) : undefined,
        nombreDisponible: parseInt(formData.nombreDisponible) || 0,
      };

      await produitApi.update(productId!, productData);
      toast.success('Produit modifié');
      window.location.href = '/admin/produits';
    } catch {
      toast.error('Erreur lors de la modification');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loading size="lg" text="Chargement du produit..." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-light text-white mb-2 flex items-center gap-3">
          <Edit className="w-8 h-8 text-amber-500" />
          Modifier le produit
        </h1>
        <p className="text-slate-400 text-sm uppercase tracking-widest">Mettez à jour les informations du produit</p>
      </div>

      <div className="bg-gradient-to-b from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-amber-500/10 rounded-sm p-8">
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
            <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Description</label>
            <textarea
              aria-label="Description du produit"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez votre produit en détail"
              rows={4}
              className="w-full px-4 py-3 bg-black/40 border border-amber-500/20 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition resize-none"
            />
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
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id} className="bg-slate-900">{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Prix */}
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
              aria-label="Nombre de produits disponibles"
              type="number"
              name="nombreDisponible"
              value={formData.nombreDisponible}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-4 py-3 bg-black/40 border border-amber-500/20 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-6 border-t border-amber-500/10">
            <button 
              onClick={() => window.history.back()} 
              className="flex-1 px-6 py-3 bg-slate-900/40 border border-amber-500/10 rounded-sm text-white hover:bg-slate-900/60 hover:border-amber-500/20 transition font-bold uppercase tracking-widest"
            >
              Annuler
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={saving} 
              className="flex-1 px-6 py-3 bg-amber-500 rounded-sm text-black hover:bg-amber-400 disabled:bg-amber-500/50 disabled:cursor-not-allowed transition font-bold uppercase tracking-widest"
            >
              {saving ? 'Enregistrement...' : 'Modifier le produit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
