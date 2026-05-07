import { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { paymentApi } from '../api/Payment/payment.api';
import { EmptyState } from '../components/Complements/EmptyState';
import { ProductImage } from '../components/Produit/ProductImage';

export const PanierPage = () => {
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart, loadCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.warning('Votre panier est vide');
      return;
    }
    
    setLoading(true);
    try {
      // Préparer les données pour le paiement
      const paymentData = {
        cartItems: cart.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
          price: item.product.prix
        })),
        customerInfo: {
          userId: user?._id,
          firstName: user?.prenom,
          lastName: user?.nom,
          email: user?.email,
          phone: (user as any)?.number || '',
        },
        totalAmount: totalPrice
      };

      // Initier le paiement SenePay
      const result = await paymentApi.initiate(paymentData);

      if (result.success && result.checkoutUrl) {
        // Rediriger vers la page de paiement SenePay
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error('Erreur lors de la création de la session de paiement');
      }

    } catch (error) {
      console.error('Erreur création paiement:', error);
      toast.error('Erreur lors de l\'initiation du paiement');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto text-amber-500 mb-6" />
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tight">Panier</h1>
          <p className="text-slate-400 mb-8 text-lg">Veuillez vous connecter pour voir votre panier</p>
          <a href="/connexion" className="inline-block bg-amber-500 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm">
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <a href="/produits" className="inline-flex items-center gap-2 text-amber-500 hover:text-white mb-12 transition-colors">
            <ArrowLeft size={20} />
            <span className="uppercase tracking-widest font-bold text-sm">Continuer les achats</span>
          </a>
          
          <EmptyState
            icon={ShoppingCart}
            title="Panier Vide"
            description="Votre panier est prêt à être rempli avec nos pièces exclusives"
            actionText="Explorer la Collection"
            actionHref="/produits"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header avec animation */}
        <div className="mb-12 pb-8 border-b border-amber-500/20 animate-fadeInDown">
          <p className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-2">Étape 1 de 3</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Votre Panier</h1>
          <p className="text-slate-400 mt-4">
            Vous avez <span className="text-amber-500 font-bold">{cart.length} article{cart.length > 1 ? 's' : ''}</span> dans votre sélection premium.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Liste des produits avec animations */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item: any, idx: number) => (
              <div 
                key={item.product._id} 
                className="group flex flex-col sm:flex-row gap-6 p-6 rounded-sm bg-slate-900/30 border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-lg hover:shadow-amber-500/10 animate-fadeInUp hover:scale-[1.01]"
                style={{ animationDelay: (idx * 100) + 'ms' }}
              >
                {/* Image produit */}
                <div className="w-24 h-24 flex-shrink-0">
                  <ProductImage image={item.product.imageUrl} nom={item.product.nom} />
                </div>

                {/* Détails produit */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-lg uppercase tracking-wider group-hover:text-amber-500 transition-colors">
                        {item.product.nom}
                      </h3>
                      <p className="text-sm text-slate-400 mt-2 italic">
                        {item.product.categorie?.name || 'Produit'}
                      </p>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-amber-500 whitespace-nowrap">
                      {(item.product.prix * item.quantity).toFixed(2)}€
                    </span>
                  </div>

                  {/* Quantité & Actions */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-amber-500/30 rounded-sm p-1 bg-slate-800">
                      <button
                        aria-label="Diminuer la quantité"
                        onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center text-amber-500 hover:bg-amber-500/20 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-white">
                        {item.quantity}
                      </span>
                      <button
                        aria-label="Augmenter la quantité"
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-amber-500 hover:bg-amber-500/20 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      aria-label="Supprimer du panier"
                      onClick={() => removeFromCart(item.product._id)}
                      className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span>Supprimer</span>
                    </button>
                  </div>

                  {/* Prix unitaire */}
                  <p className="text-xs text-slate-500 mt-3">
                    {item.product.prix.toFixed(2)}€ par unité
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-slate-900/40 border border-amber-500/20 rounded-sm p-8 space-y-6">
              <h2 className="text-2xl font-bold uppercase tracking-wider">Récapitulatif</h2>

              <div className="space-y-4 border-b border-amber-500/10 pb-6">
                <div className="flex justify-between text-slate-400">
                  <span className="uppercase tracking-wider text-xs font-semibold">Sous-total</span>
                  <span className="font-bold">{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span className="uppercase tracking-wider text-xs font-semibold">Livraison</span>
                  <span className="text-amber-500 font-bold">GRATUITE</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span className="uppercase tracking-wider text-xs font-semibold">Taxes</span>
                  <span className="font-bold">Incluses</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-black">
                <span className="uppercase tracking-wider">Total</span>
                <span className="text-amber-500">{totalPrice.toFixed(2)}€</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="w-full bg-amber-500 hover:bg-white text-black py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10">{loading ? 'Traitement...' : 'Valider la Commande'}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>

              <button
                onClick={clearCart}
                className="w-full border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black py-3 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10">Vider le Panier</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>

              <div className="text-center pt-4">
                <a 
                  href="/produits" 
                  className="text-xs text-slate-400 hover:text-amber-500 transition-colors uppercase tracking-widest font-semibold inline-flex items-center gap-2"
                >
                  <ArrowLeft size={14} />
                  Continuer mes achats
                </a>
              </div>

              {/* Avantages avec animations */}
              <div className="space-y-3 pt-6 border-t border-amber-500/10 text-xs text-slate-400">
                {[
                  'Paiement 100% sécurisé',
                  'Livraison express gratuite',
                  'Retour 30 jours gratuit'
                ].map((text, idx) => (
                  <div key={text} className="flex gap-2 animate-fadeInUp" style={{ animationDelay: (idx * 100) + 'ms' }}>
                    <span className="text-amber-500">✓</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};