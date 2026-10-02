import Link from 'next/link';
import { ArrowUpRight, BookOpen, Plus } from 'lucide-react';
import { subjects } from '@/components/subjects/data';

export default function DisciplinasPage() {
  return (
    <div className="mx-auto w-full max-w-6xl py-4 sm:py-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Seu semestre</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            Matérias
          </h1>
        </div>

        <button
          type="button"
          disabled
          title="Será ativado quando conectarmos o banco de dados"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm font-medium text-muted-foreground disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Adicionar matéria</span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/disciplinas/${subject.id}`}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-5 transition-colors hover:bg-white/[0.045]"
          >
            <div className="mb-10 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06] ring-1 ring-inset ring-white/10">
                <BookOpen className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </div>

            <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground">{subject.code}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-foreground">{subject.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Espaço base para organizar tarefas, materiais, avaliações e informações da matéria.
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
