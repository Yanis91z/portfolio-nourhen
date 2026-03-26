'use client';

import { motion } from 'framer-motion';

const blobShapes = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 50% 40% 60% / 40% 70% 50% 50%',
  '40% 60% 50% 50% / 60% 40% 60% 30%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
];

const blobShapes2 = [
  '40% 60% 50% 50% / 60% 40% 60% 30%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '50% 50% 40% 60% / 40% 70% 50% 50%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '40% 60% 50% 50% / 60% 40% 60% 30%',
];

export default function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      <motion.div
        className="absolute -top-20 -right-20 w-[250px] h-[250px] md:w-[500px] md:h-[500px] opacity-[0.08]"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          borderRadius: blobShapes[0],
        }}
        animate={{ borderRadius: blobShapes }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 w-[200px] h-[200px] md:-bottom-32 md:-left-20 md:w-[450px] md:h-[450px] opacity-[0.08]"
        style={{
          background: 'linear-gradient(225deg, var(--color-secondary), var(--color-primary))',
          borderRadius: blobShapes2[0],
        }}
        animate={{ borderRadius: blobShapes2 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-24 right-12 w-10 h-10 md:w-20 md:h-20 border-2 border-[var(--color-primary)]/20"
        style={{ borderRadius: blobShapes[0] }}
        animate={{
          borderRadius: blobShapes,
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-44 left-12 w-8 h-8 md:bottom-32 md:left-8 md:w-14 md:h-14 border-2 border-[var(--color-secondary)]/20"
        style={{ borderRadius: blobShapes2[0] }}
        animate={{
          borderRadius: blobShapes2,
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute top-1/3 left-6 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[var(--color-primary)]/30"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-10 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--color-secondary)]/30"
        animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-[var(--color-primary)]/25"
        animate={{ y: [0, -25, 0], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}
