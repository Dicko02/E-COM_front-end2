import React from 'react';
import { Plus, LayoutGrid, Package, ShoppingBag, Users, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  href: string;
  color?: string;
}

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions: QuickAction[] = [
    {
      label: 'Nouveau Produit',
      icon: <Plus size={24} />,
      href: '/admin/produits/nouveau',
      color: 'from-emerald-500/20 to-emerald-500/5 hover:from-emerald-500/30'
    },
    {
      label: 'Catégories',
      icon: <LayoutGrid size={24} />,
      href: '/admin/categories',
      color: 'from-blue-500/20 to-blue-500/5 hover:from-blue-500/30'
    },
    {
      label: 'Produits',
      icon: <Package size={24} />,
      href: '/admin/produits',
      color: 'from-purple-500/20 to-purple-500/5 hover:from-purple-500/30'
    },
    {
      label: 'Commandes',
      icon: <ShoppingBag size={24} />,
      href: '/admin/commandes',
      color: 'from-pink-500/20 to-pink-500/5 hover:from-pink-500/30'
    },
    {
      label: 'Clients',
      icon: <Users size={24} />,
      href: '/admin/clients',
      color: 'from-orange-500/20 to-orange-500/5 hover:from-orange-500/30'
    },
    {
      label: 'Rapports',
      icon: <BarChart3 size={24} />,
      href: '#reports',
      color: 'from-yellow-500/20 to-yellow-500/5 hover:from-yellow-500/30'
    }
  ];

  const colorMap: Record<string, { icon: string; border: string }> = {
    'from-emerald-500/20 to-emerald-500/5 hover:from-emerald-500/30': {
      icon: 'text-emerald-500',
      border: 'border-emerald-500/30'
    },
    'from-blue-500/20 to-blue-500/5 hover:from-blue-500/30': {
      icon: 'text-blue-500',
      border: 'border-blue-500/30'
    },
    'from-purple-500/20 to-purple-500/5 hover:from-purple-500/30': {
      icon: 'text-purple-500',
      border: 'border-purple-500/30'
    },
    'from-pink-500/20 to-pink-500/5 hover:from-pink-500/30': {
      icon: 'text-pink-500',
      border: 'border-pink-500/30'
    },
    'from-orange-500/20 to-orange-500/5 hover:from-orange-500/30': {
      icon: 'text-orange-500',
      border: 'border-orange-500/30'
    },
    'from-yellow-500/20 to-yellow-500/5 hover:from-yellow-500/30': {
      icon: 'text-yellow-500',
      border: 'border-yellow-500/30'
    }
  };

  return (
    <div className="bg-slate-900/40 border border-amber-500/20 rounded-sm p-6">
      <h2 className="text-lg font-bold mb-6 uppercase tracking-widest text-white">
        ⚡ Actions Rapides
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((action, idx) => {
          const colorClass = action.color || 'from-amber-500/20 to-amber-500/5 hover:from-amber-500/30';
          const colorConfig = colorMap[colorClass] || colorMap['from-amber-500/20 to-amber-500/5 hover:from-amber-500/30'];

          const isClickable = action.href !== '#reports';

          return (
            <button
              key={idx}
              onClick={() => isClickable && navigate(action.href)}
              disabled={!isClickable}
              className={`
                group p-4 bg-gradient-to-br ${colorClass} border ${colorConfig.border} rounded-sm
                transition-all duration-300 hover:border-amber-500/50 disabled:opacity-60 disabled:cursor-not-allowed
                transform hover:scale-105 active:scale-95
                flex flex-col items-center gap-3 text-center
              `}
            >
              <span className={`${colorConfig.icon} group-hover:scale-125 transition-transform`}>
                {action.icon}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 border border-amber-500/20 bg-amber-500/5 rounded-sm">
        <p className="text-xs text-amber-500/80 font-bold uppercase tracking-widest">💡 Conseil</p>
        <p className="text-xs mt-2 text-slate-400">
          Utilisez ces actions rapides pour naviguer efficacement dans votre administration.
        </p>
      </div>
    </div>
  );
};
