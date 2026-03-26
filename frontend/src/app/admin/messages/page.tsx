'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Mail, Clock } from 'lucide-react';
import { getMessages, deleteMessage, Message } from '@/lib/api';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getMessages()
      .then(setMessages)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce message ?')) return;
    await deleteMessage(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Messages</h1>
        <span className="text-muted text-sm">{messages.length} message(s)</span>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-card animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20">
          <Mail size={48} className="mx-auto text-muted mb-4" />
          <p className="text-muted">Aucun message reçu</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-card border border-card-border"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">{msg.name}</span>
                    <span className="text-muted text-sm">{msg.email}</span>
                  </div>
                  <p className="text-foreground/80 mb-3 whitespace-pre-wrap">{msg.message}</p>
                  <div className="flex items-center gap-1 text-muted text-xs">
                    <Clock size={12} />
                    {new Date(msg.createdAt).toLocaleString('fr-FR')}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-2 rounded-lg hover:bg-red-400/10 text-muted hover:text-red-400 transition-colors shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
