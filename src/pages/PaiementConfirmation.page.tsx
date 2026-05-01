import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Package, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { commandeApi } from '../api/Commande/commande.api';
import { useParams } from 'react-router-dom';
import { ProductImage } from '../components/Produit/ProductImage';

export const PaiementConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orders, setOrders] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    if (!orderId) { setLoading(false); return; }
    
    try {
      // Récupérer la première commande pour obtenir le waveSessionId
      const firstOrder = await commandeApi.getById(orderId);
      
      if (firstOrder.order?.waveSessionId) {
        // Récupérer TOUTES les commandes de cette session Wave
        const waveOrders = await commandeApi.getByWaveSession(firstOrder.order.waveSessionId);
        setOrders(waveOrders.orders || []);
        setTotalAmount(waveOrders.totalAmount || 0);
      } else {
        // Fallback : une seule commande (pas de Wave)
        setOrders([firstOrder.order]);
        setTotalAmount(firstOrder.order?.totalAmount || 0);
      }
    } catch (error) {
      console.error('Erreur chargement commandes:', error);
      // Afficher quand même la confirmation générique
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center animate-fadeInUp">

        {/* Icône succès animée */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center animate-pulse-gold">
            <CheckCircle size={48} className="text-emerald-400" />
          </div>
        </div>

        {/* Titre */}
        <p className="text-amber-500 uppercase tracking-[0.3em] text-xs font-bold mb-3">
          Paiement confirmé
        </p>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
          Merci pour votre achat !
        </h1>
        <p className="text-slate-400 text-lg font-light mb-8 leading-relaxed">
          Votre paiement Wave a été traité avec succès. Vous recevrez un email de confirmation sous peu.
        </p>

        {/* Récapitulatif des commandes */}
        {!loading && orders.length > 0 && (
          <div className="bg-slate-900/60 border border-amber-500/20 rounded-sm p-6 mb-8 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold uppercase tracking-wider">Votre Commande</h3>
              <span className="text-xs text-slate-500 uppercase tracking-widest">
                {orders.length} produit{orders.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Liste des produits */}
            <div className="space-y-4 mb-6">
              {orders.map((order: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-slate-800/40 rounded-sm">
                  <div className="w-16 h-16 flex-shrink-0">
                    <ProductImage 
                      image={order.produitId?.imageUrl} 
                      nom={order.produitId?.nom || 'Produit'} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      {order.produitId?.nom || 'Produit'}
                    </p>
                    <p className="text-xs text-slate-500">
                      Qté : {order.quantity} × {order.produitId?.prix?.toFixed(2)}€
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Commande #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-amber-500 whitespace-nowrap">
                    {order.totalAmount?.toFixed(2)}€
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-amber-500/20">
              <span className="text-sm text-slate-400 uppercase tracking-widest font-bold">Total Payé</span>
              <span className="font-black text-amber-500 text-2xl">
                {totalAmount.toFixed(2)}€
              </span>
            </div>
          </div>
        )}

        {/* Étapes suivantes */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: CheckCircle, label: 'Paiement\nconfirmé', done: true },
            { icon: Package,      label: 'Préparation\nen cours', done: false },
            { icon: ShoppingBag,  label: 'Livraison\nà venir', done: false },
          ].map(({ icon: Icon, label, done }, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                done
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400'
                  : 'bg-slate-900 border-slate-700 text-slate-600'
              }`}>
                <Icon size={18} />
              </div>
              <p className={`text-[10px] uppercase tracking-widest font-bold text-center whitespace-pre-line ${
                done ? 'text-emerald-400' : 'text-slate-600'
              }`}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/commandes"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-white text-black font-bold px-8 py-4 rounded-sm uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105"
          >
            Voir mes commandes
            <ArrowRight size={16} />
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-amber-500/40 hover:border-amber-500 text-amber-500 font-bold px-8 py-4 rounded-sm uppercase tracking-widest text-sm transition-all duration-300"
          >
            <Home size={16} />
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
};
