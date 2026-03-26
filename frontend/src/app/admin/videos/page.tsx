'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, Loader2 } from 'lucide-react';
import { getVideos, createVideo, updateVideo, deleteVideo, Video } from '@/lib/api';
import FileUpload from '@/components/FileUpload';

const emptyVideo = { title: '', description: '', videoUrl: '' };

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [editing, setEditing] = useState<Partial<Video> | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => getVideos().then(setVideos).catch(() => {});
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing({ ...emptyVideo }); setEditId(null); };
  const openEdit = (v: Video) => { setEditing({ ...v }); setEditId(v.id); };
  const close = () => { setEditing(null); setEditId(null); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editId) {
        await updateVideo(editId, editing);
      } else {
        await createVideo(editing);
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
    if (!confirm('Supprimer cette vidéo ?')) return;
    await deleteVideo(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Vidéos</h1>
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
              <th className="text-right px-6 py-4 text-sm font-medium text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((v) => (
              <tr key={v.id} className="border-b border-card-border hover:bg-card/50 transition-colors">
                <td className="px-6 py-4 font-medium">{v.title}</td>
                <td className="px-6 py-4 text-muted text-sm max-w-xs truncate">{v.description}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(v)} className="p-2 rounded-lg hover:bg-card transition-colors text-muted hover:text-foreground">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(v.id)} className="p-2 rounded-lg hover:bg-red-400/10 transition-colors text-muted hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {videos.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-muted">Aucune vidéo</td></tr>
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
              className="bg-background border border-card-border rounded-2xl p-8 w-full max-w-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{editId ? 'Modifier' : 'Nouvelle'} vidéo</h2>
                <button onClick={close} className="p-2 rounded-lg hover:bg-card"><X size={18} /></button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium mb-2 block">Titre</label>
                  <input
                    value={editing.title || ''}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none text-foreground"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    value={editing.description || ''}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-card-border focus:border-[var(--color-primary)] focus:outline-none resize-none text-foreground"
                  />
                </div>

                <FileUpload
                  label="Fichier vidéo"
                  value={editing.videoUrl || ''}
                  onChange={(url) => setEditing({ ...editing, videoUrl: url })}
                  accept="video/*"
                />

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
