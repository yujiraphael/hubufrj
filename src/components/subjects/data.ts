import type { Subject } from './types';
import { createSubjectSummary } from './types';

export const subjects: Subject[] = [];

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((subject) => subject.id === id);
}

export function getSubjectsByPriority(): Subject[] {
  return [...subjects].sort((a, b) => a.progress.overall - b.progress.overall);
}

export function getSubjectSummaries(now: Date = new Date()) {
  return subjects.map((subject) => createSubjectSummary(subject, now));
}
