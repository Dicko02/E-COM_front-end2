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
        type="button"
        title="Sélectionner thème"
        className="p-2 text-slate-400 hover:text-green-500 transition-all hover:scale-110"
      >
        <Palette size={20} />
      </button>

      <div className="hidden sm:flex items-center gap-2">
        {availableThemes.map(themeKey => (
          <button
            key={themeKey}
            type="button"
            onClick={() => setTheme(themeKey)}
            className={`px-3 py-1 text-xs font-bold uppercase rounded-sm transition-all hover:scale-105 active:scale-95 ${
              themeName === themeKey
                ? 'bg-green-500 text-black'
                : 'bg-slate-900/50 text-slate-400 hover:text-white border border-green-500/20'
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
