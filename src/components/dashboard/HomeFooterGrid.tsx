import Link from 'next/link';
import { CalendarDays, FileText, FolderOpen, GraduationCap, ArrowRight } from 'lucide-react';
import type { Subject } from '@/components/subjects/types';

interface HomeFooterGridProps {
  subjects: Subject[];
}

const quickAccess = [
  { label: 'Calendário', href: '/calendario', icon: CalendarDays },
  { label: 'Materiais', href: '/materiais', icon: FolderOpen },
  { label: 'Notas', href: '/notas', icon: GraduationCap },
  { label: 'Perfil acadêmico', href: '/perfil', icon: FileText },
];

function daysUntil(date: string) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

export function HomeFooterGrid({ subjects }: HomeFooterGridProps) {
  const exams = subjects
    .filter((subject) => subject.nextExam)
    .sort((a, b) => (a.nextExam?.date ?? '').localeCompare(b.nextExam?.date ?? ''))
    .slice(0, 3);

  return (
    <section className="grid gap-4 py-10 md:py-12 lg:grid-cols-[1.35fr_1fr]" aria-label="Avaliações e acessos rápidos">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">No radar</p>
        <h2 className="mt-2 text-xl font-semibold text-foreground">Próximas avaliações</h2>
        <div className="mt-5 divide-y divide-[var(--border)]">
          {exams.map((subject) => (
            <Link key={subject.id} href={`/disciplinas/${subject.id}`} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{subject.name}</p>
                <p className="mt-1 truncate text-sm text-muted-foreground">{subject.nextExam?.title}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-medium text-foreground">{daysUntil(subject.nextExam!.date)} dias</p>
                <p className="mt-1 text-xs text-muted-foreground">{new Date(subject.nextExam!.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Atalhos</p>
        <h2 className="mt-2 text-xl font-semibold text-foreground">Vida acadêmica</h2>
        <nav className="mt-5 grid gap-2" aria-label="Acessos rápidos">
          {quickAccess.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-11 items-center justify-between rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-[var(--elevated)] hover:text-foreground"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
