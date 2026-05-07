import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  trend?: number; // pourcentage positif ou négatif
  trendLabel?: string;
  backgroundColor?: string;
  accentColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  trend,
  trendLabel = 'vs mois dernier',
  backgroundColor = 'bg-slate-900/40',
  accentColor = 'text-green-500'
}) => {
  const isTrendPositive = trend ? trend > 0 : false;
  const trendAbsolute = trend ? Math.abs(trend) : 0;

  return (
    <div className={`${backgroundColor} border border-green-500/20 p-6 rounded-sm hover:border-green-500/40 transition-all duration-300 group animate-fadeInUp hover:scale-[1.02] relative overflow-hidden`}>
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          {title}
        </p>
        <span className={`text-2xl group-hover:scale-125 transition-transform duration-300 ${accentColor}`}>
          {icon}
        </span>
      </div>

      <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </h3>

      {trend !== undefined && (
        <div className="flex items-center gap-2">
          <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-widest ${
            isTrendPositive
              ? 'text-emerald-400 bg-emerald-500/10'
              : 'text-red-400 bg-red-500/10'
          }`}>
            {isTrendPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            {isTrendPositive ? '+' : '-'}{trendAbsolute}%
          </span>
          <span className="text-xs text-slate-500">{trendLabel}</span>
        </div>
      )}
    </div>
  );
};