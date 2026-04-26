import React from 'react';
import { Palette } from 'lucide-react';
import { useDashboardTheme } from './utils/ThemeProvider';

export const ThemeSelector: React.FC = () => {
  const { themeName, setTheme, availableThemes } = useDashboardTheme();

  const themeLabels: Record<string, string> = {
    'dark-amber': '🟨 Amber',
    'dark-blue': '🔵 Blue',
    'dark-green': '🟢 Green',
    'dark-red': '🔴 Red'
  };

  return (
    <div className="flex items-center gap-2">
      <button
        title="Sélectionner thème"
        className="p-2 text-slate-400 hover:text-amber-500 transition-colors"
      >
        <Palette size={20} />
      </button>

      <div className="hidden sm:flex items-center gap-2">
        {availableThemes.map(themeKey => (
          <button
            key={themeKey}
            onClick={() => setTheme(themeKey)}
            className={`px-3 py-1 text-xs font-bold uppercase rounded-sm transition-all ${
              themeName === themeKey
                ? 'bg-amber-500 text-black'
                : 'bg-slate-900/50 text-slate-400 hover:text-white border border-amber-500/20'
            }`}
            title={themeLabels[themeKey]}
          >
            {themeLabels[themeKey]?.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
};
