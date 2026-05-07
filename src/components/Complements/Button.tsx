import React from 'react';
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  className = ''
}) => {
  const variants = {
    primary: 'bg-amber-500 hover:bg-white text-black font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-hidden group',
    secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600 uppercase tracking-widest transition-all duration-300 hover:scale-105 relative overflow-hidden group',
    outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black uppercase tracking-widest transition-all duration-300 hover:scale-105 relative overflow-hidden group',
    danger: 'bg-red-600 text-white hover:bg-red-700 uppercase tracking-widest transition-all duration-300 hover:scale-105 relative overflow-hidden group',
    ghost: 'text-amber-500 hover:text-amber-400 uppercase tracking-widest transition-all duration-300 hover:scale-105'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-sm',
    md: 'px-8 py-3 text-sm rounded-sm',
    lg: 'px-10 py-4 text-base rounded-sm'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {variant !== 'ghost' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};