import { ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center animate-fadeInUp">
        {/* Numéro 404 */}
        <p className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-amber-500/60 select-none">
          404
        </p>

        {/* Séparateur */}
        <div className="flex items-center justify-center gap-4 mb-8 -mt-4">
          <div className="h-px w-16 bg-amber-500/40" />
          <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.3em]">Page Introuvable</span>
          <div className="h-px w-16 bg-amber-500/40" />
        </div>

        <p className="text-slate-400 text-lg font-light mb-12 max-w-md mx-auto leading-relaxed">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-white text-black font-bold px-8 py-4 rounded-sm uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105"
          >
            <Home size={18} />
            Retour à l'accueil
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border-2 border-amber-500/40 hover:border-amber-500 text-amber-500 font-bold px-8 py-4 rounded-sm uppercase tracking-widest text-sm transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
};
