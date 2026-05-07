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
        {/* Header avec animation */}
        <div className="mb-16 text-center animate-fadeInDown">
          <h1 className="text-5xl font-bold text-amber-500 mb-4">Nous Contacter</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Des questions ? Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons dans les 24 heures.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards avec animations */}
          {[
            { icon: Mail, title: 'Email', content: 'tradewithwayne1@gmail.com', href: 'mailto:tradewithwayne1@gmail.com', info: 'Réponse dans les 24 heures' },
            { icon: Phone, title: 'Téléphone', content: '+221 77 193 88 74', href: 'tel:+221771938874', info: 'Lun-Ven: 9h-18h' },
            { icon: MapPin, title: 'Adresse', content: 'Mermoz 2ème Porte\nDakar\nSénégal', href: null, info: null }
          ].map(({ icon: Icon, title, content, href, info }, idx) => (
            <div key={title} className="bg-slate-900/50 p-8 rounded-sm border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:scale-105 animate-fadeInUp group" style={{ animationDelay: (idx * 100) + 'ms' }}>
              <div className="flex items-center gap-4 mb-4">
                <Icon className="text-amber-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" size={28} />
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>
              <p className="text-slate-400 whitespace-pre-line">
                {href ? (
                  <a href={href} className="text-amber-500 hover:underline">
                    {content}
                  </a>
                ) : content}
              </p>
              {info && <p className="text-xs text-slate-500 mt-2">{info}</p>}
            </div>
          ))}
        </div>

        {/* Contact Form avec animation */}
        <div className="max-w-2xl mx-auto animate-fadeInUp delay-300">
          <div className="bg-slate-900/30 p-8 rounded-sm border border-amber-500/20 hover:border-amber-500/30 transition-all duration-300">
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

              {/* Submit Button avec effet shimmer */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 text-black font-bold px-6 py-3 rounded-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                      'Envoi...'
                    ) : (
                      <>
                        <Send size={18} />
                        Envoyer le message
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
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
