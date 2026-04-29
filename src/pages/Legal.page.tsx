import React from 'react';

export const LegalPage = () => {
  const companyInfo = {
    name: "WAYNE ENTERPRIZE",
    legalForm: "SUARL", // Type de société courant au Sénégal pour un indépendant
    capital: "1.000.000 FCFA", // À ajuster selon tes statuts
    ninea: "[TON_NUMERO_NINEA]", // À remplir (9 chiffres + 1 lettre + 1 chiffre)
    rccm: "SN-DKR-2026-B-[NUMERO]", // À remplir (Format Registre du Commerce Dakar)
    address: "Dakar, Sénégal", 
    email: "contact@wayne-enterprize.com", // Optionnel, peut être ton mail perso
    phone: "+221 77 193 88 74",
    manager: "Wayne",
    tribunal: "Tribunal de Commerce Hors Classe de Dakar",
  };

  const hostInfo = {
    name: "Vercel Inc.", // Très probable vu ton stack React
    address: "440 N Barranca Ave #4133, Covina, CA 91723",
    phone: "+1 (559) 288-7060",
    url: "https://vercel.com"
  };

  return (
    <div className="min-h-screen text-white pt-32 pb-16" style={{ backgroundColor: '#050a05' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-green-500 mb-2 uppercase tracking-tight">Mentions Légales</h1>
          <div className="h-1 w-20 bg-green-500"></div>
          <p className="mt-4 text-slate-400 text-sm italic">
            Conformément à la Loi n° 2008-08 du 25 janvier 2008 sur les transactions électroniques au Sénégal.
          </p>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          
          {/* 1. Identification de l'Éditeur */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">1. Éditeur du site</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20">
              <p className="mb-1"><strong>Raison sociale :</strong> {companyInfo.name}</p>
              <p className="mb-1"><strong>Forme juridique :</strong> {companyInfo.legalForm} au capital de {companyInfo.capital}</p>
              <p className="mb-1"><strong>NINEA :</strong> {companyInfo.ninea}</p>
              <p className="mb-1"><strong>RCCM :</strong> {companyInfo.rccm}</p>
              <p className="mb-1"><strong>Siège social :</strong> {companyInfo.address}</p>
              <p className="mb-1"><strong>Contact :</strong> {companyInfo.phone} | <a href={`mailto:${companyInfo.email}`} className="text-green-500 hover:underline">{companyInfo.email}</a></p>
              <p><strong>Directeur de la publication :</strong> {companyInfo.manager}</p>
            </div>
          </section>

          {/* 2. Avertissement Spécifique au Trading SMC */}
          <section className="bg-green-500/10 p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-black text-white mb-3 uppercase">2. Avertissement sur les risques</h2>
            <p className="text-sm">
              Le trading sur marge comporte des risques élevés. Les contenus pédagogiques de <strong>Wayne Enterprize</strong> (formations SMC, livres, sessions live) 
              ne constituent en aucun cas des conseils financiers ou des incitations à l'investissement. 
              L'utilisateur est seul responsable de ses décisions sur les marchés financiers. Les performances passées ne garantissent pas les résultats futurs.
            </p>
          </section>

          {/* 3. Hébergement */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">3. Hébergement</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20">
              <p><strong>Hébergeur :</strong> {hostInfo.name}</p>
              <p><strong>Siège social :</strong> {hostInfo.address}</p>
              <p><strong>Site web :</strong> <a href={hostInfo.url} target="_blank" rel="noreferrer" className="text-green-500 hover:underline">{hostInfo.url}</a></p>
            </div>
          </section>

          {/* 4. Protection des données (Sénégal - CDP) */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">4. Données Personnelles</h2>
            <p>
              Les informations collectées lors de vos achats (via Wave ou Orange Money) sont traitées conformément à la 
              <strong> Loi n° 2008-12 du 25 janvier 2008</strong> relative à la protection des données personnelles au Sénégal. 
              Wayne Enterprize s'engage à ne jamais céder vos données à des tiers. Vous pouvez exercer votre droit de rectification 
              en contactant le support via WhatsApp au {companyInfo.phone}.
            </p>
          </section>

          {/* 5. Propriété Intellectuelle */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">5. Propriété Intellectuelle</h2>
            <p>
              L'intégralité du contenu du site (méthodes SMC, vidéos de mentorat, ebooks) est protégée par le droit d'auteur. 
              Toute reproduction, même partielle, ou partage d'accès à l'espace membre sans autorisation préalable de 
              <strong> {companyInfo.name}</strong> est strictement interdit et pourra faire l'objet de poursuites judiciaires à Dakar.
            </p>
          </section>

          {/* 6. Juridiction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">6. Droit Applicable</h2>
            <p>
              Ces mentions sont régies par le droit sénégalais. Tout litige relatif à l'utilisation du site sera de la compétence 
              exclusive du <strong>{companyInfo.tribunal}</strong>.
            </p>
          </section>

          <div className="pt-12 border-t border-green-500/10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
              © {new Date().getFullYear()} {companyInfo.name} — ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};