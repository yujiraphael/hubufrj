'use client';

import { Calendar, Clock, MapPin, BookOpen, AlertCircle } from 'lucide-react';
import type { Subject } from './types';

interface SubjectCalendarTabProps {
  subject: Subject;
}

const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function SubjectCalendarTab({ subject }: SubjectCalendarTabProps) {
  const events = [
    ...subject.schedule.days.map((day, index) => ({
      type: 'class' as const,
      day: dayLabels.indexOf(day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()),
      title: 'Aula Regular',
      time: `${subject.schedule.startTime}–${subject.schedule.endTime}`,
      room: subject.schedule.room,
      recurring: true,
    })),
    subject.nextClass ? {
      type: 'class' as const,
      date: new Date(subject.nextClass.date),
      title: subject.nextClass.topic,
      time: `${subject.schedule.startTime}–${subject.schedule.endTime}`,
      room: subject.nextClass.room,
      recurring: false,
    } : null,
    subject.nextExam ? {
      type: 'exam' as const,
      date: new Date(subject.nextExam.date),
      title: subject.nextExam.title,
      time: 'Conforme agendamento',
      room: subject.nextExam.room,
      recurring: false,
    } : null,
  ].filter(Boolean) as Array<{
    type: 'class' | 'exam';
    day?: number;
    date?: Date;
    title: string;
    time: string;
    room: string;
    recurring: boolean;
  }>;

  return (
    <div className="p-6 space-y-6">
      {/* Visualização Mensal Simplificada */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-400" aria-hidden="true" />
          Próximas Ocorrências
        </h2>
        
        {events.length === 0 ? (
          <div className="text-center py-12 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
            <p className="text-muted-foreground">Nenhum evento agendado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event, index) => (
              <article
                key={`${event.type}-${index}`}
                className={`bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 transition-colors hover:border-blue-500/30 ${
                  event.type === 'exam' ? 'border-amber-500/30 bg-amber-500/5' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    event.type === 'exam' ? 'bg-amber-500/20' : 'bg-blue-500/20'
                  }`}>
                    {event.type === 'exam' ? (
                      <AlertCircle className="h-6 w-6 text-amber-400" aria-hidden="true" />
                    ) : (
                      <BookOpen className="h-6 w-6 text-blue-400" aria-hidden="true" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        event.type === 'exam' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {event.type === 'exam' ? 'PROVA' : event.recurring ? 'AULA RECORRENTE' : 'AULA'}
                      </span>
                      {event.recurring && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-[var(--elevated)] text-muted-foreground rounded-full">
                          Recorrente
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-foreground mb-1">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {event.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          {event.date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}
                        </span>
                      )}
                      {event.day !== undefined && !event.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          Toda {dayLabels[event.day]}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {event.room}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Legenda */}
      <section className="border-t border-[var(--border)] pt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Legenda</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-500/20" aria-hidden="true" />
            Aulas
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-amber-500/20" aria-hidden="true" />
            Provas
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-[var(--elevated)] border border-[var(--border)]" aria-hidden="true" />
            Recorrente
          </span>
        </div>
      </section>
    </div>
  );
}