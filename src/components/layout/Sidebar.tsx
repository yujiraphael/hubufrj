'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FolderOpen,
  Award,
  Bot,
  User,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { href: '/hoje', label: 'Hoje', icon: LayoutDashboard },
  { href: '/disciplinas', label: 'Disciplinas', icon: BookOpen },
  { href: '/calendario', label: 'Calendário', icon: Calendar },
  { href: '/materiais', label: 'Materiais', icon: FolderOpen },
  { href: '/notas', label: 'Notas', icon: Award },
  { href: '/ia', label: 'IA', icon: Bot },
  { href: '/perfil', label: 'Perfil', icon: User },
] as const;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Mobile: only render when open to avoid black bar artifact
  // Desktop: always render (lg:relative)
  const shouldRender = typeof window !== 'undefined' ? (window.innerWidth >= 1024 || isOpen) : true;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {shouldRender && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: isOpen ? 0 : -300 }}
          exit={{ x: -300 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed lg:relative z-50 w-64 max-w-sm bg-[var(--surface)] border-r border-[rgba(255,255,255,0.08)] flex flex-col h-screen sticky top-0"
          role="navigation"
          aria-label="Menu principal"
        >
          <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">HubUFRJ</h1>
              <p className="text-xs text-muted-foreground mt-1">Engenharia de Alimentos</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-[var(--elevated)] transition-colors"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * navigation.indexOf(item), duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[var(--elevated)] text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-[var(--elevated)]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span className="font-medium truncate">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
            <p className="text-xs text-muted-foreground text-center">
              Raphael Yuji Fujiwara
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Matrícula: 126052115
            </p>
          </div>
        </motion.aside>
      )}
    </>
  );
}