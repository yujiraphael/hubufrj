'use client';

import { motion } from 'framer-motion';
import { Search, Bell, Menu, X, Command, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Avatar } from '@/components/shared/Avatar';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[var(--surface)] border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-[var(--elevated)] transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: searchOpen ? 1 : 0, width: searchOpen ? 320 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative hidden lg:flex"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            placeholder="Buscar... (Cmd+K)"
            className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[rgba(255,255,255,0.08)] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            aria-label="Busca global"
            autoComplete="off"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-xs bg-[var(--elevated)] border border-[rgba(255,255,255,0.08)] rounded text-muted-foreground">
            <Command className="h-3 w-3 inline-block align-middle mr-1" />K
          </kbd>
        </motion.div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-[var(--elevated)] transition-colors"
            aria-label="Notificações"
            aria-expanded={notificationsOpen}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true" />
          </button>

          {notificationsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 top-full mt-2 w-80 bg-[var(--elevated)] border border-[rgba(255,255,255,0.08)] rounded-lg shadow-lg p-4 z-50"
            >
              <h3 className="font-medium text-foreground mb-3">Notificações</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center py-4">Nenhuma notificação por enquanto</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative">
          <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-[var(--elevated)] transition-colors">
            <Avatar name="Raphael Yuji Fujiwara" size="sm" />
          </button>
        </div>
      </div>
    </header>
  );
}