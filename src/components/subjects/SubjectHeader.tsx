'use client';

import { ArrowLeft, BookOpen, User, MapPin, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Subject } from './types';
import { createSubjectSummary } from './types';

interface SubjectHeaderProps {
  subject: Subject;
}

export function SubjectHeader({ subject }: SubjectHeaderProps) {
  const router = useRouter();
  const summary = createSubjectSummary(subject, new Date());

  return (
    <header className="bg-[var(--surface)] border-b border-[var(--border)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-[var(--elevated)] hover:text-foreground"
            aria-label="Voltar para a página anterior"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Voltar</span>
          </button>

          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{subject.code}</p>
                <h1 className="text-xl font-semibold text-foreground truncate">{subject.name}</h1>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                {subject.professor}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {subject.schedule.room}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {subject.schedule.startTime}–{subject.schedule.endTime}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              summary.status === 'current' ? 'bg-blue-500/20 text-blue-400' :
              summary.status === 'upcoming' ? 'bg-amber-500/20 text-amber-400' :
              summary.status === 'done' ? 'bg-green-500/20 text-green-400' :
              'bg-[var(--elevated)] text-muted-foreground'
            }`}>
              {summary.status === 'current' && '🔴 Aula Agora'}
              {summary.status === 'upcoming' && '🟡 Próxima'}
              {summary.status === 'done' && '🟢 Concluída'}
              {summary.status === 'no_classes_today' && '⚪ Sem Aula'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}