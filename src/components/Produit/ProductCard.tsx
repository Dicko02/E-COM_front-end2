import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ProductImage } from './ProductImage';
import { ProductBadges } from './ProductBadges';

interface ProductCardProps {
  product: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // ── Logique inchangée ────────────────────────────────────────────────────
  const { addToCart } = useCart();

  const discount = product.ancienPrix
    ? Math.round(((product.ancienPrix - product.prix) / product.ancienPrix) * 100)
    : 0;
  const isOutOfStock = product.nombreDisponible === 0;
  // ────────────────────────────────────────────────────────────────────────

  return (
    <div className="group flex flex-col h-full animate-fadeIn">

      {/* ── Image ── */}
      <a href={`/produits/${product._id}`} className="block relative overflow-hidden rounded-sm">

        {/* Conteneur image avec ratio fixe */}
        <div className="relative aspect-square bg-slate-900/60 overflow-hidden rounded-sm border border-white/5 group-hover:border-amber-500/30 transition-all duration-500">
          <ProductImage image={product.imageUrl} nom={product.nom} />

          {/* Overlay hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Badges (discount, stock faible) */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <ProductBadges discount={discount} nombreDisponible={product.nombreDisponible} />
          </div>

          {/* Bouton panier — slide depuis le bas */}
          {!isOutOfStock && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product._id);
                }}
                className="w-full bg-amber-500 hover:bg-white text-black flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-200"
              >
                <ShoppingCart size={13} />
                Ajouter au panier
              </button>
            </div>
          )}

          {/* État rupture de stock */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-600 px-3 py-1.5">
                Épuisé
              </span>
            </div>
          )}
        </div>
      </a>

      {/* ── Infos produit ── */}
      <div className="flex flex-col flex-grow pt-3 px-0.5">

        {/* Catégorie */}
        <p className="text-[9px] text-amber-500/80 font-bold uppercase tracking-[0.25em] mb-1.5 truncate">
          {product.categorie?.name || 'Collection'}
        </p>

        {/* Nom */}
        <a href={`/produits/${product._id}`} className="flex-grow mb-3">
          <h3 className="text-white text-[0.8rem] font-medium leading-snug line-clamp-2 hover:text-amber-400 transition-colors duration-200 tracking-wide">
            {product.nom}
          </h3>
        </a>

        {/* Prix */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className={`font-bold text-sm tracking-tight ${isOutOfStock ? 'text-slate-500' : 'text-white'}`}>
            {typeof product.prix === 'number' ? product.prix.toFixed(2) : product.prix}€
          </span>
          {product.ancienPrix && !isOutOfStock && (
            <span className="text-[11px] text-slate-500 line-through">
              {product.ancienPrix.toFixed(2)}€
            </span>
          )}
          {discount > 0 && !isOutOfStock && (
            <span className="ml-auto text-[9px] text-amber-500/70 font-bold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Ligne décorative sous le prix — apparaît au hover */}
        <div className="h-px bg-amber-500/0 group-hover:bg-amber-500/20 transition-all duration-500 mt-2.5" />
      </div>
    </div>
  );
};