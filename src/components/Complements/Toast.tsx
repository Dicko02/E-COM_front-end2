import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: number) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const types = {
    success: {
      bar:  'bg-emerald-500',
      bg:   'bg-slate-900 border-emerald-500/40',
      text: 'text-white',
      sub:  'text-emerald-400',
      icon: <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
    },
    error: {
      bar:  'bg-red-500',
      bg:   'bg-slate-900 border-red-500/40',
      text: 'text-white',
      sub:  'text-red-400',
      icon: <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
    },
    warning: {
      bar:  'bg-amber-500',
      bg:   'bg-slate-900 border-amber-500/40',
      text: 'text-white',
      sub:  'text-amber-400',
      icon: <AlertTriangle size={18} className="text-amber-400 flex-shrink-0" />
    },
    info: {
      bar:  'bg-blue-500',
      bg:   'bg-slate-900 border-blue-500/40',
      text: 'text-white',
      sub:  'text-blue-400',
      icon: <Info size={18} className="text-blue-400 flex-shrink-0" />
    }
  };

  const s = types[toast.type];

  return (
    <div
      className={`
        pointer-events-auto relative overflow-hidden
        flex items-center gap-3 px-4 py-3
        rounded-sm border shadow-2xl shadow-black/50
        min-w-[300px] max-w-sm
        backdrop-blur-sm
        ${s.bg}
        animate-slideIn
      `}
    >
      {/* Barre de progression en bas */}
      <div className={`absolute bottom-0 left-0 h-0.5 ${s.bar} toast-progress`} />

      {s.icon}

      <p className={`flex-1 text-sm font-medium ${s.text}`}>
        {toast.message}
      </p>

      <button
        aria-label="Fermer"
        onClick={onClose}
        className="text-slate-500 hover:text-white transition-colors flex-shrink-0"
      >
        <X size={16} />
      </button>
    </div>
  );
};
