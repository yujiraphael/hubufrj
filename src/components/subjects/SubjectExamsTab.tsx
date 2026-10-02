'use client';

import { CalendarPlus } from 'lucide-react';
import type { Subject } from './types';

interface SubjectExamsTabProps {
  subject: Subject;
}

export function SubjectExamsTab({ subject }: SubjectExamsTabProps) {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--elevated)]">
          <CalendarPlus className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-foreground">Nenhuma avaliação cadastrada</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Quando você adicionar provas e trabalhos de {subject.name}, eles aparecerão aqui.
        </p>
        <button type="button" disabled className="mt-5 min-h-11 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-70">
          Adicionar avaliação
        </button>
      </div>
    </div>
  );
}
