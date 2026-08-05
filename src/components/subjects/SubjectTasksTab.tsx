'use client';

import { useState } from 'react';
import { CheckSquare, Clock, AlertTriangle, Filter, MoreVertical, CheckCircle2 } from 'lucide-react';
import type { Subject, SubjectTask } from './types';

interface SubjectTasksTabProps {
  subject: Subject;
}

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  in_progress: { label: 'Em Progresso', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  done: { label: 'Concluído', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
};

const priorityConfig = {
  high: { label: 'Alta', color: 'text-red-400', icon: AlertTriangle },
  medium: { label: 'Média', color: 'text-amber-400', icon: Clock },
  low: { label: 'Baixa', color: 'text-green-400', icon: CheckCircle2 },
};

export function SubjectTasksTab({ subject }: SubjectTasksTabProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | SubjectTask['status']>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'status'>('dueDate');

  const filteredTasks = subject.tasks
    .filter((task) => statusFilter === 'all' || task.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  const pendingCount = subject.tasks.filter(t => t.status !== 'done').length;
  const doneCount = subject.tasks.filter(t => t.status === 'done').length;
  const overdueCount = subject.tasks.filter(t => 
    t.status !== 'done' && new Date(t.dueDate) < new Date()
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header com Stats */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-blue-400" aria-hidden="true" />
            Tarefas ({subject.tasks.length})
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-400">{pendingCount}</div>
            <div className="text-xs text-muted-foreground">Pendentes</div>
          </div>
          <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{doneCount}</div>
            <div className="text-xs text-muted-foreground">Concluídas</div>
          </div>
          <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">{overdueCount}</div>
            <div className="text-xs text-muted-foreground">Atrasadas</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 bg-[var(--background)] border border-[var(--border)] rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filtrar por status"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendentes</option>
              <option value="in_progress">Em Progresso</option>
              <option value="done">Concluídas</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Ordenar por"
            >
              <option value="dueDate">Prazo</option>
              <option value="priority">Prioridade</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </section>

      {/* Lista de Tarefas */}
      <section className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
            <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const config = statusConfig[task.status];
              const priority = priorityConfig[task.priority];
              const PriorityIcon = priority.icon;
              const isOverdue = task.status !== 'done' && new Date(task.dueDate) < new Date();

              return (
                <article
                  key={task.id}
                  className={`flex items-center gap-4 p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg transition-all ${config.color}`}
                >
                  <input
                    type="checkbox"
                    checked={task.status === 'done'}
                    onChange={() => {}}
                    className="w-5 h-5 accent-blue-500 border-[var(--border)] rounded flex-shrink-0 cursor-pointer"
                    aria-label={`Marcar ${task.title} como ${task.status === 'done' ? 'pendente' : 'concluída'}`}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-medium text-foreground truncate">{task.title}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${config.color}`}>
                        {config.label}
                      </span>
                      <span className={`flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${priority.color}`}>
                        <priority.icon className="h-3 w-3" aria-hidden="true" />
                        {priority.label}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        {isOverdue && <span className="text-red-400">(Atrasado)</span>}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        ~{task.estimatedHours}h
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-[var(--elevated)] transition-colors" aria-label="Mais opções">
                      <MoreVertical className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Progresso */}
      <section className="border-t border-[var(--border)] pt-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Progresso</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Conclusão Geral</span>
              <span className="font-medium text-foreground">{subject.progress.tasksCompleted}%</span>
            </div>
            <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${subject.progress.tasksCompleted}%` }}
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 text-center">
            <div className="p-3 bg-[var(--background)] border border-[var(--border)] rounded-lg">
              <div className="text-xl font-bold text-amber-400">{pendingCount}</div>
              <div className="text-xs text-muted-foreground">Pendentes</div>
            </div>
            <div className="p-3 bg-[var(--background)] border border-[var(--border)] rounded-lg">
              <div className="text-xl font-bold text-blue-400">{subject.tasks.filter(t => t.status === 'in_progress').length}</div>
              <div className="text-xs text-muted-foreground">Em Progresso</div>
            </div>
            <div className="p-3 bg-[var(--background)] border border-[var(--border)] rounded-lg">
              <div className="text-xl font-bold text-green-400">{doneCount}</div>
              <div className="text-xs text-muted-foreground">Concluídas</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}