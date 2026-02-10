# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Be concise and ask questions if you need more context.

## Project Overview

**Veta** is "The Storybook for your AI Agents" — a developer tool that treats AI Skills (prompts) like components. This repo contains the **Platform layer**: the public-facing documentation, registry, and marketing site. A separate CLI runner (`npx veta dev`) is developed in a different package.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint (ESLint 9 flat config)
pnpm format           # Format all files with Prettier
pnpm typecheck        # TypeScript type check (no emit)
pnpm check            # Run all three: format + lint + typecheck
```

No test framework is configured yet.

## Code Quality

After every implementation, **always run**:

```bash
pnpm check
```

This runs `pnpm format && pnpm lint && pnpm typecheck` in sequence. All three must pass before considering the task complete. Fix any errors before moving on.

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
  - `app/<route>/_components/` — Route-specific components (colocated)
  - `app/<route>/_lib/` — Route-specific utilities (colocated)
- `components/` — Shared React components
  - `components/ui/` — Shadcn/ui component library (Button, Card, Select, etc.)
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `public/` — Static assets

### Colocation

Feature-specific components and utilities live **colocated** with their route using `_components/` and `_lib/` folders (underscore prefix excludes them from Next.js routing). Only **shared/reusable** code lives in the top-level `components/` and `lib/` directories.

Example: `app/docs/_components/docs-sidebar.tsx`, not `components/docs-sidebar.tsx`.

### Context Files

Each route can have a `CONTEXT.md` file that documents technical decisions, architecture, and how things work for that section. These are consumed by developers and AI agents — **always read the relevant `CONTEXT.md` before working on a route**.

Example: `app/docs/CONTEXT.md` documents the MDX + Shiki setup, layout structure, and how to add new docs pages.

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
