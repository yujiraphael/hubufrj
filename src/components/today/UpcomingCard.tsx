'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, User, Clock, AlertCircle } from 'lucide-react';
import type { TimelineEvent } from './types';
import { getTimeRemaining } from './types';

interface UpcomingCardProps {
  event: TimelineEvent;
  currentTime: Date;
}

const typeIcons = {
  class: BookOpen,
  exam: AlertCircle,
  task: Clock,
  personal: User,
} as const;

const typeLabels = {
  class: 'Aula',
  exam: 'Prova',
  task: 'Tarefa',
  personal: 'Pessoal',
} as const;

const priorityColors = {
  high: 'border-red-500/30 bg-red-500/5',
  medium: 'border-amber-500/30 bg-amber-500/5',
  low: 'border-green-500/30 bg-green-500/5',
};

export const UpcomingCard = memo(function UpcomingCard({ event, currentTime }: UpcomingCardProps) {
  const Icon = typeIcons[event.type];
  const { minutes } = getTimeRemaining(event.startTime, currentTime);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const timeUntil = hours > 0
    ? `${hours}h ${mins}min`
    : `${mins}min`;

  return (
    <article
      className={`relative bg-[var(--surface)] border ${priorityColors[event.priority || 'medium']} rounded-xl p-4 transition-colors`}
      aria-label={`${typeLabels[event.type]}: ${event.subjectName} em ${timeUntil}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--elevated)] flex items-center justify-center">
          <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--elevated)] text-muted-foreground rounded-full">
              {typeLabels[event.type].toUpperCase()}
            </span>
            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--elevated)] text-muted-foreground rounded-full">
              {event.subjectCode}
            </span>
          </div>

          <h4 className="font-medium text-foreground truncate mb-1">
            {event.subjectName}
          </h4>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {event.startTime}–{event.endTime}
            </span>
            {event.room && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {event.room}
              </span>
            )}
            {event.professor && (
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                {event.professor}
              </span>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 ml-2">
          <motion.div
            className="text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="font-mono font-medium text-blue-400 text-sm">
              em {timeUntil}
            </div>
            <div className="text-xs text-muted-foreground">
              às {event.startTime}
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
});