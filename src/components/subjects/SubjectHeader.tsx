'use client';

import { ArrowLeft, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Subject } from './types';

interface SubjectHeaderProps {
  subject: Subject;
}

export function SubjectHeader({ subject }: SubjectHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-[var(--elevated)] hover:text-foreground"
          aria-label="Voltar para a página anterior"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-inset ring-white/10">
            <BookOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground">{subject.code}</p>
            <h1 className="truncate text-base font-semibold tracking-[-0.02em] text-foreground sm:text-lg">{subject.name}</h1>
          </div>
        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-muted-foreground">
          Em configuração
        </span>
      </div>
    </header>
  );
}
