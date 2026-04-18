# Releasing

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning and [`changesets/action`](https://github.com/changesets/action) for automated publishing to npm via GitHub Actions.

Published packages:

- [`reeckon`](https://www.npmjs.com/package/reeckon)
- [`create-reeckon`](https://www.npmjs.com/package/create-reeckon)

Both use **independent** versioning. `apps/web`, `test/sample-project`, and `test/consumer-project` are private and never published.

## The normal flow

1. On a feature branch, make your change.
2. Run `pnpm changeset`, pick the affected package(s) and bump type, write a summary. Commit the `.changeset/*.md` file.
3. Open a PR. CI verifies the changeset is present, lint passes, and the CLI builds on Linux/macOS/Windows with Node 20 + 22.
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
