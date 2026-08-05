export interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  professor: string;
  classCode: string; // turma
  schedule: {
    days: string[]; // ['seg', 'qua']
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    room: string;
  };
  nextClass: {
    date: string; // ISO date
    topic: string;
    room: string;
  } | null;
  nextExam: {
    date: string; // ISO date
    title: string;
    weight: number; // 0-1
    room: string;
  } | null;
  tasks: SubjectTask[];
  progress: SubjectProgress;
  materials: SubjectMaterial[];
  attendance: SubjectAttendance;
}

export interface SubjectTask {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date
  status: 'pending' | 'in_progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
}

export interface SubjectProgress {
  overall: number; // 0-100
  attendance: number; // 0-100
  grades: number; // 0-100
  materialsRead: number; // 0-100
  tasksCompleted: number; // 0-100
}

export interface SubjectMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'note' | 'slide';
  url: string;
  dateAdded: string; // ISO date
  isRead: boolean;
  tags: string[];
}

export interface SubjectAttendance {
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  lastUpdated: string; // ISO date
}

export interface SubjectSummary {
  id: string;
  code: string;
  name: string;
  professor: string;
  nextClass: string | null; // "Hoje 13:00" or "Qua 10:30"
  nextExam: string | null; // "2026-08-15"
  pendingTasks: number;
  progress: number;
  status: 'current' | 'upcoming' | 'done' | 'no_classes_today';
  priority: 'high' | 'medium' | 'low';
}

export function computeSubjectStatus(subject: Subject, now: Date): SubjectSummary['status'] {
  if (!subject.nextClass) return 'no_classes_today';
  
  const classDate = new Date(subject.nextClass.date);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  classDate.setHours(0, 0, 0, 0);
  
  if (classDate.getTime() === today.getTime()) return 'current';
  if (classDate > today) return 'upcoming';
  return 'done';
}

export function computeSubjectPriority(subject: Subject): SubjectSummary['priority'] {
  let score = 0;
  
  // Próxima prova em menos de 7 dias
  if (subject.nextExam) {
    const examDate = new Date(subject.nextExam.date);
    const diffDays = (examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    if (diffDays <= 3) score += 3;
    else if (diffDays <= 7) score += 2;
    else if (diffDays <= 14) score += 1;
  }
  
  // Tarefas de alta prioridade pendentes
  const highPriorityTasks = subject.tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;
  score += highPriorityTasks;
  
  // Progresso baixo
  if (subject.progress.overall < 40) score += 2;
  else if (subject.progress.overall < 60) score += 1;
  
  if (score >= 4) return 'high';
  if (score >= 2) return 'medium';
  return 'low';
}

export function createSubjectSummary(subject: Subject, now: Date): SubjectSummary {
  return {
    id: subject.id,
    code: subject.code,
    name: subject.name,
    professor: subject.professor,
    nextClass: subject.nextClass 
      ? `${formatRelativeDate(subject.nextClass.date, now)} ${subject.schedule.startTime}`
      : null,
    nextExam: subject.nextExam ? subject.nextExam.date.split('T')[0] : null,
    pendingTasks: subject.tasks.filter(t => t.status !== 'done').length,
    progress: subject.progress.overall,
    status: computeSubjectStatus(subject, now),
    priority: computeSubjectPriority(subject),
  };
}

export function formatRelativeDate(dateStr: string, now: Date): string {
  const date = new Date(dateStr);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  const diffDays = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Amanhã';
  if (diffDays === -1) return 'Ontem';
  if (diffDays > 0 && diffDays < 7) {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getDay()];
  }
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}