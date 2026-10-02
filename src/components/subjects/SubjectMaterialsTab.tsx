'use client';

import { FileText, Link2, Plus } from 'lucide-react';
import type { Subject } from './types';

interface SubjectMaterialsTabProps {
  subject: Subject;
}

export function SubjectMaterialsTab({ subject }: SubjectMaterialsTabProps) {
  if (subject.materials.length === 0) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--border)] px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--elevated)]">
            <FileText className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Nenhum material salvo</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            PDFs, links, slides e anotações de {subject.name} vão aparecer aqui quando conectarmos o armazenamento.
          </p>
          <button type="button" disabled className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-70">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Adicionar material
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4 sm:p-6">
      {subject.materials.map((material) => (
        <a
          key={material.id}
          href={material.url}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05]">
            {material.type === 'link' ? <Link2 className="h-4 w-4 text-muted-foreground" /> : <FileText className="h-4 w-4 text-muted-foreground" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{material.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{material.type.toUpperCase()}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
