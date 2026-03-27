'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { getSkills, Skill } from '@/lib/api';
import AnimatedBlobs from '@/components/AnimatedBlobs';

function levelLabel(level: number): string {
  if (level <= 40) return 'En découverte';
  if (level <= 70) return 'À l’aise';
  return 'Maîtrise solide';
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(
    () => [...skills].sort((a, b) => b.level - a.level || a.name.localeCompare(b.name)),
    [skills],
  );

  return (
    <section className="py-12 md:py-16 relative min-h-[70vh]">
      <AnimatedBlobs />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left mb-12 md:mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="gradient-text">Compétences</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Outils et savoir-faire en communication et marketing — du stratégique à la création.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 rounded-2xl bg-card border border-card-border animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-muted text-center py-20 rounded-2xl border border-dashed border-card-border">
            Aucune compétence ajoutée pour le moment.
          </p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {sorted.map((skill, i) => {
              const initial = skill.name.trim().charAt(0).toUpperCase() || '?';
              return (
                <motion.li
                  key={skill.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative"
                >
                  <div className="relative h-full rounded-2xl p-6 md:p-7 overflow-hidden border border-card-border bg-card/60 backdrop-blur-sm transition-all duration-300 group-hover:border-[color-mix(in_srgb,var(--color-primary)_45%,var(--card-border))] group-hover:shadow-[0_20px_50px_-20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]">
                    <div className="relative flex gap-5">
                      <div className="relative shrink-0 w-14 h-14 md:w-16 md:h-16">
                        <svg
                          className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] opacity-50 group-hover:opacity-80 transition-opacity"
                          viewBox="0 0 100 100"
                          aria-hidden
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="44"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-card-border"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="44"
                            fill="none"
                            stroke={`url(#skillRingGrad-${skill.id})`}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={`${(skill.level / 100) * 276} 276`}
                            transform="rotate(-90 50 50)"
                          />
                          <defs>
                            <linearGradient id={`skillRingGrad-${skill.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="var(--color-primary)" />
                              <stop offset="100%" stopColor="var(--color-secondary)" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div
                          className="relative w-full h-full rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold text-white shadow-lg"
                          style={{
                            background: `linear-gradient(145deg, var(--color-primary), var(--color-secondary))`,
                            boxShadow: `0 8px 32px color-mix(in srgb, var(--color-primary) 35%, transparent)`,
                          }}
                        >
                          {initial}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex flex-wrap items-baseline gap-2 gap-y-1 justify-between">
                          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                            {skill.name}
                          </h2>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium uppercase tracking-wide bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                            {skill.level}%
                          </span>
                        </div>
                        <p className="text-sm text-muted mt-1.5 mb-4">{levelLabel(skill.level)}</p>
                        <div className="relative h-3 rounded-full bg-card-border/80 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 + 0.15, duration: 0.85, ease: 'easeOut' }}
                            className="h-full rounded-full relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                            }}
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
