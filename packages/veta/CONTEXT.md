# packages/veta — CONTEXT

## What this is

The `veta` npm package provides a CLI (`veta dev`, `veta build`) and a React viewer SPA for browsing AI skill definitions (SKILL.md files).

## Key architecture decisions

### Viewer ships as source

The `src/viewer/` directory ships as raw `.tsx`/`.css` in the npm package (via the `files` field). Vite processes it at runtime. This is necessary because the viewer imports `virtual:veta-skills`, which is a Vite virtual module that can only be resolved during dev/build. This is the same pattern Storybook and Ladle use.

### Vite virtual module

The Vite plugin (`src/vite/plugin.ts`) provides `virtual:veta-skills`. It:
- Scans `skills/*/SKILL.md` with fast-glob
- Parses YAML frontmatter with gray-matter
- Exports the parsed data as `export const skills = [...]`
- Watches for file changes and triggers full-reload

### CLI is transpiled, not bundled

tsup runs in `bundle: false` mode — it transpiles each `.ts` file to `.js` preserving the directory structure. Dependencies resolve from `node_modules` at runtime. This avoids issues with bundling native modules (tailwindcss-oxide) and CJS interop.

### Path resolution

Commands resolve the viewer directory relative to their own file location:
- Built CLI runs from `dist/cli/commands/`
- Package root is 3 levels up: `resolve(__dirname, "../../..")`
- Viewer is at `<pkg-root>/src/viewer/`

## File structure

```
src/
├── cli/
│   ├── index.ts              ← bin entry (cac framework)
│   ├── commands/dev.ts       ← veta dev
│   ├── commands/build.ts     ← veta build
│   └── utils/skills.ts       ← SKILL.md scanner
├── vite/
│   └── plugin.ts             ← virtual module + watcher
└── viewer/
    ├── index.html
    ├── main.tsx
    ├── app.tsx               ← hash router
    ├── globals.css           ← dark theme
    ├── veta-skills.d.ts      ← types for virtual module
    └── components/
        ├── layout.tsx
        ├── search-bar.tsx
        ├── skill-list.tsx
        ├── skill-card.tsx
        └── skill-detail.tsx
```

## How to test

```bash
# Build CLI
pnpm --filter veta build

# Run against sample project
cd test/sample-project && node ../../packages/veta/dist/cli/index.js build
# Or: pnpm --filter sample-project build
```
