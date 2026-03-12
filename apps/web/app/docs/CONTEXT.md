# /docs — Technical Context

## Purpose

The documentation section of the Reeckon platform. Serves as the public-facing docs for understanding what Reeckon is and how to use it.

## Content System

- **MDX via `@next/mdx`** — `.mdx` files in `app/` act as pages directly (configured in `next.config.ts` with `pageExtensions`)
- **Syntax highlighting via Shiki** — handled at the component level (not as a rehype plugin) to stay compatible with Turbopack. The async RSC `components/code-block.tsx` calls `codeToHtml()` at render time with dual themes (`github-light` / `github-dark`)
- **`mdx-components.tsx`** (project root) — maps standard markdown elements to styled components using Tailwind. Required by `@next/mdx`. The `pre` mapping extracts code/language from children and delegates to `CodeBlock`; the `code` mapping distinguishes inline code (styled) from block code (passed through for `pre` to handle)

### Why not rehype-pretty-code?

Turbopack (Next.js 16 default dev server) requires all loader options to be serializable. Rehype plugins are functions and can't be serialized, causing a build error. Using Shiki directly in an async RSC achieves the same result with zero client JS.

## Layout

- **`layout.tsx`** — Server component. Flex layout: fixed-width sidebar (256px) + scrollable content area. Max width 5xl, centered.
- **`_components/docs-sidebar.tsx`** — Client component (needs `usePathname` for active link highlighting). Renders nav sections from `_lib/docs-nav.ts`.
- **`_lib/docs-nav.ts`** — Navigation data structure. Array of `DocsNavSection` objects, each with a `title` and `items` array. To add a new page, add an entry here.

## Pages

| Route                           | File                               | Description                          |
| ------------------------------- | ---------------------------------- | ------------------------------------ |
| `/docs`                         | `page.mdx`                         | Landing page with overview and links |
| `/docs/get-started/why-reeckon` | `get-started/why-reeckon/page.mdx` | Explains the problem Reeckon solves  |

## Adding a New Docs Page

1. Create `app/docs/<section>/<slug>/page.mdx`
2. Add an entry to `_lib/docs-nav.ts` under the appropriate section (or create a new section)
3. The sidebar and routing pick it up automatically

## Key Decisions

- **No heavy docs framework** (Fumadocs, Nextra) — kept minimal with `@next/mdx` to avoid framework lock-in and stay close to native Next.js
- **Colocation** — all docs-specific components and utilities live under `app/docs/_components/` and `app/docs/_lib/` (underscore prefix excludes from routing)
- **Shared components** in top-level `components/` only when used across multiple routes (e.g., `CodeBlock` is shared because `mdx-components.tsx` is global)
