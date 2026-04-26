export const LegalPage = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-amber-500 mb-2">Mentions Légales</h1>
          <div className="h-1 w-20 bg-amber-500"></div>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          {/* Responsable de publication */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Responsable de la publication</h2>
            <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20">
              <p><strong>Raison sociale :</strong> LUXE INTERNATIONAL</p>
              <p><strong>Forme juridique :</strong> SARL [À REMPLIR]</p>
              <p><strong>SIRET :</strong> [À REMPLIR]</p>
              <p><strong>SIREN :</strong> [À REMPLIR]</p>
              <p><strong>Capitale sociale :</strong> [À REMPLIR]</p>
              <p><strong>Adresse du siège social :</strong> [ADRESSE PHYSIQUE À REMPLIR]</p>
              <p><strong>Email :</strong> <a href="mailto:contact@luxe.com" className="text-amber-500 hover:underline">contact@luxe.com</a></p>
              <p><strong>Téléphone :</strong> [NUMÉRO DE TÉLÉPHONE À REMPLIR]</p>
              <p><strong>Responsable de la publication :</strong> [NOM PRÉNOM]</p>
            </div>
          </section>

          {/* Directeur de publication */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Directeur de la publication</h2>
            <p>
              Directeur de la publication : [NOM COMPLET]<br/>
              Téléphone : [NUMÉRO]<br/>
              Email : [EMAIL]
            </p>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Hébergement du site</h2>
            <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20">
              <p><strong>Services d'hébergement :</strong> [HÉBERGEUR À REMPLIR]</p>
              <p><strong>Adresse :</strong> [ADRESSE HÉBERGEUR À REMPLIR]</p>
              <p><strong>Téléphone :</strong> [TÉLÉPHONE HÉBERGEUR À REMPLIR]</p>
              <p><strong>Site web :</strong> [URL HÉBERGEUR À REMPLIR]</p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Propriété intellectuelle</h2>
            <p>
              Le contenu du site www.luxe.com (textes, images, vidéos, mises en page) est la propriété exclusive de LUXE INTERNATIONAL. 
              Toute reproduction, représentation, modification ou adaptation, en tout ou en partie, du contenu du site, sans l'autorisation préalable 
              et écrite du propriétaire du site, est interdite. La violation de ces restrictions constitue une contrefaçon passible des sanctions 
              pénales prévues par la loi.
            </p>
          </section>

          {/* Limitation de responsabilité */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitations de responsabilité</h2>
            <p>
              Les informations contenues dans ce site sont fournies à titre informatif. LUXE INTERNATIONAL ne peut être tenue responsable 
              des erreurs, omissions ou inexactitudes du contenu du site. De plus, LUXE INTERNATIONAL décline toute responsabilité concernant 
              l'accès ou l'utilisation du site ou l'impossibilité d'y accéder.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Droit applicable et juridiction compétente</h2>
            <p>
              Les présentes mentions légales sont régies par la loi française. En cas de litige, les juridictions compétentes seront 
              celles du ressort du tribunal de commerce [À COMPLÉTER].
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Gestion des cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer votre expérience. Consultez notre 
              <a href="/cookies" className="text-amber-500 hover:underline"> Politique de Cookies</a> pour plus d'informations.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Contact</h2>
            <p>
              Pour toute question concernant ces mentions légales, veuillez nous contacter à :<br/>
              Email : <a href="mailto:contact@luxe.com" className="text-amber-500 hover:underline">contact@luxe.com</a><br/>
              Formulaire de contact : <a href="/contact" className="text-amber-500 hover:underline">/contact</a>
            </p>
          </section>

          <div className="pt-8 border-t border-amber-500/20">
            <p className="text-sm text-slate-500">
              Dernière mise à jour : Mars 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
