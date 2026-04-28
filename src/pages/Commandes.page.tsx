import { useState, useEffect, useCallback } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { commandeApi } from '../api/Commande/commande.api';
import { Loading } from '../components/Complements/Loading';
import { Badge } from '../components/Complements/Badge';
import { ProductImage } from '../components/Produit/ProductImage';

export const CommandesPage = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ---- stable loadOrders ----
  const loadOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await commandeApi.getByUser(user.email);
      //console.log('COMMANDES API =', data);
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Erreur chargement commandes:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user]);


  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string): 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info' => {
    const colors: Record<string, 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info'> = {
      'pending': 'warning',
      'confirmed': 'info',
      'processing': 'info',
      'shipped': 'primary',
      'delivered': 'success',
      'cancelled': 'error'
    };
    return colors[status] || 'default';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'pending': 'En attente',
      'confirmed': 'Confirmée',
      'processing': 'En préparation',
      'shipped': 'Expédiée',
      'delivered': 'Livrée',
      'cancelled': 'Annulée'
    };
    return labels[status] || status;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center animate-fadeInUp">
          <ShoppingBag size={64} className="mx-auto text-amber-500/40 mb-6" />
          <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Mes Commandes</h1>
          <p className="text-slate-400 mb-8">Veuillez vous connecter pour voir vos commandes</p>
          <a href="/connexion" className="inline-block bg-amber-500 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm">
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loading size="lg" text="Chargement des commandes..." />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center animate-fadeInUp">
          <ShoppingBag size={64} className="mx-auto text-amber-500/40 mb-6" />
          <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Mes Commandes</h1>
          <p className="text-slate-400 mb-8">Vous n'avez pas encore passé de commande</p>
          <a href="/produits" className="inline-block bg-amber-500 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm">
            Découvrir nos produits
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-amber-500/20 animate-fadeInDown">
          <p className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-2">Mon Espace</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Mes Commandes</h1>
          <p className="text-slate-400 mt-3">
            <span className="text-amber-500 font-bold">{orders.length}</span> commande{orders.length > 1 ? 's' : ''} au total
          </p>
        </div>

        <div className="space-y-4">
          {Array.isArray(orders) && orders.map((order: any, idx: number) => (
            <div
              key={order._id}
              className={`animate-fadeInUp bg-slate-900/40 border border-amber-500/20 hover:border-amber-500/40 rounded-sm p-6 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 ${
                idx === 0 ? '' : idx === 1 ? 'delay-100' : idx === 2 ? 'delay-200' : 'delay-300'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-white mb-1">
                    Commande <span className="text-amber-500">#{order._id.slice(-8).toUpperCase()}</span>
                  </h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">
                    {formatDate(order.orderDate)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                  <span className="text-lg font-black text-amber-500">{order.totalAmount?.toFixed(2)}€</span>
                </div>
              </div>

              {/* Items de la commande */}
              {order.items && order.items.length > 0 && (
                <div className="border-t border-amber-500/10 pt-4 space-y-3">
                  {order.items.slice(0, 2).map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-12 h-12 flex-shrink-0">
                        <ProductImage image={item.produitId?.image} nom={item.produitId?.nom || 'Produit'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{item.produitId?.nom || 'Produit'}</p>
                        <p className="text-xs text-slate-500">Qté : {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-300 whitespace-nowrap">{item.subtotal?.toFixed(2)}€</p>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-xs text-slate-500 italic">+ {order.items.length - 2} autre{order.items.length - 2 > 1 ? 's' : ''} article{order.items.length - 2 > 1 ? 's' : ''}</p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-amber-500/10 flex flex-wrap gap-4 items-center">
                <a
                  href={`/commandes/${order._id}`}
                  className="text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-white transition-colors flex items-center gap-1"
                >
                  Voir les détails →
                </a>
                {order.status === 'pending' && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (confirm('Voulez-vous vraiment annuler cette commande ?')) {
                        try {
                          await commandeApi.cancel(order._id);
                          loadOrders();
                          toast.success('Commande annulée');
                        } catch (error) {
                          toast.error("Erreur lors de l'annulation");
                        }
                      }
                    }}
                    className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
