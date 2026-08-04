'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';
import type { TimelineEvent } from './types';

interface TaskListProps {
  tasks: TimelineEvent[];
}

const priorityOrder = { high: 0, medium: 1, low: 2 };
const priorityLabels = { high: 'Alta', medium: 'Média', low: 'Baixa' };
const priorityIcons = { high: AlertTriangle, medium: Clock, low: CheckCircle2 };
const priorityColors = {
  high: 'border-red-500/30 bg-red-500/5 text-red-400',
  medium: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
  low: 'border-green-500/30 bg-green-500/5 text-green-400',
};

export const TaskList = memo(function TaskList({ tasks }: TaskListProps) {
  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']
  );

  if (sortedTasks.length === 0) {
    return (
      <article className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex items-center gap-3 text-muted-foreground">
          <FileText className="h-5 w-5" aria-hidden="true" />
          <span>Nenhuma tarefa pendente</span>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
      <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        Tarefas Pendentes
        <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-[var(--elevated)] text-muted-foreground rounded-full">
          {sortedTasks.length}
        </span>
      </h3>

      <div className="space-y-3">
        {sortedTasks.map((task, index) => {
          const Icon = priorityIcons[task.priority || 'medium'];
          const colors = priorityColors[task.priority || 'medium'];

          return (
            <motion.label
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--elevated)] transition-colors cursor-pointer ${colors}`}
            >
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 accent-blue-500 border-[var(--border)] rounded focus:ring-2 focus:ring-blue-500"
                aria-label={`Marcar ${task.subjectName} como concluída`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full">
                    {priorityLabels[task.priority || 'medium']}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium bg-[var(--elevated)] text-muted-foreground rounded-full">
                    {task.subjectCode}
                  </span>
                </div>
                <p className="font-medium text-foreground truncate">{task.subjectName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Prazo: {task.startTime}
                </p>
              </div>
              <Icon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
            </motion.label>
          );
        })}
      </div>
    </article>
  );
});