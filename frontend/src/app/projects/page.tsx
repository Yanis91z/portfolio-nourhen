'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, GitFork } from 'lucide-react';
import { getProjects, Project } from '@/lib/api';
import AnimatedBlobs from '@/components/AnimatedBlobs';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 relative">
      <AnimatedBlobs />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="gradient-text">Réalisations</span>
          </h1>
          <p className="text-muted text-lg mb-12 max-w-2xl">
            Découvrez mes réalisations en communication et marketing, de la stratégie à la création.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-card border border-card-border h-80 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-muted text-center py-20">Aucune réalisation pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link href={`/projects/${project.id}`} className="h-full">
                  <div className="group rounded-2xl bg-card border border-card-border overflow-hidden transition-all duration-300 hover:border-[var(--color-primary)] hover:-translate-y-2 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 h-full flex flex-col">
                    <div className="h-48 overflow-hidden bg-card-border">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl.startsWith('http') ? project.imageUrl : `${API}${project.imageUrl}`}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-white text-3xl font-bold"
                          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                        >
                          {project.title.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3 flex flex-col flex-1">
                      <h3 className="text-xl font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted text-sm line-clamp-2">{project.shortDescription}</p>

                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3 pt-2 mt-auto">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl.match(/^https?:\/\//) ? project.githubUrl : `https://${project.githubUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-muted hover:text-[var(--color-primary)] transition-colors"
                          >
                            <GitFork size={16} />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl.match(/^https?:\/\//) ? project.demoUrl : `https://${project.demoUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-muted hover:text-[var(--color-primary)] transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
