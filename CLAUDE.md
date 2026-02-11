# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Be concise and ask questions if you need more context.

## Project Overview

**Veta** is "The Storybook for your AI Agents" — a developer tool that treats AI Skills (prompts) like components. This is a **monorepo** containing:

- `apps/web/` — Public-facing docs, registry, and marketing site (Next.js)
- `packages/veta/` — CLI + viewer (`veta dev`, `veta build`)
- `packages/create-veta/` — Project scaffolder (`pnpm create veta`)
- `test/sample-project/` — In-repo fixture for smoke-testing the CLI

## Commands

### Root (monorepo)

```bash
pnpm install          # Install all workspace dependencies
pnpm -w run dev       # Start web app dev server (Next.js)
pnpm -w run build     # Build web app
pnpm -w run check     # Run format + lint + typecheck across all packages
pnpm -w run format    # Format all files with Prettier
```

### Web app (`apps/web/`)

```bash
pnpm --filter @veta/web dev       # Start Next.js dev server (localhost:3000)
pnpm --filter @veta/web build     # Production build
pnpm --filter @veta/web check     # format + lint + typecheck
```

### CLI (`packages/veta/`)

```bash
pnpm --filter veta build          # Build CLI with tsup
pnpm --filter veta typecheck      # TypeScript check
```

### Scaffolder (`packages/create-veta/`)

```bash
pnpm --filter create-veta build   # Build scaffolder
pnpm --filter create-veta typecheck
```

### Test fixture

```bash
pnpm --filter sample-project dev   # Run viewer against test skills
pnpm --filter sample-project build # Build static viewer for test skills
```

No test framework is configured yet.

## Code Quality

After every implementation, **always run**:

```bash
pnpm -w run check
```

This runs format + lint + typecheck across all packages. All must pass before considering the task complete.

## Tech Stack

### Web app (`apps/web/`)

- **Next.js 16** with App Router and React Server Components
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** (Oxide engine, PostCSS plugin)
- **Shadcn/ui** (radix-maia style, RSC-enabled) with Radix UI primitives
- **class-variance-authority (CVA)** for component variants

### CLI (`packages/veta/`)

- **cac** for CLI argument parsing
- **Vite** as dev server + bundler for the viewer
- **React 19** SPA for the viewer UI
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **gray-matter** + **fast-glob** for SKILL.md scanning
- **tsup** for building CLI code (unbundled mode)
- **Vite virtual module** (`virtual:veta-skills`) injects skill data into the viewer

### Common

- **pnpm** workspaces as package manager
- **Prettier** for formatting (root config)
- **TypeScript** strict mode everywhere

## Architecture

### Monorepo Layout

```
veta/
├── apps/web/              ← Next.js platform site
├── packages/veta/         ← CLI + Vite viewer
├── packages/create-veta/  ← Scaffolder
├── test/sample-project/   ← Test fixture
├── pnpm-workspace.yaml
└── CLAUDE.md
```

### Web app (`apps/web/`)

- `app/` — Next.js App Router pages and layouts
  - `app/<route>/_components/` — Route-specific components (colocated)
  - `app/<route>/_lib/` — Route-specific utilities (colocated)
- `components/` — Shared React components
  - `components/ui/` — Shadcn/ui component library
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `public/` — Static assets
- `@/*` import alias maps to `apps/web/`

### CLI (`packages/veta/`)

- `src/cli/` — CLI entry point and commands
- `src/vite/plugin.ts` — Vite plugin providing `virtual:veta-skills` module
- `src/viewer/` — React SPA shipped as source (processed by Vite at runtime)
- CLI is built with tsup to `dist/`; viewer ships as raw `.tsx`/`.css` in `src/viewer/`

### How the viewer works

1. CLI scans `skills/*/SKILL.md`, parses YAML frontmatter with gray-matter
2. Vite plugin injects parsed data via `virtual:veta-skills` module
3. Viewer SPA reads the virtual module and renders skills with hash routing
4. File changes trigger HMR full-reload via Vite watcher

### Colocation

Feature-specific components and utilities live **colocated** with their route using `_components/` and `_lib/` folders. Only **shared/reusable** code lives in top-level directories.

### Context Files

Each route/package can have a `CONTEXT.md` file documenting technical decisions. **Always read the relevant `CONTEXT.md` before working on a package or route**.

### Component Conventions (Web app)

- All UI components use `data-slot` attributes for styling hooks
- CVA pattern for variant management
- Radix UI primitives for accessible interactive components
- `"use client"` directive for client components; default is RSC

### SKILL.md Format

```yaml
---
name: code-review
description: Reviews code for best practices and bugs.
tags:
  - review
  - quality
license: MIT
metadata:
  author: team-name
  version: "1.0.0"
---

# Skill content as markdown...
```

### Adding UI Components (Web app)

```bash
cd apps/web && pnpm dlx shadcn@latest add <component-name>
```
