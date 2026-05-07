import React, { useState } from 'react';
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
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const discount = product.ancienPrix
    ? Math.round(((product.ancienPrix - product.prix) / product.ancienPrix) * 100)
    : 0;
  const isOutOfStock = product.nombreDisponible === 0;

  // ── Animations FundingPips ──────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    // Tilt 3D calculation
    const tiltX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -6;
    const tiltY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 6;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };
  // ────────────────────────────────────────────────────────────────────────

  return (
    <div 
      className="group cursor-pointer flex flex-col h-full max-w-xs mx-auto animate-fadeIn"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
      }}
    >

      {/* ── Image ── */}
      <a href={`/produits/${product._id}`} className="block">
        <div className="relative overflow-hidden rounded-[20px] transition-all duration-500">

          {/* ProductImage gère déjà le ratio aspect-square */}
          <ProductImage image={product.imageUrl} nom={product.nom} />

          {/* Shine effect qui suit la souris (FundingPips) */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(245,158,11,0.15), transparent 40%)`
            }}
          />

          {/* Overlay dégradé au hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <ProductBadges discount={discount} nombreDisponible={product.nombreDisponible} />
          </div>

          {/* Bouton panier — slide depuis le bas */}
          {!isOutOfStock && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 rounded-b-[20px] overflow-hidden">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product._id);
                }}
                className="w-full bg-amber-500 hover:bg-white text-black flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200 relative overflow-hidden group/btn"
              >
                {/* Shimmer effect (FundingPips) */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                <ShoppingCart size={13} className="relative z-10" />
                <span className="relative z-10">Ajouter au panier</span>
              </button>
            </div>
          )}

          {/* Rupture de stock */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[20px]">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-600 px-3 py-1.5 rounded-sm">
                Épuisé
              </span>
            </div>
          )}
        </div>
      </a>

      {/* ── Infos produit ── */}
      <div className="flex flex-col flex-grow pt-3 px-1">
        <p className="text-[9px] text-amber-500/80 font-bold uppercase tracking-[0.25em] mb-1.5 truncate transition-colors group-hover:text-amber-400">
          {product.categorie?.name || 'Collection'}
        </p>

        <a href={`/produits/${product._id}`} className="flex-grow mb-3">
          <h3 className="text-white text-sm font-light leading-snug line-clamp-2 hover:text-amber-400 transition-colors duration-200 tracking-wide">
            {product.nom}
          </h3>
        </a>

        <div className="flex items-baseline gap-2 mt-auto">
          <span className={`font-bold text-sm ${isOutOfStock ? 'text-slate-500' : 'text-white'}`}>
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

        <div className="h-px bg-amber-500/0 group-hover:bg-amber-500/20 transition-all duration-500 mt-2.5" />
      </div>
    </div>
  );
};
