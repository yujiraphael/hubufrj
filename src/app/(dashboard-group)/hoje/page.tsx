import Link from 'next/link';
import { ArrowUpRight, BookOpen, Layers3, Plus, Sparkles } from 'lucide-react';

const secondaryActions = [
  { label: 'Minhas matérias', href: '/disciplinas', icon: Layers3 },
];

export default function HojePage() {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-6xl flex-col px-0 pb-8 pt-4 sm:pt-8">
      <section className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(160deg,rgba(255,255,255,0.04),transparent_55%)] px-5 py-14 sm:px-10 sm:py-20 lg:px-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10 opacity-60" />
        <div className="pointer-events-none absolute -right-4 top-10 h-40 w-40 rounded-full border border-white/10 opacity-40" />

        <div className="relative max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Seu espaço acadêmico
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
            Menos bagunça.
            <span className="block text-muted-foreground">Mais tempo para estudar.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            O Cálculo 2 agora é a primeira matéria real do HubUFRJ e vai servir de base para evoluirmos o restante do sistema.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/disciplinas/calculo-2"
              className="inline-flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-foreground bg-foreground px-4 py-3 text-sm font-medium text-background"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Abrir Cálculo 2
              </span>
              <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden="true" />
            </Link>

            {secondaryActions.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-foreground"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </span>
                <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden="true" />
              </Link>
            ))}

            <button
              type="button"
              disabled
              title="Será ativado quando conectarmos o banco de dados"
              className="inline-flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-muted-foreground disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Criar tarefa
              </span>
            </button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Upload de arquivos volta quando houver armazenamento persistente conectado.
          </p>
        </div>
      </section>
    </div>
  );
}
