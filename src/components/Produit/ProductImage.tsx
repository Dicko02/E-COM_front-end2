import React from 'react';
import { getImageUrl } from '../../utils/imageUrl';

interface ProductImageProps {
  image?: string | null;
  nom: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ image, nom, className = '' }) => {
  return (
    // <div className={`w-full h-full aspect-square bg-slate-900 rounded-lg overflow-hidden border border-amber-500/10 ${className}`}>
    <div className={`w-full aspect-square bg-slate-900 rounded-2xl overflow-hidden border border-amber-500/10 max-w-[280px] mx-auto ${className}`}>
      {image ? (
        <img
          src={image.startsWith('blob:') || image.startsWith('http') ? image : getImageUrl(image)}
          alt={nom}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full flex items-center justify-center bg-gradient-to-br from-amber-500/10 to-transparent text-4xl">
          📦
        </div>
      )}
    </div>
  );
};
