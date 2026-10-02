import { CalendarDays, Clock3, MapPin } from 'lucide-react';
import type { Subject } from '@/components/subjects/types';

interface HomeTodayProps {
  subjects: Subject[];
}

export function HomeToday({ subjects }: HomeTodayProps) {
  const todayISO = new Date().toISOString().split('T')[0];
  const classesToday = subjects.filter((subject) => subject.nextClass?.date === todayISO).slice(0, 2);
  const pendingTasks = subjects
    .flatMap((subject) => subject.tasks.map((task) => ({ ...task, subjectName: subject.name })))
    .filter((task) => task.status !== 'done')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 2);

  return (
    <section className="py-10 md:py-12" aria-labelledby="today-title">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Agora</p>
          <h2 id="today-title" className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Hoje</h2>
        </div>
        <CalendarDays className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm font-medium text-foreground">Aulas</p>
          <div className="mt-4 space-y-4">
            {classesToday.length > 0 ? classesToday.map((subject) => (
              <div key={subject.id} className="flex items-start justify-between gap-4 border-t border-[var(--border)] pt-4 first:border-t-0 first:pt-0">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{subject.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{subject.nextClass?.topic}</p>
                </div>
                <div className="shrink-0 text-right text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                    {subject.schedule.startTime}
                  </span>
                  <span className="mt-1 flex items-center justify-end gap-1.5">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {subject.schedule.room}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-sm leading-6 text-muted-foreground">Nenhuma aula marcada para hoje nos dados atuais.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm font-medium text-foreground">Pendências próximas</p>
          <div className="mt-4 space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="border-t border-[var(--border)] pt-4 first:border-t-0 first:pt-0">
                <p className="font-medium text-foreground">{task.title}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>{task.subjectName}</span>
                  <span>{task.estimatedHours}h estimadas</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
