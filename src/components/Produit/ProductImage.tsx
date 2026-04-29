import React from 'react';

interface ProductImageProps {
  image?: string | null;
  nom: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ image, nom, className = '' }) => {
  return (
    <div className={`w-full aspect-square bg-slate-900 overflow-hidden border border-amber-500/10 max-w-[350px] mx-auto ${className}`}
      style={{ borderRadius: '20px' }}
    >
      {image ? (
        <img
          /* Si l'image est déjà une URL complète (ce que notre backend envoie maintenant), on l'affiche directement */
          src={image} 
          alt={nom}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-500/10 to-transparent text-4xl">
          📦
        </div>
      )}
    </div>
  );
};
