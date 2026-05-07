import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Loading } from '../Complements/Loading';

interface TopProductsProps {
  products?: any[];
  loading?: boolean;
}

const MEDALS = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

export const TopProducts: React.FC<TopProductsProps> = ({
  products = [],
  loading = false
}) => {
  const topProducts = useMemo(() => {
    // Les données viennent directement du nouvel endpoint
    // qui retourne: { id, name, sales, price }
    if (Array.isArray(products) && products.length > 0) {
      return products.slice(0, 5);
    }
    return [];
  }, [products]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading size="md" text="Chargement..." />
      </div>
    );
  }

  if (topProducts.length === 0) {
    return (
      <div className="bg-slate-900/40 border border-amber-500/20 p-6 rounded-sm">
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2 flex items-center gap-2">
            <TrendingUp size={16} className="text-amber-500" />
            Top 5 Produits
          </h3>
          <p className="text-xs text-slate-500">Produits les plus vendus</p>
        </div>
        <p className="text-slate-400 text-sm">Pas de données disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-green-500/20 p-6 rounded-sm animate-fadeInUp hover:border-green-500/30 transition-all duration-300 group relative overflow-hidden">
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2 flex items-center gap-2">
          <TrendingUp size={16} className="text-green-500" />
          Top 5 Produits
        </h3>
        <p className="text-xs text-slate-500">Produits les plus vendus</p>
      </div>

      <div className="space-y-3">
        {topProducts.map((product, idx) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-3 bg-black/20 rounded-sm hover:bg-green-500/5 transition-all duration-300 group/item hover:scale-[1.02] animate-fadeInUp"
            style={{ animationDelay: (idx * 100) + 'ms' }}
          >
            {/* Medal */}
            <span className="text-2xl w-8 text-center group-hover/item:scale-110 transition-transform duration-300">{MEDALS[idx]}</span>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate group-hover/item:text-green-400 transition-colors">
                {product.name}
              </p>
              <p className="text-xs text-slate-500">{product.sales} ventes</p>
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-green-500">
                €{product.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-green-500/10">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            <p className="text-2xl font-bold text-green-500">
              {topProducts.reduce((sum, p) => sum + p.sales, 0).toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">Ventes totales</p>
          </div>
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '600ms' }}>
            <p className="text-2xl font-bold text-emerald-400">
              €{(topProducts.reduce((sum, p) => sum + p.price, 0) / topProducts.length).toLocaleString('fr-FR', { maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-slate-500 mt-1">Prix moyen</p>
          </div>
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '700ms' }}>
            <p className="text-2xl font-bold text-blue-400">
              €{Math.floor(topProducts.reduce((sum, p) => sum + (p.sales * p.price), 0)).toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">Chiffre d'affaires</p>
          </div>
        </div>
      </div>
    </div>
  );
};
