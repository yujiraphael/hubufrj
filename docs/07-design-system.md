# Design System & UI/UX Guidelines

## 1. Surface Hierarchy (Dark Mode First)
- **Background (Main Page):** `#08090a`
- **Surface (Cards/Sections):** `#0b1120`
- **Elevated Surface (Dropdowns/Modals):** `#121826`
- **Borders:** `1px solid rgba(255, 255, 255, 0.08)`

## 2. Typography & Assets
- **Font Family:** Geist, Inter ou SF Pro.
- **Ícones:** Exclusivamente SVG inline (componentes React) — `lucide-react`.
- **Imagens:** Proibido uso de imagens decorativas. Permitido apenas imagens informacionais.

## 3. Motion & Interações
- **Engine:** Framer Motion (física de `spring`).
- **Feedback Tátil:** Elementos clicáveis devem ter `whileTap={{ scale: 0.98 }}`.
- **Entrada (Stagger):** Listas/grids animam com `staggerChildren: 0.08` + `duration: 0.3`.
- **Mobile Drawer:** Slide 300ms spring + fade overlay.
- **ProgressRing:** Animação stroke-dashoffset 800ms easeOut + gradiente + glow filter.

## 4. Filosofia de UX (Princípios Norteadores)
Inspiração: Linear, Raycast, Vercel, GitHub, ChatGPT, Notion — **sem copiar visualmente**, apenas princípios.

| Princípio | Aplicação Prática |
|-----------|-------------------|
| **Poucos cliques** | Ações principais em 1 clique; atalhos de teclado (Cmd+K) |
| **Navegação previsível** | Padrões consistentes; breadcrumbs em telas profundas |
| **Busca rápida** | Cmd+K global; filtros instantâneos |
| **Foco no conteúdo** | Chrome mínimo; zero distrações visuais |
| **Muito espaço em branco** | `gap-4` a `gap-8` entre cards; `p-6` em containers |
| **Tipografia consistente** | Escala tipográfica fixa; `font-medium` para labels, `font-normal` para body |
| **Poucas cores** | Neutral (slate), 1 accent (blue/indigo), semantic (red/amber/green) |
| **Animações discretas** | `< 300ms`; `spring` natural; reduzir motion se `prefers-reduced-motion` |
| **Sensação de rapidez** | Optimistic UI; skeleton loaders; zero layout shift |

## 5. Componentes Base (Shared/UI)
- `Button` — variants: `primary`, `secondary`, `ghost`, `danger`
- `Card` — Surface `#0b1120` + border sutil
- `Input` / `Textarea` — dark mode native
- `Select` / `Combobox` — para Cmd+K e filtros
- `Avatar` — inicial do nome ou imagem
- `Badge` — status: `current`, `upcoming`, `pending`, `done`
- `Separator` — border sutil
- `Tooltip` — elevated surface

## 6. Componentes Today (Timeline Inteligente)
- `Timeline` — Container com `aria-live="polite"`, single timer, estado temporal derivado
- `CurrentClass` — Aula atual: countdown regressivo, barra de progresso, subject info
- `UpcomingCard` — Próximos: horário, disciplina, sala, professor, status badge
- `TaskList` — Tarefas agrupadas por prioridade (high/medium/low), checkbox, due date
- `TimeIndicator` — Linha vertical com marcador "agora" (blue-500), dots nos eventos

## 7. Componentes Subjects (Entidade Acadêmica Viva)
- `SubjectCard` — Entidade viva com 3 variantes:
  - **`full`** — Header + ProgressRing + Grid 6 seções (aula, prova, tarefas, progresso, materiais, ações)
  - **`compact`** — Código, status, nome, próxima aula, ProgressRing pequeno
  - **`summary`** — Essenciais + ProgressRing médio para cockpits
- `SubjectProgressWidget` — Widget de progresso com 2 variantes:
  - **`grid`** — Cards responsivos (1/2/3 colunas) com progress ring grande
  - **`list`** — Lista vertical compacta
- **ProgressRing SVG** — Animação stroke-dashoffset 800ms, gradiente azul→roxo, glow filter, `role="img"`
- **StatusBadge** — `current` (azul), `upcoming` (âmbar), `done` (verde), `no_classes_today` (neutro)
- **PriorityBadge** — `high` (vermelho/AlertTriangle), `medium` (âmbar/Clock), `low` (verde/CheckCircle2)

## 8. Componentes SubjectDetails (Página da Disciplina)
- `SubjectHeader` — Cabeçalho com código, nome, professor, ProgressRing grande, badges de status/prioridade
- `SubjectMeta` — Metadados: departamento, turma, horário completo, sala, créditos
- `Tabs` — Navegação por abas com indicação visual de aba ativa
- `SubjectInfoTab` — Informações gerais, descrição, ementa, bibliografia
- `SubjectCalendarTab` — Calendário da disciplina (aulas, provas, entregas)
- `SubjectGradesTab` — Notas, médias, histórico de avaliações
- `SubjectMaterialsTab` — Materiais organizados por tipo/tópico, status de leitura
- `SubjectTasksTab` — Tarefas com filtros por status/prioridade, ações inline
- `SubjectExamsTab` — Provas agendadas, pesos, resultados, gabaritos
- `SubjectAttendanceTab` — Frequência detalhada, percentual, faltas permitidas/restantes

## 9. Layout Tokens (Tailwind v4 / CSS Variables)
```css
:root {
  --space-xs: 4px;   /* gap-1 */
  --space-sm: 8px;   /* gap-2 */
  --space-md: 16px;  /* gap-4 */
  --space-lg: 24px;  /* gap-6 */
  --space-xl: 32px;  /* gap-8 */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --sidebar-width: 256px;      /* w-64 */
  --sidebar-collapsed: 72px;   /* w-18 */
  --topbar-height: 64px;       /* h-16 */
  --mobile-breakpoint: 1024px; /* lg */
  --progress-ring-sizes: 36px 44px 56px; /* compact/summary/full */
}
```

## 10. Breakpoints & Responsividade
- **Mobile First** com breakpoints Tailwind: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- **Sidebar:** Desktop fixa (`lg:block`), Mobile drawer (`lg:hidden`)
- **Topbar:** Hamburger apenas mobile (`lg:hidden`)
- **Timeline:** Stack vertical mobile, grid `md:grid-cols-2` `lg:grid-cols-3`
- **SubjectCard Grid:** `md:grid-cols-2` `lg:grid-cols-3` (full variant)
- **SubjectProgressWidget:** `sm:grid-cols-2` `lg:grid-cols-3`
- **SubjectDetails:** Stack vertical mobile, sidebar de navegação lateral em `lg:`

## 11. Acessibilidade (Obrigatório)
- **Keyboard First:** Todo elemento interativo focável (`tabIndex`), `focus-visible` visível
- **Contraste:** WCAG AA mínimo (4.5:1 texto, 3:1 UI)
- **Semântica:** HTML5 correto (`<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`)
- **Screen Readers:** `aria-label` onde ícone sem texto; `aria-live="polite"` na Timeline
- **Reduced Motion:** Respeitar `prefers-reduced-motion: reduce`
- **ARIA Roles:** `role="region"` na Timeline, `aria-current` no evento atual
- **ProgressRing:** `role="img"` com `aria-label="Progresso X%"`
- **StatusBadges:** Textuais + ícones (não apenas cor)

---

## 12. Homepage Neutra — Direção Temporária

Até a definição da identidade visual definitiva:
- usar superfícies e tons neutros;
- evitar cor de marca dominante;
- evitar gradientes proprietários;
- priorizar tipografia, ritmo, hierarquia e espaçamento;
- usar ícones apenas como apoio;
- manter poucos elementos na primeira dobra;
- reduzir densidade visual e evitar grids excessivamente técnicos;
- animações discretas, sem efeitos decorativos chamativos.

### Hierarquia da Homepage
1. Saudação e contexto
2. Ação principal de estudo
3. Hoje
4. Minhas matérias
5. Continuar estudando
6. Próximas avaliações
7. Acessos rápidos

A homepage deve parecer produto final, mas continuar preparada para receber uma identidade visual futura sem retrabalho estrutural.



## 9. Mobile First + Empty States
- Projetar primeiro para 360–430 px.
- Conteúdo principal com padding horizontal compacto no mobile; aumentar progressivamente.
- Evitar grids e densidade informacional na primeira dobra.
- Estados vazios são parte do produto: devem explicar o próximo passo e oferecer uma ação clara.
- A homepage deve privilegiar composição, tipografia, espaço negativo e uma ação principal, evitando métricas e cards administrativos.
- Navegação mobile deve priorizar alcance do polegar e alvos de toque de pelo menos 44 px.
