'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, Brain, Video, MessageSquare } from 'lucide-react';
import { getProjects, getSkills, getVideos, getMessages } from '@/lib/api';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ projects: 0, skills: 0, videos: 0, messages: 0 });

  useEffect(() => {
    Promise.all([getProjects(), getSkills(), getVideos(), getMessages()]).then(
      ([projects, skills, videos, messages]) => {
        setCounts({
          projects: projects.length,
          skills: skills.length,
          videos: videos.length,
          messages: messages.length,
        });
      }
    ).catch(() => {});
  }, []);

  const cards = [
    { label: 'Projets', count: counts.projects, icon: FolderKanban, color: '#6366f1' },
    { label: 'Compétences', count: counts.skills, icon: Brain, color: '#8b5cf6' },
    { label: 'Vidéos', count: counts.videos, icon: Video, color: '#ec4899' },
    { label: 'Messages', count: counts.messages, icon: MessageSquare, color: '#10b981' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-card-border"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: card.color + '20' }}
                >
                  <Icon size={22} style={{ color: card.color }} />
                </div>
                <span className="text-3xl font-bold">{card.count}</span>
              </div>
              <p className="text-muted text-sm">{card.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
