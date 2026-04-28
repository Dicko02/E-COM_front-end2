import React, { useState, useEffect, useCallback } from 'react';
import { commandeApi } from '../api/Commande/commande.api';
import { useToast } from '../context/ToastContext';
import { Loading } from '../components/Complements/Loading';
import { Badge } from '../components/Complements/Badge';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ProductImage } from '../components/Produit/ProductImage';

export const CommandeDetailPage: React.FC = () => {
  const { id: orderId } = useParams<{ id: string }>();
  const toast = useToast();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadOrder = useCallback(async () => {
    setLoading(true);
    try {
      const data = await commandeApi.getById(orderId!);
      setOrder(data.order);
    } catch (error) {
      console.error('Erreur chargement commande:', error);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => { loadOrder(); }, [loadOrder]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusColor = (status: string): 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info' => {
    const colors: Record<string, 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info'> = {
      pending: 'warning', confirmed: 'info', processing: 'info',
      shipped: 'primary', delivered: 'success', cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente', confirmed: 'Confirmée', processing: 'En préparation',
      shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée'
    };
    return labels[status] || status;
  };

  // Étapes du suivi de commande
  const steps = [
    { key: 'pending',    label: 'Commande reçue',   icon: Clock },
    { key: 'confirmed',  label: 'Confirmée',         icon: CheckCircle },
    { key: 'processing', label: 'En préparation',    icon: Package },
    { key: 'shipped',    label: 'Expédiée',          icon: Truck },
    { key: 'delivered',  label: 'Livrée',            icon: MapPin },
  ];

  const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
  const currentStepIdx = order ? statusOrder.indexOf(order.status) : -1;

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loading size="lg" text="Chargement de la commande..." />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center animate-fadeInUp">
          <p className="text-6xl mb-6">📦</p>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-4">Commande introuvable</h1>
          <a href="/commandes" className="inline-flex items-center gap-2 text-amber-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm">
            <ArrowLeft size={16} /> Retour aux commandes
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-10 animate-fadeInDown uppercase tracking-widest">
          <a href="/" className="hover:text-amber-500 transition-colors">Accueil</a>
          <span>/</span>
          <a href="/commandes" className="hover:text-amber-500 transition-colors">Mes commandes</a>
          <span>/</span>
          <span className="text-amber-500">#{order._id.slice(-8).toUpperCase()}</span>
        </div>

        {/* En-tête */}
        <div className="bg-slate-900/40 border border-amber-500/20 rounded-sm p-6 mb-6 animate-fadeInUp">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-1">Commande</p>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                #{order._id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-slate-500 text-sm mt-1">Passée le {formatDate(order.orderDate)}</p>
            </div>
            <Badge variant={getStatusColor(order.status)} size="lg">
              {getStatusLabel(order.status)}
            </Badge>
          </div>

          {/* Informations client */}
          {order.customerInfo && (
            <div className="border-t border-amber-500/10 pt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Livraison</h2>
              <div className="text-sm text-slate-300 space-y-1">
                <p><span className="text-slate-500">Nom :</span> {order.customerInfo.firstName || order.customerInfo.nom} {order.customerInfo.lastName || order.customerInfo.prenom}</p>
                <p><span className="text-slate-500">Email :</span> {order.customerInfo.email}</p>
                {(order.customerInfo.phone || order.customerInfo.number) && (
                  <p><span className="text-slate-500">Tél :</span> {order.customerInfo.phone || order.customerInfo.number}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Suivi visuel — masqué si annulé */}
        {order.status !== 'cancelled' && (
          <div className="bg-slate-900/40 border border-amber-500/20 rounded-sm p-6 mb-6 animate-fadeInUp delay-100">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-6">Suivi</h2>
            <div className="flex items-center justify-between relative">
              {/* Ligne de progression */}
              <div className="absolute top-5 left-0 right-0 h-px bg-slate-700 z-0" />
              {/* La largeur est calculée dynamiquement via une variable CSS inline — seul cas acceptable */}
              <div
                className="absolute top-5 left-0 h-px bg-amber-500 z-0 transition-all duration-700"
                style={{ width: currentStepIdx >= 0 ? `${(currentStepIdx / (steps.length - 1)) * 100}%` : '0%' }}
              />

              {steps.map((step, idx) => {
                const Icon = step.icon;
                const done = idx <= currentStepIdx;
                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      done
                        ? 'bg-amber-500 border-amber-500 text-black'
                        : 'bg-slate-900 border-slate-700 text-slate-600'
                    }`}>
                      <Icon size={16} />
                    </div>
                    <span className={`text-[9px] uppercase tracking-widest font-bold text-center hidden sm:block ${done ? 'text-amber-500' : 'text-slate-600'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Produits */}
        <div className="bg-slate-900/40 border border-amber-500/20 rounded-sm p-6 mb-6 animate-fadeInUp delay-200">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-5">Articles commandés</h2>
          <div className="space-y-4">
            {order.items && order.items.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-4 pb-4 border-b border-amber-500/10 last:border-0 last:pb-0">
                <div className="w-16 h-16 flex-shrink-0">
                  <ProductImage image={item.produitId?.image} nom={item.produitId?.nom || 'Produit'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{item.produitId?.nom || 'Produit'}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Quantité : {item.quantity} × {item.price?.toFixed(2)}€</p>
                </div>
                <p className="font-black text-amber-500 whitespace-nowrap">{item.subtotal?.toFixed(2)}€</p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 pt-5 border-t border-amber-500/20 flex justify-between items-center">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Total</span>
            <span className="text-2xl font-black text-amber-500">{order.totalAmount?.toFixed(2)}€</span>
          </div>
        </div>

        {/* Numéro de suivi */}
        {order.trackingNumber && (
          <div className="bg-slate-900/40 border border-amber-500/20 rounded-sm p-6 mb-6 animate-fadeInUp delay-300">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Numéro de suivi</h2>
            <p className="font-mono text-white text-lg">{order.trackingNumber}</p>
          </div>
        )}

        {/* Action annulation */}
        {order.status === 'pending' && (
          <div className="text-center animate-fadeInUp delay-400">
            <button
              type="button"
              onClick={async () => {
                if (confirm('Voulez-vous vraiment annuler cette commande ?')) {
                  try {
                    await commandeApi.cancel(order._id);
                    toast.success('Commande annulée');
                    window.location.href = '/commandes';
                  } catch (error) {
                    toast.error("Erreur lors de l'annulation");
                    console.error('Erreur annulation commande:', error);
                  }
                }
              }}
              className="inline-flex items-center gap-2 border-2 border-red-500/40 hover:border-red-500 text-red-400 hover:text-red-300 font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-sm transition-all"
            >
              <XCircle size={16} />
              Annuler la commande
            </button>
          </div>
        )}

        {/* Retour */}
        <div className="mt-8 animate-fadeInUp delay-500">
          <a href="/commandes" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-500 transition-colors text-xs uppercase tracking-widest font-bold">
            <ArrowLeft size={14} /> Retour aux commandes
          </a>
        </div>
      </div>
    </div>
  );
};
