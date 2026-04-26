import { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Clock, Truck, Box } from 'lucide-react';
import { commandeApi } from '../../api/Commande/commande.api';
import { useToast } from '../../context/ToastContext';
import { Loading } from '../../components/Complements/Loading';
import { EmptyState } from '../../components/Complements/EmptyState';

export const CommandesAdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const toast = useToast();

  // Stabilisation de loadOrders avec useCallback
  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await commandeApi.getAll();
      setOrders(data.orders); // <-- prendre le tableau orders
    } catch {
      toast.error('Erreur chargement commandes');
    } finally {
      setLoading(false);
    }
  }, [toast]);


  // Appel au montage
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await commandeApi.updateStatus(orderId, newStatus);
      toast.success('Statut mis à jour');
      loadOrders();
    } catch {
      toast.error('Erreur mise à jour statut');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusLabel = (status: string) => {
    const labels: any = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      processing: 'En préparation',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    };
    return labels[status] || status;
  };

  const getStatusBgClass = (status: string) => {
    const colors: any = {
      pending: 'bg-amber-500/20 text-amber-200 border border-amber-500/30',
      confirmed: 'bg-blue-500/20 text-blue-200 border border-blue-500/30',
      processing: 'bg-blue-500/20 text-blue-200 border border-blue-500/30',
      shipped: 'bg-purple-500/20 text-purple-200 border border-purple-500/30',
      delivered: 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30',
      cancelled: 'bg-red-500/20 text-red-200 border border-red-500/30'
    };
    return colors[status] || 'bg-slate-500/20 text-slate-200 border border-slate-500/30';
  };

  const filteredOrders = statusFilter === 'all' ? orders : orders.filter((order: any) => order.status === statusFilter);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loading size="lg" text="Chargement des commandes..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-light text-white mb-2">Gestion des Commandes</h1>
          <p className="text-slate-400 text-sm uppercase tracking-widest">Suivez et gérez toutes vos commandes</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-amber-500/10 rounded-sm p-6 hover:border-amber-500/20 transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Total</p>
              <p className="text-3xl font-bold text-white mt-2">{orders.length}</p>
            </div>
            <ShoppingBag className="w-10 h-10 text-amber-500/40" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-amber-500/10 rounded-sm p-6 hover:border-amber-500/20 transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">En Attente</p>
              <p className="text-3xl font-bold text-white mt-2">{orders.filter((o: any) => o.status === 'pending').length}</p>
            </div>
            <Clock className="w-10 h-10 text-amber-500/40" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-amber-500/10 rounded-sm p-6 hover:border-amber-500/20 transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Expédiées</p>
              <p className="text-3xl font-bold text-white mt-2">{orders.filter((o: any) => o.status === 'shipped').length}</p>
            </div>
            <Truck className="w-10 h-10 text-amber-500/40" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-amber-500/10 rounded-sm p-6 hover:border-amber-500/20 transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Livrées</p>
              <p className="text-3xl font-bold text-white mt-2">{orders.filter((o: any) => o.status === 'delivered').length}</p>
            </div>
            <Box className="w-10 h-10 text-amber-500/40" />
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-6 p-6 bg-gradient-to-r from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-amber-500/10 rounded-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Filtrer par statut</p>
        <div className="flex gap-2 flex-wrap">
          {['all','pending','confirmed','processing','shipped','delivered','cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-sm transition font-bold uppercase tracking-wider text-xs ${
                statusFilter === status 
                  ? 'bg-amber-500 text-black' 
                  : 'bg-slate-900/40 text-slate-400 hover:text-amber-500 border border-amber-500/10'
              }`}
            >
              {status === 'all' ? 'Tous' : getStatusLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Aucune commande"
          description={statusFilter === 'all' 
            ? 'Aucune commande pour le moment' 
            : `Aucune commande avec le statut "${getStatusLabel(statusFilter)}"`} 
        />
      ) : (
        <div className="bg-gradient-to-b from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-amber-500/10 rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-black/20 border-b border-amber-500/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-amber-500">Commande</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-amber-500">Client</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-amber-500">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-amber-500">Montant</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-amber-500">Statut</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-amber-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/10">
              {filteredOrders.map((order: any) => (
                <tr key={order._id} className="hover:bg-amber-500/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{order.customerInfo?.nom} {order.customerInfo?.prenom}</p>
                      <p className="text-sm text-slate-400">{order.customerInfo?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{formatDate(order.orderDate)}</td>
                  <td className="px-6 py-4 font-bold text-amber-400">{order.totalAmount?.toFixed(2)}€</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider ${getStatusBgClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      aria-label={`Changer le statut de la commande #${order._id.slice(-8).toUpperCase()}`}
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="px-3 py-2 bg-black/40 border border-amber-500/20 rounded-sm text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="processing">En préparation</option>
                      <option value="shipped">Expédiée</option>
                      <option value="delivered">Livrée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
