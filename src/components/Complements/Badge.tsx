import React from 'react';
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'md' }) => {
  const variants = {
    default: 'bg-slate-700 text-slate-100 border border-slate-600',
    primary: 'bg-amber-500 text-black border border-amber-500',
    success: 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/30',
    error: 'bg-red-500/10 text-red-200 border border-red-500/30',
    warning: 'bg-amber-500/10 text-amber-200 border border-amber-500/30',
    info: 'bg-blue-500/10 text-blue-200 border border-blue-500/30'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <span className={`inline-block rounded-sm font-medium uppercase tracking-wider ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};