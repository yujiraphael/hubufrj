'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, User, Clock } from 'lucide-react';
import type { TimelineEvent } from './types';
import { getTimeRemaining, getProgress } from './types';

interface CurrentClassProps {
  event: TimelineEvent;
  currentTime: Date;
}

export const CurrentClass = memo(function CurrentClass({ event, currentTime }: CurrentClassProps) {
  const { minutes, seconds } = getTimeRemaining(event.endTime, currentTime);
  const progress = getProgress(event.startTime, event.endTime, currentTime);

  const isEndingSoon = minutes < 10;

  return (
    <article
      className="relative bg-[var(--surface)] border border-blue-500/30 rounded-xl p-5 overflow-hidden"
      aria-current="true"
      aria-label={`Aula atual: ${event.subjectName}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent" />

      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-blue-400" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
              AGORA
            </span>
            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--elevated)] text-muted-foreground rounded-full">
              {event.subjectCode}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-foreground truncate mb-1">
            {event.subjectName}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {event.room}
            </span>
            {event.professor && (
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                {event.professor}
              </span>
            )}
            <span className="flex items-center gap-1 ml-auto">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span
                className={`font-mono font-medium tabular-nums ${
                  isEndingSoon ? 'text-amber-400' : 'text-blue-400'
                }`}
              >
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Início: {event.startTime}</span>
          <span>Fim: {event.endTime}</span>
        </div>
      </div>
    </article>
  );
});