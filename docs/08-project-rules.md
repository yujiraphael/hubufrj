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
  subjects/      # SubjectCard, SubjectHeader, SubjectMeta
  calendar/      # CalendarView, EventCard
  shared/        # Avatar, ProfileInfo, Button, Card, Badge, Input
  ui/            # Primitivos: Tooltip, Separator, Combobox, Modal
```

## 4. Componentização Granular
- **Evitar componentes gigantes.** Dividir responsabilidades.
- **Exemplos:**
  - ❌ `ProfileHeader` (monolítico)
  - ✅ `Avatar` + `ProfileInfo` + `Header` (compostos)
  - ❌ `SubjectCard` com toda lógica interna
  - ✅ `SubjectCard` + `SubjectMeta` + `SubjectActions` + `SubjectProgress`
  - ❌ `Timeline` com toda lógica de tempo
  - ✅ `Timeline` + `CurrentClass` + `UpcomingCard` + `TaskList` + `TimeIndicator`

## 5. SubjectCard — Contrato de Evolução
O `SubjectCard` deve nascer preparado para receber (mesmo que mock):
| Prop | Tipo | Descrição |
|------|------|-----------|
| `name` | string | Nome da disciplina |
| `code` | string | Código/departamento |
| `schedule` | string | Horário (ex: "13h-15h") |
| `room` | string | Sala |
| `professor` | string | Nome do professor |
| `status` | `'current' \| 'upcoming' \| 'pending' \| 'done'` | Estado na timeline |
| `materials` | number | Contagem de materiais |
| `tasks` | number | Contagem de tarefas pendentes |
| `nextExam` | string \| null | Data da próxima prova |
| `progress` | number | 0-100 % |

## 6. TimelineEvent — Contrato de Dados (Mock)
Interface base para eventos da Timeline Inteligente:
```typescript
interface TimelineEvent {
  id: string;
  subjectId: string;           // ligação futura com Subject
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
- **Single Timer:** Um único `setInterval` (60s) ou `requestAnimationFrame` no componente `Timeline` pai
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
- **Breakpoint:** `lg: 1024px` como transição desktop/mobile

## 9. Acessibilidade e UX (Obrigatório)
- **Keyboard First:** Interface navegável via teclado (estilo Raycast).
- **Cmd + K:** Prever barra de busca global por atalho (combobox acessível).
- **Focus Visible:** `focus-visible:ring-2 focus-visible:ring-accent` em todos interativos.
- **ARIA:** `aria-label` em ícones sem texto; `aria-live="polite"` na Timeline.
- **Reduced Motion:** Respeitar `@media (prefers-reduced-motion: reduce)`.
- **Contraste:** WCAG AA (4.5:1 texto, 3:1 elementos UI).
- **ARIA Roles:** `role="region"` na Timeline, `aria-current="true"` no evento atual.

## 10. Idioma
- **Todo o projeto em Português (Brasil).**
- Interface, componentes visíveis, textos, documentação, comentários relevantes, nomes apresentados ao usuário.
- Código pode usar convenções do ecossistema (React/Next.js em inglês).

## 11. Regras de Implementação (Ordem de Prioridade)
1. **Layout Base** — Sidebar + Topbar (shell da aplicação)
2. **Tela "Hoje"** — Timeline do dia (experiência principal)
3. **SubjectCard** — Card de disciplina (reutilizável)
4. **Página da Disciplina** — Detalhes completos
5. **Calendário** — Visão mensal/semanal
6. **IA** — Assistente contextual
7. **Demais funcionalidades** — Materiais, Notas, Perfil
8. **Tela Inicial** — Landing/onboarding (última prioridade)

## 12. Regra Permanente de Documentação
**Antes de QUALQUER nova implementação:**
1. Atualizar: `00-memoria.md`, `07-design-system.md`, `08-project-rules.md`
2. Apresentar resumo das alterações
3. Solicitar confirmação explícita
4. Somente após confirmação → implementar

Nunca implementar funcionalidades importantes sem antes atualizar a documentação do projeto.