# Design System & UI/UX Guidelines

## 1. Surface Hierarchy (Dark Mode First)
- **Background (Main Page):** `#08090a`
- **Surface (Cards/Sections):** `#0b1120`
- **Elevated Surface (Dropdowns/Modals):** `#121826`
- **Borders:** `1px solid rgba(255, 255, 255, 0.08)`

## 2. Typography & Assets
- **Font Family:** Geist, Inter ou SF Pro.
- **Ícones:** Exclusivamente SVG inline (componentes React).
- **Imagens:** Proibido uso de imagens decorativas. Permitido apenas imagens informacionais.

## 3. Motion & Interações
- **Engine:** Framer Motion (física de `spring`).
- **Feedback Tátil:** Elementos clicáveis devem ter `whileTap={{ scale: 0.98 }}`.