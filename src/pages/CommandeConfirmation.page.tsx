import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Package, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { commandeApi } from '../api/Commande/commande.api';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductImage } from '../components/Produit/ProductImage';

export const CommandeConfirmationPage: React.FC = () => {
  const { id: orderId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isWavePayment = searchParams.get('wave') === 'true';
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadOrder = useCallback(async () => {
    if (!orderId) { setLoading(false); return; }
    try {
      const data = await commandeApi.getById(orderId);
      setOrder(data.order);
    } catch {
      // commande non trouvée, on affiche quand même la confirmation générique
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => { loadOrder(); }, [loadOrder]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center animate-fadeInUp">

        {/* Icône succès animée */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center animate-pulse-gold">
            <CheckCircle size={48} className="text-emerald-400" />
          </div>
        </div>

        {/* Titre */}
        <p className="text-amber-500 uppercase tracking-[0.3em] text-xs font-bold mb-3">
          Commande confirmée
        </p>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
          Merci pour votre achat !
        </h1>
        <p className="text-slate-400 text-lg font-light mb-8 leading-relaxed">
          Votre commande a bien été enregistrée. Vous recevrez un email de confirmation sous peu.
        </p>

        {/* Numéro de commande */}
        {orderId && (
          <div className="bg-slate-900/60 border border-amber-500/20 rounded-sm p-5 mb-8 text-left">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Numéro de commande</p>
            <p className="font-mono text-amber-500 font-bold text-lg">
              #{orderId.slice(-8).toUpperCase()}
            </p>

            {/* Message pour paiements Wave avec plusieurs produits */}
            {isWavePayment && (
              <div className="mt-3 pt-3 border-t border-amber-500/10">
                <p className="text-xs text-slate-400">
                  💳 Paiement Wave confirmé. Si votre panier contenait plusieurs produits, 
                  vous pouvez voir toutes vos commandes dans <a href="/commandes" className="text-amber-500 hover:underline">Mes Commandes</a>.
                </p>
              </div>
            )}

            {/* Récap commande si disponible (ancien schéma avec produitId direct) */}
            {!loading && order?.produitId && (
              <div className="mt-4 pt-4 border-t border-amber-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <ProductImage image={order.produitId?.imageUrl} nom={order.produitId?.nom || 'Produit'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {order.produitId?.nom || 'Produit'}
                    </p>
                    <p className="text-xs text-slate-500">Qté : {order.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-amber-500 whitespace-nowrap">
                    {order.totalAmount?.toFixed(2)}€
                  </p>
                </div>
              </div>
            )}

            {/* Récap articles si disponible (nouveau schéma avec items[]) */}
            {!loading && order?.items && order.items.length > 0 && (
              <div className="mt-4 pt-4 border-t border-amber-500/10 space-y-3">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 flex-shrink-0">
                      <ProductImage image={item.produitId?.image} nom={item.produitId?.nom || 'Produit'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {item.produitId?.nom || 'Produit'}
                      </p>
                      <p className="text-xs text-slate-500">Qté : {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-amber-500 whitespace-nowrap">
                      {item.subtotal?.toFixed(2)}€
                    </p>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-3 border-t border-amber-500/10">
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Total</span>
                  <span className="font-black text-amber-500 text-lg">
                    {order.totalAmount?.toFixed(2)}€
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Étapes suivantes avec animations */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: CheckCircle, label: 'Commande\nreçue', done: true },
            { icon: Package,      label: 'Préparation\nen cours', done: false },
            { icon: ShoppingBag,  label: 'Livraison\nà venir', done: false },
          ].map(({ icon: Icon, label, done }, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 animate-fadeInUp" style={{ animationDelay: (idx * 100) + 'ms' }}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                done
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400 animate-pulse-gold'
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

        {/* Actions avec effets shimmer */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/commandes"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-white text-black font-bold px-8 py-4 rounded-sm uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Suivre ma commande
              <ArrowRight size={16} />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-amber-500/40 hover:border-amber-500 text-amber-500 font-bold px-8 py-4 rounded-sm uppercase tracking-widest text-sm transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home size={16} />
              Retour à l'accueil
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>
        </div>
      </div>
    </div>
  );
};
