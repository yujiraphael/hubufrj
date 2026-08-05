# Diário de Bordo do Projeto

## Visão Geral do Projeto

Este projeto (hubufrj) é um **assistente acadêmico inteligente** que acompanha o estudante durante todo o dia. Desenvolvido para a graduação em **Engenharia de Alimentos na UFRJ** (Escola de Química).

**Público-alvo:** Raphael Yuji Fujiwara (Matrícula: 126052115)

A experiência principal **não é mais um dashboard estático**, mas a tela **"Hoje"** — um centro de controle em tempo real que responde continuamente: *"O que devo fazer agora?"*

A Timeline Inteligente interpreta dados vindos de disciplinas, calendário, tarefas, provas, eventos pessoais e lembretes. Não possui dados próprios.

---

## Dados do Perfil (exibidos no Header/Perfil)

| Campo | Valor |
|-------|-------|
| **Nome** | RAPHAEL YUJI FUGIWARA |
| **Curso** | Graduação em Engenharia de Alimentos |
| **Unidade** | Escola de Química |
| **Matrícula** | 126052115 |

> **Regra:** CPF, RG e Data de Nascimento são sensíveis — **nunca exibidos no Dashboard/Tela Inicial**. Apenas em futura tela "Perfil" (se houver).

---

## 6 Matérias (Mock Data para SubjectCard)

| # | Matéria | Código/Depto | Observação |
|---|---------|--------------|------------|
| 1 | **Química Orgânica I** | EQ/EQA | Horário: A confirmar |
| 2 | **Fundamentos de Desenho Técnico** | EQA+EQB | Horário: A confirmar |
| 3 | **Química Analítica Experimental I** | EAB/EBB/QIB/EQB | Horário: A confirmar |
| 4 | **Química Experimental** | EQ/EQG+EAG+EBG+QIG | Horário: A confirmar |
| 5 | **Química Analítica** | EBG/EAG-1223/F3 04 | Horário: A confirmar |
| 6 | **Cálculo 2** | [Unif][13-15] Turma | Horário provável: 13h-15h |

> Status: **Horários e confirmações de turma pendentes** — usar "A confirmar" no mock.

---

## [02/08/2026] - Inicialização do Projeto

- Projeto Next.js (App Router) inicializado com TypeScript Strict e Tailwind CSS v4
- Pasta `/docs` criada com:
  - `07-design-system.md` — Design System (Dark Mode First, Surface Hierarchy, Typography, Motion)
  - `08-project-rules.md` — Regras de desenvolvimento (Fluxo, Arquitetura, Acessibilidade)
- Dependências instaladas: `framer-motion`, `lucide-react`
- Boilerplate limpo: página inicial (`page.tsx`) reduzida a `<main className="min-h-screen bg-background" />`
- `globals.css` configurado com background `#08090a` (Design System), apenas modo dark
- Setup básico rodando e pronto para desenvolvimento

---

## [03/08/2026] - Revisão Arquitetural e Mudança de Produto

**Decisão:** O HubUFRJ deixa de ser "sistema de disciplinas" e passa a ser **assistente acadêmico inteligente**.

### Mudanças Principais

1. **Tela principal = "Hoje"** (não mais Dashboard estático)
   - Centro de controle em tempo real (estilo programação de TV / mission control)
   - Mostra: aula acontecendo agora, próximo compromisso, tempo restante, pendências, tarefas, próxima prova, materiais relacionados

2. **Timeline Inteligente** — conceito oficial
   - Não possui dados próprios
   - Interpreta: disciplinas, calendário, tarefas, provas, eventos pessoais, lembretes
   - Responde: "O que devo fazer agora?"

3. **Nova Arquitetura de Pastas**
   ```
   app/
     (dashboard)/
       hoje/
         page.tsx
       disciplinas/
       calendario/
       materiais/
       notas/
       ia/
       perfil/
   components/
     layout/
     today/
     subjects/
     calendar/
     shared/
     ui/
   ```

4. **Componentização Granular**
   - Evitar componentes gigantes
   - Ex.: `ProfileHeader` → `Avatar` + `ProfileInfo` + `Header`
   - `SubjectCard` preparado para evolução (horário, sala, professor, status, materiais, tarefas, próxima prova, progresso)

5. **Filosofia de UX** (inspirado em Linear, Raycast, Vercel, GitHub, ChatGPT, Notion)
   - Poucos cliques, navegação previsível, busca rápida, foco no conteúdo
   - Muito espaço em branco, tipografia consistente, poucas cores
   - Animações discretas, sensação de rapidez

6. **Regras Permanentes Atualizadas**
   - Antes de qualquer implementação: atualizar `00-memoria.md`, `07-design-system.md`, `08-project-rules.md`
   - Apresentar resumo das alterações + solicitar confirmação
   - Um componente por vez, uma tela por vez, commits pequenos
   - Documentação sempre atualizada

---

## [03/08/2026] - Etapa 1: Layout Base Implementado

### Shell da Aplicação
- **Route Group** `app/(dashboard-group)/` criado para agrupar rotas autenticadas
- **Layout raiz** (`app/layout.tsx`): `lang="pt-BR"`, metadata atualizada, fontes Geist
- **Dashboard Layout** (`app/(dashboard-group)/layout.tsx`): Sidebar + Topbar + `<main>` semântico

### Sidebar (`components/layout/Sidebar.tsx`)
- Navegação principal com 7 itens: Hoje, Disciplinas, Calendário, Materiais, Notas, IA, Perfil
- Ícones `lucide-react` + `framer-motion` para entrada escalonada (stagger 0.05s)
- Estado ativo destacado com `bg-[var(--elevated)]` + indicador visual azul
- Footer com dados do perfil (Nome + Matrícula) — sem dados sensíveis
- Acessibilidade: `aria-label`, `aria-current`, semântica `<nav>`, `<aside>`

### Topbar (`components/layout/Topbar.tsx`)
- Busca global (Cmd+K) com animação de largura + foco automático
- Atalho `Cmd+K` / `Ctrl+K` global via `keydown` listener
- Notificações com dropdown animado (Framer Motion)
- Avatar do usuário (componente `Avatar` em `components/shared/`)
- Menu hambúrguer para mobile (preparado)
- Acessibilidade: `aria-label`, `aria-expanded`, focus-visible, Escape para fechar

### Avatar (`components/shared/Avatar.tsx`)
- Componente granular reutilizável (conforme regra de componentização)
- Iniciais do nome + cor determinística baseada no hash do nome
- Tamanhos: `sm` (h-8), `md` (h-10), `lg` (h-12)
- `aria-label` com nome completo

### Design System Atualizado (`globals.css`)
- Variáveis CSS completas: `--surface`, `--elevated`, `--border`, `--muted-foreground`
- `@theme inline` mapeando cores para Tailwind v4
- Reset de bordas global (`* { border-color: var(--border) }`)
- `:focus-visible` padronizado (blue-500, ring-offset background)
- `@media (prefers-reduced-motion: reduce)` desativando animações

### Página "Hoje" (`app/(dashboard-group)/hoje/page.tsx`)
- Mock da tela principal com cards informativos (Próxima Aula, Tarefas, Próxima Prova)
- **Timeline do Dia** visual com indicadores de horário e status (atual = azul, futuros = outline)
- Redirecionamento automático da raiz `/` → `/hoje` (`app/page.tsx`)

### Arquivos Criados/Modificados
| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `src/app/(dashboard-group)/layout.tsx` | Novo | Layout do dashboard (Sidebar + Topbar) |
| `src/app/(dashboard-group)/hoje/page.tsx` | Novo | Tela "Hoje" com Timeline mock |
| `src/components/layout/Sidebar.tsx` | Novo | Sidebar navegável com motion |
| `src/components/layout/Topbar.tsx` | Novo | Topbar com Cmd+K, notificações, avatar |
| `src/components/shared/Avatar.tsx` | Novo | Avatar granular reutilizável |
| `src/app/globals.css` | Atualizado | Design System completo (cores, focus, reduced-motion) |
| `src/app/layout.tsx` | Atualizado | `lang="pt-BR"`, metadata, fontes |
| `src/app/page.tsx` | Atualizado | Redirect para `/hoje` |

### Decisões Técnicas
1. **Route Group `(dashboard-group)`** em vez de `(dashboard)` para evitar colisão com pasta `dashboard` se houver
2. **Sidebar fixa (`sticky top-0 h-screen`)** — padrão desktop-first
3. **Busca Cmd+K no Topbar** (não modal) — alinhado com filosofia "poucos cliques"
4. **Componentes `'use client'`** apenas onde necessário (interatividade, hooks, motion)
5. **Timeline visual estática** na página "Hoje" — base para futura Timeline Inteligente dinâmica
6. **Português (Brasil)** em toda interface — `lang="pt-BR"`, textos, aria-labels

### Próxima Etapa (conforme roadmap)
**Etapa 2: Tela "Hoje" — Timeline Inteligente** (componentes em `components/today/`)
- `Timeline` — componente principal com `aria-live="polite"`
- `CurrentClass` — aula acontecendo agora com contador regressivo
- `UpcomingCard` — próximos compromissos
- `TaskList` — tarefas pendentes agrupadas por prioridade
- Integração com dados mock das 6 disciplinas

---

## [03/08/2026] - Etapa 2: Timeline Inteligente Implementada

### Componentes Criados (`components/today/`)
| Componente | Responsabilidade |
|------------|------------------|
| `Timeline.tsx` | Container principal com `aria-live="polite"`, single timer 60s, estado derivado |
| `TimeIndicator.tsx` | Linha vertical com marcador "agora" (blue-500), dots por status |
| `CurrentClass.tsx` | Aula atual: countdown regressivo (min:seg), barra de progresso, info disciplina |
| `UpcomingCard.tsx` | Próximos compromissos: horário, disciplina, sala, professor, badge prioridade |
| `TaskList.tsx` | Tarefas agrupadas por prioridade (high/medium/low), checkbox, due date |
| `types.ts` | Interface `TimelineEvent` + funções puras (`computeStatus`, `getTimeRemaining`, `getProgress`) |
| `mockData.ts` | 6 eventos mock (4 aulas, 1 tarefa, 1 prova) + helpers de filtro |
| `index.ts` | Barrel export |

### Correções Mobile (Layout)
- **Sidebar** → Drawer mobile (`< lg`), slide spring + overlay, click-outside/Escape
- **Topbar** → Hamburger `lg:hidden` controla drawer state
- **Dashboard Layout** → Client Component com estado `sidebarOpen`

### Página "Hoje" Refatorada
- Usa `<Timeline />` com mock data das 6 disciplinas

### Arquivos Alterados (14 total)
**Novos (9):**
```
src/components/today/types.ts
src/components/today/mockData.ts
src/components/today/Timeline.tsx
src/components/today/TimeIndicator.tsx
src/components/today/CurrentClass.tsx
src/components/today/UpcomingCard.tsx
src/components/today/TaskList.tsx
src/components/today/index.ts
src/app/(dashboard-group)/hoje/page.tsx (refatorado)
```

**Modificados (5):**
```
src/components/layout/Sidebar.tsx (mobile drawer)
src/components/layout/Topbar.tsx (hambúrguer toggle)
src/app/(dashboard-group)/layout.tsx (client + sidebar state)
src/app/globals.css (já tinha tokens)
docs/00-memoria.md (registro implementação)
```

---

## [05/08/2026] - Etapa 3: SubjectCard como Entidade Acadêmica Viva

### Objetivo
Construir a primeira versão do "cérebro acadêmico" do Hub UFRJ — SubjectCard como entidade viva, não apenas card visual.

### Componentes Criados

#### `components/subjects/types.ts`
Interfaces completas para o domínio acadêmico:
- `Subject` — Entidade principal com todas as relações
- `SubjectTask` — Tarefas com prioridade, status, horas estimadas
- `SubjectProgress` — Progresso multidimensional (geral, frequência, notas, materiais, tarefas)
- `SubjectMaterial` — Materiais tipados (pdf, video, link, note, slide) com tags
- `SubjectAttendance` — Frequência com percentual
- `SubjectSummary` — Resumo computado para UI (status, prioridade, próxima aula/prova)
- Funções puras: `computeSubjectStatus`, `computeSubjectPriority`, `createSubjectSummary`, `formatRelativeDate`

#### `components/subjects/mockData.ts`
6 disciplinas reais com dados completos:
1. **Cálculo 2** (CALC2) — IME, Prof. Carlos Silva, aula hoje 13:00, prova em 3 dias
2. **Química Orgânica I** (QO1) — EQ, Prof. Ana Santos, aula amanhã, prova na próxima semana
3. **Química Analítica Exp. I** (QAE1) — EQ, Prof. Roberto Costa, aula hoje 08:00, prova prática em 2 semanas
4. **Fundamentos de Desenho Técnico** (FDT) — EQA+EQB, Prof. Marcos Lima, aula amanhã
5. **Química Experimental** (QEXP) — EQ/EQG+EAG+EBG+QIG, Prof. Fernanda Oliveira, aula sexta
6. **Química Analítica** (QAN) — EBG/EAG, Prof. Paulo Mendes, aula depois de amanhã

Cada disciplina inclui: horário completo, próxima aula com tópico, próxima prova com peso, 2 tarefas (status/prioridade/horas), progresso multidimensional, 2-3 materiais (pdf/video/link/slide), frequência realista.

#### `components/subjects/SubjectCard.tsx`
Entidade acadêmica viva com 3 variantes:
- **`full`** (padrão) — Visão completa: header com progress ring, grid 6 seções (próxima aula, próxima prova, tarefas, progresso detalhado, materiais, ações rápidas)
- **`compact`** — Para grids: código, status, nome, próxima aula, progress ring
- **`summary`** — Para cards de resumo: essenciais + progress ring

Features:
- ProgressRing SVG animado com gradiente e glow
- StatusBadge (current/upcoming/done/no_classes_today) com ícones
- PriorityBadge (high/medium/low) com ícones Lucide
- Tarefas com checkbox, prioridade visual, due date, horas estimadas
- Progresso detalhado: 4 barras (frequência, notas, materiais lidos, tarefas concluídas)
- Materiais com ícones por tipo, indicador "não lido"
- Ações rápidas contextuais (Ir para Aula, Ver Tarefas, Materiais, Detalhes)
- `whileTap` scale 0.98, motion entrance

#### `components/subjects/index.ts`
Barrel export completo.

#### `components/dashboard/SubjectProgressWidget.tsx`
Widget para Home/Cockpit com 2 variantes:
- **`grid`** (padrão) — Cards em grid responsivo (1/2/3 colunas)
- **`list`** — Lista vertical compacta

Cada card mostra: código, status badge, nome, professor, progress ring grande, barra de progresso geral, alerta de próxima prova, contador de tarefas pendentes. Ordenação: prioridade (high→low) + progresso (menor primeiro).

### Integração na Página "Hoje" (`app/(dashboard-group)/hoje/page.tsx`)
Transformada em **Cockpit Acadêmico**:
1. **Header** — Título + subtítulo
2. **Top Row** — Current Subject (summary variant, span 2 cols) + Próximas Provas (quick view)
3. **SubjectProgressWidget** — Grid de 6 disciplinas ordenadas por prioridade
4. **Timeline Inteligente** — Mantida da Etapa 2
5. **Próximas Aulas** — Compact SubjectCards das 3 próximas disciplinas

### Arquivos Criados/Modificados (Etapa 3)
**Novos (6):**
```
src/components/subjects/types.ts
src/components/subjects/mockData.ts
src/components/subjects/SubjectCard.tsx
src/components/subjects/index.ts
src/components/dashboard/SubjectProgressWidget.tsx
src/app/(dashboard-group)/hoje/page.tsx (refatorado - cockpit)
```

### Decisões Técnicas
1. **Mock First** — Dados realistas completos antes de qualquer backend
2. **Funções Puras** — `computeSubjectStatus`, `computeSubjectPriority`, `createSubjectSummary` em `types.ts` (testáveis, sem React)
3. **Variantes de Card** — Mesmo componente, 3 densidades de informação (full/compact/summary)
4. **ProgressRing SVG** — Animação nativa com Framer Motion, gradiente azul→roxo, glow filter
5. **Prioridade Computada** — Algoritmo baseado em: prova próxima (≤3d=3pts, ≤7d=2pts, ≤14d=1pt) + tarefas high pendentes + progresso geral (<40=2pts, <60=1pt)
6. **Compatibilidade** — Mantém arquitetura Etapa 2 (Timeline, today/, layout/)
7. **Sem core/ ainda** — Aguardar 2+ consumidores antes de extrair domínio

---

### Próxima Etapa (conforme roadmap)
**Etapa 4: SubjectDetails — Página Completa da Disciplina**
- Rota `app/(dashboard-group)/disciplinas/[subjectId]/page.tsx`
- Abas: Info, Calendário, Notas, Materiais, Tarefas, Provas, Frequência
- Composição: `SubjectHeader` + `SubjectMeta` + `Tabs` com submódulos
- Integração com `SubjectCard` (ação "Detalhes")