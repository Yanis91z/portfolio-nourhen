'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Palette } from 'lucide-react';
import { getSettings, updateSettings, Settings } from '@/lib/api';
import { useTheme } from '@/components/ThemeProvider';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { refreshSettings } = useTheme();

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const updated = await updateSettings({
        primaryColor: settings.primaryColor,
        secondaryColor: settings.secondaryColor,
        themeMode: settings.themeMode,
      });
      setSettings(updated);
      refreshSettings();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return <div className="animate-pulse h-96 rounded-2xl bg-card" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Personnalisation</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white transition-all hover:scale-105 disabled:opacity-50"
          style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})` }}
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saved ? 'Sauvegardé !' : 'Sauvegarder'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl space-y-8"
      >
        <div className="p-6 rounded-2xl bg-card border border-card-border space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Palette size={20} className="text-[var(--color-primary)]" />
            <h2 className="text-lg font-semibold">Couleurs</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Couleur principale</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="w-12 h-12 rounded-xl border border-card-border cursor-pointer bg-transparent"
                />
                <input
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none text-foreground font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Couleur secondaire</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="w-12 h-12 rounded-xl border border-card-border cursor-pointer bg-transparent"
                />
                <input
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none text-foreground font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-card-border space-y-4">
          <h2 className="text-lg font-semibold">Mode d&apos;affichage</h2>
          <div className="flex gap-4">
            {['dark', 'light'].map((mode) => (
              <button
                key={mode}
                onClick={() => setSettings({ ...settings, themeMode: mode })}
                className={`flex-1 p-4 rounded-xl border-2 transition-all text-center font-medium ${
                  settings.themeMode === mode
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'border-card-border hover:border-card-border/80'
                }`}
              >
                {mode === 'dark' ? '🌙 Sombre' : '☀️ Clair'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-card-border space-y-3">
          <h2 className="text-lg font-semibold">Prévisualisation</h2>
          <div
            className="h-32 rounded-xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})` }}
          >
            Aperçu du gradient
          </div>
        </div>
      </motion.div>
    </div>
  );
}
