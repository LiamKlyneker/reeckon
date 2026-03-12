import type { ReactNode } from "react";
import { skills } from "virtual:reeckon-skills";
import { ThemeToggle } from "./theme-toggle";
import Container from "./container";

export function Layout({
  children,
  page,
}: {
  children: ReactNode;
  page: "list" | "detail";
}) {
  return (
    <div>
      <header className="gap-3 bg-[var(--reeckon-bg-outer)] py-4">
        <Container className="flex items-center">
          <a href="#/" className="flex items-center gap-2 no-underline">
            <div className="size-6 rounded-[2px] bg-[var(--reeckon-accent)]" />
            <span className="font-semibold text-white">
              reeckon |{" "}
              {page === "list"
                ? `${skills.length} skills available`
                : "← back to skills"}
            </span>
          </a>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <main className="flex-1 bg-[var(--reeckon-bg-outer)] p-6 pt-0">
        <div className="min-h-[calc(100vh-90px)] rounded-lg bg-[var(--reeckon-bg-inner)] py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
