# Diário de Bordo do Projeto

## Visão Geral do Projeto

Este projeto (hubufrj) é uma plataforma acadêmica pessoal desenvolvida para organizar e gerenciar o fluxo de estudos, materiais e disciplinas (como Cálculo e Química) da graduação em Engenharia de Alimentos na UFRJ. A interface é focada em leitura rápida, modo escuro nativo e navegação por componentes isolados de matérias.

## [02/08/2026] - Inicialização do Projeto

- Projeto Next.js (App Router) inicializado com TypeScript Strict e Tailwind CSS v4
- Pasta `/docs` criada com:
  - `07-design-system.md` — Design System (Dark Mode First, Surface Hierarchy, Typography, Motion)
  - `08-project-rules.md` — Regras de desenvolvimento (Fluxo, Arquitetura, Acessibilidade)
- Dependências instaladas: `framer-motion`, `lucide-react`
- Boilerplate limpo: página inicial (`page.tsx`) reduzida a `<main className="min-h-screen bg-background" />`
- `globals.css` configurado com background `#08090a` (Design System), apenas modo dark
- Setup básico rodando e pronto para desenvolvimento