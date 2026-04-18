"use client";

import Container from "@/components/container";
import SectionTitle from "./section-title";
import { useReveal } from "../_lib/use-reveal";
import { cn } from "@/lib/utils";

const TOOLS = [
  "claude",
  "cursor",
  "codex",
  "antigravity",
  "amp",
  "cline",
  "warp",
  "gemini",
  "copilot",
  "replit",
  "opencode",
  "deep-agents",
];

const FORMAT_PATHS = [".agents/skills/", ".claude/skills/", ".agent/skills/"];

export default function SupportedTools() {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.2);

  return (
    <Container className="py-32">
      <SectionTitle
        kicker="interop"
        title="One source of truth, every tool connected."
        sub="Write skills once in your repo. reeckon adapts them for every AI tool your team uses."
      />

      <div ref={ref} className="relative mx-auto max-w-[900px]">
        <div className="mb-16 flex flex-col items-center gap-14">
          <div className="hub-core bg-primary text-primary-foreground flex size-[84px] items-center justify-center rounded-2xl font-mono text-[13px] font-semibold">
            reeckon
            <span className="wv" />
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {FORMAT_PATHS.map((path) => (
              <span
                key={path}
                className="rounded px-2.5 py-[5px] font-mono text-[11.5px]"
                style={{
                  background: "var(--secondary-accent-soft)",
                  color: "var(--secondary-accent-text)",
                }}
              >
                {path}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 md:grid-cols-6">
          {TOOLS.map((tool, i) => (
            <div
              key={tool}
              className={cn(
                "border-border hover:border-foreground group flex aspect-square flex-col items-center justify-center gap-1.5 rounded-[10px] border p-2 text-center font-mono text-[11.5px] transition-all duration-500 hover:-translate-y-0.5"
              )}
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? undefined : "translateY(12px)",
                transitionDelay: `${i * 50}ms`,
              }}
            >
              <span
                className="size-5 rounded"
                style={{
                  background:
                    "color-mix(in oklab, var(--muted-foreground) 20%, transparent)",
                }}
              />
              <span>{tool.slice(0, 8)}</span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
