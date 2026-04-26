import { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard, Package, Settings, ShoppingBag, Users, FolderOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user && user.role === 'admin';

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const menuItems = [
    { label: 'Dashboard',  href: '/admin/dashboard',  icon: LayoutDashboard },
    { label: 'Produits',   href: '/admin/produits',   icon: Package },
    { label: 'Catégories', href: '/admin/categories', icon: FolderOpen },
    { label: 'Commandes',  href: '/admin/commandes',  icon: ShoppingBag },
    { label: 'Clients',    href: '/admin/clients',    icon: Users },
  ];

  if (!isAdmin) return null;

  return (
    <>
      {/* Bouton toggle mobile */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed top-28 left-4 z-40 lg:hidden p-2 text-slate-300 hover:text-green-400 transition-colors bg-black/80 rounded-sm border border-green-500/20"
        aria-label="Ouvrir le menu admin"
      >
        <Menu size={20} />
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-56 bg-black border-r border-green-500/20 z-40
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-green-500/20 flex items-center justify-between">
          <div>
            <p className="text-white font-black text-sm tracking-widest uppercase leading-none">Wayne</p>
            <p className="text-green-400 font-bold text-[9px] tracking-[0.3em] uppercase">Admin Panel</p>
          </div>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-green-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  navigate(item.href);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-sm text-slate-300 hover:text-green-400 hover:bg-green-500/10 transition-colors group"
              >
                <Icon size={16} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="text-xs font-medium uppercase tracking-wider">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Bas de sidebar */}
        <div className="border-t border-green-500/20 p-4 space-y-3">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-slate-300 hover:text-green-400 hover:bg-green-500/10 transition-colors group"
          >
            <Settings size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium uppercase tracking-wider">Paramètres</span>
          </button>

          <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-sm">
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-1">Admin</p>
            <p className="text-xs font-semibold text-slate-200 truncate">{user.email}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors group font-medium"
          >
            <LogOut size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-wider">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Spacer desktop */}
      <div className="hidden lg:block w-56 flex-shrink-0" />
    </>
  );
};
