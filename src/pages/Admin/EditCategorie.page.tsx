import React, { useState, useEffect, useCallback } from 'react';
import { Edit, ArrowLeft } from 'lucide-react';
import { categorieApi } from '../../api/Categorie/categorie.api';
import { useToast } from '../../context/ToastContext';
import { Loading } from '../../components/Complements/Loading';
import { useParams } from 'react-router-dom';

export const EditCategoriePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadCategory = useCallback(async () => {
    try {
      const data = await categorieApi.getById(id!);
      setName(data.name || data.nom || '');
    } catch {
      toast.error('Erreur chargement catégorie');
    } finally {
      setLoading(false);
    }
  }, [id, toast]);

  useEffect(() => { loadCategory(); }, [loadCategory]);

  const handleSubmit = async () => {
    if (!name.trim()) { toast.error('Le nom est requis'); return; }
    setSaving(true);
    try {
      await categorieApi.update(id!, name.trim());
      toast.success('Catégorie modifiée !');
      window.location.href = '/admin/categories';
    } catch {
      toast.error('Erreur lors de la modification');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <Loading size="lg" text="Chargement..." />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      {/* Retour */}
      <a href="/admin/categories"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-green-400 transition-all text-xs uppercase tracking-widest font-bold mb-8 hover:gap-3 animate-fadeInUp">
        <ArrowLeft size={14} /> Retour aux catégories
      </a>

      <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
        <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
          <Edit className="w-7 h-7 text-green-400" />
          Modifier la catégorie
        </h1>
        <p className="text-slate-400 text-sm uppercase tracking-widest">
          ID : {id?.slice(-8).toUpperCase()}
        </p>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md border border-green-500/20 rounded-sm p-8 animate-fadeInUp hover:border-green-500/30 transition-all duration-300 group relative overflow-hidden" style={{ animationDelay: '200ms' }}>
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-green-400 mb-3">
              Nom de la catégorie *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
              placeholder="Ex: Formation, Livre, Coaching..."
              className="w-full px-4 py-3 bg-black/40 border border-green-500/20 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all focus:scale-[1.01]"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-green-500/10">
            <a href="/admin/categories"
              className="flex-1 px-6 py-3 bg-slate-900/40 border border-slate-700 rounded-sm text-white hover:bg-slate-800 transition-all font-bold uppercase tracking-widest text-xs text-center hover:scale-105 active:scale-95">
              Annuler
            </a>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 px-6 py-3 bg-green-500 rounded-sm text-black hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 relative overflow-hidden group/btn"
            >
              <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              {saving ? 'Enregistrement...' : 'Modifier'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
