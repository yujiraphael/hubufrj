'use client';

import { MapPin, Clock, Calendar, User, Building2, Target, BookOpen, AlertCircle } from 'lucide-react';
import type { Subject } from './types';
import { formatRelativeDate } from './types';

interface SubjectInfoTabProps {
  subject: Subject;
}

export function SubjectInfoTab({ subject }: SubjectInfoTabProps) {
  const nextClassDate = subject.nextClass ? formatRelativeDate(subject.nextClass.date, new Date()) : null;
  const nextExamDate = subject.nextExam ? formatRelativeDate(subject.nextExam.date, new Date()) : null;

  return (
    <div className="p-6 space-y-6">
      {/* Informações Gerais */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" aria-hidden="true" />
          Informações Gerais
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3 p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <Building2 className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            <div>
              <dt className="text-xs text-muted-foreground">Departamento</dt>
              <dd className="font-medium text-foreground">{subject.department}</dd>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <User className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            <div>
              <dt className="text-xs text-muted-foreground">Professor</dt>
              <dd className="font-medium text-foreground">{subject.professor}</dd>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            <div>
              <dt className="text-xs text-muted-foreground">Turma</dt>
              <dd className="font-medium text-foreground">{subject.classCode}</dd>
            </div>
          </div>
        </dl>
      </section>

      {/* Horário */}
      <section className="space-y-4 border-t border-[var(--border)] pt-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-400" aria-hidden="true" />
          Horário das Aulas
        </h2>
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--elevated)]">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dia</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Horário</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Sala</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {subject.schedule.days.map((day, index) => (
                <tr key={day} className="hover:bg-[var(--elevated)]">
                  <td className="px-4 py-3 text-sm font-medium text-foreground capitalize">{day}</td>
                  <td className="px-4 py-3 text-sm text-foreground font-mono tabular-nums">{subject.schedule.startTime}–{subject.schedule.endTime}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{subject.schedule.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="space-y-4 border-t border-[var(--border)] pt-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-400" aria-hidden="true" />
          Próximos Eventos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Próxima Aula</dt>
                <dd className="font-medium text-foreground">{subject.nextClass?.topic || 'Não agendada'}</dd>
              </div>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{nextClassDate || '—'} • {subject.schedule.startTime}–{subject.schedule.endTime}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{subject.nextClass?.room || subject.schedule.room}</span>
              </div>
            </dl>
          </article>

          <article className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-amber-400" aria-hidden="true" />
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Próxima Prova</dt>
                <dd className="font-medium text-foreground">{subject.nextExam?.title || 'Não agendada'}</dd>
              </div>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{nextExamDate || '—'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{subject.nextExam?.room || '—'}</span>
              </div>
              {subject.nextExam && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>Peso: {Math.round(subject.nextExam.weight * 100)}%</span>
                </div>
              )}
            </dl>
          </article>
        </div>
      </section>
    </div>
  );
}