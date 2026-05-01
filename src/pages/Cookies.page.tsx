export const CookiesPage = () => {
  const companyInfo = {
    name: "WAYNE ENTERPRIZE",
    dpo: "dpo@wayne-enterprize.com"
  };

  return (
    <div className="min-h-screen text-white pt-32 pb-16" style={{ backgroundColor: '#050a05' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-green-500 mb-2 uppercase tracking-tight">Politique de Cookies</h1>
          <div className="h-1 w-20 bg-green-500"></div>
          <p className="mt-4 text-slate-400 text-sm italic">
            Comment nous utilisons les cookies sur notre plateforme
          </p>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          
          {/* Intro */}
          <section>
            <p>
              Ce site utilise des cookies et technologies similaires pour assurer le bon fonctionnement de la plateforme, 
              sécuriser votre connexion et améliorer votre expérience. Découvrez ci-dessous les types de cookies que nous utilisons.
            </p>
          </section>

          {/* 1. Qu'est-ce qu'un cookie ? */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette) lors de la visite d'un site web. 
              Les cookies contiennent des informations qui permettent au site de vous reconnaître lors de visites ultérieures et d'améliorer votre expérience.
            </p>
          </section>

          {/* 2. Types de cookies que nous utilisons */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">2. Types de cookies utilisés</h2>
            
            <div className="space-y-4">
              
              {/* Cookies essentiels */}
              <div className="bg-green-500/10 p-6 rounded-sm border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-400 mb-3">🔒 Cookies Essentiels (Strictement Nécessaires)</h3>
                <p className="mb-3"><strong>Objectif :</strong> Assurer le fonctionnement du site et la sécurité de votre compte</p>
                <p className="mb-2"><strong>Cookies utilisés :</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    <code className="text-green-300 bg-black/30 px-2 py-1 rounded">jwt</code> — Token d'authentification JWT
                    <p className="text-sm text-slate-400 ml-6">Permet de vous maintenir connecté de manière sécurisée</p>
                  </li>
                  <li>
                    <code className="text-green-300 bg-black/30 px-2 py-1 rounded">sessionId</code> — Identifiant de session
                    <p className="text-sm text-slate-400 ml-6">Identifie votre session de navigation</p>
                  </li>
                </ul>
                <p className="mt-4 text-sm font-bold text-green-400">✓ Ces cookies sont indispensables — Impossible à désactiver</p>
                <p className="text-sm text-slate-400">Durée : Session (supprimés à la fermeture du navigateur) ou 30 jours</p>
              </div>

              {/* localStorage */}
              <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20">
                <h3 className="text-xl font-bold text-green-400 mb-3">💾 Stockage Local (localStorage)</h3>
                <p className="mb-3"><strong>Objectif :</strong> Sauvegarder vos préférences et votre panier localement</p>
                <p className="mb-2"><strong>Données stockées :</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    <code className="text-green-300 bg-black/30 px-2 py-1 rounded">cart</code> — Contenu de votre panier
                    <p className="text-sm text-slate-400 ml-6">Sauvegarde vos formations ajoutées au panier</p>
                  </li>
                  <li>
                    <code className="text-green-300 bg-black/30 px-2 py-1 rounded">theme</code> — Thème du dashboard admin
                    <p className="text-sm text-slate-400 ml-6">Mémorise votre choix de couleur (vert/bleu/violet)</p>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-slate-400">
                  Note : Le localStorage n'est pas un cookie mais fonctionne de manière similaire. Les données restent sur votre appareil.
                </p>
              </div>

            </div>
          </section>

          {/* 3. Ce que nous N'utilisons PAS */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">3. Ce que nous N'utilisons PAS</h2>
            <div className="bg-red-500/10 p-6 rounded-sm border-l-4 border-red-500">
              <p className="font-bold text-red-400 mb-3">🚫 Nous n'utilisons AUCUN cookie de tracking ou publicité</p>
              <p className="mb-3">Contrairement à de nombreux sites, nous ne utilisons PAS :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>❌ Google Analytics (pas de suivi de navigation)</li>
                <li>❌ Facebook Pixel (pas de publicité ciblée)</li>
                <li>❌ Google Ads (pas de remarketing)</li>
                <li>❌ Cookies tiers de réseaux sociaux</li>
                <li>❌ Cookies de profilage comportemental</li>
              </ul>
              <p className="mt-4 text-sm font-bold text-green-400">
                ✅ Votre navigation reste privée et n'est pas suivie à des fins commerciales.
              </p>
            </div>
          </section>

          {/* 4. Durée de stockage */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">4. Durée de conservation</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20 space-y-3">
              <div className="flex justify-between items-center border-b border-green-500/10 pb-2">
                <span><strong>Cookie JWT (authentification)</strong></span>
                <span className="text-green-400 font-bold">30 jours</span>
              </div>
              <div className="flex justify-between items-center border-b border-green-500/10 pb-2">
                <span><strong>Session ID</strong></span>
                <span className="text-green-400 font-bold">Session</span>
              </div>
              <div className="flex justify-between items-center border-b border-green-500/10 pb-2">
                <span><strong>localStorage (panier, thème)</strong></span>
                <span className="text-green-400 font-bold">Permanent</span>
              </div>
              <p className="text-sm text-slate-400 pt-3">
                Vous pouvez supprimer vos cookies et localStorage à tout moment dans les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* 5. Comment les gérer */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">5. Comment gérer vos cookies</h2>
            
            <div className="space-y-4">
              
              <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20">
                <h3 className="text-lg font-bold text-green-400 mb-3">🌐 Via votre navigateur</h3>
                <p className="mb-3">Vous pouvez gérer les cookies dans les paramètres de votre navigateur :</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">•</span>
                    <div>
                      <strong>Google Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies et autres données de sites
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">•</span>
                    <div>
                      <strong>Firefox :</strong> Préférences → Vie privée et sécurité → Cookies et données de sites
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">•</span>
                    <div>
                      <strong>Safari :</strong> Préférences → Confidentialité → Gérer les données de sites web
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">•</span>
                    <div>
                      <strong>Edge :</strong> Paramètres → Confidentialité, recherche et services → Cookies
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 p-6 rounded-sm border-l-4 border-yellow-500">
                <p className="font-bold text-yellow-400 mb-2">⚠️ Attention</p>
                <p className="text-sm">
                  Si vous désactivez les cookies essentiels (JWT), vous ne pourrez plus vous connecter à votre compte. 
                  Le site ne fonctionnera pas correctement sans ces cookies.
                </p>
              </div>

            </div>
          </section>

          {/* 6. Sécurité */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">6. Sécurité des cookies</h2>
            <p className="mb-3">Nos cookies sont sécurisés par :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>HTTPS/SSL :</strong> Tous les cookies sont transmis via connexion chiffrée</li>
              <li><strong>HttpOnly :</strong> Les cookies JWT ne sont pas accessibles via JavaScript (protection XSS)</li>
              <li><strong>SameSite :</strong> Protection contre les attaques CSRF</li>
              <li><strong>Secure flag :</strong> Cookies transmis uniquement en HTTPS</li>
            </ul>
          </section>

          {/* 7. Réglementation */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">7. Conformité légale</h2>
            <p>
              <strong>{companyInfo.name}</strong> respecte la <strong>Loi n° 2008-12 du 25 janvier 2008</strong> relative à la protection 
              des données personnelles au Sénégal.
            </p>
            <p className="mt-3">
              Nous utilisons uniquement des cookies essentiels au fonctionnement du site, ce qui ne nécessite pas de consentement préalable 
              selon la réglementation.
            </p>
          </section>

          {/* 8. Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">8. Questions ou réclamations</h2>
            <div className="bg-green-500/5 p-6 rounded-sm border border-green-500/20">
              <p className="mb-3">Si vous avez des questions sur notre utilisation des cookies :</p>
              <p>📧 Email DPO : <a href={`mailto:${companyInfo.dpo}`} className="text-green-500 hover:underline">{companyInfo.dpo}</a></p>
              <p className="mt-4 text-sm text-slate-400">
                Vous pouvez aussi déposer une réclamation auprès de la <strong>Commission de Protection des Données Personnelles (CDP)</strong> du Sénégal.
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
