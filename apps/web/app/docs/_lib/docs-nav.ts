export interface DocsNavItem {
  title: string;
  href: string;
}

export interface DocsNavSection {
  title: string;
  items: DocsNavItem[];
}

export const docsNav: DocsNavSection[] = [
  {
    title: "Documentation",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "SKILL.md Format", href: "/docs/skill-format" },
      { title: "CLI Reference", href: "/docs/cli-reference" },
      { title: "Tool Adapters", href: "/docs/tool-adapters" },
    ],
  },
];
