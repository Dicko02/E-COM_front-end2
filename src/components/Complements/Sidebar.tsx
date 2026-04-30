import { useState } from 'react';
import {
  Menu, X, LogOut, LayoutDashboard, Package, Settings,
  ShoppingBag, Users, FolderOpen, Home, Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// ── Menus par rôle ──────────────────────────────────────────────
const ADMIN_MENU = [
  { label: 'Dashboard',  href: '/admin/dashboard',  icon: LayoutDashboard },
  { label: 'Produits',   href: '/admin/produits',   icon: Package },
  { label: 'Catégories', href: '/admin/categories', icon: FolderOpen },
  { label: 'Commandes',  href: '/admin/commandes',  icon: ShoppingBag },
  { label: 'Clients',    href: '/admin/clients',    icon: Users },
];

const CLIENT_MENU = [
  { label: 'Accueil',        href: '/',           icon: Home },
  { label: 'Produits',       href: '/produits',   icon: Package },
  { label: 'Mon panier',     href: '/panier',     icon: ShoppingBag },
  { label: 'Mes commandes',  href: '/commandes',  icon: Tag },
];

// ── Composant ───────────────────────────────────────────────────
export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const isAdmin  = user.role === 'admin';
  const isClient = user.role === 'client';
  const menuItems = isAdmin ? ADMIN_MENU : CLIENT_MENU;

  // Couleur d'accentuation selon rôle
  const accent     = isAdmin ? '#22c55e' : '#f59e0b';   // green-500 / amber-400
  const accentFaint = isAdmin ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)';

  // Nom affiché dans l'avatar
  const displayName = user.nom
    ? `${user.prenom ?? ''} ${user.nom}`.trim()
    : user.email;

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  const handleNav = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* ── Bouton ☰ flottant ─────────────────────────────────── */}
      <button
        type="button"
        aria-label="Ouvrir le menu"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 50,
          padding: '0.5rem 0.75rem',
          backgroundColor: '#000',
          color: '#fff',
          border: `1px solid ${accent}33`,
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          lineHeight: 1,
          transition: 'background-color 0.2s',
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = accent)}
        onMouseOut={e  => (e.currentTarget.style.backgroundColor = '#000')}
      >
        <Menu size={18} />
      </button>

      {/* ── Overlay ───────────────────────────────────────────── */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.55)',
            zIndex: 40,
          }}
        />
      )}

      {/* ── Sidebar glissante ─────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '15rem',
          backgroundColor: '#0a0a0a',
          borderRight: `1px solid ${accent}30`,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s ease-in-out',
        }}
      >
        {/* ── En-tête ─────────────────────────────────────────── */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.1rem 1rem',
            borderBottom: `1px solid ${accent}25`,
          }}>
            <div>
              <p style={{ color: '#fff', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
                Wayne
              </p>
              <p style={{ color: accent, fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>
                {isAdmin ? 'Admin Panel' : 'Mon Espace'}
              </p>
            </div>

            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '1.4rem', lineHeight: 1, padding: 0 }}
              onMouseOver={e => (e.currentTarget.style.color = accent)}
              onMouseOut={e  => (e.currentTarget.style.color = '#6b7280')}
            >
              <X size={20} />
            </button>
          </div>

          {/* ── Navigation ──────────────────────────────────────── */}
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '0.75rem 0.75rem', gap: '0.15rem' }}>
            {menuItems.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={e => { e.preventDefault(); handleNav(href); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '4px',
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'color 0.18s, background 0.18s',
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
                <Icon size={15} style={{ flexShrink: 0 }} />
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* ── Bas : profil + actions ─────────────────────────── */}
        <div style={{ borderTop: `1px solid ${accent}25`, padding: '0.75rem' }}>

          {/* Paramètres — admin uniquement */}
          {isAdmin && (
            <button
              type="button"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.6rem 0.75rem',
                borderRadius: '4px',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                marginBottom: '0.5rem',
                transition: 'color 0.18s, background 0.18s',
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
              <Settings size={15} />
              Paramètres
            </button>
          )}

          {/* Bloc profil (style ancien projet : avatar + nom + déconnexion) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.65rem 0.75rem',
            backgroundColor: accentFaint,
            border: `1px solid ${accent}20`,
            borderRadius: '4px',
          }}>
            {/* Avatar généré (style ancien projet) */}
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=111&color=${isAdmin ? '22c55e' : 'f59e0b'}&bold=true&size=64`}
              alt="avatar"
              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />

            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.75rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {displayName}
              </p>
              <p style={{ color: accent, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                {isAdmin ? 'Admin' : 'Client'}
              </p>
            </div>

            {/* Bouton déconnexion (icône uniquement, comme l'ancien projet) */}
            <button
              type="button"
              aria-label="Déconnexion"
              onClick={handleLogout}
              title="Déconnexion"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 0, flexShrink: 0 }}
              onMouseOver={e => (e.currentTarget.style.color = '#fca5a5')}
              onMouseOut={e  => (e.currentTarget.style.color = '#ef4444')}
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};