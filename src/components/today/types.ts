export interface TimelineEvent {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  type: 'class' | 'exam' | 'task' | 'personal';
  startTime: string; // HH:mm (24h)
  endTime: string;   // HH:mm (24h)
  room?: string;
  professor?: string;
  status: 'current' | 'upcoming' | 'done' | 'pending';
  priority?: 'high' | 'medium' | 'low';
}

export function computeStatus(event: TimelineEvent, now: Date): TimelineEvent['status'] {
  const [startH, startM] = event.startTime.split(':').map(Number);
  const [endH, endM] = event.endTime.split(':').map(Number);

  const start = new Date(now);
  start.setHours(startH, startM, 0, 0);

  const end = new Date(now);
  end.setHours(endH, endM, 0, 0);

  if (now >= start && now < end) return 'current';
  if (now < start) return 'upcoming';
  return 'done';
}

export function getTimeRemaining(endTime: string, now: Date): { minutes: number; seconds: number } {
  const [endH, endM] = endTime.split(':').map(Number);
  const end = new Date(now);
  end.setHours(endH, endM, 0, 0);

  const diffMs = end.getTime() - now.getTime();
  if (diffMs <= 0) return { minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  };
}

export function getProgress(startTime: string, endTime: string, now: Date): number {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  const start = new Date(now);
  start.setHours(startH, startM, 0, 0);

  const end = new Date(now);
  end.setHours(endH, endM, 0, 0);

  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();

  if (elapsed <= 0) return 0;
  if (elapsed >= total) return 100;

  return Math.round((elapsed / total) * 100);
}