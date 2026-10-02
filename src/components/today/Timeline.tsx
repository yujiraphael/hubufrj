'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { TimelineEvent } from './types';
import { computeStatus } from './types';
import { timelineEvents, getEventsForToday, getTasksForToday } from './data';
import { TimeIndicator } from './TimeIndicator';
import { CurrentClass } from './CurrentClass';
import { UpcomingCard } from './UpcomingCard';
import { TaskList } from './TaskList';

export function Timeline() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const eventsWithStatus = useMemo(() => {
    return timelineEvents.map((event) => ({
      ...event,
      status: computeStatus(event, now),
    }));
  }, [now]);

  const classesAndExams = getEventsForToday(eventsWithStatus);
  const tasks = getTasksForToday(eventsWithStatus);

  const currentEvent = classesAndExams.find((e) => e.status === 'current');
  const upcomingEvents = classesAndExams
    .filter((e) => e.status === 'upcoming')
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
  const doneEvents = classesAndExams.filter((e) => e.status === 'done');

  return (
    <section
      role="region"
      aria-live="polite"
      aria-label="Timeline do dia"
      className="space-y-6"
    >
      <TimeIndicator
        events={classesAndExams}
        currentTime={now}
        className="hidden lg:block"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {currentEvent && (
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentClass event={currentEvent} currentTime={now} />
            </motion.div>
          )}

          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <UpcomingCard event={event} currentTime={now} />
            </motion.div>
          ))}

          {doneEvents.length > 0 && (
            <details className="group">
              <summary className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                <span className="text-foreground font-medium">Concluídos hoje</span>
              </summary>
              <div className="mt-3 space-y-2 pl-4 border-l border-[var(--border)]">
                {doneEvents.map((event: TimelineEvent) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span>{event.subjectName}</span>
                    <span className="text-xs">({event.startTime}–{event.endTime})</span>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>

        <aside className="lg:col-span-1">
          <TaskList tasks={tasks} />
        </aside>
      </div>
    </section>
  );
}