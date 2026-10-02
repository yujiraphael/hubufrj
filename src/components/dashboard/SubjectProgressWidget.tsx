'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, BookOpen, AlertTriangle, Clock } from 'lucide-react';
import type { SubjectSummary } from '@/components/subjects/types';
import { createSubjectSummary } from '@/components/subjects/types';
import { subjects } from '@/components/subjects/data';

interface SubjectProgressWidgetProps {
  maxSubjects?: number;
  variant?: 'grid' | 'list';
}

function ProgressBar({ 
  value, 
  label, 
  color = 'blue',
  showValue = true 
}: { 
  value: number; 
  label: string; 
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'red';
  showValue?: boolean;
}) {
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        {showValue && <span className="font-medium text-foreground">{value}%</span>}
      </div>
      <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
        <motion.div
          className={`${colorMap[color]} rounded-full h-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  );
}

function SubjectProgressCard({ summary }: { summary: SubjectSummary }) {
  const statusColors = {
    current: 'bg-blue-500/20 border-blue-500/30',
    upcoming: 'bg-amber-500/20 border-amber-500/30',
    done: 'bg-green-500/20 border-green-500/30',
    no_classes_today: 'bg-[var(--elevated)] border-[var(--border)]',
  };

  const statusLabels = {
    current: 'Aula Hoje',
    upcoming: 'Próxima',
    done: 'Concluída',
    no_classes_today: 'Sem Aula',
  };

  return (
    <motion.article
      className={`bg-[var(--surface)] border rounded-xl p-4 transition-all ${statusColors[summary.status]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--elevated)] text-muted-foreground rounded-full">
              {summary.code}
            </span>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full border 
              {summary.status === 'current' && 'bg-blue-500/20 text-blue-400 border-blue-500/30'}
              {summary.status === 'upcoming' && 'bg-amber-500/20 text-amber-400 border-amber-500/30'}
              {summary.status === 'done' && 'bg-green-500/20 text-green-400 border-green-500/30'}
              {summary.status === 'no_classes_today' && 'bg-[var(--elevated)] text-muted-foreground border-[var(--border)]'}
            ">
              {statusLabels[summary.status]}
            </span>
          </div>
          <h4 className="font-semibold text-foreground truncate mb-1">{summary.name}</h4>
          <p className="text-sm text-muted-foreground">{summary.professor}</p>
        </div>
        
        <div className="flex-shrink-0 text-right">
          <div className="text-2xl font-bold text-foreground">{summary.progress}%</div>
          <div className="text-xs text-muted-foreground">progresso</div>
        </div>
      </div>

      <div className="space-y-3">
        <ProgressBar value={summary.progress} label="Geral" color="blue" />
        {summary.nextExam && (
          <div className="flex items-center gap-2 text-xs text-amber-400">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Próxima prova: {summary.nextExam}</span>
          </div>
        )}
        {summary.pendingTasks > 0 && (
          <div className="flex items-center gap-2 text-xs" style={{ color: summary.priority === 'high' ? 'var(--red-400)' : 'var(--amber-400)' }}>
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{summary.pendingTasks} tarefas pendentes</span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export const SubjectProgressWidget = memo(function SubjectProgressWidget({ 
  maxSubjects = 6, 
  variant = 'grid' 
}: SubjectProgressWidgetProps) {
  const now = new Date();
  const summaries = subjects
    .map(s => createSubjectSummary(s, now))
    .sort((a, b) => {
      // Sort by priority first, then by progress
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return a.progress - b.progress;
    })
    .slice(0, maxSubjects);

  if (variant === 'list') {
    return (
      <section className="space-y-3" aria-label="Progresso das Disciplinas">
        <header className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" aria-hidden="true" />
            Progresso das Disciplinas
          </h3>
        </header>
        <div className="space-y-3">
          {summaries.map((summary, index) => (
            <SubjectProgressCard key={summary.id} summary={summary} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Progresso das Disciplinas">
      <header className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-400" aria-hidden="true" />
          Progresso das Disciplinas
        </h3>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaries.map((summary, index) => (
          <SubjectProgressCard key={summary.id} summary={summary} />
        ))}
      </div>
    </section>
  );
});