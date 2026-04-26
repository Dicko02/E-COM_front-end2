import { useState, useEffect } from 'react';
import { LogOut, Download } from 'lucide-react';
import { commandeApi } from '../../api/Commande/commande.api';
import { userApi } from '../../api/User/user.api';
import { produitApi } from '../../api/Produit/produit.api';
import { useAuth } from '../../context/AuthContext';

// Dashboard Components
import { StatCard } from '../../components/DashBoard/StatCard';
import { RevenueChart } from '../../components/DashBoard/RevenueChart';
import { CategoryChart } from '../../components/DashBoard/CategoryChart';
import { TopProducts } from '../../components/DashBoard/TopProducts';
import { OrderStatus } from '../../components/DashBoard/OrderStatus';
import { CustomerTrends } from '../../components/DashBoard/CustomerTrends';
import { QuickActions } from '../../components/DashBoard/QuickActions';
import { Notifications } from '../../components/DashBoard/Notifications';
import { ThemeSelector } from '../../components/DashBoard/ThemeSelector';
import { DashboardThemeProvider } from '../../components/DashBoard/utils/ThemeProvider';
import { useNotification } from '../../components/DashBoard/utils/useNotification';
import { exportDashboardPDF } from '../../components/DashBoard/utils/ExportPDF';
import { Loading } from '../../components/Complements/Loading';

export const DashboardPage = () => {
  const { logout } = useAuth();
  const { notifications, notify, removeNotification } = useNotification();

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });

  const [loading, setLoading] = useState(true);
  const [exportingPDF, setExportingPDF] = useState(false);

  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topProdsData, setTopProdsData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // ========== APPEL AUX 5 NOUVEAUX ENDPOINTS STATS ==========
        const [
          orderStats,
          totalUsers,
          totalProducts,
          ,
          ,
          monthlyRevenue,
          customerTrends,
          categoryStats,
          topProducts,
          statusBreakdown
        ] = await Promise.all([
          commandeApi.getStats(),
          userApi.total(),
          produitApi.getTotalProducts(),
          commandeApi.getAll(),
          produitApi.getAll(),
          commandeApi.getMonthlyRevenue().catch(() => ({ data: [] })),
          commandeApi.getCustomerTrends().catch(() => ({ data: [] })),
          produitApi.getStatsByCategory().catch(() => ({ data: [] })),
          produitApi.getTopBySales().catch(() => ({ data: [] })),
          commandeApi.getStatusBreakdown().catch(() => ({ data: {} }))
        ]);

        setStats({
          products: totalProducts.count || 0,
          orders: orderStats.stats.totalOrders || 0,
          users: totalUsers.count || 0,
          revenue: orderStats.stats.totalRevenue || 0
        });

        setRevenueData(monthlyRevenue?.data || []);
        setCustomerData(customerTrends?.data || []);
        setCategoryData(categoryStats?.data || []);
        setTopProdsData(topProducts?.data || []);
        setStatusData(statusBreakdown?.data || {});

        notify('Données chargées avec succès', 'success');
      } catch (error) {
        console.error('Erreur chargement stats:', error);
        notify('Erreur lors du chargement des données', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [notify]);

  const handleExportPDF = async () => {
    try {
      setExportingPDF(true);
      await exportDashboardPDF('dashboard-export', {
        filename: `LUXE-Dashboard-${new Date().toISOString().split('T')[0]}.pdf`,
        title: 'LUXE Dashboard - Rapport Complet',
        includeCharts: true
      });
      notify('PDF exporté avec succès', 'success');
    } catch (error) {
      console.error('Erreur export PDF:', error);
      notify('Erreur lors de l\'export PDF', 'error');
    } finally {
      setExportingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loading size="lg" text="Chargement du dashboard..." />
      </div>
    );
  }

  return (
    <DashboardThemeProvider>
      <div className="min-h-screen bg-black text-white" id="dashboard-export">
        {/* Header */}
        <header className="sticky top-20 z-40 bg-black/80 backdrop-blur-md border-b border-amber-500/10 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <nav className="flex items-center text-xs text-slate-500 gap-2">
              <span className="uppercase tracking-widest">Dashboard</span>
              <span className="text-amber-500">/</span>
              <span className="text-amber-500 font-semibold uppercase tracking-widest">Accueil Admin</span>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <ThemeSelector />

            <button
              onClick={handleExportPDF}
              disabled={exportingPDF}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black font-bold rounded-sm hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase"
            >
              <Download size={16} />
              {exportingPDF ? 'Export...' : 'Rapport PDF'}
            </button>

            <button
              onClick={() => logout()}
              className="p-2 text-slate-500 hover:text-red-400 transition-colors"
              title="Déconnexion"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8 space-y-8 max-w-7xl mx-auto">
          {/* Stats Cards - 4 Colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon="💰"
              title="Revenu Total"
              value={`€${stats.revenue.toLocaleString()}`}
              trend={12.5}
              trendLabel="vs mois dernier"
              backgroundColor="bg-slate-900/40"
              accentColor="text-amber-500"
            />

            <StatCard
              icon="📦"
              title="Commandes Actives"
              value={stats.orders}
              trend={4.2}
              trendLabel="en traitement"
              backgroundColor="bg-slate-900/40"
              accentColor="text-emerald-500"
            />

            <StatCard
              icon="👥"
              title="Nouveaux Clients"
              value={stats.users}
              trend={8.1}
              trendLabel="ce trimestre"
              backgroundColor="bg-slate-900/40"
              accentColor="text-blue-500"
            />

            <StatCard
              icon="📊"
              title="Produits"
              value={stats.products}
              trend={-2.3}
              trendLabel="vs mois dernier"
              backgroundColor="bg-slate-900/40"
              accentColor="text-purple-500"
            />
          </div>

          {/* Charts Grid - 2 Colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Revenue Chart - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RevenueChart data={revenueData} loading={false} height={350} />
            </div>

            {/* Category Chart - 1 column */}
            <CategoryChart data={categoryData} categories={categoryData} loading={false} />
          </div>

          {/* Middle Row - Products & Order Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TopProducts products={topProdsData} loading={false} />
            <OrderStatus orders={statusData} loading={false} />
          </div>

          {/* Customer Trends - Full Width */}
          <CustomerTrends data={customerData} loading={false} height={300} />

          {/* Quick Actions */}
          <QuickActions />

          {/* Footer Section */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center py-6 border-t border-amber-500/10">
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">
              Système:{' '}
              <span className="text-emerald-400">✓ Tous les nœuds opérationnels</span>
            </div>

            <div className="text-xs text-slate-500 uppercase tracking-widest">
              Dernier rafraîchissement: {new Date().toLocaleTimeString('fr-FR')}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 text-xs font-bold uppercase rounded-sm border border-amber-500/20 text-slate-300 hover:text-amber-500 hover:border-amber-500/50 transition-colors"
            >
              🔄 Rafraîchir
            </button>
          </div>
        </main>

        {/* Notifications System */}
        <Notifications notifications={notifications} onRemove={removeNotification} />
      </div>
    </DashboardThemeProvider>
  );
};
