import { createContext, useContext, useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { ToastContainer } from '../components/Complements/Toast';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  // duration optionnelle exposée pour les cas où on veut garder un toast plus longtemps
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounter = useRef(0);

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // duration configurable, 5000ms par défaut
  const addToast = (message: string, type: ToastType, duration = 5000) => {
    toastCounter.current += 1;
    const id = toastCounter.current;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  };

  const toast = {
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error:   (message: string, duration?: number) => addToast(message, 'error',   duration),
    info:    (message: string, duration?: number) => addToast(message, 'info',    duration),
    warning: (message: string, duration?: number) => addToast(message, 'warning', duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};