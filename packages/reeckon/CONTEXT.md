# packages/reeckon — CONTEXT

## What this is

The `reeckon` npm package provides a CLI (`reeckon dev`, `reeckon build`, `reeckon add`) and a React viewer SPA for browsing AI skill definitions (SKILL.md files).

## Key architecture decisions

### Viewer ships as source

The `src/viewer/` directory ships as raw `.tsx`/`.css` in the npm package (via the `files` field). Vite processes it at runtime. This is necessary because the viewer imports `virtual:reeckon-skills`, which is a Vite virtual module that can only be resolved during dev/build. This is the same pattern Storybook and Ladle use.

### Vite virtual module

The Vite plugin (`src/vite/plugin.ts`) provides `virtual:reeckon-skills`. It:
- Scans `skills/*/SKILL.md` with fast-glob
- Parses YAML frontmatter with gray-matter
- Exports the parsed data as `export const skills = [...]`
- Exports `repoUrl` (string | null) — the repo identifier for install commands
- Watches for file changes and triggers full-reload

### Repo URL resolution (`utils/git/resolve-repo.ts`)

The viewer shows a "copy install command" (`npx reeckon add <repo> --skill <slug>`) on each skill detail page. The repo URL is resolved at startup:
1. **Explicit override** — `reeckon.repo` field in `package.json` (e.g. `"reeckon": { "repo": "acme/ai-skills" }`)
2. **Auto-detect** — `git remote get-url origin`, converted to GitHub shorthand (`owner/repo`) when possible

If neither is available, `repoUrl` is `null` and the install command section is hidden.

### `reeckon add` — skill installer

Installs skills from a remote repo into the local project. Follows the same canonical + symlink pattern as the `skills` CLI (agentskills.io):
1. Clones repo (shallow) or scans local path
2. Interactive multi-select for skills and AI tools (or `--skill` / `--tool` flags)
3. Copies skill directories to `.agents/skills/<name>/` (canonical)
4. Universal tools (Cursor) read from `.agents/skills/` directly
5. Non-universal tools (Claude Code, Antigravity) get a symlink from their dir to the canonical dir
6. Falls back to copy if symlink fails (e.g. Windows)

Tool adapters (`utils/adapters/`) define each tool's directory, whether it's universal, and how to detect if it's installed.

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
│   ├── index.ts                          ← bin entry (cac framework)
│   ├── commands/
│   │   ├── dev.ts                        ← reeckon dev
│   │   ├── build.ts                      ← reeckon build
│   │   └── add.ts                        ← reeckon add (orchestrator)
│   └── utils/
│       ├── skills.ts                     ← SKILL.md scanner
│       ├── git/
│       │   ├── fetch.ts                  ← clone repo + scan skills
│       │   ├── github.ts                 ← URL shorthand parsing + token injection
│       │   └── resolve-repo.ts           ← detect repo URL from git remote / package.json
│       └── adapters/
│           ├── types.ts                  ← ToolAdapter interface
│           ├── registry.ts               ← adapter registry + lookup
│           ├── claude.ts                 ← Claude Code (.claude/skills/, symlink)
│           ├── cursor.ts                 ← Cursor (.agents/skills/, universal)
│           └── antigravity.ts            ← Antigravity (.agent/skills/, symlink)
├── vite/
│   └── plugin.ts                         ← virtual module + watcher
└── viewer/
    ├── index.html
    ├── main.tsx
    ├── app.tsx                           ← hash router
    ├── globals.css                       ← dark theme
    ├── reeckon-skills.d.ts               ← types for virtual module
    └── components/
        ├── layout.tsx
        ├── search-bar.tsx
        ├── skill-list.tsx
        ├── skill-card.tsx
        └── skill-detail.tsx              ← includes copy install command
```

## How to test

```bash
# Build CLI
pnpm --filter reeckon build

# Run viewer against sample project
cd test/sample-project && node ../../packages/reeckon/dist/cli/index.js build
# Or: pnpm --filter sample-project build

# Test reeckon add (local source)
cd test/consumer-project && node ../../packages/reeckon/dist/cli/index.js add ../../test/sample-project --skill code-review --tool claude-code,cursor

# Test reeckon add (GitHub repo)
cd test/consumer-project && node ../../packages/reeckon/dist/cli/index.js add vercel-labs/agent-skills
```
