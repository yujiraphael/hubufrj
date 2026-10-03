import type { Subject } from '@/components/subjects/types';

/**
 * Fronteira entre o domínio acadêmico e a persistência.
 *
 * A UI não deve conhecer SQLite, ORM ou detalhes de rede.
 * A implementação local será conectada na próxima etapa.
 */
export interface SubjectRepository {
  list(): Promise<Subject[]>;
  findById(id: string): Promise<Subject | null>;
  create(subject: Subject): Promise<Subject>;
  update(id: string, subject: Subject): Promise<Subject>;
  delete(id: string): Promise<void>;
}
