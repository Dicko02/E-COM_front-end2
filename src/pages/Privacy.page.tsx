export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-amber-500 mb-2">Politique de Confidentialité</h1>
          <div className="h-1 w-20 bg-amber-500"></div>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          {/* Intro */}
          <section>
            <p>
              LUXE INTERNATIONAL s'engage à protéger votre vie privée. La présente Politique de Confidentialité explique comment 
              nous collectons, utilisons, divulguons et protégeons vos données personnelles.
            </p>
          </section>

          {/* 1. Responsable de traitement */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Responsable de traitement</h2>
            <p>
              <strong>LUXE INTERNATIONAL</strong> est responsable de traitement de vos données personnelles.
              Vous pouvez contacter notre Délégué à la Protection des Données à : <a href="mailto:dpo@luxe.com" className="text-amber-500 hover:underline">dpo@luxe.com</a>
            </p>
          </section>

          {/* 2. Données collectées */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Données personnelles collectées</h2>
            <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20 space-y-3">
              <p><strong>Lors de l'inscription :</strong></p>
              <ul className="list-disc list-inside">
                <li>Nom et prénom</li>
                <li>Email</li>
                <li>Mot de passe (hashé)</li>
                <li>Numéro de téléphone</li>
                <li>Adresses de livraison</li>
              </ul>

              <p className="mt-4"><strong>Lors d'une commande :</strong></p>
              <ul className="list-disc list-inside">
                <li>Adresse de facturation et livraison</li>
                <li>Historique des commandes</li>
                <li>Préférences d'achat</li>
              </ul>

              <p className="mt-4"><strong>Données techniques automatiques :</strong></p>
              <ul className="list-disc list-inside">
                <li>Adresse IP</li>
                <li>Type de navigateur</li>
                <li>Pages visitées</li>
                <li>Cookies et données de suivi</li>
              </ul>
            </div>
          </section>

          {/* 3. Base légale */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Base légale du traitement</h2>
            <p>
              Nous traitons vos données sur les bases légales suivantes selon le RGPD :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Contrat</strong> : Exécution de la relation contractuelle (commandes, comptes clients)</li>
              <li><strong>Consentement</strong> : Marketing par email, newsletters</li>
              <li><strong>Obligation légale</strong> : Conformité fiscale, comptable et légale</li>
              <li><strong>Intérêt légitime</strong> : Sécurité, prévention de la fraude</li>
            </ul>
          </section>

          {/* 4. Utilisation des données */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Utilisation de vos données</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Traiter vos commandes et effectuer les livraisons</li>
              <li>Gérer votre compte client</li>
              <li>Vous envoyer des confirmations de commande</li>
              <li>Améliorer notre site et nos services</li>
              <li>Vous informer des promotions (avec votre consentement)</li>
              <li>Prévenir la fraude et assurer la sécurité</li>
              <li>Respecter les obligations légales</li>
            </ul>
          </section>

          {/* 5. Partage des données */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Partage des données avec tierces parties</h2>
            <p className="mb-4">
              Vos données peuvent être partagées avec les entités suivantes qui agissent en tant que sous-traitants :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Prestataires de paiement</li>
              <li>Transporteurs et prestataires logistiques</li>
              <li>Fournisseurs hébergement et services informatiques</li>
              <li>Prestataires de marketing et analytics</li>
              <li>Autorités publiques (si obligation légale)</li>
            </ul>
          </section>

          {/* 6. Durée de conservation */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Durée de conservation des données</h2>
            <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20 space-y-2">
              <p><strong>Données de compte :</strong> Pendant la durée du compte, puis 2 ans post-suppression</p>
              <p><strong>Données de commande :</strong> 5 ans (obligations légales comptables)</p>
              <p><strong>Données marketing :</strong> Jusqu'à désabonnement</p>
              <p><strong>Logs et cookies :</strong> Maximal 13 mois</p>
            </div>
          </section>

          {/* 7. Vos droits */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Vos droits RGPD</h2>
            <p className="mb-4">Vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Droit d'accès :</strong> Demander l'accès à vos données</li>
              <li><strong>Droit de rectification :</strong> Corriger vos données inexactes</li>
              <li><strong>Droit à l'oubli :</strong> Demander la suppression de vos données</li>
              <li><strong>Droit à la limitation :</strong> Restreindre le traitement</li>
              <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> S'opposer à certains traitements</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:dpo@luxe.com" className="text-amber-500 hover:underline">dpo@luxe.com</a>
            </p>
          </section>

          {/* 8. Sécurité */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Sécurité des données</h2>
            <p>
              Vos données sont protégées par des mesures de sécurité techniques et organisationnelles, notamment :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Chiffrement HTTPS/SSL</li>
              <li>Authentification par token JWT</li>
              <li>Hachage des mots de passe (bcrypt)</li>
              <li>Serveurs sécurisés</li>
              <li>Contrôles d'accès</li>
            </ul>
          </section>

          {/* 9. Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Cookies et traçage</h2>
            <p>
              Pour plus d'informations sur les cookies, veuillez consulter notre <a href="/cookies" className="text-amber-500 hover:underline">Politique de Cookies</a>.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
            <p>
              Pour toute question relative à cette politique, contactez :<br/>
              Email : <a href="mailto:dpo@luxe.com" className="text-amber-500 hover:underline">dpo@luxe.com</a><br/>
              Adresse : [ADRESSE À REMPLIR]
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
