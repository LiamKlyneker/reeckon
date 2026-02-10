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
    title: "Get Started",
    items: [{ title: "Why Veta?", href: "/docs/get-started/why-veta" }],
  },
];
