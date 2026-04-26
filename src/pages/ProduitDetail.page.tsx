import React, { useState, useEffect, useCallback } from 'react';
import { Package, Shield, Zap, ArrowLeft, Plus, Minus } from 'lucide-react';
import { produitApi } from '../api/Produit/produit.api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Loading } from '../components/Complements/Loading';
import { useParams } from 'react-router-dom';

export const ProduitDetailPage: React.FC = () => {
  const { id: productId } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expandedSection] = useState<string | null>('details');
  const { addToCart } = useCart();
  const toast = useToast();

  const loadProduct = useCallback(async () => {
    setLoading(true);
    try {
      const data = await produitApi.getById(productId!);
      setProduct(data);
    } catch (error) {
      console.error('Erreur chargement produit:', error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
      toast.success('Produit ajouté au panier !');
    } catch (error) {
      console.error('Erreur ajout panier:', error);
      toast.error("Erreur lors de l'ajout au panier");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loading size="lg" text="Chargement du produit..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-6 uppercase tracking-tight">Produit Introuvable</h1>
          <a href="/produits" className="inline-flex items-center gap-2 text-amber-500 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="uppercase tracking-widest font-bold text-sm">Retour aux produits</span>
          </a>
        </div>
      </div>
    );
  }

  const allImages = [product.image, ...(product.images || [])].filter(Boolean);
  const discount = product.ancienPrix ? Math.round(((product.ancienPrix - product.prix) / product.ancienPrix) * 100) : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-12">
          <a href="/" className="hover:text-amber-500 transition-colors">Accueil</a>
          <span>/</span>
          <a href="/produits" className="hover:text-amber-500 transition-colors">Produits</a>
          <span>/</span>
          <span className="text-amber-500">{product.nom}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-900/40 border border-amber-500/20 rounded-3xl p-8 backdrop-blur">
          {/* Galerie - 2 colonnes */}
          <div className="lg:col-span-2 flex gap-3 max-w-2xl">
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide w-16">
                {allImages.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-amber-500' : 'border-amber-500/20 hover:border-amber-500/50'
                    }`}
                  >
                    <img 
                      src={img || '/placeholder.jpg'} 
                      alt={`${product.nom} ${index + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 rounded-lg overflow-hidden bg-slate-900/30 border border-amber-500/20 relative group aspect-square max-w-sm max-h-80">
              <img 
                src={allImages[selectedImage] || '/placeholder.jpg'} 
                alt={product.nom}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
              />
              {product.nombreDisponible === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-500 uppercase tracking-wider">Rupture de Stock</span>
                </div>
              )}
              {discount > 0 && product.nombreDisponible > 0 && (
                <div className="absolute top-6 left-6 bg-amber-500 text-black px-4 py-2 rounded-full font-bold uppercase tracking-widest text-sm">
                  -{discount}%
                </div>
              )}
            </div>
          </div>

          {/* Info Produit - Sticky */}
          <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-8">
            {/* Header */}
            <div className="space-y-4 border-b border-amber-500/20 pb-6">
              <p className="text-amber-500 uppercase tracking-widest text-xs font-bold">{product.categorie?.name || 'Produit'}</p>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                {product.nom}
              </h1>
              
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-amber-500">{product.prix.toFixed(2)}€</span>
                {product.ancienPrix && (
                  <span className="text-lg text-slate-400 line-through">{product.ancienPrix.toFixed(2)}€</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {product.nombreDisponible > 0 ? (
                  <p className="text-sm text-emerald-400 font-medium">✓ En stock ({product.nombreDisponible})</p>
                ) : (
                  <p className="text-sm text-red-400 font-medium">✗ Rupture de stock</p>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-amber-500/5 border-l-4 border-amber-500 p-4">
                <p className="text-sm text-slate-300 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantité & Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center bg-slate-900/40 border border-amber-500/20 rounded-lg p-1">
                <button
                  type="button"
                  aria-label="Diminuer la quantité"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-amber-500/20 transition-colors text-amber-500"
                >
                  <Minus size={18} />
                </button>
                <span className="flex-1 text-center font-bold text-lg">{quantity}</span>
                <button
                  type="button"
                  aria-label="Augmenter la quantité"
                  onClick={() => setQuantity(Math.min(product.nombreDisponible, quantity + 1))}
                  disabled={quantity >= product.nombreDisponible}
                  className="w-10 h-10 flex items-center justify-center hover:bg-amber-500/20 transition-colors text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.nombreDisponible === 0}
                className="w-full bg-amber-500 hover:bg-white text-black py-4 font-bold uppercase tracking-widest text-sm rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ajouter au Panier
              </button>

              <a 
                href="/panier"
                className="block w-full text-center border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black py-3 font-bold uppercase tracking-widest text-sm rounded-lg transition-all"
              >
                Voir le Panier
              </a>
            </div>

            {/* Accordions */}
            <div className="space-y-3 divide-y divide-amber-500/10 border-y border-amber-500/10 py-6">
              {/* Details */}
              <details className="group py-4" open={expandedSection === 'details'}>
                <summary className="cursor-pointer flex items-center justify-between list-none">
                  <span className="text-xs font-bold uppercase tracking-widest">Détails Techniques</span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-4 text-xs space-y-3 text-slate-400 font-light">
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-medium">Référence</span>
                    <span>{product._id?.slice(0, 8) || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-medium">Catégorie</span>
                    <span>{product.categorie?.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-medium">Stock</span>
                    <span>{product.nombreDisponible}</span>
                  </div>
                  {product.poids && (
                    <div className="flex justify-between">
                      <span className="text-slate-300 font-medium">Poids</span>
                      <span>{product.poids}g</span>
                    </div>
                  )}
                </div>
              </details>

              {/* Livraison */}
              <details className="group py-4">
                <summary className="cursor-pointer flex items-center justify-between list-none">
                  <span className="text-xs font-bold uppercase tracking-widest">Livraison & Retours</span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-4 text-sm text-slate-400 font-light leading-relaxed">
                  <div className="space-y-2">
                    <div>✓ Livraison gratuite pour toute commande</div>
                    <div>✓ Délai de 3-5 jours ouvrables</div>
                    <div>✓ Retour gratuit sous 30 jours</div>
                    <div>✓ Emballage premium inclus</div>
                  </div>
                </div>
              </details>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-amber-500/20">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400">
                <Package size={16} className="text-amber-500" />
                <span>Garantie 2 ans</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400">
                <Shield size={16} className="text-amber-500" />
                <span>Paiement Sécurisé</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complimentary Section */}
        <section className="mt-24 pt-24 border-t border-amber-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
                <Zap size={32} className="text-amber-500" />
              </div>
              <h3 className="font-bold uppercase tracking-widest text-sm">Excellence Garantie</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Chaque produit est sélectionné avec soin pour vous garantir la qualité premium.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
                <Package size={32} className="text-amber-500" />
              </div>
              <h3 className="font-bold uppercase tracking-widest text-sm">Livraison Express</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Vos commandes sont préparées et expédiées dans les meilleurs délais.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
                <Shield size={32} className="text-amber-500" />
              </div>
              <h3 className="font-bold uppercase tracking-widest text-sm">Service Premium</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Un support client dédié pour répondre à toutes vos questions.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};