export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-amber-500 mb-2">Conditions Générales de Vente</h1>
          <div className="h-1 w-20 bg-amber-500"></div>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          {/* Article 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 1 - Objet</h2>
            <p>
              Les présentes conditions générales de vente définissent les droits et obligations de LUXE INTERNATIONAL et de ses clients 
              dans le cadre de la vente en ligne de produits de luxe.
            </p>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 2 - Accès au site</h2>
            <p>
              L'accès à ce site est gratuit. LUXE INTERNATIONAL se réserve le droit de modifier le contenu du site à tout moment, 
              sans préavis ni compensation. LUXE INTERNATIONAL se réserve également le droit de fermer l'accès au site.
            </p>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 3 - Produits et tarifs</h2>
            <p className="mb-4">
              Les caractéristiques des produits, dont notamment les dimensions, les couleurs, les matériaux et les prix, 
              sont décrites au mieux avec la plus grande précision. Toutefois, LUXE INTERNATIONAL ne peut garantir l'exactitude 
              absolue du contenu du site, notamment des images de produits.
            </p>
            <p>
              Les tarifs affichés sont en euros TTC. LUXE INTERNATIONAL se réserve le droit de modifier les prix à tout moment. 
              Cependant, les tarifs applicables sont ceux affichés lors de la confirmation de commande.
            </p>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 4 - Commande</h2>
            <p className="mb-4">
              Pour passer commande, le client doit remplir le formulaire de commande en ligne et fournir les informations demandées. 
              Le client reconnaît avoir vérifié l'exactitude des informations saisies avant de valider la commande.
            </p>
            <p>
              LUXE INTERNATIONAL se réserve le droit de refuser ou d'annuler une commande sans autres justifications que celles 
              de l'intérêt du commerce électronique.
            </p>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 5 - Moyen de paiement et sécurité</h2>
            <p className="mb-4">
              Le paiement est effectué en ligne par l'intermédiaire d'un prestataire de paiement sécurisé. Les données bancaires 
              du client ne sont jamais stockées sur les serveurs de LUXE INTERNATIONAL.
            </p>
            <p>
              Les moyens de paiement acceptés sont : Carte bancaire (Visa, Mastercard, American Express).
            </p>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 6 - Livraison</h2>
            <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20 space-y-3">
              <p><strong>Délai de livraison :</strong> Sous 5 à 10 jours ouvrables en France métropolitaine [À AJUSTER]</p>
              <p><strong>Lieu de livraison :</strong> L'adresse de livraison doit être en France métropolitaine. Les livraisons à l'étranger sont sur devis.</p>
              <p><strong>Frais de port :</strong> Gratuits à partir de 100€ d'achats. Sinon : [BARÈME À REMPLIR]</p>
              <p><strong>Responsabilité :</strong> Les risques de perte ou d'endommagement durant le transport restent à la charge du transporteur jusqu'à réception.</p>
            </div>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 7 - Rétractation et Retour</h2>
            <p className="mb-4">
              Conformément à la loi, le client dispose d'un droit de rétractation de 14 jours à compter de la réception du produit.
            </p>
            <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20 space-y-3">
              <p><strong>Conditions de retour :</strong></p>
              <ul className="list-disc list-inside space-y-2">
                <li>Produit dans son état d'origine</li>
                <li>Emballage d'origine intact</li>
                <li>Tous les éléments et documentations inclus</li>
                <li>Aucun signe d'usure ou de manipulation</li>
              </ul>
              <p className="mt-4"><strong>Procédure de retour :</strong> Contactez support@luxe.com avec votre numéro de commande.</p>
              <p><strong>Remboursement :</strong> Effectué dans les 30 jours suivant la réception du retour.</p>
            </div>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 8 - Authentification et garantie</h2>
            <p>
              Tous les produits vendus par LUXE INTERNATIONAL sont des articles 100% authentiques. Un certificat d'authenticité 
              peut être fourni sur demande pour certains produits pour une garantie supplémentaire.
            </p>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 9 - Service client</h2>
            <p>
              Pour toute question ou réclamation, veuillez contacter notre service client :<br/>
              Email : <a href="mailto:support@luxe.com" className="text-amber-500 hover:underline">support@luxe.com</a><br/>
              Téléphone : [NUMÉRO À REMPLIR]<br/>
              Horaires : Lundi - Vendredi, 9h-18h
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
