import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Loading } from '../Complements/Loading';

interface CategoryChartProps {
  data?: any[];
  categories?: any[];
  loading?: boolean;
}

export const CategoryChart: React.FC<CategoryChartProps> = ({
  data,
  loading = false
}) => {
  const chartData = useMemo(() => {
    // Les données viennent directement du nouvel endpoint
    // qui retourne: { name, value, totalRevenue }
    if (Array.isArray(data) && data.length > 0) {
      return data.map((cat, idx) => ({
        ...cat,
        fill: ['#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f97316'][idx % 6] || '#f59e0b'
      }));
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

  if (chartData.length === 0) {
    return (
      <div className="bg-slate-900/40 border border-amber-500/20 p-6 rounded-sm">
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">
            Ventes par Catégorie
          </h3>
          <p className="text-xs text-slate-500">Distribution des revenus</p>
        </div>
        <div className="w-full h-full flex items-center justify-center min-h-[300px]">
          <p className="text-slate-400 text-sm">Pas de données disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-amber-500/20 p-6 rounded-sm">
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">
          Ventes par Catégorie
        </h3>
        <p className="text-xs text-slate-500">Distribution des revenus</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            fill="#f59e0b"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill || '#f59e0b'} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '4px',
              color: '#f1f5f9'
            }}
            formatter={(value) => `${value}%`}
          />

          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            layout="vertical"
            align="right"
            verticalAlign="middle"
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.fill || '#f59e0b' }}
            />
            <span className="text-xs text-slate-300">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
