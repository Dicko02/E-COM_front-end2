import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref
}) => {
  return (
    <div className="text-center py-16">
      {Icon && <Icon className="w-16 h-16 mx-auto text-slate-600 mb-6" />}
      <h3 className="text-2xl font-light text-white mb-3 uppercase tracking-wider">{title}</h3>
      {description && <p className="text-slate-400 mb-8 max-w-md mx-auto">{description}</p>}
      {actionText && actionHref && (
        <a 
          href={actionHref}
          className="inline-block bg-amber-500 hover:bg-white text-black px-8 py-3 font-bold uppercase tracking-widest transition-colors rounded-sm"
        >
          {actionText}
        </a>
      )}
    </div>
  );
};