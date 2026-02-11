import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="flex items-center gap-3 border-b border-[var(--veta-border)] px-6 py-4">
        <a href="#/" className="flex items-center gap-2 no-underline">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="var(--veta-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-lg font-semibold text-[var(--veta-text)]">
            veta
          </span>
        </a>
        <span className="text-xs text-[var(--veta-text-muted)]">
          Skill Viewer
        </span>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
