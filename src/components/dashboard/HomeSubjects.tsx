import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Subject } from '@/components/subjects/types';

interface HomeSubjectsProps {
  subjects: Subject[];
}

export function HomeSubjects({ subjects }: HomeSubjectsProps) {
  return (
    <section className="py-10 md:py-12" aria-labelledby="subjects-title">
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Workspace acadêmico</p>
        <h2 id="subjects-title" className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Minhas matérias</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => {
          const pending = subject.tasks.filter((task) => task.status !== 'done').length;
          return (
            <Link
              key={subject.id}
              href={`/disciplinas/${subject.id}`}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:bg-[var(--elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground">{subject.code}</p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{subject.name}</h3>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </div>

              <p className="mt-5 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                {subject.nextClass?.topic ?? 'Abra a matéria para ver conteúdos e materiais.'}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs text-muted-foreground">
                <span>{subject.progress.overall}% preparado</span>
                <span>{pending} {pending === 1 ? 'pendência' : 'pendências'}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
