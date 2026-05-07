import React from 'react';
import type { ReactNode } from "react";
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className={`relative bg-slate-900 border border-amber-500/20 rounded-sm shadow-2xl shadow-amber-500/10 ${sizes[size]} w-full max-h-[90vh] overflow-hidden animate-scaleIn`}>
        <div className="flex items-center justify-between p-6 border-b border-amber-500/10">
          <h2 className="text-2xl font-light text-white">{title}</h2>
          <button
            aria-label="Fermer le modal"
            onClick={onClose}
            className="text-slate-400 hover:text-amber-500 transition-all duration-300 hover:rotate-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] text-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
};