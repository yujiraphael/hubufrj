'use client';

import { BookOpen, Calendar, Clock, GraduationCap, Plus, User } from 'lucide-react';
import type { Subject } from './types';

interface SubjectInfoTabProps {
  subject: Subject;
}

function EmptyField({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--background)] p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">Não informado</p>
    </div>
  );
}

export function SubjectInfoTab({ subject }: SubjectInfoTabProps) {
  const hasSchedule = subject.schedule.days.length > 0 && subject.schedule.startTime && subject.schedule.endTime;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground">{subject.code}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground">{subject.name}</h2>
          </div>

          <button
            type="button"
            disabled
            title="Será ativado quando conectarmos o banco de dados"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-muted-foreground disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Editar
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {subject.professor ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
              <User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <p className="mt-3 text-xs text-muted-foreground">Professor</p>
              <p className="mt-1 text-sm font-medium text-foreground">{subject.professor}</p>
            </div>
          ) : <EmptyField label="Professor" />}

          {subject.classCode ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
              <GraduationCap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <p className="mt-3 text-xs text-muted-foreground">Turma</p>
              <p className="mt-1 text-sm font-medium text-foreground">{subject.classCode}</p>
            </div>
          ) : <EmptyField label="Turma" />}

          {hasSchedule ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
              <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <p className="mt-3 text-xs text-muted-foreground">Horário</p>
              <p className="mt-1 text-sm font-medium text-foreground">{subject.schedule.startTime}–{subject.schedule.endTime}</p>
            </div>
          ) : <EmptyField label="Horário" />}

          {subject.credits !== null ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
              <BookOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <p className="mt-3 text-xs text-muted-foreground">Créditos</p>
              <p className="mt-1 text-sm font-medium text-foreground">{subject.credits}</p>
            </div>
          ) : <EmptyField label="Créditos" />}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05]">
            <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Próximos eventos</h3>
            <p className="text-sm text-muted-foreground">
              Nenhuma aula, prova ou entrega cadastrada ainda.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
