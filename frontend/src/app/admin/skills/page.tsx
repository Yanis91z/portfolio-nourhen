'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Save, Loader2 } from 'lucide-react';
import { getSkills, createSkill, updateSkill, deleteSkill, Skill } from '@/lib/api';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLevel, setNewLevel] = useState(50);
  const [saving, setSaving] = useState(false);

  const load = () => getSkills().then(setSkills).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      await createSkill({ name: newName, level: newLevel });
      setNewName('');
      setNewLevel(50);
      setShowNew(false);
      await load();
    } catch {
      alert('Erreur');
    } finally {
      setSaving(false);
    }
  };

  const handleLevelChange = async (skill: Skill, level: number) => {
    setSkills(skills.map((s) => (s.id === skill.id ? { ...s, level } : s)));
    try {
      await updateSkill(skill.id, { level });
    } catch {
      load();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette compétence ?')) return;
    await deleteSkill(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Compétences</h1>
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="p-6 rounded-2xl bg-card border border-card-border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Nouvelle compétence</h3>
                <button onClick={() => setShowNew(false)} className="p-1 hover:bg-card-border rounded-lg"><X size={16} /></button>
              </div>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nom de la compétence"
                className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-[var(--color-primary)] focus:outline-none text-foreground"
              />
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Niveau</span>
                  <span className="font-mono text-[var(--color-primary)]">{newLevel}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={newLevel}
                  onChange={(e) => setNewLevel(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white transition-all hover:scale-105 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Créer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            layout
            className="flex items-center gap-4 p-5 rounded-xl bg-card border border-card-border"
          >
            <span className="font-medium w-40 shrink-0">{skill.name}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={skill.level}
              onChange={(e) => handleLevelChange(skill, Number(e.target.value))}
              className="flex-1 accent-[var(--color-primary)]"
            />
            <span className="text-sm font-mono text-[var(--color-primary)] w-12 text-right">{skill.level}%</span>
            <button
              onClick={() => handleDelete(skill.id)}
              className="p-2 rounded-lg hover:bg-red-400/10 text-muted hover:text-red-400 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
        {skills.length === 0 && (
          <p className="text-muted text-center py-12">Aucune compétence</p>
        )}
      </div>
    </div>
  );
}
