import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loading } from '../Complements/Loading';

interface RevenueChartProps {
  data?: any[];
  loading?: boolean;
  height?: number;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data = [],
  loading = false,
  height = 350
}) => {
  const chartData = useMemo(() => {
    // Les données viennent directement du nouvel endpoint
    // qui retourne: { month, revenue, target }
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    // Fallback: données vides
    return [];
  }, [data]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading size="md" text="Chargement..." />
      </div>
    );
  }

  const formatCurrency = (value: number) => `€${(value / 1000).toFixed(1)}k`;

  return (
    <div className="bg-slate-900/40 border border-green-500/20 p-6 rounded-sm animate-fadeInUp hover:border-green-500/30 transition-all duration-300 group relative overflow-hidden">
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">
          Revenus Mensuels
        </h3>
        <p className="text-xs text-slate-500">Comparaison revenus vs objectifs</p>
      </div>

      {chartData.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center min-h-[300px]">
          <p className="text-slate-400 text-sm">Pas de données disponibles</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748b" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#64748b" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(145, 158, 171, 0.1)" />

            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(145, 158, 171, 0.2)' }}
            />

            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(145, 158, 171, 0.2)' }}
              tickFormatter={formatCurrency}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '4px',
                color: '#f1f5f9'
              }}
              formatter={(value) => formatCurrency(value as number)}
              labelStyle={{ color: '#f1f5f9' }}
              cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
            />

            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="square"
            />

            <Bar
              dataKey="revenue"
              fill="url(#revenueGradient)"
              name="Revenus Actuels"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="target"
              fill="url(#targetGradient)"
              name="Objectif"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
