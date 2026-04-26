import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const ConnexionPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      if (user?.role == 'admin') {
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
            <Lock size={32} className="text-amber-500" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Connexion</h1>
          <p className="text-slate-400 font-light tracking-wide text-sm">Accédez à votre espace premium</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-sm mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-amber-500/10 rounded-sm shadow-2xl p-8 md:p-10 space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest" htmlFor='email'>
              Adresse Email
            </label>
            <div className="relative group">
              <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
              <input
                aria-label='email'
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-amber-500/20 rounded-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-slate-600 transition-all outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest" htmlFor='password'>
                Mot de passe
              </label>
              <a href="#" className="text-xs font-medium text-amber-500/70 hover:text-amber-500 transition-colors uppercase tracking-tighter">
                Oublié ?
              </a>
            </div>
            <div className="relative group">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
              <input
                aria-label='password'
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-amber-500/20 rounded-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-slate-600 transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-amber-500/30 bg-slate-800 accent-amber-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-slate-400">
              Se souvenir de moi
            </label>
          </div>

          {/* Admin Checkbox */}
          <div className="flex items-center pt-2 border-t border-amber-500/10">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-4 w-4 rounded border-amber-500/30 bg-slate-800 accent-amber-500"
            />
            <label htmlFor="isAdmin" className="ml-2 text-sm text-slate-400">
              Connexion administrateur
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="group relative w-full flex justify-center py-4 px-4 border-0 rounded-sm text-sm font-bold text-slate-900 bg-amber-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>

        {/* Divider */}
        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-amber-500/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-slate-500 font-light">OU CONTINUER AVEC</span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 rounded-sm bg-white/5 border border-white/10 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-all">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2 rounded-sm bg-white/5 border border-white/10 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-all">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeWidth="2"/>
            </svg>
            Apple
          </button>
        </div>

        {/* Register Link */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Nouveau ici ? 
          <a href="/inscription" className="font-semibold text-amber-500 hover:underline underline-offset-4 decoration-amber-500/30 transition-all ml-1">
            Créer un compte
          </a>
        </p>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="flex justify-center space-x-6 text-xs text-slate-600 uppercase tracking-widest font-medium">
            <a className="hover:text-amber-500 transition-colors" href="#">Aide</a>
            <a className="hover:text-amber-500 transition-colors" href="#">Confidentialité</a>
            <a className="hover:text-amber-500 transition-colors" href="#">CGU</a>
          </div>
        </footer>
      </div>
    </div>
  );
};
