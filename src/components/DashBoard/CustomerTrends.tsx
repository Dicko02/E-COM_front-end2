import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loading } from '../Complements/Loading';
import { Users } from 'lucide-react';

interface CustomerTrendsProps {
  data?: any[];
  loading?: boolean;
  height?: number;
}

export const CustomerTrends: React.FC<CustomerTrendsProps> = ({
  data = [],
  loading = false,
  height = 300
}) => {
  const chartData = useMemo(() => {
    // Les données viennent directement du nouvel endpoint
    // qui retourne: { month, newCustomers, lastYear }
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return [];
  }, [data]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading size="md" text="Chargement..." />
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-green-500/20 p-6 rounded-sm animate-fadeInUp hover:border-green-500/30 transition-all duration-300 group relative overflow-hidden">
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2 flex items-center gap-2">
          <Users size={16} className="text-green-500" />
          Tendances Clients
        </h3>
        <p className="text-xs text-slate-500">Nouveaux clients vs année précédente</p>
      </div>

      {chartData.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center min-h-[300px]">
          <p className="text-slate-400 text-sm">Pas de données disponibles</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorNewCustomers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
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
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '4px',
                color: '#f1f5f9'
              }}
              labelStyle={{ color: '#f1f5f9' }}
              cursor={{ stroke: 'rgba(34, 197, 94, 0.3)', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ paddingTop: '20px' }} />

            <Line
              type="monotone"
              dataKey="newCustomers"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: '#22c55e', r: 4 }}
              activeDot={{ r: 6 }}
              name={`Clients ${new Date().getFullYear()}`}
              isAnimationActive={true}
            />

            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#64748b', r: 3 }}
              name="Année précédente"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Stats Footer - Uniquement si données */}
      {chartData.length > 0 && (
        <div className="mt-6 pt-6 border-t border-green-500/10 grid grid-cols-2 gap-4">
          <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <p className="text-2xl font-bold text-green-500">
              {chartData.reduce((sum, m) => sum + m.newCustomers, 0)}
            </p>
            <p className="text-xs text-slate-500 mt-1">Nouveaux clients {new Date().getFullYear()}</p>
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <p className="text-2xl font-bold text-emerald-400">
              +{Math.round(((chartData.reduce((sum, m) => sum + m.newCustomers, 0) / chartData.reduce((sum, m) => sum + m.lastYear, 0) - 1) * 100))}%
            </p>
            <p className="text-xs text-slate-500 mt-1">Croissance vs {new Date().getFullYear() - 1}</p>
          </div>
        </div>
      )}
    </div>
  );
};
