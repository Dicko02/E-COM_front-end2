import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { mailApi } from '../api/Mail/mail.api'

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      mailApi.contact(formData);

      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset le formulaire apres 5 secondes
      setTimeout(() => setSubmitted(false), 5000);

    } catch (err) {
      setError('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-amber-500 mb-4">Nous Contacter</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Des questions ? Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons dans les 24 heures.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="bg-slate-900/50 p-8 rounded-sm border border-amber-500/20">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="text-amber-500" size={28} />
              <h3 className="text-xl font-bold text-white">Email</h3>
            </div>
            <p className="text-slate-400">
              <a href="mailto:wayne@med.com" className="text-amber-500 hover:underline">
                wayne@med.com
              </a>
            </p>
            <p className="text-xs text-slate-500 mt-2">Réponse dans les 24 heures</p>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-sm border border-amber-500/20">
            <div className="flex items-center gap-4 mb-4">
              <Phone className="text-amber-500" size={28} />
              <h3 className="text-xl font-bold text-white">Téléphone</h3>
            </div>
            <p className="text-slate-400">
              <a href="tel:+33XXXXXXXXX" className="text-amber-500 hover:underline">
                +33 (0) X XX XX XX XX
              </a>
            </p>
            <p className="text-xs text-slate-500 mt-2">Lun-Ven: 9h-18h</p>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-sm border border-amber-500/20">
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="text-amber-500" size={28} />
              <h3 className="text-xl font-bold text-white">Adresse</h3>
            </div>
            <p className="text-slate-400 text-sm">
              [ADRESSE PHYSIQUE À REMPLIR]<br/>
              [CODE POSTAL] [VILLE]<br/>
              France
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900/30 p-8 rounded-sm border border-amber-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-sm text-emerald-400">
                ✓ Message envoyé avec succès ! Nous vous répondrons sous peu.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-sm text-red-400">
                ✗ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-sm focus:border-amber-500 focus:outline-none text-white placeholder-slate-500"
                  placeholder="Votre nom"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-sm focus:border-amber-500 focus:outline-none text-white placeholder-slate-500"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-sm focus:border-amber-500 focus:outline-none text-white placeholder-slate-500"
                  placeholder="Objet de votre message"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-sm focus:border-amber-500 focus:outline-none text-white placeholder-slate-500 resize-none"
                  placeholder="Détaillez votre message..."
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 text-black font-bold px-6 py-3 rounded-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    'Envoi...'
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </div>

              {/* Privacy Notice */}
              <p className="text-xs text-slate-500 text-center">
                En envoyant ce formulaire, vous acceptez notre{' '}
                <a href="/privacy" className="text-amber-500 hover:underline">
                  Politique de Confidentialité
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
