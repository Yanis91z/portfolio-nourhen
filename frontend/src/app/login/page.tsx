'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, LogIn, AlertCircle } from 'lucide-react';
import { login } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { access_token } = await login(email, password);
      localStorage.setItem('token', access_token);
      document.cookie = `token=${access_token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      router.push('/admin');
    } catch {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen -mt-20 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
          >
            <Lock className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold">Administration</h1>
          <p className="text-muted mt-2">Connectez-vous pour gérer votre portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl bg-card border border-card-border">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Mail size={16} /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none transition-colors text-foreground"
              placeholder="admin@portfolio.com"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Lock size={16} /> Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none transition-colors text-foreground"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl text-sm"
            >
              <AlertCircle size={16} /> {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={18} /> Se connecter
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
