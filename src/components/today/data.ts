import type { TimelineEvent } from './types';

export const timelineEvents: TimelineEvent[] = [];

export function getEventsForToday() {
  return timelineEvents;
}

export function getTasksForToday() {
  return timelineEvents.filter((event) => event.type === 'task');
}
