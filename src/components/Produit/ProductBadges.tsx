import React from 'react';

interface ProductBadgesProps {
  discount: number;
  nombreDisponible: number;
}

export const ProductBadges: React.FC<ProductBadgesProps> = ({ discount, nombreDisponible }) => {
  const isLowStock = nombreDisponible > 0 && nombreDisponible <= 5;
  const isOutOfStock = nombreDisponible === 0;

  return (
    <div className="flex flex-col gap-1">
      {discount > 0 && !isOutOfStock && (
        <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm shadow-lg">
          -{discount}%
        </span>
      )}
      {isLowStock && (
        <span className="bg-amber-500 text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm">
          Plus que {nombreDisponible} !
        </span>
      )}
      {isOutOfStock && (
        <span className="bg-slate-700 text-slate-300 text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm">
          Épuisé
        </span>
      )}
    </div>
  );
};
