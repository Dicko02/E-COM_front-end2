import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getImageUrl } from '../../utils/imageUrl';

interface ProductCardProps {
  product: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const discount = product.ancienPrix
    ? Math.round(((product.ancienPrix - product.prix) / product.ancienPrix) * 100)
    : 0;

  const isLowStock  = product.nombreDisponible > 0 && product.nombreDisponible <= 5;
  const isOutOfStock = product.nombreDisponible === 0;

  return (
    <div className="group cursor-pointer flex flex-col h-full max-w-xs mx-auto animate-fadeIn">
      <a href={`/produits/${product._id}`} className="block">

        {/* Image - Professional constrained size matching e-commerce standards */}
        <div className="aspect-square bg-slate-900 rounded-sm overflow-hidden mb-3 relative border border-amber-500/10 group-hover:border-amber-500/40 transition-all duration-500 w-full max-w-sm mx-auto">

          {product.image ? (
            <img
              src={getImageUrl(product.image)}
              alt={product.nom}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-500/10 to-transparent text-4xl">
              📦
            </div>
          )}

          {/* Overlay sombre au hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

          {/* Badges — coin haut gauche */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && !isOutOfStock && (
              <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm shadow-lg">
                -{discount}%
              </span>
            )}
            {isLowStock && (
              <span className="bg-amber-500 text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm">
                Plus que {product.nombreDisponible} !
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-slate-700 text-slate-300 text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm">
                Épuisé
              </span>
            )}
          </div>

          {/* Bouton ajout rapide */}
          {!isOutOfStock && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product._id);
                }}
                className="w-full bg-amber-500 hover:bg-white text-black py-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-200"
              >
                <ShoppingCart size={13} />
                Ajouter au panier
              </button>
            </div>
          )}
        </div>
      </a>

      {/* Infos produit */}
      <div className="flex flex-col flex-grow px-1">
        <p className="text-[9px] text-amber-500 font-bold uppercase tracking-[0.2em] mb-1">
          {product.categorie?.name || 'Collection'}
        </p>

        <a href={`/produits/${product._id}`} className="flex-grow">
          <h3 className="text-white text-sm font-light mb-2 hover:text-amber-500 transition-colors tracking-wide leading-snug line-clamp-2">
            {product.nom}
          </h3>
        </a>

        {/* Prix */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className={`font-bold text-sm ${isOutOfStock ? 'text-slate-500' : 'text-white'}`}>
            {typeof product.prix === 'number' ? product.prix.toFixed(2) : product.prix}€
          </span>
          {product.ancienPrix && (
            <span className="text-[11px] text-slate-500 line-through font-light">
              {product.ancienPrix.toFixed(2)}€
            </span>
          )}
          {discount > 0 && !isOutOfStock && (
            <span className="text-[9px] text-red-400 font-bold ml-auto">
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
