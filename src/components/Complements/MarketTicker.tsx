import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 PERSONNALISATION FACILE — Modifiez ces valeurs pour tester
// ═══════════════════════════════════════════════════════════════════════════
const TICKER_HEIGHT = '40px';      // Hauteur : '40px' (compact) | '55px' (confortable) | '60px' (large)
const ANIMATION_DURATION = '30s';  // Vitesse : '15s' (rapide) | '20s' (moyenne) | '30s' (lente) | '40s' (très lente)
const REFRESH_INTERVAL = 30000;    // Rafraîchissement auto en ms (30000 = 30 secondes)

// ═══════════════════════════════════════════════════════════════════════════

interface MarketItem {
  symbol: string;
  price: string;
  change: string;
  isUp: boolean;
}

export const MarketTicker = () => {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // ── Fetch Forex (EUR/USD, GBP/USD, USD/JPY) ──────────────────────────────
  const fetchForex = async (): Promise<MarketItem[]> => {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!response.ok) throw new Error('Forex API error');
      
      const data = await response.json();
      const rates = data.rates;

      return [
        {
          symbol: 'EUR/USD',
          price: (1 / rates.EUR).toFixed(4),
          change: 'Live',
          isUp: true,
        },
        {
          symbol: 'GBP/USD',
          price: (1 / rates.GBP).toFixed(4),
          change: 'Live',
          isUp: true,
        },
        {
          symbol: 'USD/JPY',
          price: rates.JPY.toFixed(2),
          change: 'Live',
          isUp: false,
        },
      ];
    } catch (error) {
      console.error('Erreur Forex:', error);
      return [];
    }
  };

  // ── Fetch Crypto (BTC, ETH, SOL) ──────────────────────────────────────────
  const fetchCrypto = async (): Promise<MarketItem[]> => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
      );
      if (!response.ok) throw new Error('Crypto API error');

      const data = await response.json();

      return [
        {
          symbol: 'BTC/USD',
          price: data.bitcoin.usd.toLocaleString('fr-FR', { maximumFractionDigits: 0 }),
          change: (data.bitcoin.usd_24h_change || 0) >= 0
            ? `+${(data.bitcoin.usd_24h_change || 0).toFixed(2)}%`
            : `${(data.bitcoin.usd_24h_change || 0).toFixed(2)}%`,
          isUp: (data.bitcoin.usd_24h_change || 0) >= 0,
        },
        {
          symbol: 'ETH/USD',
          price: data.ethereum.usd.toLocaleString('fr-FR', { maximumFractionDigits: 0 }),
          change: (data.ethereum.usd_24h_change || 0) >= 0
            ? `+${(data.ethereum.usd_24h_change || 0).toFixed(2)}%`
            : `${(data.ethereum.usd_24h_change || 0).toFixed(2)}%`,
          isUp: (data.ethereum.usd_24h_change || 0) >= 0,
        },
        {
          symbol: 'SOL/USD',
          price: data.solana.usd.toFixed(2),
          change: (data.solana.usd_24h_change || 0) >= 0
            ? `+${(data.solana.usd_24h_change || 0).toFixed(2)}%`
            : `${(data.solana.usd_24h_change || 0).toFixed(2)}%`,
          isUp: (data.solana.usd_24h_change || 0) >= 0,
        },
      ];
    } catch (error) {
      console.error('Erreur Crypto:', error);
      return [];
    }
  };

  // ── Fetch All Data ────────────────────────────────────────────────────────
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [forexData, cryptoData] = await Promise.all([
        fetchForex(),
        fetchCrypto(),
      ]);

      // Ordre : Forex → Crypto
      const allItems = [...forexData, ...cryptoData];
      setItems(allItems);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Auto-refresh ──────────────────────────────────────────────────────────
  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  if (isLoading && items.length === 0) {
    return (
      <div
        className="w-full bg-black border-b border-green-500/15 flex items-center justify-center"
        style={{ height: TICKER_HEIGHT }}
      >
        <span className="text-slate-500 text-xs uppercase tracking-widest animate-pulse">
          Chargement des données...
        </span>
      </div>
    );
  }

  // Dupliquer les items pour créer l'effet de boucle infinie
  const doubledItems = [...items, ...items];

  return (
    <div
      className="w-full bg-black border-b border-green-500/10 overflow-hidden relative"
      style={{ height: TICKER_HEIGHT }}
    >
      {/* Gradient fade sur les bords */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Badge Live avec pulse - Style FundingPips */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 bg-green-500/10 backdrop-blur-sm px-2.5 py-1 rounded border border-green-500/30">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        <span className="text-green-400 text-[10px] font-extrabold uppercase tracking-[0.15em]">
          Live
        </span>
      </div>

      {/* Ticker défilant - Style FundingPips */}
      <div className="flex items-center h-full">
        <div
          className="flex items-center gap-6 whitespace-nowrap"
          style={{
            animation: `ticker ${ANIMATION_DURATION} linear infinite`,
            paddingLeft: '110px', // Espace pour le badge "Live"
          }}
        >
          {doubledItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5">
              {/* Symbole en gras */}
              <span className="text-slate-300 font-bold text-[13px] tracking-wide">
                {item.symbol}
              </span>
              
              {/* Prix */}
              <span className="text-white font-extrabold text-[14px] tabular-nums">
                {item.price}
              </span>
              
              {/* Badge variation - Style FundingPips */}
              {item.change !== 'Live' && (
                <span
                  className={`text-[11px] font-black px-2 py-0.5 rounded-sm tabular-nums ${
                    item.isUp
                      ? 'bg-green-500 text-black'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {item.isUp ? '▲ ' : '▼ '}
                  {item.change}
                </span>
              )}
              
              {/* Séparateur vertical - Style FundingPips */}
              {index < doubledItems.length - 1 && (
                <span className="w-px h-4 bg-slate-700/50" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info dernière mise à jour (hover) */}
      {lastUpdate && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
          <span className="text-slate-500 text-[9px] uppercase tracking-wider bg-black/90 backdrop-blur-sm px-2 py-1 rounded-sm border border-slate-800/50">
            Mis à jour : {lastUpdate.toLocaleTimeString('fr-FR')}
          </span>
        </div>
      )}

      {/* Animation CSS */}
      <style>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};
