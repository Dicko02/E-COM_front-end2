export const TermsPage = () => {
  const companyInfo = {
    name: "WAYNE ENTERPRIZE",
    email: "tradewithwayne1@gmail.com",
    phone: "+221 77 193 88 74",
    address: "Dakar, Sénégal"
  };

  return (
    <div className="min-h-screen text-white pt-32 pb-16" style={{ backgroundColor: '#050a05' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 animate-fadeInDown">
          <h1 className="text-5xl font-black text-green-500 mb-2 uppercase tracking-tight">Conditions Générales de Vente</h1>
          <div className="h-1 w-20 bg-green-500"></div>
          <p className="mt-4 text-slate-400 text-sm italic">
            Applicables aux formations trading SMC (Smart Money Concept)
          </p>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed animate-fadeInUp delay-100">
          
          {/* Article 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 1 - Objet</h2>
            <p>
              Les présentes conditions générales de vente (CGV) définissent les droits et obligations de <strong>{companyInfo.name}</strong> et de ses clients 
              dans le cadre de la vente en ligne de <strong>formations numériques au trading SMC (Smart Money Concept)</strong>.
            </p>
            <p className="mt-3">
              Les formations proposées sont des produits numériques (vidéos, PDF, accès plateforme) accessibles via un espace membre en ligne.
            </p>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 2 - Accès au site</h2>
            <p>
              L'accès au site web <strong>wayne-enterprize.com</strong> est gratuit. {companyInfo.name} se réserve le droit de modifier 
              le contenu du site à tout moment, sans préavis. L'accès aux formations achetées reste garanti pendant toute la durée de validité.
            </p>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 3 - Formations et tarifs</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20 space-y-3">
              <p><strong>Formations disponibles :</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Module BRONZE</strong> — Formation de base au trading SMC</li>
                <li><strong>Module GOLD</strong> — Formation avancée avec stratégies</li>
                <li><strong>Module PLATINUM</strong> — Formation complète + mentorat personnalisé</li>
              </ul>
              <p className="mt-4"><strong>Tarifs :</strong> Les prix sont affichés en euros (€) ou FCFA selon votre localisation. 
              Les tarifs peuvent être modifiés à tout moment, mais le prix applicable est celui affiché lors de la validation de votre commande.</p>
              <p><strong>Nature du produit :</strong> Produit numérique (aucun envoi physique)</p>
            </div>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 4 - Commande et inscription</h2>
            <p className="mb-4">
              Pour commander une formation, le client doit :
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Créer un compte sur le site (nom, prénom, email, téléphone)</li>
              <li>Sélectionner la formation souhaitée</li>
              <li>Valider le panier et procéder au paiement</li>
              <li>Recevoir la confirmation par email</li>
            </ol>
            <p className="mt-4">
              Le client reconnaît avoir vérifié l'exactitude des informations saisies avant validation. 
              {companyInfo.name} se réserve le droit de refuser ou d'annuler une commande en cas de suspicion de fraude.
            </p>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 5 - Moyens de paiement</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20 space-y-3">
              <p><strong>Paiements acceptés :</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Wave</strong> — Paiement mobile (Sénégal, Côte d'Ivoire, Mali, Burkina Faso)</li>
                <li><strong>Orange Money</strong> — Paiement mobile (Afrique de l'Ouest)</li>
              </ul>
              <p className="mt-4"><strong>Sécurité :</strong> Les paiements sont traités par des prestataires certifiés. 
              Vos données bancaires ne sont jamais stockées sur nos serveurs.</p>
              <p><strong>Confirmation :</strong> Vous recevez un email de confirmation immédiatement après validation du paiement.</p>
            </div>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 6 - Accès aux formations</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20 space-y-3">
              <p><strong>Délai d'accès :</strong> Immédiat après validation du paiement (maximum 24h)</p>
              <p><strong>Modalités :</strong> Vous recevez vos identifiants de connexion par email. L'accès se fait via votre espace membre sur le site.</p>
              <p><strong>Durée d'accès :</strong> Accès illimité à vie pour les formations achetées (sauf mention contraire)</p>
              <p><strong>Support technique :</strong> Assistance disponible par email ou WhatsApp en cas de problème d'accès</p>
            </div>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 7 - Droit de rétractation</h2>
            <div className="bg-green-500/10 p-6 border-l-4 border-green-500">
              <p className="mb-4">
                <strong>Conformément à la loi sénégalaise</strong>, vous disposez d'un droit de rétractation de <strong>14 jours</strong> à compter de l'achat.
              </p>
              <p className="mb-4 text-green-400 font-bold">
                ⚠️ IMPORTANT : Ce droit ne s'applique PAS si vous avez commencé à accéder au contenu de la formation.
              </p>
              <p><strong>Conditions de rétractation :</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Vous n'avez pas ouvert les modules de formation</li>
                <li>Vous n'avez pas téléchargé les ressources (PDF, vidéos)</li>
                <li>Demande envoyée par email à {companyInfo.email} dans les 14 jours</li>
              </ul>
              <p className="mt-4"><strong>Remboursement :</strong> Effectué sous 30 jours par le même moyen de paiement (Wave/Orange Money)</p>
            </div>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 8 - Propriété intellectuelle</h2>
            <p className="mb-4">
              L'intégralité du contenu des formations (vidéos, PDF, graphiques, stratégies SMC) est protégée par le droit d'auteur 
              et appartient exclusivement à <strong>{companyInfo.name}</strong>.
            </p>
            <div className="bg-red-500/10 p-6 border-l-4 border-red-500">
              <p className="font-bold text-red-400 mb-2">🚫 STRICTEMENT INTERDIT :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Partager vos identifiants de connexion</li>
                <li>Télécharger et redistribuer les vidéos/PDF</li>
                <li>Revendre ou céder l'accès à un tiers</li>
                <li>Reproduire le contenu sur d'autres plateformes</li>
              </ul>
              <p className="mt-3 text-sm">
                Toute violation entraînera la suspension immédiate de votre compte et des poursuites judiciaires.
              </p>
            </div>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 9 - Avertissement sur les risques</h2>
            <div className="bg-yellow-500/10 p-6 border-l-4 border-yellow-500">
              <p className="font-bold text-yellow-400 mb-3">⚠️ AVERTISSEMENT IMPORTANT</p>
              <p className="mb-3">
                Le trading sur marge (Forex, crypto, actions) comporte des <strong>risques élevés de perte en capital</strong>. 
                Les formations proposées par {companyInfo.name} sont à but <strong>pédagogique uniquement</strong>.
              </p>
              <p className="mb-3">
                <strong>Nous ne fournissons PAS :</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>De conseils financiers personnalisés</li>
                <li>De garantie de gains ou de performance</li>
                <li>De signaux de trading</li>
                <li>De gestion de portefeuille</li>
              </ul>
              <p className="mt-3 font-bold">
                Vous êtes seul responsable de vos décisions d'investissement. Les performances passées ne garantissent pas les résultats futurs.
              </p>
            </div>
          </section>

          {/* Article 10 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 10 - Service client</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20">
              <p className="mb-2"><strong>Pour toute question ou réclamation :</strong></p>
              <p>📧 Email : <a href={`mailto:${companyInfo.email}`} className="text-green-500 hover:underline">{companyInfo.email}</a></p>
              <p>📱 WhatsApp : <a href={`https://wa.me/${companyInfo.phone.replace(/\s/g, '')}`} className="text-green-500 hover:underline">{companyInfo.phone}</a></p>
              <p className="mt-3 text-sm text-slate-400">Délai de réponse : 24-48h ouvrables</p>
            </div>
          </section>

          {/* Article 11 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Article 11 - Droit applicable et juridiction</h2>
            <p>
              Les présentes CGV sont régies par le <strong>droit sénégalais</strong>. Tout litige relatif à l'interprétation ou l'exécution 
              des présentes sera de la compétence exclusive du <strong>Tribunal de Commerce Hors Classe de Dakar</strong>.
            </p>
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
