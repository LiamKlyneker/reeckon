# test/sample-project — CONTEXT

## What this is

A minimal Reeckon project inside the monorepo that smoke-tests the CLI (`reeckon dev` / `reeckon build`) without publishing to npm. It uses `workspace:*` to link to the local `packages/reeckon`.

## Key decisions

### Only 2 example skills

`code-review` and `summarize` are enough to exercise the viewer's list and detail views, tag filtering, and search. More skills would add maintenance burden without testing additional code paths.

### Explicit `reeckon.repo` in package.json

The `"reeckon": { "repo": "../../test/sample-project" }` field overrides the default git-remote detection. Inside the monorepo, `git remote get-url origin` returns the monorepo URL, not a standalone skills repo. Setting it explicitly ensures the viewer's "copy install command" UI renders during development, so that feature can be tested.

### No `src/` directory

This project only contains `skills/` — it mimics a standalone skills repository, not an application that consumes skills. That role belongs to `test/consumer-project/`.

## How to test

```bash
# 1. Build the CLI first (required after any CLI/plugin source changes)
pnpm --filter reeckon build

# 2. Run the viewer dev server
pnpm --filter sample-project dev

# 3. Or build the static viewer output
pnpm --filter sample-project build
```
