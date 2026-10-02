import Link from 'next/link';
import { ArrowRight, BookOpen, Clock3 } from 'lucide-react';
import type { Subject } from '@/components/subjects/types';

interface HomeHeroProps {
  subject: Subject;
  examDays: number | null;
}

export function HomeHero({ subject, examDays }: HomeHeroProps) {
  return (
    <section className="border-b border-[var(--border)] pb-10 pt-4 md:pb-14 md:pt-10" aria-labelledby="home-heading">
      <p className="text-sm font-medium tracking-wide text-muted-foreground">Seu espaço acadêmico</p>
      <div className="mt-4 max-w-4xl">
        <h1 id="home-heading" className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          O que vamos estudar hoje?
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Retome de onde parou, veja o que importa agora e entre direto na matéria certa.
        </p>
      </div>

      <article className="mt-8 grid gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Continuar estudando
            </span>
            {examDays !== null && (
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                Prova em {examDays} {examDays === 1 ? 'dia' : 'dias'}
              </span>
            )}
          </div>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {subject.name}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {subject.nextClass?.topic ?? 'Abra a matéria para continuar sua preparação.'}
          </p>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <span>Progresso de estudo</span>
              <span>{subject.progress.overall}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--elevated)]" aria-hidden="true">
              <div
                className="h-full rounded-full bg-foreground/80 transition-[width]"
                style={{ width: `${subject.progress.overall}%` }}
              />
            </div>
          </div>
        </div>

        <Link
          href={`/disciplinas/${subject.id}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          Continuar estudando
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </article>
    </section>
  );
}
