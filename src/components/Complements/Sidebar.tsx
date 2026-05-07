import { useState } from 'react';
import {
  Menu, X, LogOut, LayoutDashboard, Package, Settings,
  ShoppingBag, Users, FolderOpen, Home, ShoppingCart, Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ADMIN_MENU = [
  { label: 'Dashboard',  href: '/admin/dashboard',  icon: LayoutDashboard },
  { label: 'Produits',   href: '/admin/produits',   icon: Package },
  { label: 'Catégories', href: '/admin/categories', icon: FolderOpen },
  { label: 'Commandes',  href: '/admin/commandes',  icon: ShoppingBag },
  { label: 'Clients',    href: '/admin/clients',    icon: Users },
];

const CLIENT_MENU = [
  { label: 'Accueil',       href: '/',          icon: Home },
  { label: 'Produits',    href: '/produits',  icon: Package },
  { label: 'Mon panier',    href: '/panier',    icon: ShoppingCart },
  { label: 'Mes commandes', href: '/commandes', icon: Tag },
];

const GUEST_MENU = [
  { label: 'Accueil',    href: '/',         icon: Home },
  { label: 'Produits', href: '/produits', icon: Package },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();


  const isAdmin   = user?.role === 'admin';
  const isGuest   = !user;
  const menuItems = isGuest ? GUEST_MENU : (isAdmin ? ADMIN_MENU : CLIENT_MENU);
  const accent      = isGuest ? '#3b82f6' : (isAdmin ? '#22c55e' : '#f59e0b');
  const accentFaint = isGuest ? 'rgba(59,130,246,0.08)' : (isAdmin ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)');
  const displayName = user?.nom ? `${user.prenom ?? ''} ${user.nom}`.trim() : (user?.email ?? 'Visiteur');

  const handleLogout = async () => { setIsOpen(false); await logout(); };
  const handleNav    = (href: string) => { navigate(href); setIsOpen(false); };

  return (
    <>
      {/* Bouton ☰ */}
      <button
        type="button"
        aria-label="Ouvrir le menu"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', top: '1.25rem', left: '1rem', zIndex: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '2.25rem', height: '2.25rem',
          backgroundColor: '#000', color: '#fff',
          border: `1px solid ${accent}40`, borderRadius: '4px',
          cursor: 'pointer', transition: 'background-color 0.2s, border-color 0.2s',
        }}
        onMouseOver={e => {
          (e.currentTarget as HTMLElement).style.backgroundColor = accent;
          (e.currentTarget as HTMLElement).style.borderColor = accent;
        }}
        onMouseOut={e => {
          (e.currentTarget as HTMLElement).style.backgroundColor = '#000';
          (e.currentTarget as HTMLElement).style.borderColor = `${accent}40`;
        }}
      >
        <Menu size={17} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 55,
        }} />
      )}

      {/* Panneau */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '100%', width: '15rem',
        backgroundColor: '#080808', borderRight: `1px solid ${accent}25`,
        zIndex: 60, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.26s ease-in-out',
      }}>

        {/* En-tête */}
        <div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1.1rem 1rem', borderBottom: `1px solid ${accent}20`,
          }}>
            <div>
              <p style={{ color: '#fff', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
                Wayne
              </p>
              <p style={{ color: accent, fontWeight: 700, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                {isGuest ? 'Menu' : (isAdmin ? 'Admin Panel' : 'Mon Espace')}
              </p>
            </div>
            <button type="button" aria-label="Fermer" onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 0 }}
              onMouseOver={e => (e.currentTarget.style.color = accent)}
              onMouseOut={e  => (e.currentTarget.style.color = '#6b7280')}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '0.6rem', gap: '0.1rem' }}>
            {menuItems.map(({ label, href, icon: Icon }) => {
              const isPanier = href === '/panier' && !isAdmin && !isGuest;
              return (
                <a key={href} href={href}
                  onClick={e => { e.preventDefault(); handleNav(href); }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.65rem 0.75rem', borderRadius: '4px',
                    color: '#cbd5e1', textDecoration: 'none',
                    fontSize: '0.73rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    transition: 'color 0.16s, background 0.16s',
                  }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLElement).style.color = accent;
                    (e.currentTarget as HTMLElement).style.backgroundColor = accentFaint;
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLElement).style.color = '#cbd5e1';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Icon size={15} style={{ flexShrink: 0 }} />
                    {label}
                  </span>
                  {isPanier && cart.length > 0 && (
                    <span style={{
                      backgroundColor: accent, color: '#000',
                      fontSize: '0.6rem', fontWeight: 800,
                      minWidth: '1.2rem', height: '1.2rem', borderRadius: '999px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '0 0.25rem',
                    }}>
                      {cart.length}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bas */}
        <div style={{ borderTop: `1px solid ${accent}20`, padding: '0.75rem' }}>
          {/* {isAdmin && (
            <button type="button" style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.6rem 0.75rem', borderRadius: '4px',
              background: 'none', border: 'none', color: '#94a3b8',
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer', marginBottom: '0.5rem',
              transition: 'color 0.16s, background 0.16s',
            }}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.color = accent;
                (e.currentTarget as HTMLElement).style.backgroundColor = accentFaint;
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              <Settings size={15} /> Paramètres
            </button>
          )} */}
          {isGuest ? (
            // Boutons Connexion / Inscription pour les visiteurs
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => { navigate('/connexion'); setIsOpen(false); }}
                style={{
                  width: '100%', padding: '0.65rem',
                  backgroundColor: accent, color: '#fff',
                  border: 'none', borderRadius: '4px',
                  fontSize: '0.75rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'opacity 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
              >
                Connexion
              </button>
              <button
                onClick={() => { navigate('/inscription'); setIsOpen(false); }}
                style={{
                  width: '100%', padding: '0.65rem',
                  backgroundColor: 'transparent', color: accent,
                  border: `1px solid ${accent}`, borderRadius: '4px',
                  fontSize: '0.75rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = accentFaint)}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Inscription
              </button>
            </div>
          ) : (
            // Avatar + déconnexion pour les connectés (code existant)
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.65rem',
              padding: '0.65rem 0.75rem',
              backgroundColor: accentFaint, border: `1px solid ${accent}20`, borderRadius: '4px',
            }}>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=111&color=${isAdmin ? '22c55e' : 'f59e0b'}&bold=true&size=64`}
              alt="avatar"
              style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.73rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayName}
              </p>
              <p style={{ color: accent, fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                {isAdmin ? 'Admin' : 'Client'}
              </p>
            </div>
            <button type="button" aria-label="Déconnexion" onClick={handleLogout}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 0, flexShrink: 0 }}
              onMouseOver={e => (e.currentTarget.style.color = '#fca5a5')}
              onMouseOut={e  => (e.currentTarget.style.color = '#ef4444')}
            >
              <LogOut size={17} />
            </button>
          </div>
          )}
        </div>
      </div>
    </>
  );
};