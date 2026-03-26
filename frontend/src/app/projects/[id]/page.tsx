'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, GitFork, ExternalLink } from 'lucide-react';
import { getProject, Project } from '@/lib/api';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      getProject(Number(params.id))
        .then(setProject)
        .catch(() => router.push('/projects'))
        .finally(() => setLoading(false));
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="h-80 rounded-2xl bg-card animate-pulse" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button
            onClick={() => router.push('/projects')}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-card-border bg-card/50 backdrop-blur-sm text-sm font-medium text-muted hover:text-foreground hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/5 transition-all duration-300 mb-8"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Retour aux réalisations
          </button>

          {project.imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-card-border mb-8">
              <img
                src={project.imageUrl.startsWith('http') ? project.imageUrl : `${API}${project.imageUrl}`}
                alt={project.title}
                className="w-full max-h-[500px] object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>

          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-4 mb-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl.match(/^https?:\/\//) ? project.githubUrl : `https://${project.githubUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-card-border hover:bg-card transition-colors"
              >
                <GitFork size={18} /> GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl.match(/^https?:\/\//) ? project.demoUrl : `https://${project.demoUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
              >
                <ExternalLink size={18} /> Démo live
              </a>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap text-lg">
              {project.longDescription}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
