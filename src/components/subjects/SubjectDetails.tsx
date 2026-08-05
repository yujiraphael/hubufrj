'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Calendar, Award, FileText, CheckSquare, AlertCircle, User } from 'lucide-react';
import Link from 'next/link';
import type { Subject } from './types';
import { SubjectHeader } from './SubjectHeader';
import { SubjectInfoTab } from './SubjectInfoTab';
import { SubjectCalendarTab } from './SubjectCalendarTab';
import { SubjectGradesTab } from './SubjectGradesTab';
import { SubjectMaterialsTab } from './SubjectMaterialsTab';
import { SubjectTasksTab } from './SubjectTasksTab';
import { SubjectExamsTab } from './SubjectExamsTab';
import { SubjectAttendanceTab } from './SubjectAttendanceTab';

interface SubjectDetailsProps {
  subject: Subject;
}

type TabId = 'info' | 'calendar' | 'grades' | 'materials' | 'tasks' | 'exams' | 'attendance';

const tabs = [
  { id: 'info' as TabId, label: 'Info', icon: BookOpen },
  { id: 'calendar' as TabId, label: 'Calendário', icon: Calendar },
  { id: 'grades' as TabId, label: 'Notas', icon: Award },
  { id: 'materials' as TabId, label: 'Materiais', icon: FileText },
  { id: 'tasks' as TabId, label: 'Tarefas', icon: CheckSquare },
  { id: 'exams' as TabId, label: 'Provas', icon: AlertCircle },
  { id: 'attendance' as TabId, label: 'Frequência', icon: User },
] as const;

export function SubjectDetails({ subject }: SubjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabId>(tabs[0].id);

  return (
    <div className="min-h-screen bg-background">
      <SubjectHeader subject={subject} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-[var(--border)]">
          <nav className="flex gap-1 overflow-x-auto pb-1" role="tablist" aria-label="Abas da disciplina">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-foreground border-b-2 border-blue-500 bg-[var(--surface)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-[var(--elevated)]'
                }`}
              >
                <tab.icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Panels */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-b-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                id="panel-info"
                role="tabpanel"
                aria-labelledby="tab-info"
              >
                <SubjectInfoTab subject={subject} />
              </motion.div>
            )}
            {activeTab === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                id="panel-calendar"
                role="tabpanel"
                aria-labelledby="tab-calendar"
              >
                <SubjectCalendarTab subject={subject} />
              </motion.div>
            )}
            {activeTab === 'grades' && (
              <motion.div
                key="grades"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                id="panel-grades"
                role="tabpanel"
                aria-labelledby="tab-grades"
              >
                <SubjectGradesTab subject={subject} />
              </motion.div>
            )}
            {activeTab === 'materials' && (
              <motion.div
                key="materials"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                id="panel-materials"
                role="tabpanel"
                aria-labelledby="tab-materials"
              >
                <SubjectMaterialsTab subject={subject} />
              </motion.div>
            )}
            {activeTab === 'tasks' && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                id="panel-tasks"
                role="tabpanel"
                aria-labelledby="tab-tasks"
              >
                <SubjectTasksTab subject={subject} />
              </motion.div>
            )}
            {activeTab === 'exams' && (
              <motion.div
                key="exams"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                id="panel-exams"
                role="tabpanel"
                aria-labelledby="tab-exams"
              >
                <SubjectExamsTab subject={subject} />
              </motion.div>
            )}
            {activeTab === 'attendance' && (
              <motion.div
                key="attendance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                id="panel-attendance"
                role="tabpanel"
                aria-labelledby="tab-attendance"
              >
                <SubjectAttendanceTab subject={subject} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}