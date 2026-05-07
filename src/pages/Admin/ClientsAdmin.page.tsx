import { useState, useEffect, useCallback } from 'react';
import { Users, Trash2, Mail, Phone, TrendingUp } from 'lucide-react';
import { userApi } from '../../api/User/user.api';
import { useToast } from '../../context/ToastContext';
import { Loading } from '../../components/Complements/Loading';
import { EmptyState } from '../../components/Complements/EmptyState';
import { ConfirmDialog } from '../../components/Complements/ConfirmDialog';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  number?: string;
  role: 'admin' | 'client';
}

export const ClientsAdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<'clients' | 'admins'>('clients');
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);
  const toast = useToast();

  /* ============================
     LOAD USERS
  ============================ */
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userApi.getAll();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Erreur chargement utilisateurs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  /* ============================
     DELETE USER
  ============================ */
  const handleDelete = async (id: string) => {
    try {
      await userApi.delete(id);
      toast.success('Utilisateur supprimé');
      loadUsers();
    } catch {
      toast.error('Erreur suppression');
    }
  };

  /* ============================
     FILTER BY ROLE
  ============================ */
  const filteredUsers = users.filter(
    (u) => u.role === (viewType === 'clients' ? 'client' : 'admin')
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Loading size="lg" text="Chargement des utilisateurs..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="flex items-center justify-between mb-8 animate-fadeInUp">
        <div>
          <h1 className="text-4xl font-light text-white mb-2">Gestion des utilisateurs</h1>
          <p className="text-slate-400 text-sm uppercase tracking-widest">Gérez tous vos clients et administrateurs</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-green-500/10 rounded-sm p-6 hover:border-green-500/20 transition-all duration-300 hover:scale-[1.02] animate-fadeInUp group relative overflow-hidden" style={{ animationDelay: '100ms' }}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Total Clients</p>
              <p className="text-3xl font-bold text-white mt-2">{users.filter(u => u.role === 'client').length}</p>
            </div>
            <Users className="w-10 h-10 text-green-500/40 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-green-500/10 rounded-sm p-6 hover:border-green-500/20 transition-all duration-300 hover:scale-[1.02] animate-fadeInUp group relative overflow-hidden" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Total Admins</p>
              <p className="text-3xl font-bold text-white mt-2">{users.filter(u => u.role === 'admin').length}</p>
            </div>
            <Users className="w-10 h-10 text-blue-500/40 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-green-500/10 rounded-sm p-6 hover:border-green-500/20 transition-all duration-300 hover:scale-[1.02] animate-fadeInUp group relative overflow-hidden" style={{ animationDelay: '300ms' }}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Avec Email</p>
              <p className="text-3xl font-bold text-white mt-2">{users.filter(u => u.email).length}</p>
            </div>
            <Mail className="w-10 h-10 text-purple-500/40 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-green-500/10 rounded-sm p-6 hover:border-green-500/20 transition-all duration-300 hover:scale-[1.02] animate-fadeInUp group relative overflow-hidden" style={{ animationDelay: '400ms' }}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Actifs</p>
              <p className="text-3xl font-bold text-white mt-2">{users.length}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-emerald-500/40 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-green-500/10 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setViewType('clients')}
            className={`px-6 py-4 rounded-sm transition-all duration-300 font-bold uppercase tracking-widest hover:scale-105 active:scale-95 ${
              viewType === 'clients'
                ? 'bg-green-500 text-black'
                : 'bg-slate-900/40 text-slate-400 hover:text-green-500'
            }`}
          >
            Clients ({users.filter(u => u.role === 'client').length})
          </button>

          <button
            type="button"
            onClick={() => setViewType('admins')}
            className={`px-6 py-4 rounded-sm transition-all duration-300 font-bold uppercase tracking-widest hover:scale-105 active:scale-95 ${
              viewType === 'admins'
                ? 'bg-green-500 text-black'
                : 'bg-slate-900/40 text-slate-400 hover:text-green-500'
            }`}
          >
            Administrateurs ({users.filter(u => u.role === 'admin').length})
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState
          icon={Users}
          title={`Aucun ${viewType === 'clients' ? 'client' : 'administrateur'}`}
          description="Aucun utilisateur pour le moment"
        />
      ) : (
        <div className="bg-gradient-to-b from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-green-500/10 rounded-sm overflow-hidden animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <table className="w-full">
            <thead className="bg-black/20 border-b border-green-500/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-green-500">Nom</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-green-500">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-green-500">Téléphone</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-green-500">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-green-500/10">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-green-500/5 transition-all duration-300 hover:scale-[1.01]">
                  <td className="px-6 py-4 font-medium text-white">
                    {user.nom} {user.prenom}
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-slate-300">
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="w-4 h-4 text-green-500/60" />
                      {user.number || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      aria-label={`Supprimer l'utilisateur ${user.nom} ${user.prenom}`}
                      onClick={() => setDeleteConfirm(user)}
                      className="text-red-400 hover:text-red-300 transition-all hover:bg-red-500/10 p-2 rounded-sm hover:scale-110 active:scale-95"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm._id)}
        title="Supprimer l'utilisateur ?"
        message={`Êtes-vous sûr de vouloir supprimer ${deleteConfirm?.nom} ${deleteConfirm?.prenom} ?`}
        confirmText="Supprimer"
        type="danger"
      />
    </div>
  );
};
