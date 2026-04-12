"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/container";

// TODO: replace placeholder divs with actual tool logos
const TOOLS = [
  "Cursor",
  "Claude Code",
  "Antigravity",
  "Amp",
  "Cline",
  "Codex",
  "Gemini CLI",
  "GitHub Copilot",
  "Replit",
  "Warp",
  "OpenCode",
  "Deep Agents",
];

const FORMAT_PATHS = [".agents/skills/", ".claude/skills/", ".agent/skills/"];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function SupportedTools() {
  const { ref, visible } = useScrollReveal();

  return (
    <Container className="py-40">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-semibold">
          One source of truth, every tool connected
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[520px]">
          Write skills once in your repo. Reeckon adapts them for every AI tool
          your team uses.
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-[800px]">
        {/* Center hub */}
        <div className="mx-auto mb-12 flex flex-col items-center gap-3">
          <div className="bg-primary text-primary-foreground flex size-20 items-center justify-center rounded-xl text-sm font-semibold">
            reeckon
          </div>
          <div className="flex gap-2">
            {FORMAT_PATHS.map((path) => (
              <span
                key={path}
                className="bg-accent text-muted-foreground rounded px-2 py-1 text-xs"
              >
                {path}
              </span>
            ))}
          </div>
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {TOOLS.map((tool, i) => (
            <div
              key={tool}
              className="border-border flex aspect-square items-center justify-center rounded-lg border p-2 text-center text-xs transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {/* TODO: replace with actual tool logo */}
              {tool}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
