# reeckon

## 0.3.0

### Minor Changes

- [#19](https://github.com/LiamKlyneker/reeckon/pull/19) [`96266c9`](https://github.com/LiamKlyneker/reeckon/commit/96266c9a494ef2c65183e50083a1fc1f53906815) Thanks [@LiamKlyneker](https://github.com/LiamKlyneker)! - Refresh viewer typography and color tokens to match the redesigned platform:
  - Fonts: swap CDN-loaded Geist Mono for bundled `@fontsource/ibm-plex-sans` + `@fontsource/ibm-plex-mono` (offline-safe).
  - Body uses IBM Plex Sans; headings and code/terminal surfaces use IBM Plex Mono.
  - `--reeckon-accent` shifts from `#040afe` to `#3416ff`; adds `--reeckon-accent-secondary` (mint `#81f5de`) and `--reeckon-font-sans` / `--reeckon-font-mono` tokens.
  - Token namespace remains `--reeckon-*`; viewer stays standalone with no dependency on host app CSS vars.

## 0.2.0

### Minor Changes

- [#9](https://github.com/LiamKlyneker/reeckon/pull/9) [`52221f9`](https://github.com/LiamKlyneker/reeckon/commit/52221f9d5dd9a8a287b35fc12052bd6bdd1b99a5) Thanks [@LiamKlyneker](https://github.com/LiamKlyneker)! - Require Node.js 22+. The project's pnpm version already requires Node 22.13, so CI can no longer verify Node 20 support — `engines.node` is bumped to `>=22` to match what's actually tested.

### Patch Changes

- [#1](https://github.com/LiamKlyneker/reeckon/pull/1) [`d857fa1`](https://github.com/LiamKlyneker/reeckon/commit/d857fa12d14de340933f9fde731f8e21c0fd1cf7) Thanks [@LiamKlyneker](https://github.com/LiamKlyneker)! - Test: verify release pipeline end-to-end (no code change).
