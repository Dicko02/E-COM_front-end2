import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <style>{`
        @keyframes spin-premium {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-premium {
          animation: spin-premium 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .glow-gold {
          filter: drop-shadow(0 0 8px rgba(217, 119, 6, 0.6));
        }
      `}</style>
      
      <div className={`${sizes[size]} relative glow-gold`}>
        {/* Outer ring */}
        <svg
          className="spin-premium absolute inset-0"
          fill="none"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f2b90d" />
              <stop offset="50%" stopColor="#ff9800" />
              <stop offset="100%" stopColor="#a67c00" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-amber-500 rounded-full blur-sm" />
        </div>
      </div>

      {text && (
        <p className="mt-6 text-slate-300 text-sm uppercase tracking-widest animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};