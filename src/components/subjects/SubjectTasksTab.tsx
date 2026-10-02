'use client';

import { CheckSquare, Clock, Plus } from 'lucide-react';
import type { Subject } from './types';

interface SubjectTasksTabProps {
  subject: Subject;
}

export function SubjectTasksTab({ subject }: SubjectTasksTabProps) {
  if (subject.tasks.length === 0) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--border)] px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--elevated)]">
            <CheckSquare className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Nenhuma tarefa ainda</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            As tarefas de {subject.name} vão aparecer aqui conforme você cadastrar.
          </p>
          <button type="button" disabled className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-70">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Criar tarefa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4 sm:p-6">
      {subject.tasks.map((task) => (
        <article key={task.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-start gap-3">
            <CheckSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{task.title}</p>
              {task.description && <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>}
              <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {new Date(task.dueDate).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
