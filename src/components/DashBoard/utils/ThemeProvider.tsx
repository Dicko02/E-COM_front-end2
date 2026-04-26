import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface DashboardTheme {
  name: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  text: string;
  border: string;
}

const themes: Record<string, DashboardTheme> = {
  'dark-amber': {
    name: 'Dark Amber',
    primary: '#f59e0b',
    secondary: '#1e293b',
    success: '#10b981',
    warning: '#f97316',
    error: '#ef4444',
    background: '#000000',
    text: '#f1f5f9',
    border: 'rgba(245, 158, 11, 0.2)'
  },
  'dark-blue': {
    name: 'Dark Blue',
    primary: '#3b82f6',
    secondary: '#1e293b',
    success: '#10b981',
    warning: '#f97316',
    error: '#ef4444',
    background: '#000000',
    text: '#f1f5f9',
    border: 'rgba(59, 130, 246, 0.2)'
  },
  'dark-green': {
    name: 'Dark Green',
    primary: '#10b981',
    secondary: '#1e293b',
    success: '#10b981',
    warning: '#f97316',
    error: '#ef4444',
    background: '#000000',
    text: '#f1f5f9',
    border: 'rgba(16, 185, 129, 0.2)'
  },
  'dark-red': {
    name: 'Dark Red',
    primary: '#ef4444',
    secondary: '#1e293b',
    success: '#10b981',
    warning: '#f97316',
    error: '#ef4444',
    background: '#000000',
    text: '#f1f5f9',
    border: 'rgba(239, 68, 68, 0.2)'
  }
};

interface ThemeContextType {
  theme: DashboardTheme;
  themeName: string;
  setTheme: (name: string) => void;
  availableThemes: string[];
}

const DashboardThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const DashboardThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dashboard-theme') || 'dark-amber';
    }
    return 'dark-amber';
  });

  const theme = themes[themeName] || themes['dark-amber'];

  const handleSetTheme = (name: string) => {
    if (themes[name]) {
      setThemeName(name);
      if (typeof window !== 'undefined') {
        localStorage.setItem('dashboard-theme', name);
      }
    }
  };

  return (
    <DashboardThemeContext.Provider
      value={{
        theme,
        themeName,
        setTheme: handleSetTheme,
        availableThemes: Object.keys(themes)
      }}
    >
      {children}
    </DashboardThemeContext.Provider>
  );
};

export const useDashboardTheme = () => {
  const context = useContext(DashboardThemeContext);
  if (!context) {
    throw new Error('useDashboardTheme must be used within DashboardThemeProvider');
  }
  return context;
};
