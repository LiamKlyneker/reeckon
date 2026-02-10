# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Veta** is "The Storybook for your AI Agents" — a developer tool that treats AI Skills (prompts) like components. This repo contains the **Platform layer**: the public-facing documentation, registry, and marketing site. A separate CLI runner (`npx veta dev`) is developed in a different package.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint (ESLint 9 flat config)
```

No test framework is configured yet.

## Tech Stack

- **Next.js 16** with App Router and React Server Components
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** (Oxide engine, PostCSS plugin)
- **Shadcn/ui** (radix-maia style, RSC-enabled) with Radix UI primitives
- **class-variance-authority (CVA)** for component variants
- **pnpm** as package manager

## Architecture

### Directory Layout

- `app/` — Next.js App Router pages and layouts
- `components/` — React components
  - `components/ui/` — Shadcn/ui component library (Button, Card, Select, etc.)
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `public/` — Static assets

### Import Aliases

`@/*` maps to the project root (e.g., `@/components/ui/button`, `@/lib/utils`).

### Component Conventions

- All UI components use `data-slot` attributes for styling hooks
- CVA pattern for variant management (see Button, Badge)
- Radix UI primitives for accessible interactive components (Select, DropdownMenu, AlertDialog)
- Components use `React.ComponentProps<>` for type-safe prop inheritance
- Client components use `"use client"` directive; default is RSC

### Styling

- Tailwind v4 with CSS custom properties defined in `app/globals.css`
- OKLCh color space for all theme colors
- Light/dark mode via `.dark` class on root element
- Use `cn()` from `@/lib/utils` for composing Tailwind classes

### Adding UI Components

Shadcn/ui CLI is configured via `components.json`. Add new components with:
```bash
pnpm dlx shadcn@latest add <component-name>
```
