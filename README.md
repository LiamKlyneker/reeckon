# Veta

**The Storybook for your AI Agent Skills.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Veta is a developer tool that treats AI Skills (prompts) like components — write once, browse with a local dashboard, and install into any AI tool.

---

## The Problem

Companies have "Senior Engineer Knowledge" locked in people's heads.

- _How do we write a secure SQL query for our schema?_
- _What's the standard way to handle Auth in our Next.js app?_
- _How do I debug our legacy payment service?_

Developers are copy-pasting inconsistent prompts into Claude, Cursor, Copilot, and ChatGPT every day. **There is no single source of truth for AI skills.**

## The Solution: Veta

**Veta** standardizes AI Agent Skills. Inspired by [Skills.sh](https://skills.sh) and [Storybook](https://storybook.js.org/).

1. **Write Skills Once** — Create `SKILL.md` files with YAML frontmatter.
2. **Browse Locally** — `veta dev` launches a Vite-powered dashboard to preview your skills.
3. **Build & Share** — `veta build` generates a static site for your team's skill directory.
4. **Install Anywhere** — `veta add` fetches skills from any repo and installs them for Claude Code, Cursor, Antigravity, and more.

---

## Quick Start

### Create a new skills project

```bash
pnpm create veta my-skills
cd my-skills
pnpm install
pnpm dev
```

### Install skills from a remote repo

```bash
# GitHub shorthand
npx veta add acme/ai-skills

# Full URL
npx veta add https://github.com/acme/ai-skills

# Non-interactive: specific skill + tool
npx veta add acme/ai-skills --skill code-review --tool claude-code,cursor
```

---

## Monorepo Structure

```
veta/
├── apps/web/              ← Next.js docs & marketing site
├── packages/veta/         ← CLI + Vite viewer (veta dev, build, add)
├── packages/create-veta/  ← Project scaffolder (pnpm create veta)
├── test/sample-project/   ← Publisher test fixture
├── test/consumer-project/ ← Consumer test fixture (veta add)
└── pnpm-workspace.yaml
```

## CLI Commands

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `veta dev`        | Start a local Vite dev server to browse skills |
| `veta build`      | Build a static viewer site                     |
| `veta add <repo>` | Install skills from a remote repository        |

### `veta add` options

| Flag              | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `--skill <name>`  | Install specific skill(s) by name (comma-separated)  |
| `--tool <tools>`  | Target tools: `claude-code`, `cursor`, `antigravity` |
| `--token <token>` | Auth token for private repos                         |

### How `veta add` works

1. Clones the repo (shallow) and scans `skills/*/SKILL.md`
2. Prompts you to select skills and AI tools (or use `--skill` / `--tool` flags)
3. Copies skills to `.agents/skills/<name>/` (canonical location)
4. Creates symlinks for non-universal tools (e.g. `.claude/skills/<name>/` → `.agents/skills/<name>/`)

### Supported AI tools

| Tool        | Directory         | Strategy                        |
| ----------- | ----------------- | ------------------------------- |
| Cursor      | `.agents/skills/` | Universal (reads canonical dir) |
| Claude Code | `.claude/skills/` | Symlink → `.agents/skills/`     |
| Antigravity | `.agent/skills/`  | Symlink → `.agents/skills/`     |

## SKILL.md Format

```yaml
---
name: code-review
description: Reviews code for best practices, bugs, and improvements.
tags:
  - review
  - quality
license: MIT
metadata:
  author: my-team
  version: "1.0.0"
---
# Code Review

You are an expert code reviewer...
```

---

## Tech Stack

- **CLI:** [cac](https://github.com/cacjs/cac) + [Vite](https://vitejs.dev) + [React 19](https://react.dev)
- **Web:** [Next.js 16](https://nextjs.org) + [Tailwind CSS v4](https://tailwindcss.com) + [Shadcn/ui](https://ui.shadcn.com)
- **Package Manager:** [pnpm](https://pnpm.io) workspaces
- **Build:** [tsup](https://tsup.egoist.dev) for CLI, Vite for viewer

---

## Development

```bash
git clone https://github.com/creative-ghost/veta.git
cd veta
pnpm install

# Web app
pnpm -w run dev

# CLI development
pnpm --filter veta build
pnpm --filter sample-project dev

# Check everything
pnpm -w run check
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT — see [LICENSE](LICENSE) for details.

---

_Named after the **"Veta"** (Mineral Vein) — the rich source of knowledge deep within a mountain (or a company)._
