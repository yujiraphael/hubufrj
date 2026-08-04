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

## [03/08/2026] - Etapa 2: Timeline Inteligente Planejada

### Objetivo
Criar a experiência "Hoje" como tela principal do HubUFRJ — uma Timeline acadêmica viva, inspirada em grade de programação de TV, sem animações excessivas.

### Componentes a Criar (`components/today/`)
| Componente | Responsabilidade |
|------------|------------------|
| `Timeline` | Container principal com `aria-live="polite"`, gerencia estado temporal |
| `CurrentClass` | Aula acontecendo agora — contador regressivo, progresso visual |
| `UpcomingCard` | Próximos compromissos — horário, disciplina, sala, professor |
| `TaskList` | Tarefas pendentes agrupadas por prioridade/urgência |
| `TimeIndicator` | Linha do tempo visual com marcador de "agora" |

### Dados Mock (Estrutura Preparada para Integração Futura)
```typescript
interface TimelineEvent {
  id: string;
  subjectId: string;           // ligação futura com Subject
  subjectName: string;
  subjectCode: string;
  type: 'class' | 'exam' | 'task' | 'personal';
  startTime: string;           // HH:mm
  endTime: string;             // HH:mm
  room?: string;
  professor?: string;
  status: 'current' | 'upcoming' | 'done' | 'pending';
  priority?: 'high' | 'medium' | 'low';
}
```

### Arquitetura de Atualização Temporal
- **Single timer** no `Timeline` (setInterval 1min ou requestAnimationFrame otimizado)
- Estado derivado: `status` calculado via `startTime`/`endTime` vs `now`
- Evitar re-render pesado: memoização + `React.memo` nos cards
- Preparado para receber dados de: disciplinas, calendário, tarefas, provas, eventos pessoais

### Sidebar Mobile (Correção)
- Drawer lateral em `< 1024px` (lg breakpoint)
- Botão hambúrguer no Topbar abre/fecha
- Overlay com click-outside + Escape para fechar
- Animação Framer Motion (slide + fade)

### Arquivos a Criar/Modificar
| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `src/components/today/Timeline.tsx` | Novo | Container principal com aria-live |
| `src/components/today/CurrentClass.tsx` | Novo | Aula atual com countdown |
| `src/components/today/UpcomingCard.tsx` | Novo | Próximos compromissos |
| `src/components/today/TaskList.tsx` | Novo | Lista de tarefas por prioridade |
| `src/components/today/TimeIndicator.tsx` | Novo | Linha visual com marcador "agora" |
| `src/components/today/index.ts` | Novo | Barrel export |
| `src/components/layout/Sidebar.tsx` | Atualizado | Mobile drawer + hambúrguer |
| `src/components/layout/Topbar.tsx` | Atualizado | Toggle sidebar mobile |
| `src/app/(dashboard-group)/hoje/page.tsx` | Atualizado | Usar novos componentes |
| `docs/00-memoria.md` | Atualizado | Registro da implementação |
| `docs/07-design-system.md` | Atualizado | Tokens/Componentes Today |
| `docs/08-project-rules.md` | Atualizado | Regras de timeline/mobile |