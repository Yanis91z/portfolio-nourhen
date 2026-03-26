'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import { getAbout, updateAbout, About } from '@/lib/api';
import FileUpload from '@/components/FileUpload';

export default function AdminAboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAbout().then(setAbout).catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!about) return;
    setSaving(true);
    try {
      const updated = await updateAbout({
        name: about.name,
        title: about.title,
        description: about.description,
        photoUrl: about.photoUrl || undefined,
      });
      setAbout(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (!about) return <div className="animate-pulse h-96 rounded-2xl bg-card" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">À propos</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white transition-all hover:scale-105 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saved ? 'Sauvegardé !' : 'Sauvegarder'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 max-w-2xl"
      >
        <FileUpload
          label="Photo de profil"
          value={about.photoUrl || ''}
          onChange={(url) => setAbout({ ...about, photoUrl: url })}
        />

        <div>
          <label className="text-sm font-medium mb-2 block">Nom</label>
          <input
            value={about.name}
            onChange={(e) => setAbout({ ...about, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none transition-colors text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Titre</label>
          <input
            value={about.title}
            onChange={(e) => setAbout({ ...about, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none transition-colors text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Description</label>
          <textarea
            value={about.description}
            onChange={(e) => setAbout({ ...about, description: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none text-foreground"
          />
        </div>
      </motion.div>
    </div>
  );
}
