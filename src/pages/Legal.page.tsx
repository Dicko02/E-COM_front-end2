
export const LegalPage = () => {
  const companyInfo = {
    name: "WAYNE ENTERPRIZE",
    legalForm: "SUARL", // Type de société courant au Sénégal pour un indépendant
    capital: "1.000.000 FCFA", // À ajuster selon tes statuts
    ninea: "[NUMERO_NINEA]", // À remplir (9 chiffres + 1 lettre + 1 chiffre)
    rccm: "SN-DKR-2026-B-[NUMERO]", // À remplir (Format Registre du Commerce Dakar)
    address: "Dakar, Sénégal", 
    email: "tradewithwayne1@gmail.com",
    phone: "+221 77 193 88 74",
    manager: "Wayne",
    tribunal: "Tribunal de Commerce Hors Classe de Dakar",
  };

  const hostInfo = {
    frontend: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723",
      url: "https://vercel.com"
    },
    backend: {
      name: "Render Services Inc.",
      address: "525 Brannan Street, San Francisco, CA 94107, USA",
      url: "https://render.com"
    },
    database: {
      name: "MongoDB Inc. (MongoDB Atlas)",
      address: "1633 Broadway, 38th Floor, New York, NY 10019, USA",
      url: "https://www.mongodb.com"
    },
    images: {
      name: "Cloudinary Ltd.",
      address: "3400 Central Expressway, Suite 110, Santa Clara, CA 95051, USA",
      url: "https://cloudinary.com"
    }
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
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">3. Hébergement et Infrastructure</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20 space-y-4">
              <div>
                <p className="font-bold text-green-400 mb-1">Interface Web (Front-end)</p>
                <p><strong>Hébergeur :</strong> {hostInfo.frontend.name}</p>
                <p><strong>Adresse :</strong> {hostInfo.frontend.address}</p>
                <p><strong>Site :</strong> <a href={hostInfo.frontend.url} target="_blank" rel="noreferrer" className="text-green-500 hover:underline">{hostInfo.frontend.url}</a></p>
              </div>
              
              <div>
                <p className="font-bold text-green-400 mb-1">Serveur API (Back-end)</p>
                <p><strong>Hébergeur :</strong> {hostInfo.backend.name}</p>
                <p><strong>Adresse :</strong> {hostInfo.backend.address}</p>
                <p><strong>Site :</strong> <a href={hostInfo.backend.url} target="_blank" rel="noreferrer" className="text-green-500 hover:underline">{hostInfo.backend.url}</a></p>
              </div>

              <div>
                <p className="font-bold text-green-400 mb-1">Base de données</p>
                <p><strong>Hébergeur :</strong> {hostInfo.database.name}</p>
                <p><strong>Adresse :</strong> {hostInfo.database.address}</p>
                <p><strong>Site :</strong> <a href={hostInfo.database.url} target="_blank" rel="noreferrer" className="text-green-500 hover:underline">{hostInfo.database.url}</a></p>
              </div>

              <div>
                <p className="font-bold text-green-400 mb-1">Stockage Images</p>
                <p><strong>Hébergeur :</strong> {hostInfo.images.name}</p>
                <p><strong>Adresse :</strong> {hostInfo.images.address}</p>
                <p><strong>Site :</strong> <a href={hostInfo.images.url} target="_blank" rel="noreferrer" className="text-green-500 hover:underline">{hostInfo.images.url}</a></p>
              </div>
            </div>
          </section>

          {/* 4. Protection des données (Sénégal - CDP) */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">4. Données Personnelles</h2>
            <p className="mb-4">
              Les informations collectées lors de vos achats de formations (via Wave ou Orange Money) sont traitées conformément à la 
              <strong> Loi n° 2008-12 du 25 janvier 2008</strong> relative à la protection des données personnelles au Sénégal.
            </p>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20">
              <p className="mb-2"><strong>Données collectées :</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Nom, prénom, email, numéro de téléphone</li>
                <li>Numéro Wave/Orange Money (pour paiement)</li>
                <li>Historique des formations achetées</li>
                <li>Adresse IP et logs de connexion (sécurité)</li>
              </ul>
              <p className="mt-4"><strong>Utilisation :</strong> Gestion de votre compte, accès aux formations, support client, facturation</p>
              <p className="mt-2"><strong>Conservation :</strong> Durée de votre compte + 5 ans (obligations comptables)</p>
              <p className="mt-2"><strong>Vos droits :</strong> Accès, rectification, suppression de vos données</p>
            </div>
            <p className="mt-4">
              Wayne Enterprize s'engage à ne jamais céder vos données à des tiers à des fins commerciales. 
              Vous pouvez exercer vos droits en contactant : <a href={`mailto:${companyInfo.email}`} className="text-green-500 hover:underline">{companyInfo.email}</a>
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