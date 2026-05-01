export const PrivacyPage = () => {
  const companyInfo = {
    name: "WAYNE ENTERPRIZE",
    email: "contact@wayne-enterprize.com",
    dpo: "dpo@wayne-enterprize.com",
    address: "Dakar, Sénégal"
  };

  return (
    <div className="min-h-screen text-white pt-32 pb-16" style={{ backgroundColor: '#050a05' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-green-500 mb-2 uppercase tracking-tight">Politique de Confidentialité</h1>
          <div className="h-1 w-20 bg-green-500"></div>
          <p className="mt-4 text-slate-400 text-sm italic">
            Protection de vos données personnelles conformément à la loi sénégalaise n° 2008-12
          </p>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          
          {/* Intro */}
          <section>
            <p>
              <strong>{companyInfo.name}</strong> s'engage à protéger votre vie privée. La présente Politique de Confidentialité explique comment 
              nous collectons, utilisons, divulguons et protégeons vos données personnelles dans le cadre de nos formations trading SMC.
            </p>
          </section>

          {/* 1. Responsable de traitement */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">1. Responsable de traitement</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20">
              <p><strong>{companyInfo.name}</strong> est responsable du traitement de vos données personnelles.</p>
              <p className="mt-2">📧 Contact DPO (Délégué à la Protection des Données) : <a href={`mailto:${companyInfo.dpo}`} className="text-green-500 hover:underline">{companyInfo.dpo}</a></p>
              <p>📍 Adresse : {companyInfo.address}</p>
            </div>
          </section>

          {/* 2. Données collectées */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">2. Données personnelles collectées</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20 space-y-4">
              <div>
                <p className="font-bold text-green-400 mb-2">📝 Lors de l'inscription :</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Mot de passe (hashé avec bcrypt)</li>
                  <li>Numéro de téléphone</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-green-400 mb-2">💳 Lors d'un achat de formation :</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Numéro Wave ou Orange Money (pour paiement)</li>
                  <li>Historique des formations achetées</li>
                  <li>Date et montant des transactions</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-green-400 mb-2">🖥️ Données techniques automatiques :</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Adresse IP</li>
                  <li>Type de navigateur et système d'exploitation</li>
                  <li>Pages visitées et durée de visite</li>
                  <li>Cookies d'authentification (JWT)</li>
                  <li>Logs de connexion (sécurité)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Base légale */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">3. Base légale du traitement</h2>
            <p className="mb-3">
              Nous traitons vos données sur les bases légales suivantes conformément à la <strong>Loi n° 2008-12 du 25 janvier 2008</strong> :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Contrat :</strong> Exécution de la relation contractuelle (accès formations, support client)</li>
              <li><strong>Consentement :</strong> Newsletter, communications marketing (avec opt-in)</li>
              <li><strong>Obligation légale :</strong> Conformité fiscale, comptable et légale (facturation, archivage)</li>
              <li><strong>Intérêt légitime :</strong> Sécurité du site, prévention de la fraude, amélioration des services</li>
            </ul>
          </section>

          {/* 4. Utilisation des données */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">4. Utilisation de vos données</h2>
            <p className="mb-3">Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>✅ Créer et gérer votre compte client</li>
              <li>✅ Traiter vos achats de formations</li>
              <li>✅ Vous donner accès à votre espace membre</li>
              <li>✅ Vous envoyer les confirmations de commande par email</li>
              <li>✅ Assurer le support technique et pédagogique</li>
              <li>✅ Améliorer nos formations et notre plateforme</li>
              <li>✅ Prévenir la fraude et assurer la sécurité</li>
              <li>✅ Respecter nos obligations légales (facturation, comptabilité)</li>
              <li>📧 Vous informer des nouvelles formations (avec votre consentement)</li>
            </ul>
          </section>

          {/* 5. Partage des données */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">5. Partage des données avec tiers</h2>
            <p className="mb-4">
              Vos données peuvent être partagées avec les prestataires suivants qui agissent en tant que <strong>sous-traitants</strong> :
            </p>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20 space-y-3">
              <div>
                <p className="font-bold text-green-400">💳 Prestataires de paiement</p>
                <p className="text-sm">Wave, Orange Money (traitement sécurisé des paiements)</p>
              </div>
              <div>
                <p className="font-bold text-green-400">🖥️ Hébergement et infrastructure</p>
                <p className="text-sm">Vercel (front-end), Render (back-end), MongoDB Atlas (base de données), Cloudinary (images)</p>
              </div>
              <div>
                <p className="font-bold text-green-400">📧 Services email</p>
                <p className="text-sm">Gmail SMTP (envoi des confirmations de commande)</p>
              </div>
              <div>
                <p className="font-bold text-green-400">⚖️ Autorités publiques</p>
                <p className="text-sm">Uniquement en cas d'obligation légale (réquisition judiciaire, contrôle fiscal)</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-green-400">
              ✅ Nous ne vendons JAMAIS vos données à des tiers à des fins commerciales.
            </p>
          </section>

          {/* 6. Durée de conservation */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">6. Durée de conservation des données</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20 space-y-2">
              <p><strong>Données de compte :</strong> Pendant la durée de votre compte + 2 ans après suppression</p>
              <p><strong>Données de commande :</strong> 5 ans (obligations comptables et fiscales)</p>
              <p><strong>Données marketing :</strong> Jusqu'à désabonnement de la newsletter</p>
              <p><strong>Logs et cookies :</strong> Maximum 13 mois</p>
              <p><strong>Données de paiement :</strong> Non stockées (traitées par Wave/Orange Money)</p>
            </div>
          </section>

          {/* 7. Vos droits */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">7. Vos droits sur vos données</h2>
            <p className="mb-4">Conformément à la loi sénégalaise, vous disposez des droits suivants :</p>
            <div className="space-y-3">
              <div className="bg-green-500/5 p-4 rounded-sm border-l-4 border-green-500">
                <p className="font-bold text-green-400">🔍 Droit d'accès</p>
                <p className="text-sm">Demander l'accès à toutes vos données personnelles</p>
              </div>
              <div className="bg-green-500/5 p-4 rounded-sm border-l-4 border-green-500">
                <p className="font-bold text-green-400">✏️ Droit de rectification</p>
                <p className="text-sm">Corriger vos données inexactes ou incomplètes</p>
              </div>
              <div className="bg-green-500/5 p-4 rounded-sm border-l-4 border-green-500">
                <p className="font-bold text-green-400">🗑️ Droit à l'oubli</p>
                <p className="text-sm">Demander la suppression de vos données (sauf obligations légales)</p>
              </div>
              <div className="bg-green-500/5 p-4 rounded-sm border-l-4 border-green-500">
                <p className="font-bold text-green-400">⏸️ Droit à la limitation</p>
                <p className="text-sm">Restreindre le traitement de vos données</p>
              </div>
              <div className="bg-green-500/5 p-4 rounded-sm border-l-4 border-green-500">
                <p className="font-bold text-green-400">📦 Droit à la portabilité</p>
                <p className="text-sm">Recevoir vos données dans un format structuré (JSON, CSV)</p>
              </div>
              <div className="bg-green-500/5 p-4 rounded-sm border-l-4 border-green-500">
                <p className="font-bold text-green-400">🚫 Droit d'opposition</p>
                <p className="text-sm">S'opposer au traitement de vos données (marketing, profilage)</p>
              </div>
            </div>
            <p className="mt-6 bg-green-500/10 p-4 rounded-sm border border-green-500/20">
              <strong>Pour exercer ces droits :</strong> Envoyez un email à <a href={`mailto:${companyInfo.dpo}`} className="text-green-500 hover:underline">{companyInfo.dpo}</a> avec une copie de votre pièce d'identité.
              <br/><span className="text-sm text-slate-400">Délai de réponse : 30 jours maximum</span>
            </p>
          </section>

          {/* 8. Sécurité */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">8. Sécurité des données</h2>
            <p className="mb-4">
              Vos données sont protégées par des mesures de sécurité techniques et organisationnelles robustes :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/5 p-4 rounded-sm border border-green-500/20">
                <p className="font-bold text-green-400 mb-2">🔒 Chiffrement</p>
                <ul className="text-sm space-y-1">
                  <li>✅ HTTPS/SSL sur tout le site</li>
                  <li>✅ Mots de passe hashés (bcrypt)</li>
                  <li>✅ Tokens JWT sécurisés</li>
                </ul>
              </div>
              <div className="bg-green-500/5 p-4 rounded-sm border border-green-500/20">
                <p className="font-bold text-green-400 mb-2">🛡️ Protection serveurs</p>
                <ul className="text-sm space-y-1">
                  <li>✅ Serveurs sécurisés (Render, Vercel)</li>
                  <li>✅ Pare-feu et anti-DDoS</li>
                  <li>✅ Sauvegardes automatiques</li>
                </ul>
              </div>
              <div className="bg-green-500/5 p-4 rounded-sm border border-green-500/20">
                <p className="font-bold text-green-400 mb-2">👤 Contrôles d'accès</p>
                <ul className="text-sm space-y-1">
                  <li>✅ Authentification obligatoire</li>
                  <li>✅ Rôles admin/client séparés</li>
                  <li>✅ Logs de connexion</li>
                </ul>
              </div>
              <div className="bg-green-500/5 p-4 rounded-sm border border-green-500/20">
                <p className="font-bold text-green-400 mb-2">🔍 Surveillance</p>
                <ul className="text-sm space-y-1">
                  <li>✅ Détection des tentatives de fraude</li>
                  <li>✅ Rate limiting (anti-spam)</li>
                  <li>✅ Monitoring 24/7</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 9. Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">9. Cookies et traçage</h2>
            <p className="mb-3">
              Nous utilisons des cookies essentiels pour le fonctionnement du site :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>JWT (authentification)</strong> — Cookie essentiel pour votre connexion</li>
              <li><strong>localStorage (panier)</strong> — Sauvegarde locale de votre panier</li>
              <li><strong>localStorage (préférences)</strong> — Thème dashboard, langue</li>
            </ul>
            <p className="mt-4">
              Pour plus d'informations, consultez notre <a href="/cookies" className="text-green-500 hover:underline font-bold">Politique de Cookies</a>.
            </p>
          </section>

          {/* 10. Transferts internationaux */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">10. Transferts de données hors Sénégal</h2>
            <p className="mb-3">
              Certains de nos prestataires sont situés hors du Sénégal (USA, Europe). Ces transferts sont encadrés par :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>✅ Clauses contractuelles types (Standard Contractual Clauses)</li>
              <li>✅ Certifications de sécurité (ISO 27001, SOC 2)</li>
              <li>✅ Garanties de protection équivalentes à la loi sénégalaise</li>
            </ul>
          </section>

          {/* 11. Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">11. Contact et réclamations</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20">
              <p className="mb-3"><strong>Pour toute question relative à cette politique :</strong></p>
              <p>📧 Email DPO : <a href={`mailto:${companyInfo.dpo}`} className="text-green-500 hover:underline">{companyInfo.dpo}</a></p>
              <p>📧 Email général : <a href={`mailto:${companyInfo.email}`} className="text-green-500 hover:underline">{companyInfo.email}</a></p>
              <p>📍 Adresse : {companyInfo.address}</p>
              <p className="mt-4 text-sm text-slate-400">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la 
                <strong> Commission de Protection des Données Personnelles (CDP)</strong> du Sénégal.
              </p>
            </div>
          </section>

          <div className="pt-12 border-t border-green-500/10">
            <p className="text-sm text-slate-500 mb-2">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 text-center">
              © {new Date().getFullYear()} {companyInfo.name} — ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
