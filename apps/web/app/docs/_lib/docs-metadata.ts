import type { Metadata } from "next";

interface DocsPageMeta {
  metadata: Metadata;
  jsonLd: Record<string, unknown>;
}

function createDocsMeta(
  path: string,
  title: string,
  description: string
): DocsPageMeta {
  return {
    metadata: {
      title,
      description,
      openGraph: {
        title: `${title} — Reeckon`,
        description,
        images: [`/api/og?title=${encodeURIComponent(title)}`],
      },
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: title,
      description,
      url: `https://reeckon.io${path}`,
      author: { "@type": "Organization", name: "Reeckon" },
      publisher: {
        "@type": "Organization",
        name: "Reeckon",
        url: "https://reeckon.io",
      },
    },
  };
}

export const docsMetadata: Record<string, DocsPageMeta> = {
  "/docs": createDocsMeta(
    "/docs",
    "Introduction",
    "Learn what Reeckon is — a developer tool to define, preview, and share reusable AI agent skills across your team."
  ),
  "/docs/quick-start": createDocsMeta(
    "/docs/quick-start",
    "Quick Start",
    "Create your first Reeckon skills project in minutes. Install the CLI, write a SKILL.md, and preview it locally."
  ),
  "/docs/skill-format": createDocsMeta(
    "/docs/skill-format",
    "SKILL.md Format",
    "Reference for the SKILL.md file format — YAML frontmatter fields, Markdown body conventions, and examples."
  ),
  "/docs/cli-reference": createDocsMeta(
    "/docs/cli-reference",
    "CLI Reference",
    "Complete reference for every Reeckon CLI command and flag — dev, build, add, init, and more."
  ),
  "/docs/tool-adapters": createDocsMeta(
    "/docs/tool-adapters",
    "Tool Adapters",
    "How Reeckon installs skills into Claude Code, Cursor, Codex, Copilot, and 12+ other AI coding tools."
  ),
};
