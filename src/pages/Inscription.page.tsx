import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export const InscriptionPage = () => {
  const { register, verifyCode } = useAuth();
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '',
    password: '', confirmPassword: '',
    number: '', code: '', role: ''
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Logique inchangée ────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async () => {
    setError(''); setSuccess('');
    if (!formData.nom || !formData.prenom || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires'); return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas'); return;
    }
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères'); return;
    }
    setLoading(true);
    try {
      await register({
        nom: formData.nom, prenom: formData.prenom,
        email: formData.email, password: formData.password,
        number: formData.number,
        role: isAdmin ? 'admin' : 'client'
      });
      setSuccess('Un code de vérification a été envoyé à votre email !');
      setStep('verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setError(''); setLoading(true);
    try {
      await verifyCode(formData.email, verificationCode);
      setSuccess('Inscription validée ! Redirection...');
      setTimeout(() => {
        window.location.href = isAdmin ? '/admin/dashboard' : '/';
      }, 1500);
    } catch {
      setError('Code incorrect. Votre compte a été supprimé. Veuillez vous réinscrire.');
      setTimeout(() => { setStep('form'); setVerificationCode(''); setError(''); }, 3000);
    } finally {
      setLoading(false);
    }
  };
  // ────────────────────────────────────────────────────────────────────────

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '0.7rem 0.9rem',
    border: '1.5px solid #e5e5e5', borderRadius: 8,
    fontSize: '0.875rem', color: '#111',
    backgroundColor: '#fafafa', outline: 'none',
    transition: 'border-color 0.15s',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '0.4rem',
    fontSize: '0.8rem', fontWeight: 600, color: '#444',
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#22c55e'; };
  const onBlur  = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#e5e5e5'; };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f7f7f5',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start',
      padding: '2.5rem 1.25rem',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>

      {/* Logo */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, backgroundColor: '#111',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#22c55e', fontSize: 18, fontWeight: 900 }}>W</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.05em', color: '#111' }}>WAYNE</p>
            <p style={{ margin: 0, fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.25em', color: '#22c55e', textTransform: 'uppercase' }}>ENTERPRIZE</p>
          </div>
        </div>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 440,
        backgroundColor: '#fff', borderRadius: 16,
        padding: '2.5rem 2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08)',
      }}>

        {step === 'form' ? (
          <>
            <h1 style={{ margin: '0 0 0.35rem', fontSize: '1.5rem', fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>
              Créer un compte
            </h1>
            <p style={{ margin: '0 0 2rem', fontSize: '0.875rem', color: '#888' }}>
              Rejoignez Wayne Enterprize
            </p>

            {/* Erreur / Succès */}
            {error && (
              <div style={{ background: '#fff0f0', border: '1px solid #fca5a5', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: '#dc2626', fontWeight: 500 }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: '#166534', fontWeight: 500 }}>
                {success}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

              {/* Nom + Prénom côte à côte */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelStyle}>Nom</label>
                  <input type="text" name="nom" value={formData.nom}
                    onChange={handleChange} placeholder="Dupont"
                    style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label style={labelStyle}>Prénom</label>
                  <input type="text" name="prenom" value={formData.prenom}
                    onChange={handleChange} placeholder="Jean"
                    style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Adresse email</label>
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="jean@email.com"
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Téléphone */}
              <div>
                <label style={labelStyle}>Téléphone <span style={{ color: '#bbb', fontWeight: 400 }}>(optionnel)</span></label>
                <input type="tel" name="number" value={formData.number}
                  onChange={handleChange} placeholder="+221 77 000 00 00"
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Code promo */}
              <div>
                <label style={labelStyle}>Code promotionnel <span style={{ color: '#bbb', fontWeight: 400 }}>(optionnel)</span></label>
                <input type="text" name="code" value={formData.code}
                  onChange={handleChange} placeholder="CODE2026"
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Mot de passe */}
              <div>
                <label style={labelStyle}>Mot de passe</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} name="password"
                    value={formData.password} onChange={handleChange} placeholder="••••••••"
                    style={{ ...inputStyle, paddingRight: '2.5rem' }}
                    onFocus={onFocus} onBlur={onBlur} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0, display: 'flex' }}>
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.72rem', color: '#aaa' }}>
                  Minimum 6 caractères
                </p>
              </div>

              {/* Confirmer mot de passe */}
              <div>
                <label style={labelStyle}>Confirmer le mot de passe</label>
                <div style={{ position: 'relative' }}>
                  <input type={showConfirm ? 'text' : 'password'} name="confirmPassword"
                    value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••"
                    style={{ ...inputStyle, paddingRight: '2.5rem' }}
                    onFocus={onFocus} onBlur={onBlur} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0, display: 'flex' }}>
                    {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* CGU */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" id="terms"
                  style={{ width: 15, height: 15, accentColor: '#22c55e', marginTop: 2, cursor: 'pointer', flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.5 }}>
                  J'accepte les{' '}
                  <a href="/conditions-generales" target="_blank" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>Conditions Générales</a>
                  {' '}et la{' '}
                  <a href="/privacy" target="_blank" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>Politique de Confidentialité</a>.
                </span>
              </label>

              {/* Admin */}
              <label style={{
                display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                padding: '0.6rem 0.8rem',
                background: '#f4fdf6', borderRadius: 8, border: '1px dashed #86efac',
              }}>
                <input type="checkbox" id="isAdminRegister"
                  checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}
                  style={{ width: 15, height: 15, accentColor: '#22c55e', cursor: 'pointer' }} />
                <span style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 500 }}>
                  Inscription en tant qu'administrateur
                </span>
              </label>

              {/* Bouton */}
              <button type="button" onClick={handleSubmitForm} disabled={loading}
                style={{
                  width: '100%', padding: '0.85rem',
                  backgroundColor: loading ? '#86efac' : '#111',
                  color: '#fff', border: 'none', borderRadius: 8,
                  fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.03em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.15s',
                  fontFamily: 'inherit',
                }}
                onMouseOver={e => !loading && ((e.currentTarget as HTMLElement).style.backgroundColor = '#22c55e')}
                onMouseOut={e => !loading && ((e.currentTarget as HTMLElement).style.backgroundColor = '#111')}
              >
                {loading ? 'Inscription...' : 'Créer un compte'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#888', margin: 0 }}>
                Déjà membre ?{' '}
                <a href="/connexion" style={{ color: '#22c55e', fontWeight: 600, textDecoration: 'none' }}>
                  Se connecter
                </a>
              </p>
            </div>
          </>
        ) : (
          /* ── Étape vérification ────────────────────────────────────────── */
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: 56, height: 56, backgroundColor: '#f0fdf4',
                borderRadius: '50%', margin: '0 auto 1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26,
              }}>✉️</div>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 800, color: '#111' }}>
                Vérifiez votre email
              </h2>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#888', lineHeight: 1.6 }}>
                Un code à 6 chiffres a été envoyé à{' '}
                <strong style={{ color: '#111' }}>{formData.email}</strong>
              </p>
            </div>

            {error && (
              <div style={{ background: '#fff0f0', border: '1px solid #fca5a5', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: '#dc2626', fontWeight: 500 }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: '#166534', fontWeight: 500 }}>
                {success}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ ...labelStyle, textAlign: 'center', display: 'block', marginBottom: '0.75rem' }}>
                  ENTREZ LE CODE DE VÉRIFICATION
                </label>
                <input
                  type="text" value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  maxLength={6} placeholder="000000"
                  style={{
                    ...inputStyle,
                    textAlign: 'center', fontSize: '2rem',
                    letterSpacing: '0.4em', fontWeight: 800,
                    padding: '1rem',
                  }}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              <button type="button" onClick={handleVerifyCode}
                disabled={loading || verificationCode.length !== 6}
                style={{
                  width: '100%', padding: '0.85rem',
                  backgroundColor: verificationCode.length === 6 ? '#111' : '#d1d5db',
                  color: '#fff', border: 'none', borderRadius: 8,
                  fontSize: '0.875rem', fontWeight: 700,
                  cursor: (loading || verificationCode.length !== 6) ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.15s',
                  fontFamily: 'inherit',
                }}
                onMouseOver={e => {
                  if (verificationCode.length === 6 && !loading)
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#22c55e';
                }}
                onMouseOut={e => {
                  if (verificationCode.length === 6 && !loading)
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#111';
                }}
              >
                {loading ? 'Vérification...' : 'Vérifier'}
              </button>

              <button type="button"
                onClick={() => { setStep('form'); setVerificationCode(''); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.8rem', color: '#888', fontWeight: 500,
                  textDecoration: 'underline', fontFamily: 'inherit',
                  padding: 0,
                }}>
                ← Retour au formulaire
              </button>
            </div>
          </>
        )}
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: '#ccc', letterSpacing: '0.05em' }}>
        © {new Date().getFullYear()} Wayne Enterprize. Tous droits réservés.
      </p>
    </div>
  );
};