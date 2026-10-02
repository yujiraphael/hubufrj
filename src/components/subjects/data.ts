import type { Subject } from './types';
import { createSubjectSummary } from './types';

export const subjects: Subject[] = [
  {
    id: 'calculo-2',
    code: 'MAC128',
    name: 'Cálculo 2',
    department: '',
    professor: '',
    classCode: '',
    credits: null,
    schedule: {
      days: [],
      startTime: '',
      endTime: '',
      room: '',
    },
    nextClass: null,
    nextExam: null,
    tasks: [],
    progress: {
      overall: 0,
      attendance: 0,
      grades: 0,
      materialsRead: 0,
      tasksCompleted: 0,
    },
    materials: [],
    attendance: {
      totalClasses: 0,
      attendedClasses: 0,
      percentage: 0,
      lastUpdated: '',
    },
  },
];

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((subject) => subject.id === id);
}

export function getSubjectsByPriority(): Subject[] {
  return [...subjects].sort((a, b) => a.progress.overall - b.progress.overall);
}

export function getSubjectSummaries(now: Date = new Date()) {
  return subjects.map((subject) => createSubjectSummary(subject, now));
}
