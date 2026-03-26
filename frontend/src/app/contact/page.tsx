'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare } from 'lucide-react';
import { sendMessage } from '@/lib/api';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    try {
      await sendMessage(data);
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Me <span className="gradient-text">Contacter</span>
          </h1>
          <p className="text-muted text-lg mb-12">
            Une question, une collaboration ou un projet ? N&apos;hésitez pas à me contacter.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <User size={16} /> Nom
            </label>
            <input
              {...register('name', { required: 'Nom requis' })}
              className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none transition-colors text-foreground"
              placeholder="Votre nom"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Mail size={16} /> Email
            </label>
            <input
              {...register('email', {
                required: 'Email requis',
                pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' },
              })}
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none transition-colors text-foreground"
              placeholder="votre@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <MessageSquare size={16} /> Message
            </label>
            <textarea
              {...register('message', { required: 'Message requis' })}
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none text-foreground"
              placeholder="Votre message..."
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} /> Envoyer
              </>
            )}
          </button>

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl"
            >
              <CheckCircle size={20} /> Message envoyé avec succès !
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl"
            >
              <AlertCircle size={20} /> Erreur lors de l&apos;envoi. Veuillez réessayer.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
