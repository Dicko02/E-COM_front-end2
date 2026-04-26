export const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-amber-500 mb-2">Politique de Cookies</h1>
          <div className="h-1 w-20 bg-amber-500"></div>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          {/* Intro */}
          <section>
            <p>
              Ce site utilise des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser le contenu. 
              Découvrez ci-dessous les types de cookies que nous utilisons.
            </p>
          </section>

          {/* 1. Qu'est-ce qu'un cookie ? */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette) lors de la visite d'un site web. 
              Les cookies contiennent des informations qui permettent au site de vous reconnaître lors de visites ultérieures.
            </p>
          </section>

          {/* 2. Types de cookies que nous utilisons */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Types de cookies utilisés</h2>
            
            <div className="space-y-4">
              {/* Cookies essentiels */}
              <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20">
                <h3 className="text-xl font-bold text-amber-500 mb-3">Cookies Essentiels (Strictement Nécessaires)</h3>
                <p className="mb-2"><strong>Objectif :</strong> Assurer le fonctionnement du site</p>
                <p className="mb-2"><strong>Exemples :</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><code className="text-amber-300">jwt</code> - Token d'authentification</li>
                  <li><code className="text-amber-300">sessionId</code> - Identifiant de session</li>
                  <li><code className="text-amber-300">preferences</code> - Préférences utilisateur</li>
                </ul>
                <p className="mt-3 text-sm text-amber-400">✓ Consentement automatique - Impossible à désactiver</p>
              </div>

              {/* Cookies analytiques */}
              <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20">
                <h3 className="text-xl font-bold text-amber-500 mb-3">Cookies Analytiques</h3>
                <p className="mb-2"><strong>Objectif :</strong> Comprendre comment vous utilisez le site</p>
                <p className="mb-2"><strong>Services :</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Google Analytics - Analyse du trafic</li>
                  <li>Mixpanel - Suivi des interactions</li>
                </ul>
                <p className="mt-3 text-sm text-slate-400">⚙️ Consentement requis</p>
              </div>

              {/* Cookies marketing */}
              <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20">
                <h3 className="text-xl font-bold text-amber-500 mb-3">Cookies Marketing & Publicité</h3>
                <p className="mb-2"><strong>Objectif :</strong> Personnaliser les publicités</p>
                <p className="mb-2"><strong>Services :</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Facebook Pixel - Suivi des conversions</li>
                  <li>Google Ads - Publicités ciblées</li>
                </ul>
                <p className="mt-3 text-sm text-slate-400">⚙️ Consentement requis</p>
              </div>

              {/* Cookies de préférences */}
              <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20">
                <h3 className="text-xl font-bold text-amber-500 mb-3">Cookies de Préférences</h3>
                <p className="mb-2"><strong>Objectif :</strong> Retenir vos préférences (thème, langue, etc.)</p>
                <p className="mt-3 text-sm text-slate-400">⚙️ Consentement requis</p>
              </div>
            </div>
          </section>

          {/* 3. Cookies tiers */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Cookies de tiers</h2>
            <p>
              Certains contenus (vidéos YouTube, cartes Google Maps, etc.) peuvent placer leurs propres cookies. 
              Ces tiers respectent également les réglementations RGPD et CNIL.
            </p>
          </section>

          {/* 4. Durée de stockage */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Durée de conservation</h2>
            <div className="bg-slate-900/50 p-6 rounded-sm border border-amber-500/20 space-y-2">
              <p><strong>Cookies essentiels :</strong> Jusqu'à la fermeture de votre navigateur</p>
              <p><strong>Cookies de session :</strong> 24 heures à 30 jours</p>
              <p><strong>Cookies marketing :</strong> Jusqu'à 2 ans</p>
              <p className="text-sm text-slate-400 pt-3">Vous pouvez supprimer vos cookies à tout moment dans les paramètres de votre navigateur.</p>
            </div>
          </section>

          {/* 5. Comment les refuser ou les gérer */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Comment gérer vos cookies</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-2">🔧 Via notre site</h3>
                <p>Un banner de consentement s'affiche au premier accès. Vous pouvez :</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Accepter tous les cookies</li>
                  <li>Accepter uniquement les essentiels</li>
                  <li>Personnaliser vos choix</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-2">🌐 Via votre navigateur</h3>
                <p className="mb-2">Vous pouvez gérer les cookies dans les paramètres de votre navigateur :</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Chrome :</strong> Paramètres &gt; Confidentialité &gt; Cookies</li>
                  <li><strong>Firefox :</strong> Préférences &gt; Vie privée &gt; Cookies</li>
                  <li><strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Cookies</li>
                  <li><strong>Edge :</strong> Paramètres &gt; Confidentialité &gt; Cookies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Tracking non-cookie */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Technologies de suivi sans cookies</h2>
            <p>
              Nous pouvons utiliser d'autres technologies de suivi (localStorage, sessionStorage, fingerprinting) 
              qui fonctionnent de manière similaire aux cookies. Les mêmes droits s'appliquent.
            </p>
          </section>

          {/* 7. RGPD et CNIL */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Réglementation RGPD et CNIL</h2>
            <p>
              LUXE INTERNATIONAL respecte strictement le Règlement Général sur la Protection des Données (RGPD) 
              et les recommandations de la Commission Nationale de l'Informatique et des Libertés (CNIL).
            </p>
            <p className="mt-3">
              Pour plus d'informations sur vos droits : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">www.cnil.fr</a>
            </p>
          </section>

          {/* 8. Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Questions ou réclamations</h2>
            <p>
              Si vous avez des questions sur notre utilisation des cookies :<br/>
              Email : <a href="mailto:dpo@luxe.com" className="text-amber-500 hover:underline">dpo@luxe.com</a><br/>
              <br/>
              Vous pouvez aussi déposer plainte auprès de la CNIL :<br/>
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">Commission Nationale de l'Informatique et des Libertés</a>
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
