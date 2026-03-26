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
        className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.08]"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          borderRadius: blobShapes[0],
        }}
        animate={{ borderRadius: blobShapes }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-20 w-[450px] h-[450px] opacity-[0.08]"
        style={{
          background: 'linear-gradient(225deg, var(--color-secondary), var(--color-primary))',
          borderRadius: blobShapes2[0],
        }}
        animate={{ borderRadius: blobShapes2 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-24 right-12 w-20 h-20 border-2 border-[var(--color-primary)]/20"
        style={{ borderRadius: blobShapes[0] }}
        animate={{
          borderRadius: blobShapes,
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-32 left-8 w-14 h-14 border-2 border-[var(--color-secondary)]/20"
        style={{ borderRadius: blobShapes2[0] }}
        animate={{
          borderRadius: blobShapes2,
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute top-1/3 left-6 w-3 h-3 rounded-full bg-[var(--color-primary)]/30"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-10 w-2 h-2 rounded-full bg-[var(--color-secondary)]/30"
        animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]/25"
        animate={{ y: [0, -25, 0], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}
