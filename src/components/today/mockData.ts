import type { TimelineEvent } from './types';

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: '1',
    subjectId: 'calc2',
    subjectName: 'Cálculo 2',
    subjectCode: '[Unif][13-15]',
    type: 'class',
    startTime: '13:00',
    endTime: '15:00',
    room: 'A confirmar',
    professor: 'Prof. Silva',
    status: 'upcoming',
    priority: 'high',
  },
  {
    id: '2',
    subjectId: 'qo1',
    subjectName: 'Química Orgânica I',
    subjectCode: 'EQ/EQA',
    type: 'class',
    startTime: '15:30',
    endTime: '17:00',
    room: 'A confirmar',
    professor: 'Prof. Santos',
    status: 'upcoming',
    priority: 'high',
  },
  {
    id: '3',
    subjectId: 'qae1',
    subjectName: 'Química Analítica Exp. I',
    subjectCode: 'EAB/EBB/QIB/EQB',
    type: 'class',
    startTime: '08:00',
    endTime: '10:00',
    room: 'Lab 3',
    professor: 'Prof. Costa',
    status: 'done',
    priority: 'medium',
  },
  {
    id: '4',
    subjectId: 'fdt',
    subjectName: 'Fund. Desenho Técnico',
    subjectCode: 'EQA+EQB',
    type: 'class',
    startTime: '10:30',
    endTime: '12:00',
    room: 'Sala 204',
    professor: 'Prof. Lima',
    status: 'current',
    priority: 'high',
  },
  {
    id: '5',
    subjectId: 'task1',
    subjectName: 'Relatório Lab Química',
    subjectCode: 'QAE1',
    type: 'task',
    startTime: '23:59',
    endTime: '23:59',
    status: 'pending',
    priority: 'high',
  },
  {
    id: '6',
    subjectId: 'exam1',
    subjectName: 'Prova Cálculo 2',
    subjectCode: 'CALC2',
    type: 'exam',
    startTime: '14:00',
    endTime: '16:00',
    room: 'Auditório',
    status: 'upcoming',
    priority: 'high',
  },
];

export function getEventsForToday(events: TimelineEvent[]): TimelineEvent[] {
  return events.filter((e) => e.type === 'class' || e.type === 'exam');
}

export function getTasksForToday(events: TimelineEvent[]): TimelineEvent[] {
  return events.filter((e) => e.type === 'task');
}