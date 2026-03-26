'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSkills, Skill } from '@/lib/api';
import AnimatedBlobs from '@/components/AnimatedBlobs';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 relative">
      <AnimatedBlobs />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="gradient-text">Compétences</span>
          </h1>
          <p className="text-muted text-lg mb-12 max-w-2xl">
            Les outils et savoir-faire que je maîtrise en communication et marketing.
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-card animate-pulse" />
            ))}
          </div>
        ) : skills.length === 0 ? (
          <p className="text-muted text-center py-20">Aucune compétence ajoutée pour le moment.</p>
        ) : (
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-5 rounded-xl bg-card border border-card-border"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-lg">{skill.name}</span>
                  <span className="text-sm font-mono text-[var(--color-primary)]">{skill.level}%</span>
                </div>
                <div className="h-3 rounded-full bg-card-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
