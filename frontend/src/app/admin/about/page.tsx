'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { getAbout, updateAbout, About } from '@/lib/api';
import FileUpload from '@/components/FileUpload';

const defaultStats = [
  { value: '10+', label: 'Projets réalisés' },
  { value: '15+', label: 'Compétences' },
  { value: 'L3', label: 'Formations' },
  { value: '100%', label: 'Créativité' },
];

export default function AdminAboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [stats, setStats] = useState<{ value: string; label: string }[]>(defaultStats);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAbout().then((data) => {
      setAbout(data);
      if (data.stats && data.stats.length > 0) {
        setStats(data.stats);
      }
    }).catch(() => {});
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
        stats,
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

  const updateStat = (index: number, field: 'value' | 'label', val: string) => {
    setStats(stats.map((s, i) => i === index ? { ...s, [field]: val } : s));
  };

  const addStat = () => setStats([...stats, { value: '', label: '' }]);

  const removeStat = (index: number) => setStats(stats.filter((_, i) => i !== index));

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

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium">Statistiques</label>
            <button
              type="button"
              onClick={addStat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-card-border hover:bg-card transition-colors"
            >
              <Plus size={14} /> Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {stats.map((stat, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  value={stat.value}
                  onChange={(e) => updateStat(i, 'value', e.target.value)}
                  placeholder="Valeur (ex: 10+)"
                  className="w-28 px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none transition-colors text-foreground"
                />
                <input
                  value={stat.label}
                  onChange={(e) => updateStat(i, 'label', e.target.value)}
                  placeholder="Libellé (ex: Projets réalisés)"
                  className="flex-1 px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none transition-colors text-foreground"
                />
                <button
                  type="button"
                  onClick={() => removeStat(i)}
                  className="p-2.5 rounded-xl text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
