'use client';

import { AlertCircle, Calendar, Clock, MapPin, Target, Award, CheckCircle2 } from 'lucide-react';
import type { Subject } from './types';

interface SubjectExamsTabProps {
  subject: Subject;
}

const examData = [
  { 
    id: 'exam-1',
    title: 'Prova 1 - Integrais Duplas e Triplas', 
    date: '2026-08-15', 
    time: '13:00–15:00',
    room: 'Auditório 1 - Bloco A',
    weight: 0.4,
    status: 'upcoming' as const,
    topics: ['Integrais duplas em coordenadas cartesianas', 'Mudança de variáveis', 'Coordenadas polares', 'Aplicações: área e volume'],
  },
  { 
    id: 'exam-2',
    title: 'Prova 2 - Integrais Triplas e Aplicações', 
    date: '2026-09-20', 
    time: '13:00–15:00',
    room: 'Auditório 1 - Bloco A',
    weight: 0.4,
    status: 'upcoming' as const,
    topics: ['Integrais triplas', 'Coordenadas cilíndricas e esféricas', 'Centro de massa', 'Momentos de inércia'],
  },
  { 
    id: 'exam-3',
    title: 'Trabalho Final - Modelagem Matemática', 
    date: '2026-10-10', 
    time: 'Entrega digital',
    room: 'Online',
    weight: 0.2,
    status: 'pending' as const,
    topics: ['Modelagem de problema real', 'Resolução numérica', 'Relatório técnico'],
  },
  { 
    id: 'exam-4',
    title: 'Prova 0 - Revisão de Cálculo 1', 
    date: '2026-07-01', 
    time: '13:00–15:00',
    room: 'Sala 201 - Bloco A',
    weight: 0.1,
    status: 'done' as const,
    topics: ['Limites', 'Derivadas', 'Integrais simples'],
  },
];

export function SubjectExamsTab({ subject }: SubjectExamsTabProps) {
  const upcomingExams = examData.filter(e => e.status === 'upcoming');
  const pastExams = examData.filter(e => e.status === 'done');
  const pendingExams = examData.filter(e => e.status === 'pending');

  return (
    <div className="p-6 space-y-6">
      {/* Próximas Provas - Destaque */}
      {upcomingExams.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-400" aria-hidden="true" />
            Próximas Provas ({upcomingExams.length})
          </h2>
          <div className="space-y-3">
            {upcomingExams.map((exam, index) => (
              <article
                key={exam.id}
                className="bg-[var(--background)] border border-amber-500/30 bg-amber-500/5 rounded-xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-7 w-7 text-amber-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-2 py-0.5 text-xs font-medium bg-amber-500/20 text-amber-400 rounded-full">
                        AGENDADA
                      </span>
                      <span className="px-2 py-0.5 text-xs font-medium bg-amber-500/20 text-amber-400 rounded-full">
                        Peso: {Math.round(exam.weight * 100)}%
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{exam.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {new Date(exam.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {exam.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {exam.room}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-[var(--border)]">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Tópicos</h4>
                      <div className="flex flex-wrap gap-2">
                        {exam.topics.map((topic, i) => (
                          <span key={i} className="px-2 py-1 text-xs bg-[var(--elevated)] text-muted-foreground rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-400">
                        {Math.ceil((new Date(exam.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias
                      </div>
                      <div className="text-xs text-muted-foreground">para a prova</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Provas Passadas */}
      {pastExams.length > 0 && (
        <section className="space-y-4 border-t border-[var(--border)] pt-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-green-400" aria-hidden="true" />
            Provas Realizadas ({pastExams.length})
          </h2>
          <div className="space-y-3">
            {pastExams.map((exam, index) => (
              <article
                key={exam.id}
                className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{exam.title}</h3>
                      <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                        CONCLUÍDA
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {new Date(exam.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-3.5 w-3.5" aria-hidden="true" />
                        Nota: 8.5/10
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Trabalhos/Entregas Pendentes */}
      {pendingExams.length > 0 && (
        <section className="space-y-4 border-t border-[var(--border)] pt-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" aria-hidden="true" />
            Entregas Pendentes ({pendingExams.length})
          </h2>
          <div className="space-y-3">
            {pendingExams.map((exam, index) => (
              <article
                key={exam.id}
                className="bg-[var(--background)] border border-blue-500/30 bg-blue-500/5 rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                        ENTREGA
                      </span>
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                        Peso: {Math.round(exam.weight * 100)}%
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground mb-1">{exam.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {new Date(exam.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {exam.time}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Resumo de Pesos */}
      <section className="border-t border-[var(--border)] pt-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" aria-hidden="true" />
          Composição da Nota Final
        </h2>
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--elevated)]">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Avaliação</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Peso</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {[...upcomingExams, ...pastExams, ...pendingExams].map((exam, index) => (
                <tr key={exam.id} className="hover:bg-[var(--elevated)]">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{exam.title}</td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground tabular-nums">{Math.round(exam.weight * 100)}%</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      exam.status === 'done' ? 'bg-green-500/20 text-green-400' :
                      exam.status === 'upcoming' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {exam.status === 'done' && 'Realizada'}
                      {exam.status === 'upcoming' && 'Agendada'}
                      {exam.status === 'pending' && 'Pendente'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(exam.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</td>
                </tr>
              ))}
              <tr className="bg-[var(--elevated)] font-semibold">
                <td className="px-4 py-3 text-foreground">TOTAL</td>
                <td className="px-4 py-3 text-foreground tabular-nums">100%</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}