import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 PERSONNALISATION FACILE — Modifiez ces valeurs pour tester
// ═══════════════════════════════════════════════════════════════════════════
const TICKER_HEIGHT = '42px';      // Hauteur : '40px' (compact) | '42px' (standard) | '48px' (confortable)
const ANIMATION_DURATION = '30s';  // Vitesse : '20s' (rapide) | '30s' (standard) | '40s' (lente)
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
      className="w-full bg-[#090d1a] border-b border-white/[0.07] overflow-hidden relative"
      style={{ height: TICKER_HEIGHT }}
    >
      {/* Gradient fade sur les bords - Style FundingPips */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#090d1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#090d1a] to-transparent z-10 pointer-events-none" />

      {/* Ticker défilant - Style FundingPips exact */}
      <div className="flex items-center h-full">
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            animation: `ticker ${ANIMATION_DURATION} linear infinite`,
            gap: '44px', // Espacement FundingPips
          }}
        >
          {doubledItems.map((item, index) => (
            <div key={index} className="flex items-center" style={{ gap: '10px' }}>
              {/* Symbole - Style FundingPips */}
              <span 
                className="font-medium tabular-nums"
                style={{ 
                  color: '#6b738a',
                  fontSize: '0.82rem',
                  minWidth: '70px'
                }}
              >
                {item.symbol}
              </span>
              
              {/* Prix - Style FundingPips */}
              <span 
                className="font-semibold tabular-nums"
                style={{ 
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  minWidth: '80px'
                }}
              >
                {item.price}
              </span>
              
              {/* Badge variation - Style FundingPips exact */}
              {item.change !== 'Live' && (
                <span
                  className="font-bold tabular-nums text-center"
                  style={{
                    fontSize: '0.72rem',
                    padding: '2px 7px',
                    borderRadius: '5px',
                    minWidth: '65px',
                    background: item.isUp 
                      ? 'rgba(0, 229, 160, 0.15)' 
                      : 'rgba(255, 77, 77, 0.12)',
                    color: item.isUp ? '#00e5a0' : '#ff4d4d'
                  }}
                >
                  {item.isUp ? '▲ ' : '▼ '}
                  {item.change}
                </span>
              )}

              {/* Badge Live pour les items sans variation */}
              {item.change === 'Live' && (
                <span
                  className="font-bold uppercase text-center"
                  style={{
                    fontSize: '0.68rem',
                    padding: '2px 7px',
                    borderRadius: '5px',
                    minWidth: '65px',
                    background: 'rgba(0, 229, 160, 0.15)',
                    color: '#00e5a0',
                    letterSpacing: '0.5px'
                  }}
                >
                  Live
                </span>
              )}
              
              {/* Séparateur - Style FundingPips exact */}
              {index < doubledItems.length - 1 && (
                <span 
                  className="rounded-full flex-shrink-0"
                  style={{ 
                    width: '3px',
                    height: '3px',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

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
