'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle2,
  TrendingUp,
  User,
  MapPin,
  Target,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import type { Subject, SubjectSummary } from './types';
import { createSubjectSummary } from './types';

interface SubjectCardProps {
  subject: Subject;
  now?: Date;
  variant?: 'full' | 'compact' | 'summary';
  onClick?: () => void;
  className?: string;
  navigateToDetails?: boolean;
}

const statusConfig = {
  current: { label: 'AULA HOJE', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: '🔴' },
  upcoming: { label: 'PRÓXIMA', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: '🟡' },
  done: { label: 'CONCLUÍDA', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: '🟢' },
  no_classes_today: { label: 'SEM AULA', color: 'bg-[var(--elevated)] text-muted-foreground border-[var(--border)]', icon: '⚪' },
};

const priorityConfig = {
  high: { label: 'ALTA', color: 'text-red-400', icon: AlertTriangle },
  medium: { label: 'MÉDIA', color: 'text-amber-400', icon: Clock },
  low: { label: 'BAIXA', color: 'text-green-400', icon: CheckCircle2 },
};

function ProgressRing({ progress, size = 48, strokeWidth = 4 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90" role="img" aria-label={`Progresso ${progress}%`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--border)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#progress-gradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ filter: 'url(#progress-glow)' }}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <defs>
        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="progress-glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function StatusBadge({ status }: { status: SubjectSummary['status'] }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${config.color}`}>
      {config.icon} {config.label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: SubjectSummary['priority'] }) {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--elevated)] border-[var(--border)] ${config.color}`}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      {config.label}
    </span>
  );
}

export const SubjectCard = memo(function SubjectCard({ 
  subject, 
  now = new Date(), 
  variant = 'full',
  onClick,
  navigateToDetails = false,
  className = '',
}: SubjectCardProps) {
  const summary = createSubjectSummary(subject, now);
  const isInteractive = navigateToDetails || typeof onClick === 'function';
  const router = useRouter();
  const handleNavigate = () => {
    if (navigateToDetails) {
      router.push(`/disciplinas/${subject.id}`);
    }
    if (onClick) {
      onClick();
    }
  };

  if (variant === 'summary') {
    return (
      <motion.article
        className={`bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 transition-all hover:border-blue-500/30 ${isInteractive ? 'cursor-pointer' : ''} ${className}`}
        whileTap={{ scale: 0.98 }}
        onClick={handleNavigate}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2 py-0.5 text-xs font-medium bg-[var(--elevated)] text-muted-foreground rounded-full">
                {summary.code}
              </span>
              <StatusBadge status={summary.status} />
              <PriorityBadge priority={summary.priority} />
            </div>
            <h3 className="font-semibold text-foreground truncate mb-1">{summary.name}</h3>
            <p className="text-sm text-muted-foreground">{summary.professor}</p>
            
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              {summary.nextClass && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {summary.nextClass}
                </span>
              )}
              {summary.nextExam && (
                <span className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                  {summary.nextExam}
                </span>
              )}
              {summary.pendingTasks > 0 && (
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" aria-hidden="true" />
                  {summary.pendingTasks} tarefas
                </span>
              )}
            </div>
          </div>
          
          <div className="flex-shrink-0 flex flex-col items-end gap-2">
            <ProgressRing progress={summary.progress} size={44} strokeWidth={3} />
            <span className="text-xs text-muted-foreground">{summary.progress}%</span>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        className={`bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3 transition-all ${isInteractive ? 'cursor-pointer hover:border-blue-500/30' : ''} ${className}`}
        whileTap={{ scale: 0.98 }}
        onClick={handleNavigate}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2 py-0.5 text-xs font-medium bg-[var(--elevated)] text-muted-foreground rounded-full">
                {summary.code}
              </span>
              <StatusBadge status={summary.status} />
            </div>
            <h4 className="font-medium text-foreground truncate">{summary.name}</h4>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              {summary.nextClass && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {summary.nextClass}
                </span>
              )}
              {summary.pendingTasks > 0 && (
                <span className="flex items-center gap-1 text-amber-400">
                  <FileText className="h-3 w-3" aria-hidden="true" />
                  {summary.pendingTasks}
                </span>
              )}
            </div>
          </div>
          <ProgressRing progress={summary.progress} size={36} strokeWidth={3} />
        </div>
      </motion.article>
    );
  }

  // Full variant - Entidade Acadêmica Viva completa
  const pendingTasks = subject.tasks.filter(t => t.status !== 'done');
  const highPriorityTasks = pendingTasks.filter(t => t.priority === 'high');
  const nextTask = pendingTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
  const unreadMaterials = subject.materials.filter(m => !m.isRead).length;

  return (
      <motion.article
        className={`bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 transition-all ${isInteractive ? 'cursor-pointer hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]' : ''} ${className}`}
        whileTap={{ scale: 0.98 }}
        onClick={handleNavigate}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--elevated)] text-muted-foreground rounded-full">
              {summary.code}
            </span>
            <StatusBadge status={summary.status} />
            <PriorityBadge priority={summary.priority} />
          </div>
          <h3 className="text-lg font-semibold text-foreground truncate mb-1">{subject.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            {subject.professor} • {subject.classCode} • {subject.department}
          </p>
        </div>
        
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <ProgressRing progress={summary.progress} size={56} strokeWidth={4} />
          <div className="text-right">
            <span className="text-lg font-bold text-foreground">{summary.progress}%</span>
            <span className="block text-xs text-muted-foreground">Progresso Geral</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Próxima Aula */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-blue-400" aria-hidden="true" />
            </div>
            <h4 className="font-medium text-foreground">Próxima Aula</h4>
          </div>
          
          {subject.nextClass ? (
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs text-muted-foreground block">Data</span>
                  <span className="font-medium text-foreground">{summary.nextClass}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs text-muted-foreground block">Horário</span>
                  <span className="font-medium text-foreground">{subject.schedule.startTime}–{subject.schedule.endTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs text-muted-foreground block">Sala</span>
                  <span className="font-medium text-foreground truncate">{subject.nextClass.room}</span>
                </div>
              </div>
              <div className="sm:col-span-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs text-muted-foreground block">Tópico</span>
                  <span className="font-medium text-foreground">{subject.nextClass.topic}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">Nenhuma aula agendada</p>
          )}
        </div>

        {/* Próxima Prova */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-amber-400" aria-hidden="true" />
            </div>
            <h4 className="font-medium text-foreground">Próxima Prova</h4>
          </div>
          
          {subject.nextExam ? (
            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground block">{subject.nextExam.title}</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium text-foreground">{subject.nextExam.date.split('T')[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium text-foreground truncate">{subject.nextExam.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium text-foreground">Peso: {Math.round(subject.nextExam.weight * 100)}%</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">Nenhuma prova agendada</p>
          )}
        </div>

        {/* Tarefas Urgentes */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 md:col-span-2">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <FileText className="h-4 w-4 text-amber-400" aria-hidden="true" />
              </div>
              <h4 className="font-medium text-foreground">Tarefas ({pendingTasks.length})</h4>
            </div>
            {highPriorityTasks.length > 0 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
                {highPriorityTasks.length} urgentes
              </span>
            )}
          </div>
          
          {pendingTasks.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {pendingTasks.slice(0, 4).map((task) => (
                <div 
                  key={task.id} 
                  className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                    task.priority === 'high' ? 'border-red-500/30 bg-red-500/5' :
                    task.priority === 'medium' ? 'border-amber-500/30 bg-amber-500/5' :
                    'border-green-500/30 bg-green-500/5'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 accent-blue-500 border-[var(--border)] rounded flex-shrink-0"
                    aria-label={`Marcar ${task.title} como concluída`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        {new Date(task.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        ~{task.estimatedHours}h
                      </span>
                    </div>
                  </div>
                  {task.priority === 'high' && (
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" aria-hidden="true" />
                  )}
                </div>
              ))}
              {pendingTasks.length > 4 && (
                <div className="text-center text-xs text-muted-foreground pt-2 border-t border-[var(--border)]">
                  +{pendingTasks.length - 4} tarefas...
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">Todas em dia! ✓</p>
          )}
        </div>

        {/* Progresso Detalhado */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-purple-400" aria-hidden="true" />
            </div>
            <h4 className="font-medium text-foreground">Progresso</h4>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Frequência</span>
                <span className="font-medium text-foreground">{subject.attendance.percentage}%</span>
              </div>
              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${subject.attendance.percentage}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Notas</span>
                <span className="font-medium text-foreground">{subject.progress.grades}%</span>
              </div>
              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${subject.progress.grades}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Materiais Lidos</span>
                <span className="font-medium text-foreground">{subject.progress.materialsRead}%</span>
              </div>
              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full" 
                  style={{ width: `${subject.progress.materialsRead}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Tarefas Concluídas</span>
                <span className="font-medium text-foreground">{subject.progress.tasksCompleted}%</span>
              </div>
              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${subject.progress.tasksCompleted}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Materiais Recentes */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <FileText className="h-4 w-4 text-green-400" aria-hidden="true" />
              </div>
              <h4 className="font-medium text-foreground">Materiais ({subject.materials.length})</h4>
            </div>
            {unreadMaterials > 0 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                {unreadMaterials} novos
              </span>
            )}
          </div>
          
          {subject.materials.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {subject.materials.slice(0, 4).map((material) => (
                <div 
                  key={material.id} 
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-[var(--elevated)] ${
                    material.isRead ? '' : 'bg-blue-500/5 border-l-2 border-blue-500'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--elevated)] flex items-center justify-center flex-shrink-0">
                    {material.type === 'pdf' && <FileText className="h-4 w-4 text-red-400" aria-hidden="true" />}
                    {material.type === 'video' && <FileText className="h-4 w-4 text-green-400" aria-hidden="true" />}
                    {material.type === 'link' && <ExternalLink className="h-4 w-4 text-blue-400" aria-hidden="true" />}
                    {material.type === 'slide' && <FileText className="h-4 w-4 text-purple-400" aria-hidden="true" />}
                    {material.type === 'note' && <FileText className="h-4 w-4 text-amber-400" aria-hidden="true" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{material.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-1.5 py-0.5 bg-[var(--elevated)] rounded">{material.type.toUpperCase()}</span>
                      <span>{new Date(material.dateAdded).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
                    </div>
                  </div>
                  {!material.isRead && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" aria-label="Não lido" />
                  )}
                </div>
              ))}
              {subject.materials.length > 4 && (
                <div className="text-center text-xs text-muted-foreground pt-2 border-t border-[var(--border)]">
                  +{subject.materials.length - 4} materiais...
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">Nenhum material</p>
          )}
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          {subject.nextClass && (
            <button className="px-3 py-1.5 text-sm font-medium bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              Ir para Aula
            </button>
          )}
          {pendingTasks.length > 0 && (
            <button className="px-3 py-1.5 text-sm font-medium bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-colors flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Ver Tarefas
            </button>
          )}
          {subject.materials.length > 0 && (
            <button className="px-3 py-1.5 text-sm font-medium bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Materiais
            </button>
          )}
        </div>
        
        {isInteractive && (
          <button className="px-3 py-1.5 text-sm font-medium bg-[var(--elevated)] text-muted-foreground rounded-lg hover:bg-[var(--border)] hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            Detalhes
          </button>
        )}
      </div>
    </motion.article>
  );
});