# reeckon

A centralized AI skill registry for your team. Write once and integrate instantly with Claude, Cursor, Antigravity, and other LLM tools.

[![npm version](https://img.shields.io/npm/v/reeckon.svg)](https://www.npmjs.com/package/reeckon)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
pnpm add -g reeckon
# or
npm install -g reeckon
```

## Quick start

Scaffold a new project:

```bash
pnpm create reeckon my-skills
cd my-skills
pnpm install
pnpm dev
```

Or bootstrap by hand. Create a `skills/` folder with a `SKILL.md` file per skill:

```
my-skills/
└── skills/
    └── code-review/
        └── SKILL.md
```

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

Then browse your skills in a local dashboard:

```bash
reeckon dev
```

## Commands

| Command              | Description                                    |
| -------------------- | ---------------------------------------------- |
| `reeckon dev`        | Start a local Vite dev server to browse skills |
| `reeckon build`      | Build a static viewer site into `.reeckon/`    |
| `reeckon add <repo>` | Install skills from a remote repository        |

### `reeckon add`

Pulls skills from any Git repository and installs them for your AI tools.

```bash
# GitHub shorthand
reeckon add acme/ai-skills

# Full URL
reeckon add https://github.com/acme/ai-skills

# Non-interactive: specific skill + tool
reeckon add acme/ai-skills --skill code-review --tool claude-code,cursor
```

| Flag              | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `--skill <name>`  | Install specific skill(s) by name (comma-separated)  |
| `--tool <tools>`  | Target tools: `claude-code`, `cursor`, `antigravity` |
| `--token <token>` | Auth token for private repos                         |

Skills are copied to `.agents/skills/<name>/` (canonical) with symlinks from `.claude/skills/`, `.agent/skills/`, and other tool-specific directories.

## Supported AI tools

| Tool        | Directory         | Strategy                        |
| ----------- | ----------------- | ------------------------------- |
| Cursor      | `.agents/skills/` | Universal (reads canonical dir) |
| Claude Code | `.claude/skills/` | Symlink → `.agents/skills/`     |
| Antigravity | `.agent/skills/`  | Symlink → `.agents/skills/`     |

## Configuration

Point the generated install commands at your registry by adding a `reeckon` field to `package.json`:

```json
{
  "reeckon": {
    "repo": "acme/ai-skills"
  }
}
```

If omitted, Reeckon auto-detects the repo from `git remote get-url origin`.

## Links

- **GitHub**: [LiamKlyneker/reeckon](https://github.com/LiamKlyneker/reeckon)
- **Issues**: [LiamKlyneker/reeckon/issues](https://github.com/LiamKlyneker/reeckon/issues)

## License

MIT — see [LICENSE](./LICENSE).
