# test/consumer-project — CONTEXT

## What this is

A stub project that simulates a real-world application consuming skills via `reeckon add`. It uses `workspace:*` to link to the local `packages/reeckon` CLI.

## Key decisions

### Intentionally minimal

No `skills/` directory, no scripts — this project is the *target* of `reeckon add`, not a skills authoring project. The `src/index.ts` placeholder exists only so the project isn't completely empty. After running `reeckon add`, the installed skills appear in `.agents/skills/` (canonical) with tool-specific symlinks.

### No `reeckon.repo` field

Unlike `sample-project`, this project doesn't need a `reeckon.repo` field because it doesn't run the viewer. It only tests the skill installation flow.

## How to test

```bash
# 1. Build the CLI first
pnpm --filter reeckon build

# 2. Test adding skills from sample-project (local source)
cd test/consumer-project && node ../../packages/reeckon/dist/cli/index.js add ../../test/sample-project --skill code-review --tool claude-code,cursor

# 3. Test adding skills from a GitHub repo
cd test/consumer-project && node ../../packages/reeckon/dist/cli/index.js add vercel-labs/agent-skills
```
