import { HomeFooterGrid } from '@/components/dashboard/HomeFooterGrid';
import { HomeHero } from '@/components/dashboard/HomeHero';
import { HomeSubjects } from '@/components/dashboard/HomeSubjects';
import { HomeToday } from '@/components/dashboard/HomeToday';
import { subjects } from '@/components/subjects/data';

function daysUntil(date?: string) {
  if (!date) return null;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

export default function HojePage() {
  const subjectList = [...subjects];
  const featuredSubject = subjectList
    .filter((subject) => subject.nextExam)
    .sort((a, b) => {
      const examDiff = (a.nextExam?.date ?? '').localeCompare(b.nextExam?.date ?? '');
      if (examDiff !== 0) return examDiff;
      return a.progress.overall - b.progress.overall;
    })[0] ?? subjectList[0];

  return (
    <div className="mx-auto w-full max-w-7xl">
      <HomeHero
        subject={featuredSubject}
        examDays={daysUntil(featuredSubject.nextExam?.date)}
      />
      <HomeToday subjects={subjectList} />
      <HomeSubjects subjects={subjectList} />
      <HomeFooterGrid subjects={subjectList} />
    </div>
  );
}
