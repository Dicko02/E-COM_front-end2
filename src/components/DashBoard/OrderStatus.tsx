import React, { useMemo } from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Loading } from '../Complements/Loading';

interface OrderStatusProps {
  orders?: any;  // Peut être un array OR un objet avec stats directes
  loading?: boolean;
}

export const OrderStatus: React.FC<OrderStatusProps> = ({
  orders,
  loading = false
}) => {
  const stats = useMemo(() => {
    // Si orders est un objet avec pending/completed/cancelled/total
    // (données du nouvel endpoint /orders/stats/status-breakdown)
    if (orders && typeof orders === 'object' && orders.pending !== undefined) {
      return {
        pending: orders.pending || 0,
        completed: orders.delivered || 0,  // L'endpoint utilise 'delivered' pas 'completed'
        cancelled: orders.cancelled || 0,
        total: orders.total || (orders.pending + orders.delivered + orders.cancelled) || 1
      };
    }
    
    // Fallback: si orders est un array, compter les statuts
    if (Array.isArray(orders) && orders.length > 0) {
      return {
        pending: orders.filter((o: any) => o.status === 'pending').length,
        completed: orders.filter((o: any) => o.status === 'delivered' || o.status === 'completed').length,
        cancelled: orders.filter((o: any) => o.status === 'cancelled').length,
        total: orders.length
      };
    }

    // Fallback par défaut
    return { pending: 0, completed: 0, cancelled: 0, total: 1 };
  }, [orders]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading size="md" text="Chargement..." />
      </div>
    );
  }

  const pendingPercent = Math.round((stats.pending / stats.total) * 100);
  const completedPercent = Math.round((stats.completed / stats.total) * 100);
  const cancelledPercent = Math.round((stats.cancelled / stats.total) * 100);

  return (
    <div className="bg-slate-900/40 border border-amber-500/20 p-6 rounded-sm">
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">
          État des Commandes
        </h3>
        <p className="text-xs text-slate-500">Vue d'ensemble du statut</p>
      </div>

      <div className="space-y-6">
        {/* Pending */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-amber-500" />
              <span className="text-sm font-semibold text-slate-300">En Attente</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-amber-500">{stats.pending}</p>
              <p className="text-xs text-slate-500">{pendingPercent}%</p>
            </div>
          </div>
          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all"
              style={{ width: `${pendingPercent}%` }}
            />
          </div>
        </div>

        {/* Completed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-500" />
              <span className="text-sm font-semibold text-slate-300">Livrées</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-500">{stats.completed}</p>
              <p className="text-xs text-slate-500">{completedPercent}%</p>
            </div>
          </div>
          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${completedPercent}%` }}
            />
          </div>
        </div>

        {/* Cancelled */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XCircle size={18} className="text-red-500" />
              <span className="text-sm font-semibold text-slate-300">Annulées</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-500">{stats.cancelled}</p>
              <p className="text-xs text-slate-500">{cancelledPercent}%</p>
            </div>
          </div>
          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all"
              style={{ width: `${cancelledPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Total Summary */}
      <div className="mt-6 pt-6 border-t border-amber-500/10 text-center">
        <p className="text-3xl font-bold text-white mb-1">{stats.total}</p>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Commandes Totales</p>
      </div>
    </div>
  );
};
