import React from 'react';
import { X, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import type { Notification } from './utils/useNotification';

interface NotificationsProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications, onRemove }) => {
  const getStyles = (type: string) => {
    const baseStyles = 'flex items-center gap-3 p-4 rounded-sm backdrop-blur-md border animate-in fade-in slide-in-from-right-5';

    switch (type) {
      case 'success':
        return `${baseStyles} bg-emerald-500/20 border-emerald-500/30 text-emerald-100`;
      case 'error':
        return `${baseStyles} bg-red-500/20 border-red-500/30 text-red-100`;
      case 'warning':
        return `${baseStyles} bg-amber-500/20 border-amber-500/30 text-amber-100`;
      case 'info':
      default:
        return `${baseStyles} bg-blue-500/20 border-blue-500/30 text-blue-100`;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check size={20} className="text-emerald-400 flex-shrink-0" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-400 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-amber-400 flex-shrink-0" />;
      case 'info':
      default:
        return <Info size={20} className="text-blue-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm">
      {notifications.map(notification => (
        <div key={notification.id} className={getStyles(notification.type)}>
          <div className="flex items-center gap-3 flex-1">
            {getIcon(notification.type)}
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => onRemove(notification.id)}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
