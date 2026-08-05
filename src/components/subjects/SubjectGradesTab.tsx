'use client';

import { Award, TrendingUp, Target, BookOpen } from 'lucide-react';
import type { Subject } from './types';

interface SubjectGradesTabProps {
  subject: Subject;
}

const gradeComponents = [
  { label: 'Prova 1', weight: 0.3, score: 7.5, maxScore: 10, date: '2026-07-15', status: 'done' },
  { label: 'Prova 2', weight: 0.4, score: null, maxScore: 10, date: '2026-08-15', status: 'upcoming' },
  { label: 'Trabalho Final', weight: 0.2, score: 8.0, maxScore: 10, date: '2026-09-01', status: 'done' },
  { label: 'Participação', weight: 0.1, score: 9.0, maxScore: 10, date: 'Contínua', status: 'in_progress' },
];

export function SubjectGradesTab({ subject }: SubjectGradesTabProps) {
  const completedGrades = gradeComponents.filter(g => g.score !== null);
  const average = completedGrades.length > 0
    ? completedGrades.reduce((sum, g) => sum + (g.score || 0) * g.weight, 0)
    : 0;
  const weightedAverage = completedGrades.length > 0
    ? completedGrades.reduce((sum, g) => sum + (g.score || 0) * g.weight, 0) / completedGrades.reduce((sum, g) => sum + g.weight, 0)
    : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Resumo da Média */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" aria-hidden="true" />
          Desempenho Acadêmico
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{weightedAverage.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Média Ponderada</div>
            <div className="text-xs text-green-400 mt-1">Meta: ≥ 7.0</div>
          </article>
          <article className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">{subject.progress.grades}%</div>
            <div className="text-xs text-muted-foreground">Progresso Notas</div>
            <div className="text-xs text-muted-foreground mt-1">{completedGrades.length}/{gradeComponents.length} avaliadas</div>
          </article>
          <article className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-amber-400 mb-1">{gradeComponents.filter(g => g.status === 'upcoming').length}</div>
            <div className="text-xs text-muted-foreground">Próximas Avaliações</div>
          </article>
          <article className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">{subject.nextExam ? Math.ceil((new Date(subject.nextExam.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : '—'}</div>
            <div className="text-xs text-muted-foreground">Dias p/ Próxima</div>
          </article>
        </div>
      </section>

      {/* Componentes de Nota */}
      <section className="space-y-4 border-t border-[var(--border)] pt-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-400" aria-hidden="true" />
          Composição da Nota
        </h2>
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--elevated)]">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Componente</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Peso</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Nota</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {gradeComponents.map((component, index) => (
                <tr key={index} className="hover:bg-[var(--elevated)]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {component.status === 'upcoming' && <Target className="h-4 w-4 text-amber-400" aria-hidden="true" />}
                      {component.status === 'done' && <Award className="h-4 w-4 text-green-400" aria-hidden="true" />}
                      {component.status === 'in_progress' && <BookOpen className="h-4 w-4 text-blue-400" aria-hidden="true" />}
                      <span className="font-medium text-foreground">{component.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground tabular-nums">{Math.round(component.weight * 100)}%</td>
                  <td className="px-4 py-3">
                    {component.score !== null ? (
                      <span className="font-mono font-medium text-foreground">{component.score}/{component.maxScore}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      component.status === 'done' ? 'bg-green-500/20 text-green-400' :
                      component.status === 'upcoming' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {component.status === 'done' && 'Concluído'}
                      {component.status === 'upcoming' && 'Agendado'}
                      {component.status === 'in_progress' && 'Em Andamento'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{component.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cálculo da Média Final */}
      <section className="space-y-4 border-t border-[var(--border)] pt-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" aria-hidden="true" />
          Projeção da Média Final
        </h2>
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
              <div className="text-2xl font-bold text-green-400">{weightedAverage.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">Média Atual</div>
            </div>
            <div className="text-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{subject.nextExam ? '7.5' : '—'}</div>
              <div className="text-xs text-muted-foreground">Nota Necessária p/ Aprovação</div>
            </div>
            <div className="text-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
              <div className="text-2xl font-bold text-amber-400">{weightedAverage >= 7 ? 'APROVADO' : 'EM RISCO'}</div>
              <div className="text-xs text-muted-foreground">Situação Projetada</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Cálculo baseado nas notas já obtidas. Notas futuras podem alterar a média final.
          </p>
        </div>
      </section>
    </div>
  );
}