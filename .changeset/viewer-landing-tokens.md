---
"reeckon": minor
---

Refresh viewer typography and color tokens to match the redesigned platform:

- Fonts: swap CDN-loaded Geist Mono for bundled `@fontsource/ibm-plex-sans` + `@fontsource/ibm-plex-mono` (offline-safe).
- Body uses IBM Plex Sans; headings and code/terminal surfaces use IBM Plex Mono.
- `--reeckon-accent` shifts from `#040afe` to `#3416ff`; adds `--reeckon-accent-secondary` (mint `#81f5de`) and `--reeckon-font-sans` / `--reeckon-font-mono` tokens.
- Token namespace remains `--reeckon-*`; viewer stays standalone with no dependency on host app CSS vars.
