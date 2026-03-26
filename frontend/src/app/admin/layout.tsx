'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Brain,
  Video,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/about', label: 'À propos', icon: User },
  { href: '/admin/projects', label: 'Projets', icon: FolderKanban },
  { href: '/admin/skills', label: 'Compétences', icon: Brain },
  { href: '/admin/videos', label: 'Vidéos', icon: Video },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Thème', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen -mt-20">
      <aside className="w-64 bg-card border-r border-card-border flex flex-col shrink-0">
        <div className="p-6 border-b border-card-border">
          <h2 className="text-lg font-bold gradient-text">Admin Panel</h2>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'text-muted hover:text-foreground hover:bg-card-border/50'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-card-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all w-full"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-8 overflow-auto"
      >
        {children}
      </motion.div>
    </div>
  );
}
