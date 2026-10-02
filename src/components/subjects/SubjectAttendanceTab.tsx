'use client';

import { UserPlus } from 'lucide-react';
import type { Subject } from './types';

interface SubjectAttendanceTabProps {
  subject: Subject;
}

export function SubjectAttendanceTab({ subject }: SubjectAttendanceTabProps) {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--elevated)]">
          <UserPlus className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-foreground">Nenhuma frequência registrada</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Registre as aulas de {subject.name} quando a persistência estiver conectada.
        </p>
        <button type="button" disabled className="mt-5 min-h-11 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-70">
          Registrar aula
        </button>
      </div>
    </div>
  );
}
