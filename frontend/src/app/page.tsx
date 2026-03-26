'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { getAbout, About } from '@/lib/api';

function GradientBlob() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] z-0"
      style={{
        x: springX,
        y: springY,
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
      }}
    />
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function HomePage() {
  const [about, setAbout] = useState<About | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAbout().then(setAbout).catch(() => { });
  }, []);

  return (
    <>
      <GradientBlob />

      <section ref={heroRef} className="relative min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <motion.p
                custom={0}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="text-sm font-mono text-[var(--color-primary)] tracking-wider uppercase"
              >
                Bienvenue sur mon portfolio
              </motion.p>

              <motion.h1
                custom={1}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-7xl font-bold leading-tight"
              >
                {about?.name || 'Nourhen Ghlissi'}
                <br />
                <span className="gradient-text">{about?.title || 'Marketing Digital'}</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="text-lg text-muted max-w-lg leading-relaxed"
              >
                {about?.description || 'Étudiante en Marketing Digital, passionnée par la stratégie digitale et la création de contenu.'}
              </motion.p>

              <motion.div
                custom={3}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-transform hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                >
                  Mes réalisations <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium border border-card-border text-foreground hover:bg-card transition-all hover:scale-105"
                >
                  <Mail size={18} /> Me contacter
                </Link>
              </motion.div>
            </div>

            <motion.div
              custom={2}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="relative z-10 flex justify-center"
            >
              <div className="relative group">
                <div
                  className="absolute -inset-2 rounded-3xl opacity-60 blur-xl group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                />
                <div
                  className="absolute -inset-1 rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                />
                {about?.photoUrl ? (
                  <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden ring-2 ring-white/10">
                    <img
                      src={about.photoUrl.startsWith('http') ? about.photoUrl : `${process.env.NEXT_PUBLIC_API_URL}${about.photoUrl}`}
                      alt={about.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div
                    className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl flex items-center justify-center text-6xl font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                  >
                    {(about?.name || 'N').charAt(0)}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Projets réalisés', value: '10+' },
              { label: 'Compétences', value: '15+' },
              { label: 'Formations', value: 'L3' },
              { label: 'Créativité', value: '100%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-card border border-card-border">
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
