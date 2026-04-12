# Reeckon

**The Storybook for your AI Agent Skills.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Reeckon is a developer tool that treats AI Skills (prompts) like components — write once, browse with a local dashboard, and install into any AI tool.

---

## The Problem

Companies have "Senior Engineer Knowledge" locked in people's heads.

- _How do we write a secure SQL query for our schema?_
- _What's the standard way to handle Auth in our Next.js app?_
- _How do I debug our legacy payment service?_

Developers are copy-pasting inconsistent prompts into Claude, Cursor, Copilot, and ChatGPT every day. **There is no single source of truth for AI skills.**

## The Solution: Reeckon

**Reeckon** standardizes AI Agent Skills. Inspired by [Skills.sh](https://skills.sh) and [Storybook](https://storybook.js.org/).

1. **Write Skills Once** — Create `SKILL.md` files with YAML frontmatter.
2. **Browse Locally** — `reeckon dev` launches a Vite-powered dashboard to preview your skills.
3. **Build & Share** — `reeckon build` generates a static site for your team's skill directory.
4. **Install Anywhere** — `reeckon add` fetches skills from any repo and installs them for Claude Code, Cursor, Antigravity, and more.

---

## Quick Start

### Create a new skills project

```bash
pnpm create reeckon my-skills
cd my-skills
pnpm install
pnpm dev
```

### Install skills from a remote repo

```bash
# GitHub shorthand
npx reeckon add acme/ai-skills

# Full URL
npx reeckon add https://github.com/acme/ai-skills

# Non-interactive: specific skill + tool
npx reeckon add acme/ai-skills --skill code-review --tool claude-code,cursor
```

---

## Monorepo Structure

```
reeckon/
├── apps/web/              ← Next.js docs & marketing site
├── packages/reeckon/         ← CLI + Vite viewer (reeckon dev, build, add)
├── packages/create-reeckon/  ← Project scaffolder (pnpm create reeckon)
├── test/sample-project/   ← Publisher test fixture
├── test/consumer-project/ ← Consumer test fixture (reeckon add)
└── pnpm-workspace.yaml
```

## CLI Commands

| Command              | Description                                    |
| -------------------- | ---------------------------------------------- |
| `reeckon dev`        | Start a local Vite dev server to browse skills |
| `reeckon build`      | Build a static viewer site                     |
| `reeckon add <repo>` | Install skills from a remote repository        |

### `reeckon add` options

| Flag              | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `--skill <name>`  | Install specific skill(s) by name (comma-separated)  |
| `--tool <tools>`  | Target tools: `claude-code`, `cursor`, `antigravity` |
| `--token <token>` | Auth token for private repos                         |

### How `reeckon add` works

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

## Roadmap

- **Claude Code plugin marketplace** — Generate `marketplace.json` and `plugin.json` to distribute skills via the [Claude Code plugin ecosystem](https://code.claude.com/docs/en/plugin-marketplaces)
- **Expanded adapter support** — Native adapters for Windsurf, Roo Code, Continue, and other AI coding tools beyond the current 3

## Tech Stack

- **CLI:** [cac](https://github.com/cacjs/cac) + [Vite](https://vitejs.dev) + [React 19](https://react.dev)
- **Web:** [Next.js 16](https://nextjs.org) + [Tailwind CSS v4](https://tailwindcss.com) + [Shadcn/ui](https://ui.shadcn.com)
- **Package Manager:** [pnpm](https://pnpm.io) workspaces
- **Build:** [tsup](https://tsup.egoist.dev) for CLI, Vite for viewer

---

## Development

```bash
git clone https://github.com/creativeghosts/reeckon.git
cd reeckon
pnpm install    # also builds the CLI automatically (prepare script)

# Web app
pnpm -w run dev

# Test the viewer against sample skills
pnpm --filter sample-project dev

# Rebuild CLI manually after changes to packages/reeckon/src/
pnpm --filter reeckon build

# Check everything
pnpm -w run check
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT — see [LICENSE](LICENSE) for details.
