import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export const ConnexionPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── Logique inchangée ────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setError('');
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user?.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };
  // ────────────────────────────────────────────────────────────────────────

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f7f7f5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.25rem',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>

      {/* Logo */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: 36, height: 36,
            backgroundColor: '#111',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#22c55e', fontSize: 18, fontWeight: 900 }}>W</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.05em', color: '#111' }}>
              WAYNE
            </p>
            <p style={{ margin: 0, fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.25em', color: '#22c55e', textTransform: 'uppercase' }}>
              ENTERPRIZE
            </p>
          </div>
        </div>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 420,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: '2.5rem 2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08)',
      }}>

        <h1 style={{
          margin: '0 0 0.35rem',
          fontSize: '1.5rem', fontWeight: 800,
          color: '#111', letterSpacing: '-0.02em',
        }}>
          Se connecter
        </h1>
        <p style={{ margin: '0 0 2rem', fontSize: '0.875rem', color: '#888' }}>
          Accédez à votre espace Wayne Enterprize
        </p>

        {/* Erreur */}
        {error && (
          <div style={{
            background: '#fff0f0', border: '1px solid #fca5a5',
            borderRadius: 8, padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.8rem', color: '#dc2626', fontWeight: 500,
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Email */}
          <div>
            <label htmlFor="email" style={{
              display: 'block', marginBottom: '0.4rem',
              fontSize: '0.8rem', fontWeight: 600, color: '#444',
            }}>
              Adresse email
            </label>
            <input
              id="email" type="email" name="email" autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="votre@email.com"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '0.7rem 0.9rem',
                border: '1.5px solid #e5e5e5', borderRadius: 8,
                fontSize: '0.875rem', color: '#111',
                backgroundColor: '#fafafa',
                outline: 'none', transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.target.style.borderColor = '#22c55e')}
              onBlur={e => (e.target.style.borderColor = '#e5e5e5')}
            />
          </div>

          {/* Mot de passe */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label htmlFor="password" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>
                Mot de passe
              </label>
              <a href="#" style={{ fontSize: '0.75rem', color: '#22c55e', textDecoration: 'none', fontWeight: 500 }}>
                Oublié ?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="password" type={showPassword ? 'text' : 'password'}
                name="password" autoComplete="current-password"
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '0.7rem 2.5rem 0.7rem 0.9rem',
                  border: '1.5px solid #e5e5e5', borderRadius: 8,
                  fontSize: '0.875rem', color: '#111',
                  backgroundColor: '#fafafa',
                  outline: 'none', transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#22c55e')}
                onBlur={e => (e.target.style.borderColor = '#e5e5e5')}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#aaa', padding: 0, display: 'flex',
                }}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" id="remember"
              style={{ width: 15, height: 15, accentColor: '#22c55e', cursor: 'pointer' }} />
            <span style={{ fontSize: '0.8rem', color: '#666' }}>Se souvenir de moi</span>
          </label>

          {/* Admin */}
          <label style={{
            display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
            padding: '0.6rem 0.8rem',
            background: '#f4fdf6', borderRadius: 8,
            border: '1px dashed #86efac',
          }}>
            <input type="checkbox" id="isAdmin" name="isAdmin"
              checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}
              style={{ width: 15, height: 15, accentColor: '#22c55e', cursor: 'pointer' }} />
            <span style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 500 }}>
              Connexion administrateur
            </span>
          </label>

          {/* Bouton */}
          <button type="button" onClick={handleSubmit} disabled={loading}
            style={{
              width: '100%', padding: '0.85rem',
              backgroundColor: loading ? '#86efac' : '#111',
              color: '#fff',
              border: 'none', borderRadius: 8,
              fontSize: '0.875rem', fontWeight: 700,
              letterSpacing: '0.03em',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s, transform 0.1s',
            }}
            onMouseOver={e => !loading && ((e.currentTarget as HTMLElement).style.backgroundColor = '#22c55e')}
            onMouseOut={e => !loading && ((e.currentTarget as HTMLElement).style.backgroundColor = '#111')}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          {/* Séparateur */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 1, backgroundColor: '#e5e5e5' }} />
            <span style={{ fontSize: '0.72rem', color: '#aaa', letterSpacing: '0.08em' }}>OU</span>
            <div style={{ flex: 1, height: 1, backgroundColor: '#e5e5e5' }} />
          </div>

          {/* Google */}
          {/* <button type="button"
            style={{
              width: '100%', padding: '0.75rem',
              backgroundColor: '#fff',
              border: '1.5px solid #e5e5e5', borderRadius: 8,
              fontSize: '0.875rem', fontWeight: 600, color: '#333',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'border-color 0.15s',
            }}
            onMouseOver={e => ((e.currentTarget as HTMLElement).style.borderColor = '#aaa')}
            onMouseOut={e => ((e.currentTarget as HTMLElement).style.borderColor = '#e5e5e5')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
          </button> */}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#888' }}>
          Nouveau ici ?{' '}
          <a href="/inscription" style={{ color: '#22c55e', fontWeight: 600, textDecoration: 'none' }}>
            Créer un compte
          </a>
        </p>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
        {['Aide', 'Confidentialité', 'CGU'].map(item => (
          <a key={item} href="#" style={{
            fontSize: '0.7rem', color: '#aaa', textDecoration: 'none',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}
            onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = '#22c55e')}
            onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = '#aaa')}
          >{item}</a>
        ))}
      </div>
    </div>
  );
};