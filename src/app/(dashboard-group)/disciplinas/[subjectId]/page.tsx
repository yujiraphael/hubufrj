import { notFound } from 'next/navigation';
import { SubjectDetails } from '@/components/subjects/SubjectDetails';
import { getSubjectById } from '@/components/subjects/mockData';

interface PageProps {
  params: Promise<{ subjectId: string }>;
}

export default async function SubjectDetailsPage({ params }: PageProps) {
  const { subjectId } = await params;
  const subject = getSubjectById(subjectId);

  if (!subject) {
    notFound();
  }

  return <SubjectDetails subject={subject} />;
}