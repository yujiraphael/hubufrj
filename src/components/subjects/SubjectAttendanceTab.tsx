'use client';

import { User, Calendar, Clock, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import type { Subject } from './types';

interface SubjectAttendanceTabProps {
  subject: Subject;
}

// Dados mock de frequência por aula
const attendanceRecords = [
  { date: '2026-07-01', topic: 'Limites e Continuidade', status: 'present' as const },
  { date: '2026-07-08', topic: 'Derivadas - Regras Básicas', status: 'present' as const },
  { date: '2026-07-15', topic: 'Derivadas - Regra da Cadeia', status: 'present' as const },
  { date: '2026-07-22', topic: 'Aplicações de Derivadas', status: 'present' as const },
  { date: '2026-07-29', topic: 'Integrais - Conceito Básico', status: 'absent' as const, justification: 'Atestado médico' },
  { date: '2026-08-05', topic: 'Integrais - Substituição', status: 'present' as const },
  { date: '2026-08-12', topic: 'Integrais - Partes', status: 'present' as const },
  { date: '2026-08-19', topic: 'Integrais - Frações Parciais', status: 'present' as const },
  { date: '2026-08-26', topic: 'Integrais Múltiplas - Intro', status: 'present' as const },
  { date: '2026-09-02', topic: 'Coordenadas Polares', status: 'present' as const },
  { date: '2026-09-09', topic: 'Coordenadas Cilíndricas', status: 'late' as const, justification: 'Trânsito' },
  { date: '2026-09-16', topic: 'Coordenadas Esféricas', status: 'present' as const },
];

export function SubjectAttendanceTab({ subject }: SubjectAttendanceTabProps) {
  const presentCount = attendanceRecords.filter(r => r.status === 'present').length;
  const absentCount = attendanceRecords.filter(r => r.status === 'absent').length;
  const lateCount = attendanceRecords.filter(r => r.status === 'late').length;
  const totalCount = attendanceRecords.length;
  const percentage = Math.round((presentCount + lateCount * 0.5) / totalCount * 100);

  const statusConfig = {
    present: { label: 'Presente', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle2 },
    absent: { label: 'Ausente', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle },
    late: { label: 'Atrasado', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: Clock },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Resumo */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-blue-400" aria-hidden="true" />
          Frequência ({subject.attendance.percentage}%)
        </h2>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{presentCount}</div>
            <div className="text-xs text-muted-foreground">Presenças</div>
          </article>
          <article className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">{absentCount}</div>
            <div className="text-xs text-muted-foreground">Ausências</div>
          </article>
          <article className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-amber-400 mb-1">{lateCount}</div>
            <div className="text-xs text-muted-foreground">Atrasos</div>
          </article>
          <article className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">{percentage}%</div>
            <div className="text-xs text-muted-foreground">Taxa de Presença</div>
          </article>
        </div>

        {/* Barra de Progresso */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-5">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted-foreground">Progresso da Frequência</span>
            <span className={`font-medium ${percentage >= 75 ? 'text-green-400' : percentage >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
              {percentage}% (mín. 75% para aprovação)
            </span>
          </div>
          <div className="h-3 bg-[var(--border)] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${percentage >= 75 ? 'bg-green-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0%</span>
            <span className="font-medium text-green-400">75% (mínimo)</span>
            <span>100%</span>
          </div>
        </div>
      </section>

      {/* Histórico Detalhado */}
      <section className="space-y-4 border-t border-[var(--border)] pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" aria-hidden="true" />
            Histórico de Aulas
          </h2>
          <div className="text-sm text-muted-foreground">
            {attendanceRecords.length} aulas registradas
          </div>
        </div>

        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--elevated)]">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tópico</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Justificativa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {attendanceRecords.map((record, index) => {
                const config = statusConfig[record.status];
                const StatusIcon = config.icon;
                return (
                  <tr key={index} className="hover:bg-[var(--elevated)]">
                    <td className="px-4 py-3 text-sm text-foreground font-mono">
                      {new Date(record.date).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground max-w-xs truncate">{record.topic}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                        <config.icon className="h-3 w-3" aria-hidden="true" />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {record.justification || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Estatísticas por Mês */}
      <section className="border-t border-[var(--border)] pt-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-400" aria-hidden="true" />
          Tendência Mensal
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['Julho', 'Agosto', 'Setembro', 'Outubro'].map((month, i) => {
            const monthRecords = attendanceRecords.filter(r => new Date(r.date).getMonth() === 6 + i);
            const monthPresent = monthRecords.filter(r => r.status === 'present').length;
            const monthTotal = monthRecords.length;
            const monthPct = monthTotal > 0 ? Math.round((monthPresent + monthRecords.filter(r => r.status === 'late').length * 0.5) / monthTotal * 100) : 0;
            return (
              <div key={month} className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-muted-foreground mb-2">{month}</div>
                <div className="text-3xl font-bold text-foreground mb-1">{monthPct}%</div>
                <div className="text-xs text-muted-foreground">{monthPresent}/{monthTotal} aulas</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}