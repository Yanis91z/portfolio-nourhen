'use client';

import { motion } from 'framer-motion';

const blobKeyframes = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 50% 40% 60% / 40% 70% 50% 50%',
  '40% 60% 50% 50% / 60% 40% 60% 30%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
];

interface BlobProps {
  className?: string;
  size?: string;
  duration?: number;
  gradient?: string;
}

function Blob({ className = '', size = '300px', duration = 10, gradient }: BlobProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute opacity-15 blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: gradient || 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
        borderRadius: blobKeyframes[0],
      }}
      animate={{ borderRadius: blobKeyframes }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <Blob className="top-[10%] -right-[5%]" size="400px" duration={12} />
      <Blob
        className="bottom-[15%] -left-[5%]" size="350px" duration={14}
        gradient="linear-gradient(225deg, var(--color-secondary), var(--color-primary))"
      />
    </div>
  );
}
