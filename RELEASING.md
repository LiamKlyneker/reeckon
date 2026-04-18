# Releasing

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning and [`changesets/action`](https://github.com/changesets/action) for automated publishing to npm via GitHub Actions.

Published packages:

- [`reeckon`](https://www.npmjs.com/package/reeckon)
- [`create-reeckon`](https://www.npmjs.com/package/create-reeckon)

Both use **independent** versioning. `apps/web`, `test/sample-project`, and `test/consumer-project` are private and never published.

## The normal flow

1. On a feature branch, make your change.
2. Run `pnpm changeset`, pick the affected package(s) and bump type, write a summary. Commit the `.changeset/*.md` file.
3. Open a PR. CI verifies the changeset is present, lint passes, and the CLI builds on Linux/macOS/Windows with Node 22.
4. Merge to `main`.
5. The **Release** workflow runs. If there are unreleased changesets, it opens (or updates) a **"Version Packages"** PR that bumps `package.json` versions and regenerates each package's `CHANGELOG.md`.
6. Review the Version Packages PR and merge it.
7. The Release workflow runs again. This time it:
   - builds the packages,
   - publishes to npm via trusted publishing (OIDC) with provenance,
   - creates git tags (e.g. `reeckon@0.2.0`),
   - creates a GitHub Release per package with the changelog as the body.

No tokens to rotate. No manual `npm publish`.

## One-time setup (already done, for reference)

- npm trusted publishers configured for both packages pointing at `LiamKlyneker/reeckon` + `release.yml`.
- [changeset-bot](https://github.com/apps/changeset-bot) installed on the repo.
- Branch protection on `main` requires CI green.

## Troubleshooting

Things that have broken the release pipeline before, preserved here so the next person debugging at 3am doesn't re-derive them.

### Release PR fails `pnpm install --frozen-lockfile` on Windows with `ERR_PNPM_BROKEN_LOCKFILE`

`pnpm-lock.yaml` has two concatenated YAML documents. pnpm's "managed package manager versions" feature (on by default in pnpm 10) prepends a `packageManagerDependencies` block as a separate document when the release workflow runs `pnpm install` a second time inside `changesets/action`. Windows pnpm rejects multi-doc lockfiles; macOS/Linux silently accept them.

Fix: `managePackageManagerVersions: false` in `pnpm-workspace.yaml`. **Must live there** — putting it in the `pnpm` block of `package.json` is silently ignored in pnpm 10.

### CI fails with `ERR_PNPM_IGNORED_BUILDS` even though the package is in `ignoredBuiltDependencies`

pnpm 10 treats ignored build scripts as errors in CI mode, even ones you explicitly ignored. Local runs only warn.

Fix: `strictDepBuilds: false` in `pnpm-workspace.yaml`.

### pnpm settings in `package.json` stopped working

In pnpm 10, as soon as `pnpm-workspace.yaml` contains any settings, the `pnpm` block in `package.json` is ignored entirely. Keep all pnpm settings (`onlyBuiltDependencies`, `ignoredBuiltDependencies`, etc.) in `pnpm-workspace.yaml`.

### `Changeset present` CI job fails on the Release PR

The Release PR deletes `.changeset/*.md` files by design, so `pnpm changeset status` thinks the PR is missing a changeset. The job in `ci.yml` is gated with `github.head_ref != 'changeset-release/main'` — don't remove that condition.

### Release PR got into a stuck state — closed it, but the workflow didn't reopen a fresh one

If you close the Release PR while the release workflow is mid-run, `changesets/action` can race with the close and try to "update" the closed PR via the GitHub API. Result: the PR stays closed, the branch may or may not exist, and the next push to `main` won't always retrigger cleanly.

Fix: re-run the last release workflow run (`gh run rerun <id>` or the GitHub UI). It will find no open Release PR and create a fresh one.

### The Release PR's CI checks need manual approval every time

Workflows triggered by `GITHUB_TOKEN` can't themselves trigger other workflows — GitHub safety policy. The Release PR is created by `github-actions[bot]`, so CI doesn't auto-run on it; you'll see "Approve and run workflows" instead.

To auto-run: create a fine-grained PAT (or GitHub App token) with `contents: write` + `pull-requests: write`, store as `RELEASE_PAT`, and pass it to both `actions/checkout` and `changesets/action` in `release.yml`. Downside: commits on the Release PR are attributed to the PAT owner rather than `github-actions[bot]`.

## Hotfixing a bad release

npm disallows unpublish after 72 hours. If a release is broken:

1. Revert or fix on a branch.
2. Add a changeset (`patch` bump).
3. Merge the fix, then merge the Version Packages PR.
4. The bad version stays on npm but `@latest` moves to the fix. You can also deprecate the bad version: `npm deprecate reeckon@<bad-version> "use <fix-version>"`.

## Adding a `next` prerelease channel (future)

Currently we only publish to the `latest` dist-tag. If you want to cut prereleases:

1. `pnpm changeset pre enter next` on a branch (creates `.changeset/pre.json`).
2. Commit and merge PRs as usual; the Version Packages PR will produce `X.Y.Z-next.N` versions tagged `@next` on npm.
3. When ready to promote: `pnpm changeset pre exit`, merge, and the next Version PR produces a stable release.

See the [Changesets prerelease docs](https://github.com/changesets/changesets/blob/main/docs/prereleases.md) for full details.

## Adding a new publishable package

The first publish of a new package has to happen **before** OIDC can take over — npm requires the package to exist before a trusted publisher can be configured.

1. Manually publish `0.0.0` or `0.1.0` once with `npm publish --access public` (using a one-time automation token, or `npm publish --otp=...`).
2. Configure the trusted publisher for the new package in the npm UI, pointing at this repo + `release.yml`.
3. After that, all future releases go through the Changesets flow.
