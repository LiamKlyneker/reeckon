"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/container";
import WindowFrame from "./window-frame";

const FEATURES = [
  {
    title: "Write once, use everywhere",
    description:
      "Define skills as SKILL.md files with YAML frontmatter. One file works across Claude Code, Cursor, Codex, and 12+ AI tools through Reeckon's adapter system.",
  },
  {
    title: "Browse locally with reeckon dev",
    description:
      "Launch a Vite-powered dashboard to preview, search, and filter your skills. Hot-reloads as you edit, with dark and light themes and a minimal interface that stays out of your way.",
  },
  {
    title: "Build & deploy a static viewer",
    description:
      "Run reeckon build to generate a self-contained static site. Deploy to Vercel, Netlify, or GitHub Pages — your team can browse skills from anywhere.",
  },
  {
    title: "Install from any repo",
    description:
      "Fetch skills from GitHub, Azure DevOps, GitLab, or local paths with reeckon add. Supports private repos, interactive selection, and direct CLI flags for automation.",
  },
];

function SkillMdPreview() {
  return (
    <WindowFrame variant="browser">
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
        <code>
          <span className="text-muted-foreground">---</span>
          {"\n"}
          <span className="text-primary">name</span>
          <span className="text-muted-foreground">: </span>code-review{"\n"}
          <span className="text-primary">description</span>
          <span className="text-muted-foreground">: </span>Reviews code for best
          practices and bugs.{"\n"}
          <span className="text-primary">tags</span>
          <span className="text-muted-foreground">:</span>
          {"\n"}
          {"  "}
          <span className="text-muted-foreground">- </span>review{"\n"}
          {"  "}
          <span className="text-muted-foreground">- </span>quality{"\n"}
          <span className="text-primary">license</span>
          <span className="text-muted-foreground">: </span>MIT{"\n"}
          <span className="text-muted-foreground">---</span>
          {"\n\n"}
          <span className="text-primary font-semibold"># Code Review</span>
          {"\n\n"}You are an expert code reviewer...
        </code>
      </pre>
    </WindowFrame>
  );
}

function ViewerPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percent);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      handleMove(e.touches[0].clientX);
    };
    const onEnd = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [handleMove]);

  return (
    <WindowFrame variant="browser">
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        onMouseDown={(e) => {
          dragging.current = true;
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* Light theme (full width, bottom layer) */}
        <img
          src="/theme-light.png"
          alt="Reeckon viewer light theme"
          className="block w-full"
          draggable={false}
        />

        {/* Dark theme (clipped from the right) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <img
            src="/theme-dark.png"
            alt="Reeckon viewer dark theme"
            className="block w-full"
            draggable={false}
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="bg-primary absolute top-0 bottom-0 w-0.5 -translate-x-1/2" />
          <div className="bg-primary absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-primary-foreground"
            >
              <path
                d="M4 3L1 7L4 11M10 3L13 7L10 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function BuildPreview() {
  return (
    <WindowFrame variant="terminal">
      <div className="p-5 text-sm leading-relaxed">
        <p>
          <span className="text-muted-foreground">$</span> reeckon build
        </p>
        <p className="text-muted-foreground mt-3">
          Scanning skills/code-review/SKILL.md
        </p>
        <p className="text-muted-foreground">
          Scanning skills/summarize/SKILL.md
        </p>
        <p className="text-muted-foreground">
          Scanning skills/auth-guide/SKILL.md
        </p>
        <p className="mt-3">
          <span className="text-green-400">&#10003;</span> Built 3 skills to
          .reeckon/
        </p>
        <p className="text-muted-foreground mt-1">
          Output: .reeckon/index.html (42kb)
        </p>
      </div>
    </WindowFrame>
  );
}

function InstallPreview() {
  return (
    <WindowFrame variant="terminal">
      <div className="p-5 text-sm leading-relaxed">
        <p>
          <span className="text-muted-foreground">$</span> npx reeckon add
          acme/ai-skills
        </p>
        <p className="text-muted-foreground mt-3">Cloning acme/ai-skills...</p>
        <p className="mt-3">Found 4 skills:</p>
        <p className="text-primary ml-2">&#10003; code-review</p>
        <p className="text-primary ml-2">&#10003; summarize</p>
        <p className="text-muted-foreground ml-2">&#9744; auth-guide</p>
        <p className="text-muted-foreground ml-2">&#9744; debug-helper</p>
        <p className="mt-3">
          Installing for:{" "}
          <span className="text-primary">claude-code, cursor</span>
        </p>
        <p className="mt-1">
          <span className="text-green-400">&#10003;</span> 2 skills installed
        </p>
      </div>
    </WindowFrame>
  );
}

const FEATURE_PANELS = [
  SkillMdPreview,
  ViewerPreview,
  BuildPreview,
  InstallPreview,
];

export default function MainFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <Container className="py-28">
      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-20 lg:hidden">
        {FEATURES.map((feature, i) => {
          const Panel = FEATURE_PANELS[i];
          return (
            <section key={feature.title}>
              <div className="mb-8">
                <h2 className="mb-4 text-3xl font-semibold">{feature.title}</h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <Panel />
            </section>
          );
        })}
      </div>

      {/* Desktop: sticky scroll layout */}
      <div className="hidden lg:flex lg:gap-12">
        <div className="flex-1">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="flex min-h-[70vh] items-center"
            >
              <div className="max-w-[460px]">
                <h2 className="mb-4 text-3xl font-semibold">{feature.title}</h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div className="sticky top-[20vh] flex min-h-[60vh] items-center">
            <div className="relative w-full">
              {FEATURE_PANELS.map((Panel, i) => (
                <div
                  key={i}
                  className="transition-opacity duration-300"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    position: i === 0 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    pointerEvents: activeIndex === i ? "auto" : "none",
                  }}
                >
                  <Panel />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
