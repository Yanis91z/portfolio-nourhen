'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, Loader2 } from 'lucide-react';
import { getProjects, createProject, updateProject, deleteProject, Project } from '@/lib/api';
import FileUpload from '@/components/FileUpload';

const emptyProject = {
  title: '',
  shortDescription: '',
  longDescription: '',
  imageUrl: '',
  techStack: [] as string[],
  githubUrl: '',
  demoUrl: '',
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');

  const load = () => getProjects().then(setProjects).catch(() => {});
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing({ ...emptyProject }); setEditId(null); setTechInput(''); };
  const openEdit = (p: Project) => { setEditing({ ...p }); setEditId(p.id); setTechInput(p.techStack?.join(', ') || ''); };
  const close = () => { setEditing(null); setEditId(null); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const data = {
      ...editing,
      techStack: techInput.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await updateProject(editId, data);
      } else {
        await createProject(data);
      }
      await load();
      close();
    } catch {
      alert('Erreur');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce projet ?')) return;
    await deleteProject(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Projets</h1>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="rounded-2xl border border-card-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-card border-b border-card-border">
              <th className="text-left px-6 py-4 text-sm font-medium text-muted">Titre</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-muted">Description</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-muted">Stack</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-card-border hover:bg-card/50 transition-colors">
                <td className="px-6 py-4 font-medium">{p.title}</td>
                <td className="px-6 py-4 text-muted text-sm max-w-xs truncate">{p.shortDescription}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {p.techStack?.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-card transition-colors text-muted hover:text-foreground">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-400/10 transition-colors text-muted hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-muted">Aucun projet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-card-border rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{editId ? 'Modifier' : 'Nouveau'} projet</h2>
                <button onClick={close} className="p-2 rounded-lg hover:bg-card"><X size={18} /></button>
              </div>

              <div className="space-y-5">
                <FileUpload
                  label="Image"
                  value={editing.imageUrl || ''}
                  onChange={(url) => setEditing({ ...editing, imageUrl: url })}
                />

                <div>
                  <label className="text-sm font-medium mb-2 block">Titre</label>
                  <input
                    value={editing.title || ''}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none text-foreground"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description courte</label>
                  <input
                    value={editing.shortDescription || ''}
                    onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none text-foreground"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description longue</label>
                  <textarea
                    value={editing.longDescription || ''}
                    onChange={(e) => setEditing({ ...editing, longDescription: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none resize-none text-foreground"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Technologies (séparées par des virgules)</label>
                  <input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Adobe Illustrator, Canva, Photoshop, Premiere Pro"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Lien GitHub</label>
                    <input
                      value={editing.githubUrl || ''}
                      onChange={(e) => setEditing({ ...editing, githubUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Lien Démo</label>
                    <input
                      value={editing.demoUrl || ''}
                      onChange={(e) => setEditing({ ...editing, demoUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none text-foreground"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {editId ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
