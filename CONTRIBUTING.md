# Contributing

Thanks for your interest in Reeckon!

## Prerequisites

- Node.js 20+
- pnpm 9+

## Setup

```bash
pnpm install
```

## Before opening a PR

1. Run checks:
   ```bash
   pnpm -w run check
   ```
2. If your change touches `packages/reeckon/` or `packages/create-reeckon/`, add a changeset:
   ```bash
   pnpm changeset
   ```
   Pick the affected package(s) and bump type (patch / minor / major), write a one-line summary. Commit the generated file in `.changeset/` along with your change. CI will fail if a package change has no changeset.
3. For internal-only changes (CI, docs, `apps/web`), skip step 2.

## Release flow

See [`RELEASING.md`](./RELEASING.md). TL;DR: merging PRs with changesets triggers a "Version Packages" PR; merging that PR publishes to npm.

## Running the CLI locally

```bash
pnpm --filter reeckon build
pnpm --filter sample-project dev
```

## Reporting issues

Bugs: open a GitHub issue. Security vulnerabilities: see [`SECURITY.md`](./SECURITY.md).
