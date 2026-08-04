'use client';

import { memo } from 'react';
import type { TimelineEvent } from './types';

interface TimeIndicatorProps {
  events: TimelineEvent[];
  currentTime: Date;
  className?: string;
}

export const TimeIndicator = memo(function TimeIndicator({
  events,
  currentTime,
  className = '',
}: TimeIndicatorProps) {
  const dayStart = 6; // 06:00
  const dayEnd = 23; // 23:00
  const totalMinutes = (dayEnd - dayStart) * 60;

  const getPosition = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    const minutesFromStart = (h - dayStart) * 60 + m;
    return Math.max(0, Math.min(100, (minutesFromStart / totalMinutes) * 100));
  };

  const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const nowPosition = Math.max(0, Math.min(100, ((nowMinutes - dayStart * 60) / totalMinutes) * 100));

  return (
    <div className={`relative h-full min-h-[400px] ${className}`} aria-hidden="true">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

      <div
        className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-500 pointer-events-none"
        style={{ height: `${nowPosition}%` }}
      />

      <div
        className="absolute left-[6px] w-4 h-4 rounded-full bg-blue-500 border-2 border-[var(--background)] shadow-lg pointer-events-none"
        style={{ top: `${nowPosition}%`, transform: 'translateY(-50%)' }}
      />

      {events.map((event) => {
        const startPos = getPosition(event.startTime);
        const endPos = getPosition(event.endTime);
        const height = endPos - startPos;

        const statusColors = {
          current: 'bg-blue-500',
          upcoming: 'bg-[var(--border)] border border-[var(--foreground)]',
          done: 'bg-green-500',
          pending: 'bg-amber-500',
        };

        return (
          <div
            key={event.id}
            className="absolute left-[2px] w-3 h-3 rounded-full border-2 border-[var(--background)] shadow-sm pointer-events-none"
            style={{
              top: `${startPos}%`,
              height: `${height}%`,
              minHeight: '8px',
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: statusColors[event.status] }}
            />
          </div>
        );
      })}

      <div className="absolute left-16 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground pointer-events-none">
        {Array.from({ length: dayEnd - dayStart + 1 }, (_, i) => dayStart + i).map((hour) => (
          <div key={hour} className="relative h-[calc(100%/17)] border-t border-[var(--border)]">
            <span className="absolute -left-10 w-10 text-right pr-1">{hour.toString().padStart(2, '0')}:00</span>
          </div>
        ))}
      </div>
    </div>
  );
});