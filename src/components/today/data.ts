import type { TimelineEvent } from './types';

export const timelineEvents: TimelineEvent[] = [];

export function getEventsForToday(events: TimelineEvent[] = timelineEvents) {
  return events.filter((event) => event.type !== 'task');
}

export function getTasksForToday(events: TimelineEvent[] = timelineEvents) {
  return events.filter((event) => event.type === 'task');
}
