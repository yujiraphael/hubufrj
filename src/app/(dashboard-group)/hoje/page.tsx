'use client';

import { useRouter } from 'next/navigation';
import { Timeline } from '@/components/today';
import { SubjectProgressWidget } from '@/components/dashboard/SubjectProgressWidget';
import { SubjectCard } from '@/components/subjects/SubjectCard';
import { mockSubjects } from '@/components/subjects/mockData';
import { createSubjectSummary } from '@/components/subjects/types';

export default function HojePage() {
  const router = useRouter();
  const now = new Date();
  const summaries = mockSubjects
    .map(s => createSubjectSummary(s, now))
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return a.progress - b.progress;
    });

  const currentSubject = summaries.find(s => s.status === 'current');
  const upcomingSubjects = summaries.filter(s => s.status === 'upcoming').slice(0, 3);

  const handleSubjectClick = (subjectId: string) => {
    router.push(`/disciplinas/${subjectId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Hoje</h2>
        <p className="text-muted-foreground mt-1">Seu centro de controle acadêmico em tempo real</p>
      </div>

      {/* Top Row: Current Class + Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Current Class Highlight */}
        {currentSubject && (
          <SubjectCard 
            subject={mockSubjects.find(s => s.id === currentSubject.id)!} 
            variant="summary" 
            className="md:col-span-2 lg:col-span-2"
            onClick={() => handleSubjectClick(currentSubject.id)}
          />
        )}
        
        {/* Upcoming Exams Quick View */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Próximas Provas
          </h3>
          <div className="space-y-3">
            {summaries
              .filter(s => s.nextExam)
              .sort((a, b) => (a.nextExam || '').localeCompare(b.nextExam || ''))
              .slice(0, 3)
              .map((summary) => (
                <div key={summary.id} className="flex items-center justify-between p-3 bg-[var(--background)] border border-[var(--border)] rounded-lg cursor-pointer hover:bg-[var(--elevated)] transition-colors"
                     onClick={() => handleSubjectClick(summary.id)}>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{summary.name}</p>
                    <p className="text-xs text-muted-foreground">{summary.code} • {summary.professor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-amber-400">{summary.nextExam}</p>
                    <p className="text-xs text-muted-foreground">em {summary.nextExam ? Math.ceil((new Date(summary.nextExam).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 0} dias</p>
                  </div>
                </div>
              ))}
            {summaries.filter(s => s.nextExam).length === 0 && (
              <p className="text-muted-foreground text-center py-4">Nenhuma prova agendada</p>
            )}
          </div>
        </div>
      </div>

      {/* Subject Progress Widget */}
      <SubjectProgressWidget maxSubjects={6} variant="grid" />

      {/* Timeline Inteligente */}
      <Timeline />

      {/* Upcoming Subjects Quick Cards */}
      {upcomingSubjects.length > 0 && (
        <section aria-label="Próximas Disciplinas">
          <header className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Próximas Aulas
            </h3>
          </header>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingSubjects.map((summary) => (
              <SubjectCard 
                key={summary.id} 
                subject={mockSubjects.find(s => s.id === summary.id)!} 
                variant="compact" 
                onClick={() => handleSubjectClick(summary.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}