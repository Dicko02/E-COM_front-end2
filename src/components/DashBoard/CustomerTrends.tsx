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
    <div className="bg-slate-900/40 border border-amber-500/20 p-6 rounded-sm">
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2 flex items-center gap-2">
          <Users size={16} className="text-amber-500" />
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
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '4px',
                color: '#f1f5f9'
              }}
              labelStyle={{ color: '#f1f5f9' }}
              cursor={{ stroke: 'rgba(245, 158, 11, 0.3)', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ paddingTop: '20px' }} />

            <Line
              type="monotone"
              dataKey="newCustomers"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: '#f59e0b', r: 4 }}
              activeDot={{ r: 6 }}
              name="Clients 2025"
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
        <div className="mt-6 pt-6 border-t border-amber-500/10 grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-amber-500">
              {chartData.reduce((sum, m) => sum + m.newCustomers, 0)}
            </p>
            <p className="text-xs text-slate-500 mt-1">Nouveaux clients 2025</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-400">
              +{Math.round(((chartData.reduce((sum, m) => sum + m.newCustomers, 0) / chartData.reduce((sum, m) => sum + m.lastYear, 0) - 1) * 100))}%
            </p>
            <p className="text-xs text-slate-500 mt-1">Croissance vs 2024</p>
          </div>
        </div>
      )}
    </div>
  );
};
