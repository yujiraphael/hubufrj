# System Rules for Coder Agent

## 1. Fluxo de Desenvolvimento
- **Proibido geração em massa:** Desenvolva um componente/tela por vez.
- **Mock First:** Construa a UI com dados falsos antes de implementar lógica.
- **Commits pequenos:** Uma alteração lógica por commit; mensagens convencionais (`feat:`, `fix:`, `docs:`, `refactor:`).
- **Documentação sempre atualizada:** Toda mudança arquitetural/decisão de produto → atualizar `00-memoria.md`, `07-design-system.md`, `08-project-rules.md` **antes** de implementar.

## 2. Arquitetura Técnica
- **Stack:** Next.js (App Router), TypeScript Strict, Tailwind CSS v4.
- **Semântica:** Use HTML5 semântico (`<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`).
- **Route Groups:** Usar `(dashboard-group)` para agrupar rotas autenticadas/protegidas.
- **Server Components por default:** Client Components apenas quando necessário (`use client` no topo).
- **Data Fetching:** Server Components para dados iniciais; SWR/React Query para client-side.

## 3. Estrutura de Pastas (Obrigatória)
```
app/
  (dashboard-group)/
    hoje/
      page.tsx
    disciplinas/
    calendario/
    materiais/
    notas/
    ia/
    perfil/
components/
  layout/        # Sidebar, Topbar, Header, Footer
  today/         # Timeline, CurrentClass, UpcomingCard, TaskList, TimeIndicator
  subjects/      # SubjectCard, SubjectHeader, SubjectMeta, SubjectProgress, SubjectMaterials, SubjectTasks, SubjectExams, SubjectAttendance
  dashboard/     # SubjectProgressWidget, TodayOverview, UpcomingTasksWidget, ExamsWidget, AlertsWidget, RecommendedActions
  calendar/      # CalendarView, EventCard
  shared/        # Avatar, ProfileInfo, Button, Card, Badge, Input
  ui/            # Primitivos: Tooltip, Separator, Combobox, Modal, Dialog, DropdownMenu, Popover, Tabs
```

## 4. Componentização Granular
- **Evitar componentes gigantes.** Dividir responsabilidades.
- **Exemplos:**
  - ❌ `ProfileHeader` (monolítico)
  - ✅ `Avatar` + `ProfileInfo` + `Header` (compostos)
  - ❌ `SubjectCard` com toda lógica interna
  - ✅ `SubjectCard` (variantes: full/compact/summary) + `SubjectProgressRing` + `SubjectStatusBadge` + `SubjectPriorityBadge` + `SubjectActions`
  - ❌ `Timeline` com toda lógica de tempo
  - ✅ `Timeline` + `CurrentClass` + `UpcomingCard` + `TaskList` + `TimeIndicator`
  - ❌ `SubjectDetails` monolítico
  - ✅ `SubjectHeader` + `SubjectMeta` + `Tabs(SubjectProgress, SubjectCalendar, SubjectMaterials, SubjectTasks, SubjectExams, SubjectAttendance)`

## 5. Subject — Contrato de Domínio (Mock First)
Interface base para entidade acadêmica viva:
```typescript
interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  professor: string;
  classCode: string;
  schedule: { days: string[]; startTime: string; endTime: string; room: string };
  nextClass: { date: string; topic: string; room: string } | null;
  nextExam: { date: string; title: string; weight: number; room: string } | null;
  tasks: SubjectTask[];
  progress: SubjectProgress;        // overall, attendance, grades, materialsRead, tasksCompleted
  materials: SubjectMaterial[];     // pdf, video, link, slide, note + tags + isRead
  attendance: SubjectAttendance;    // total, attended, percentage
}

interface SubjectTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
}

interface SubjectProgress {
  overall: number;           // 0-100
  attendance: number;        // 0-100
  grades: number;            // 0-100
  materialsRead: number;     // 0-100
  tasksCompleted: number;    // 0-100
}
```

### SubjectCard — 3 Variantes
| Variante | Uso | Conteúdo |
|----------|-----|----------|
| `full` | Página da disciplina, detalhe expandido | Header + ProgressRing + Grid 6 seções (aula, prova, tarefas, progresso detalhado, materiais, ações) |
| `compact` | Grids, listas | Código, status, nome, próxima aula, ProgressRing pequeno |
| `summary` | Cockpits, widgets | Essenciais + ProgressRing médio |

### Funções Puras (em `types.ts`, sem React)
- `computeSubjectStatus(subject, now)` → `'current' | 'upcoming' | 'done' | 'no_classes_today'`
- `computeSubjectPriority(subject)` → `'high' | 'medium' | 'low'` (algoritmo: prova ≤3d=3pts, ≤7d=2pts, ≤14d=1pt + tasks high + progresso <40=2pts, <60=1pt)
- `createSubjectSummary(subject, now)` → `SubjectSummary` (status, prioridade, próxima aula formatada, próxima prova, tarefas pendentes, progresso)
- `formatRelativeDate(dateStr, now)` → "Hoje", "Amanhã", "Qua", "15/08"

## 6. TimelineEvent — Contrato de Dados (Mock)
Interface base para eventos da Timeline Inteligente:
```typescript
interface TimelineEvent {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  type: 'class' | 'exam' | 'task' | 'personal';
  startTime: string;           // HH:mm (24h)
  endTime: string;             // HH:mm (24h)
  room?: string;
  professor?: string;
  status: 'current' | 'upcoming' | 'done' | 'pending';
  priority?: 'high' | 'medium' | 'low';
}
```

## 7. Regras da Timeline Inteligente
- **Single Timer:** Um único `setInterval` (60s) no componente `Timeline` pai
- **Estado Derivado:** `status` calculado em tempo real via `startTime`/`endTime` vs `now()` — não armazenado
- **Memoização:** `React.memo` em `CurrentClass`, `UpcomingCard`, `TaskList` para evitar re-renders
- **Atualização Eficiente:** Apenas o marcador "agora" e contadores mudam a cada tick
- **aria-live="polite":** Container `Timeline` anuncia mudanças para screen readers
- **Dados Mock:** 6 disciplinas + tarefas + provas + eventos pessoais

## 8. Regras de Responsividade (Mobile)
- **Sidebar:** Desktop fixa (`lg:block`), Mobile drawer (`lg:hidden`)
  - Drawer: slide from left, overlay backdrop, click-outside + Escape para fechar
  - Largura mobile: 280px (max-w-sm), desktop: 256px (w-64)
- **Topbar:** Hamburger apenas mobile (`lg:hidden`), toggle abre/fecha drawer
- **Timeline:** Stack vertical mobile, grid `md:grid-cols-2` `lg:grid-cols-3`
- **SubjectCard Grid:** `md:grid-cols-2` `lg:grid-cols-3` (full variant)
- **SubjectProgressWidget:** `sm:grid-cols-2` `lg:grid-cols-3`
- **Breakpoint:** `lg: 1024px` como transição desktop/mobile

## 9. SubjectProgressWidget — Widget de Cockpit
- **Variantes:** `grid` (cards responsivos 1/2/3 cols) | `list` (vertical compacta)
- **Ordenação:** Prioridade (high→medium→low) + Progresso (menor primeiro = mais urgente)
- **Conteúdo por card:** Código, status badge, nome, professor, ProgressRing grande (56px), barra geral, alerta próxima prova, contador tarefas pendentes
- **Acessibilidade:** `role="img"` no ProgressRing, `aria-label="Progresso X%"`, status textual + ícones

## 10. Acessibilidade e UX (Obrigatório)
- **Keyboard First:** Interface navegável via teclado (estilo Raycast).
- **Cmd + K:** Prever barra de busca global por atalho (combobox acessível).
- **Focus Visible:** `focus-visible:ring-2 focus-visible:ring-accent` em todos interativos.
- **ARIA:** `aria-label` em ícones sem texto; `aria-live="polite"` na Timeline.
- **Reduced Motion:** Respeitar `@media (prefers-reduced-motion: reduce)`.
- **Contraste:** WCAG AA (4.5:1 texto, 3:1 elementos UI).
- **ARIA Roles:** `role="region"` na Timeline, `aria-current="true"` no evento atual.
- **ProgressRing:** `role="img"` com `aria-label="Progresso X%"`.
- **StatusBadges:** Textuais + ícones (não apenas cor).

## 11. Idioma
- **Todo o projeto em Português (Brasil).**
- Interface, componentes visíveis, textos, documentação, comentários relevantes, nomes apresentados ao usuário.
- Código pode usar convenções do ecossistema (React/Next.js em inglês).

## 12. Regras de Implementação (Ordem de Prioridade)
1. **Layout Base** — Sidebar + Topbar (shell da aplicação)
2. **Tela "Hoje"** — Timeline do dia (experiência principal)
3. **SubjectCard** — Entidade acadêmica viva (reutilizável, 3 variantes)
4. **Página da Disciplina** — Detalhes completos com abas compostas
5. **Calendário** — Visão mensal/semanal
6. **IA** — Assistente contextual (camada transversal, não feature isolada)
7. **Demais funcionalidades** — Materiais, Notas, Perfil
8. **Tela Inicial** — Landing/onboarding (última prioridade)

## 13. Regra Permanente de Documentação
**Antes de QUALQUER nova implementação:**
1. Atualizar: `00-memoria.md`, `07-design-system.md`, `08-project-rules.md`
2. Apresentar resumo das alterações
3. Solicitar confirmação explícita
4. Somente após confirmação → implementar

Nunca implementar funcionalidades importantes sem antes atualizar a documentação do projeto.

---

## 14. Regra Temporária — Nova Homepage

A homepage passa a ser tratada como a principal porta de entrada do produto.

### Princípios
- Priorizar estudo e continuidade, não métricas.
- Evitar widgets puramente administrativos.
- Cada bloco deve responder a uma necessidade concreta do estudante.
- Matérias devem ser apresentadas como entradas para ambientes de estudo.
- Informações burocráticas ficam em segundo plano.
- A identidade visual definitiva não deve ser codificada nesta etapa.

### Escopo Atual
Implementar apenas a homepage neutra e modular.
Páginas internas de disciplina e demais módulos serão definidos em etapas posteriores.



## Regra Permanente — Dados Reais e Mobile First
1. Não introduzir dados acadêmicos fictícios para preencher interface.
2. Sem dado real, renderizar estado vazio explícito.
3. Não simular banco de dados com dados persistentes falsos.
4. Botões de adicionar devem nascer desacoplados da futura camada de persistência.
5. Páginas e componentes devem ser desenhados primeiro para mobile (360–430 px).
6. Ações de voltar em telas internas devem priorizar histórico real para preservar contexto e rolagem.
7. Homepage não deve virar painel de métricas; manter baixa densidade e alto impacto visual.


## Regra de Navegação Superior
- Não exibir busca, notificações ou controles sem função real apenas para preencher espaço.
- No mobile, a topbar deve ser compacta, visualmente leve e desenhada primeiro para 360–430 px.
- Avatar deve usar tratamento neutro até existir foto real de perfil.


## Regra de Persistência de Arquivos
- Nunca oferecer upload funcional sem destino persistente definido.
- Seleção local de arquivo no navegador não conta como armazenamento.
- Uploads futuros devem usar storage externo (ex.: Supabase Storage, R2 ou S3) e salvar metadados no banco.
- Até a camada de dados existir, preferir navegação e ações realmente funcionais.
