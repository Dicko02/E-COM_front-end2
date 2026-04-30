import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { authApi } from '../api/Auth/auth.api';

interface User {
  _id: string;
  email: string;
  nom?: string;
  prenom?: string;
  role: 'admin' | 'client';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (data: any) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // useCallback pour stabiliser la référence
  const checkAuth = useCallback(async (forcedToken?: string) => {
    setLoading(true);
    const token = forcedToken || localStorage.getItem('token');

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const me = await authApi.getMe();
      setUser(me);
    } catch (err: any) {
      // ✅ Ne déconnecter que sur un vrai rejet 401, pas sur une erreur réseau
      if (err?.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
      // Si erreur réseau, on laisse l'état intact — l'utilisateur reste connecté
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      const data = await authApi.login(email, password);
      if (data?.token) {
        localStorage.setItem('token', data.token);
        await checkAuth(data.token);
      }
      return data?.user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (data: any) => {
    await authApi.register(data);
  };

  const verifyCode = async (email: string, code: string) => {
    const data = await authApi.verifyCode(email, code);
    if (data?.token) {
      localStorage.setItem('token', data.token);
      await checkAuth(data.token);
    } else {
      throw new Error('Code de vérification invalide');
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // On déconnecte côté client même si l'API échoue
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      window.location.href = '/connexion';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, verifyCode, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};