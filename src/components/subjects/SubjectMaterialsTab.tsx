'use client';

import { useState } from 'react';
import { FileText, FileVideo, Link2, Search, Filter, Download } from 'lucide-react';
import type { Subject, SubjectMaterial } from './types';

interface SubjectMaterialsTabProps {
  subject: Subject;
}

const TypeIcon = ({ type }: { type: SubjectMaterial['type'] }) => {
  switch (type) {
    case 'pdf': return <FileText className="h-6 w-6" aria-hidden="true" />;
    case 'video': return <FileVideo className="h-6 w-6" aria-hidden="true" />;
    case 'link': return <Link2 className="h-6 w-6" aria-hidden="true" />;
    case 'slide': return <FileText className="h-6 w-6" aria-hidden="true" />;
    case 'note': return <FileText className="h-6 w-6" aria-hidden="true" />;
    default: return <FileText className="h-6 w-6" aria-hidden="true" />;
  }
};

const typeColors = {
  pdf: 'text-red-400 bg-red-500/20',
  video: 'text-green-400 bg-green-500/20',
  link: 'text-blue-400 bg-blue-500/20',
  slide: 'text-purple-400 bg-purple-500/20',
  note: 'text-amber-400 bg-amber-500/20',
};

const typeLabels = {
  pdf: 'PDF',
  video: 'Vídeo',
  link: 'Link',
  slide: 'Slides',
  note: 'Anotação',
};

export function SubjectMaterialsTab({ subject }: SubjectMaterialsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | SubjectMaterial['type']>('all');
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all');

  const filteredMaterials = subject.materials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || material.type === typeFilter;
    const matchesRead = readFilter === 'all' || 
      (readFilter === 'read' && material.isRead) ||
      (readFilter === 'unread' && !material.isRead);
    return matchesSearch && matchesType && matchesRead;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header com Filtros */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" aria-hidden="true" />
            Materiais ({subject.materials.length})
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {subject.materials.filter(m => !m.isRead).length} não lidos
            </span>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 bg-[var(--background)] border border-[var(--border)] rounded-lg p-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar materiais..."
              className="w-full pl-10 pr-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Buscar materiais"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
              className="px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filtrar por tipo"
            >
              <option value="all">Todos os tipos</option>
              <option value="pdf">PDF</option>
              <option value="video">Vídeo</option>
              <option value="link">Link</option>
              <option value="slide">Slides</option>
              <option value="note">Anotação</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={readFilter}
              onChange={(e) => setReadFilter(e.target.value as typeof readFilter)}
              className="px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filtrar por status de leitura"
            >
              <option value="all">Todos</option>
              <option value="read">Lidos</option>
              <option value="unread">Não lidos</option>
            </select>
          </div>
        </div>
      </section>

      {/* Lista de Materiais */}
      <section className="space-y-3">
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-12 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
            <p className="text-muted-foreground">Nenhum material encontrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMaterials.map((material) => (
              <article
                key={material.id}
                className={`flex items-center gap-4 p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg transition-all hover:border-blue-500/30 ${
                  !material.isRead ? 'bg-blue-500/5 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[material.type]}`}>
                  <TypeIcon type={material.type} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">{material.title}</h3>
                    {!material.isRead && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                        Novo
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeColors[material.type]}`}>
                      {typeLabels[material.type]}
                    </span>
                    <span>{new Date(material.dateAdded).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    {material.tags.length > 0 && (
                      <span className="flex items-center gap-1">
                        {material.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 text-xs bg-[var(--elevated)] text-muted-foreground rounded">
                            #{tag}
                          </span>
                        ))}
                        {material.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{material.tags.length - 3}</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm font-medium bg-[var(--elevated)] text-foreground rounded-lg hover:bg-[var(--border)] transition-colors flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">Abrir</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Estatísticas */}
      <section className="border-t border-[var(--border)] pt-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Resumo</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="text-center p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <div className="text-2xl font-bold text-foreground">{subject.materials.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <div className="text-2xl font-bold text-blue-400">{subject.materials.filter(m => !m.isRead).length}</div>
            <div className="text-xs text-muted-foreground">Não Lidos</div>
          </div>
          <div className="text-center p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <div className="text-2xl font-bold text-green-400">{subject.materials.filter(m => m.isRead).length}</div>
            <div className="text-xs text-muted-foreground">Lidos</div>
          </div>
          <div className="text-center p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <div className="text-2xl font-bold text-purple-400">{subject.progress.materialsRead}%</div>
            <div className="text-xs text-muted-foreground">Progresso</div>
          </div>
          <div className="text-center p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg">
            <div className="text-2xl font-bold text-amber-400">{new Set(subject.materials.flatMap(m => m.tags)).size}</div>
            <div className="text-xs text-muted-foreground">Tags Únicas</div>
          </div>
        </div>
      </section>
    </div>
  );
}