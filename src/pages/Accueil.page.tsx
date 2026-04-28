import { useState, useEffect } from 'react';
import { produitApi } from '../api/Produit/produit.api';
import { categorieApi } from '../api/Categorie/categorie.api';
import { ProductCard } from '../components/Produit/ProductCard';
import { ArrowRight, TrendingUp, Shield, Users, Phone } from 'lucide-react';

// Pourquoi Wayne Enterprize
const WHY = [
  {
    icon: Shield,
    title: 'Stratégie SMC Prouvée',
    desc: 'Smart Money Concept — la méthode des institutionnels, enseignée avec transparence totale.',
  },
  {
    icon: Users,
    title: 'Accompagnement Réel',
    desc: 'Sessions live, bilans hebdomadaires, suivi personnalisé. Pas de théorie vide.',
  },
  {
    icon: TrendingUp,
    title: 'Résultats Mesurables',
    desc: 'Chaque module a un objectif clair. Vous progressez étape par étape, sans vous perdre.',
  },
];

export const AccueilPage = () => {
  const [formations, setFormations] = useState<any[]>([]);
  const [newProducts, setNewProducts] = useState<any[]>([]);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Charger les catégories pour trouver l'ID "Formation"
    const loadData = async () => {
      try {
        const [cats, newProds] = await Promise.all([
          categorieApi.getAll(),
          produitApi.getNew(8),
        ]);

        // Trouver la catégorie Formation
        const formationCat = cats.find((c: any) =>
          c.name.toLowerCase().includes('formation') ||
          c.name.toLowerCase().includes('coaching')
        );

        if (formationCat) {
          const data = await produitApi.getByCategory(formationCat._id);
          const list = Array.isArray(data) ? data : (data?.products || []);
          setFormations(list);
        }

        setNewProducts(newProds.slice(0, 8));
      } catch (error) {
        console.error('Erreur chargement:', error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#050a05' }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        <img
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80&auto=format&fit=crop"
          alt="Trading"
          onLoad={() => setHeroLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${heroLoaded ? 'opacity-15' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 text-center">
          {/* Badge live */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-bold uppercase tracking-[0.25em]">
              Wayne Mentorship — Inscriptions ouvertes
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight leading-none">
            Trade Smarter.<br />
            <span className="text-green-400" style={{ textShadow: '0 0 30px rgba(34,197,94,0.4)' }}>
              Not Harder.
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl mb-3 max-w-2xl mx-auto font-light leading-relaxed">
            Real Experience. Proven SMC Strategy. Total Transparency.
          </p>
          <p className="text-slate-400 text-sm mb-10 max-w-xl mx-auto leading-relaxed">
            Rejoignez le programme de mentorat qui transforme les débutants en traders disciplinés et rentables.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#formations"
              className="bg-green-500 hover:bg-green-400 text-black font-black px-10 py-4 rounded-sm transition-all hover:scale-105 tracking-widest uppercase text-sm inline-flex items-center justify-center gap-2"
            >
              Voir les Formations
              <ArrowRight size={16} />
            </a>
            <a
              href="https://wa.me/221771938874"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-green-500/40 hover:border-green-400 text-green-400 hover:text-white font-bold px-10 py-4 rounded-sm transition-all tracking-widest uppercase text-sm inline-flex items-center justify-center gap-2"
            >
              <Phone size={15} />
              Contacter Wayne
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10 sm:gap-16 mt-16 flex-wrap">
            {[
              { value: '3',     label: ' Modules ' },
              { value: 'SMC',   label: ' Stratégie ' },
              { value: '100%',  label: ' Transparence ' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-green-400">{value}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI WAYNE ENTERPRIZE ─────────────────────────────────── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">Notre différence</p>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">
            Pourquoi choisir ce mentorat ?
          </h2>
          <div className="h-0.5 w-16 bg-green-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-sm border border-green-500/15 hover:border-green-500/40 transition-all duration-300 group"
              style={{ backgroundColor: 'rgba(13,26,13,0.6)' }}
            >
              <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-sm flex items-center justify-center mb-5 group-hover:bg-green-500/20 transition-colors">
                <Icon size={22} className="text-green-400" />
              </div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Citation */}
        <div className="mt-12 p-8 rounded-sm border border-green-500/20 text-center" style={{ backgroundColor: 'rgba(34,197,94,0.03)' }}>
          <p className="text-slate-300 text-lg font-light italic leading-relaxed max-w-3xl mx-auto">
            "Le trading n'est pas un jeu de hasard, c'est une discipline qui demande une méthode.
            Avec ce programme structuré, vous évitez les erreurs coûteuses des débutants et adoptez
            directement la psychologie des{' '}
            <span className="text-green-400 font-bold not-italic">gros bras du marché</span>."
          </p>
          <p className="text-green-400 font-bold text-sm uppercase tracking-widest mt-4">— Wayne, Fondateur</p>
        </div>
      </section>

      {/* ── FORMATIONS (depuis l'API) ──────────────────────────────────── */}
      <section id="formations" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">Wayne Mentorship</p>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">Nos Formations</h2>
          <div className="h-0.5 w-16 bg-green-500 mx-auto mt-4" />
          <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto">
            Trois modules progressifs pour vous emmener de zéro à trader rentable.
          </p>
        </div>

        {formations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((product: any) => (
              <div key={product._id} className="animate-fadeInUp">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* Affichage de l'image des formations en attendant */
          <div className="text-center">
            <img
              src="/formations.jpeg"
              alt="Wayne Mentorship — Bronze, Gold, Platinum"
              className="max-w-[300px] mx-auto rounded-sm border border-green-500/20 w-full"
            />
            <p className="text-slate-500 text-sm mt-6">
              Les formations seront disponibles très bientôt.{' '}
              <a href="https://wa.me/221771938874" className="text-green-400 hover:text-green-300">
                Contactez Wayne directement →
              </a>
            </p>
          </div>
        )}

        <p className="text-center text-slate-600 text-xs mt-8">
          📞 Pour toute question :{' '}
          <a href="https://wa.me/221771938874" className="text-green-400 hover:text-green-300">
            WhatsApp 77 193 88 74
          </a>
        </p>
      </section>

      {/* ── À PROPOS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-green-500/10" style={{ backgroundColor: 'rgba(13,26,13,0.4)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="portrait-image-container">
              <img
                src="/photo-wayne.jpg"
                alt="Wayne"
                className="product-image"
              />
            </div>
            <div className="absolute bottom-6 right-1/2 translate-x-1/2 md:translate-x-0 md:-right-4 md:-bottom-4 bg-green-500 text-black px-4 py-2 rounded-sm font-black text-xs uppercase whitespace-nowrap">
              Fondateur & Mentor
            </div>
          </div>

          {/* Texte */}
          <div>
            <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">À propos</p>
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-6">
              Wayne Enterprize
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Wayne Enterprize est une plateforme de mentorat en trading fondée sur une seule conviction :{' '}
              <span className="text-green-400 font-semibold">
                la transparence totale est la seule voie vers la rentabilité durable.
              </span>
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 text-sm">
              Basée sur la stratégie SMC (Smart Money Concept) — la méthode des institutionnels —
              notre approche vous donne les outils réels pour lire le marché comme les "gros bras"
              et prendre des décisions basées sur la logique, pas sur les émotions.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { v: 'SMC',   l: 'Stratégie' },
                { v: '3',     l: 'Modules' },
                { v: 'Live',  l: 'Sessions' },
                { v: '100%',  l: 'Transparence' },
              ].map(({ v, l }) => (
                <div key={l} className="p-3 rounded-sm border border-green-500/15 text-center" style={{ backgroundColor: 'rgba(34,197,94,0.04)' }}>
                  <p className="text-xl font-black text-green-400">{v}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{l}</p>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/221771938874"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-black px-8 py-3 rounded-sm uppercase tracking-widest text-sm transition-all"
            >
              Prêt à commencer ?
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── AUTRES PRODUITS ───────────────────────────────────────────── */}
      {newProducts.length > 0 && (
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">Catalogue</p>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase">Nos Ressources</h2>
            </div>
            <a href="/produits" className="hidden sm:flex items-center gap-2 text-green-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
              Tout voir <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {newProducts.map((p: any) => (
              <div key={p._id} className="animate-fadeInUp">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center" style={{ background: 'linear-gradient(to bottom, rgba(34,197,94,0.05), transparent)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">Prêt à passer au niveau supérieur ?</p>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-6">
            Rejoignez Wayne Enterprize
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Contactez Wayne directement sur WhatsApp pour choisir votre module et commencer votre transformation.
          </p>
          <a
            href="https://wa.me/221771938874"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black font-black px-10 py-4 rounded-sm uppercase tracking-widest text-sm transition-all hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Démarrer — 77 193 88 74
          </a>
        </div>
      </section>
    </div>
  );
};
