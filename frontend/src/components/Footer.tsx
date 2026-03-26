'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin') || pathname === '/login') return null;

  return (
    <footer className="border-t border-card-border mt-auto bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center text-muted text-sm">
        <p>&copy; {new Date().getFullYear()} Portfolio. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
