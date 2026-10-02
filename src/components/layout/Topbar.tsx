'use client';

import { Menu } from 'lucide-react';
import { Avatar } from '@/components/shared/Avatar';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <div className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
      <header className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-black/45 px-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:px-3 lg:h-16">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1 text-center lg:text-left">
          <div className="inline-flex flex-col items-center lg:items-start">
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">HubUFRJ</span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">Seu espaço acadêmico</span>
          </div>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-white/[0.06]"
          aria-label="Abrir perfil"
        >
          <Avatar name="Raphael Yuji Fujiwara" size="sm" className="ring-1 ring-white/10" />
        </button>
      </header>
    </div>
  );
}
