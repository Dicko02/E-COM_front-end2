import React from 'react';
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div 
      className={`
        bg-slate-900 border border-amber-500/10 rounded-sm p-6 
        ${hover ? 'hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};