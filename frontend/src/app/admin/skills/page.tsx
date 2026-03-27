'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, Loader2 } from 'lucide-react';
import { getSkills, createSkill, updateSkill, deleteSkill, Skill } from '@/lib/api';

type Draft = { id?: number; name: string; level: number };

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => getSkills().then(setSkills).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const openNew = () => setDraft({ name: '', level: 50 });
  const openEdit = (s: Skill) => setDraft({ id: s.id, name: s.name, level: s.level });
  const closeDraft = () => setDraft(null);

  const saveDraft = async () => {
    if (!draft || !draft.name.trim()) return;
    setSaving(true);
    try {
      if (draft.id != null) {
        await updateSkill(draft.id, { name: draft.name.trim(), level: draft.level });
      } else {
        await createSkill({ name: draft.name.trim(), level: draft.level });
      }
      closeDraft();
      await load();
    } catch {
      alert('Erreur lors de l’enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette compétence ?')) return;
    await deleteSkill(id);
    load();
  };

  const isEditing = draft !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Compétences</h1>
        <button
          type="button"
          onClick={() => {
            closeDraft();
            openNew();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="p-6 rounded-2xl bg-card border border-card-border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  {draft?.id != null ? 'Modifier la compétence' : 'Nouvelle compétence'}
                </h3>
                <button
                  type="button"
                  onClick={closeDraft}
                  className="p-1 hover:bg-card-border rounded-lg"
                  aria-label="Fermer"
                >
                  <X size={16} />
                </button>
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">Nom</label>
                <input
                  value={draft?.name ?? ''}
                  onChange={(e) => setDraft((d) => (d ? { ...d, name: e.target.value } : d))}
                  placeholder="Ex. Photoshop, SEO, Analytics…"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none text-foreground"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Niveau</span>
                  <span className="font-mono text-[var(--color-primary)]">{draft?.level ?? 0}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={draft?.level ?? 0}
                  onChange={(e) =>
                    setDraft((d) => (d ? { ...d, level: Number(e.target.value) } : d))
                  }
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={saveDraft}
                  disabled={saving || !draft?.name.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {draft?.id != null ? 'Enregistrer' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={closeDraft}
                  className="px-5 py-2.5 rounded-xl font-medium border border-card-border hover:bg-card-border/50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            layout
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-card border border-card-border hover:border-[var(--color-primary)]/25 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-lg truncate">{skill.name}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-card-border overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${skill.level}%`,
                      background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                    }}
                  />
                </div>
                <span className="text-sm font-mono text-[var(--color-primary)] tabular-nums shrink-0">
                  {skill.level}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => openEdit(skill)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-card-border hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/10 text-sm font-medium transition-colors"
              >
                <Pencil size={16} /> Modifier
              </button>
              <button
                type="button"
                onClick={() => handleDelete(skill.id)}
                className="p-2 rounded-xl hover:bg-red-400/10 text-muted hover:text-red-400 transition-colors"
                aria-label="Supprimer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {skills.length === 0 && !isEditing && (
        <p className="text-muted text-center py-16 rounded-2xl border border-dashed border-card-border">
          Aucune compétence — cliquez sur « Ajouter » pour commencer.
        </p>
      )}
    </div>
  );
}
