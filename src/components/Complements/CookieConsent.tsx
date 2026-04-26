import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Attendre que le page soit chargée avant d'afficher
      setTimeout(() => setShowBanner(true), 500);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allConsent));
    setShowBanner(false);
    loadScripts(true, true);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(minimalConsent));
    setShowBanner(false);
  };

  const handleCustomize = () => {
    const customConsent = {
      essential: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(customConsent));
    setShowBanner(false);
    loadScripts(preferences.analytics, preferences.marketing);
  };

  const loadScripts = (analytics: boolean, marketing: boolean) => {
    // Charger Google Analytics si accepté
    if (analytics) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // À remplacer par ID réel
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(..._args: any[]) {
        (window as any).dataLayer.push(arguments);
      }
      (window as any).gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX'); // À remplacer par ID réel
    }

    // Charger Facebook Pixel si accepté
    if (marketing) {
      // Facebook Pixel code
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.style.display = 'none';
      img.src = 'https://www.facebook.com/tr?id=XXXXXXXXXX&ev=PageView&noscript=1'; // À remplacer par ID réel
      document.body.appendChild(img);
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] bg-black border-t border-amber-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {!showDetails ? (
            // Vue simple
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-white font-bold mb-2">🍪 Paramètres de cookies</h3>
                <p className="text-sm text-slate-400">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. 
                  <a 
                    href="/cookies" 
                    className="text-amber-500 hover:underline ml-1"
                  >
                    En savoir plus
                  </a>
                </p>
              </div>

              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2 rounded-sm border border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white transition-colors text-sm font-medium whitespace-nowrap"
                >
                  Refuser
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-6 py-2 rounded-sm border border-amber-500 text-amber-500 hover:bg-amber-500/10 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  Personnaliser
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 rounded-sm bg-amber-500 text-black hover:bg-amber-400 transition-colors text-sm font-bold whitespace-nowrap"
                >
                  Accepter tout
                </button>
              </div>
            </div>
          ) : (
            // Vue détaillée
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">Préférences de cookies</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Cookies essentiels */}
                <div className="bg-slate-900/50 p-4 rounded-sm border border-amber-500/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Cookies Essentiels</h4>
                      <p className="text-xs text-slate-400 mt-1">Nécessaires au fonctionnement du site</p>
                    </div>
                    <div className="bg-amber-500/20 text-amber-500 text-xs px-3 py-1 rounded whitespace-nowrap">
                      Activé
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="bg-slate-900/50 p-4 rounded-sm border border-slate-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Cookies Analytiques</h4>
                      <p className="text-xs text-slate-400 mt-1">Nous aident à comprendre comment vous utilisez le site</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-amber-500"
                      />
                    </label>
                  </div>
                </div>

                {/* Marketing */}
                <div className="bg-slate-900/50 p-4 rounded-sm border border-slate-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Cookies Marketing</h4>
                      <p className="text-xs text-slate-400 mt-1">Permettent les publicités personnalisées</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-amber-500"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2 rounded-sm border border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white transition-colors text-sm font-medium"
                >
                  Tout refuser
                </button>
                <button
                  onClick={handleCustomize}
                  className="px-6 py-2 rounded-sm bg-amber-500 text-black hover:bg-amber-400 transition-colors text-sm font-bold"
                >
                  Enregistrer les préférences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-sm" />
    </>
  );
};
