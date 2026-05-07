import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'primary' | 'warning';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  type = 'danger'
}) => {
  if (!isOpen) return null;

  const buttonColors = {
    danger: 'bg-red-600 hover:bg-red-700',
    primary: 'bg-amber-500 hover:bg-white text-black',
    warning: 'bg-amber-600 hover:bg-amber-700'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-slate-900 border border-amber-500/20 rounded-sm shadow-2xl shadow-amber-500/10 max-w-md w-full p-6 animate-scaleIn">
        <h3 className="text-xl font-medium mb-3 text-white uppercase tracking-wider">{title}</h3>
        <p className="text-slate-300 mb-8">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border-2 border-slate-600 text-slate-300 rounded-sm hover:border-amber-500 hover:text-amber-500 transition-all font-bold uppercase tracking-widest text-sm relative overflow-hidden group"
          >
            <span className="relative z-10">{cancelText}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded-full transition relative overflow-hidden group ${buttonColors[type]}`}
          >
            <span className="relative z-10">{confirmText}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
        </div>
      </div>
    </div>
  );
};