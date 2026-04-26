import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, Gift, Diamond } from 'lucide-react';

export const InscriptionPage = () => {
  const { register, verifyCode } = useAuth();
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
    code: '',
    role: ''
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitForm = async () => {
    setError('');
    setSuccess('');

    if (!formData.nom || !formData.prenom || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password,
        number: formData.number,
        code: formData.code,
        role: isAdmin ? 'admin' : 'client'
      };

      await register(userData);
      setSuccess('Un code de vérification a été envoyé à votre email !');
      setStep('verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    setLoading(true);

    try {
      await verifyCode(formData.email, verificationCode);
      setSuccess('Inscription validée ! Redirection...');
      
      setTimeout(() => {
        window.location.href = isAdmin ? '/admin/dashboard' : '/';
      }, 1500);
    } catch {
      setError('Code incorrect. Votre compte a été supprimé. Veuillez vous réinscrire.');
      setTimeout(() => {
        setStep('form');
        setVerificationCode('');
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-amber-500/10 border border-amber-500/30 mb-6">
            <Diamond size={32} className="text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2 uppercase">Rejoignez l'Excellence</h1>
          <p className="text-amber-500/60 text-sm uppercase tracking-widest font-medium">Créer votre compte privilège</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-sm mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-sm mb-6 text-sm font-medium">
            {success}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-amber-500/10 rounded-sm shadow-2xl p-8 md:p-10">
          {step === 'form' ? (
            // Form Step
            <form className="space-y-6">
              {/* Nom */}
              <div>
                <label className="block text-xs font-semibold text-amber-500/70 uppercase tracking-wider mb-2">Nom complet</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/40" />
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="w-full bg-slate-800/50 border border-amber-500/20 rounded-sm py-3 pl-10 pr-4 text-white placeholder-amber-500/20 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Prenom */}
              <div>
                <label className="block text-xs font-semibold text-amber-500/70 uppercase tracking-wider mb-2">Prénom</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/40" />
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    className="w-full bg-slate-800/50 border border-amber-500/20 rounded-sm py-3 pl-10 pr-4 text-white placeholder-amber-500/20 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-amber-500/70 uppercase tracking-wider mb-2">Adresse e-mail</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@excellence.com"
                    className="w-full bg-slate-800/50 border border-amber-500/20 rounded-sm py-3 pl-10 pr-4 text-white placeholder-amber-500/20 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-xs font-semibold text-amber-500/70 uppercase tracking-wider mb-2">Téléphone</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/40" />
                  <input
                    type="tel"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="+221 XX XXX XX XX"
                    className="w-full bg-slate-800/50 border border-amber-500/20 rounded-sm py-3 pl-10 pr-4 text-white placeholder-amber-500/20 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Code Promo */}
              <div>
                <label className="block text-xs font-semibold text-amber-500/70 uppercase tracking-wider mb-2">Code promotionnel (optionnel)</label>
                <div className="relative">
                  <Gift size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/40" />
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Code promo"
                    className="w-full bg-slate-800/50 border border-amber-500/20 rounded-sm py-3 pl-10 pr-4 text-white placeholder-amber-500/20 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-amber-500/70 uppercase tracking-wider mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/40" />
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-800/50 border border-amber-500/20 rounded-sm py-3 pl-10 pr-4 text-white placeholder-amber-500/20 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
                <div className="mt-2 flex gap-1">
                  <div className="h-1 flex-1 rounded-full bg-amber-500"></div>
                  <div className="h-1 flex-1 rounded-full bg-amber-500/50"></div>
                  <div className="h-1 flex-1 rounded-full bg-amber-500/20"></div>
                  <div className="h-1 flex-1 rounded-full bg-amber-500/20"></div>
                </div>
                <p className="text-xs text-amber-500/40 mt-2 italic">Utilisez au moins 8 caractères avec des chiffres.</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold text-amber-500/70 uppercase tracking-wider mb-2">Confirmer mot de passe</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/40" />
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-800/50 border border-amber-500/20 rounded-sm py-3 pl-10 pr-4 text-white placeholder-amber-500/20 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-2 border-t border-amber-500/10">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-amber-500/30 bg-slate-800 accent-amber-500 mt-0.5"
                />
                <label htmlFor="terms" className="text-xs text-amber-500/60">
                  J\'accepte les <a className="text-amber-500 hover:underline font-medium" href="/conditions-generales" target="_blank">Conditions Générales</a> et la <a className="text-amber-500 hover:underline font-medium" href="/privacy" target="_blank">Politique de Confidentialité</a>.
                </label>
              </div>

              {/* Admin Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isAdminRegister"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="h-4 w-4 rounded border-amber-500/30 bg-slate-800 accent-amber-500"
                />
                <label htmlFor="isAdminRegister" className="text-sm text-slate-400">
                  Inscription en tant qu\'administrateur
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmitForm}
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-white text-slate-900 font-bold py-4 rounded-sm shadow-lg shadow-amber-500/30 transition-all transform active:scale-95 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Inscription en cours...' : 'Créer un compte'}
              </button>
            </form>
          ) : (
            // Verify Step
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-slate-300">
                  Un code à 6 chiffres a été envoyé à <strong className="text-amber-500">{formData.email}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-500/70 uppercase tracking-wider mb-4 text-center">
                  Entrez le code de vérification
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  placeholder="000000"
                  className="w-full px-4 py-4 bg-slate-800/50 border border-amber-500/20 rounded-sm text-center text-3xl tracking-widest font-bold text-white placeholder-slate-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <button
                onClick={handleVerifyCode}
                disabled={loading || verificationCode.length !== 6}
                className="w-full bg-amber-500 hover:bg-white text-slate-900 font-bold py-4 rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
              >
                {loading ? 'Vérification...' : 'Vérifier'}
              </button>

              <button
                onClick={() => {
                  setStep('form');
                  setVerificationCode('');
                }}
                className="w-full text-amber-500 hover:text-white text-sm uppercase tracking-widest font-semibold transition-colors"
              >
                Retour au formulaire
              </button>
            </div>
          )}

          {step === 'form' && (
            <div className="mt-8 pt-6 border-t border-amber-500/10 flex flex-col items-center space-y-4">
              <p className="text-amber-500/60 text-sm">
                Déjà membre ? 
                <a className="text-amber-500 font-semibold hover:text-white transition-colors ml-1" href="/connexion">Connectez-vous</a>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-amber-500/20 text-xs uppercase tracking-widest font-medium">
             2024 L'EXCELLENCE E-COMMERCE. TOUS DROITS RÉSERVÉS.
          </p>
        </footer>
      </div>
    </div>
  );
};
