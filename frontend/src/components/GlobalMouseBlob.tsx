'use client';

import { usePathname } from 'next/navigation';
import MouseGradientBlob from '@/components/MouseGradientBlob';

export default function GlobalMouseBlob() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin') || pathname === '/login') return null;
  return <MouseGradientBlob />;
}
