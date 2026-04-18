"use client";

import { useEffect, useRef } from "react";

const TOOLS = [
  { name: "claude", x: 72, y: 18 },
  { name: "cursor", x: 88, y: 42 },
  { name: "codex", x: 66, y: 68 },
  { name: "antigravity", x: 42, y: 82 },
  { name: "amp", x: 22, y: 62 },
  { name: "cline", x: 14, y: 32 },
  { name: "warp", x: 38, y: 14 },
  { name: "gemini", x: 92, y: 72 },
];

const HUB_X = 50;
const HUB_Y = 45;

export default function ConstellationGraphic() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current?.parentElement;
    const field = fieldRef.current;
    if (!root || !field) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / r.width;
      const dy = (e.clientY - r.top - r.height / 2) / r.height;
      field.style.transform = `translate(${dx * -10}px, ${dy * -10}px)`;
    };
    root.addEventListener("mousemove", onMove);
    return () => root.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={rootRef} className="constellation" aria-hidden="true">
      <div className="dot-grid" />
      <div ref={fieldRef} className="node-field">
        <div
          className="node hub"
          style={{ left: `${HUB_X}%`, top: `${HUB_Y}%` }}
        >
          <span style={{ fontSize: 9 }}>rk</span>
          <span className="wv" />
        </div>
        <svg
          className="line-svg"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {TOOLS.map((t, i) => {
            const mx = (HUB_X + t.x) / 2 + Math.sin(i) * 6;
            const my = (HUB_Y + t.y) / 2 + Math.cos(i) * 6;
            const cls = i % 3 === 0 ? "hot" : i % 5 === 0 ? "mint" : "";
            return (
              <path
                key={t.name}
                className={cls}
                d={`M ${HUB_X} ${HUB_Y} Q ${mx} ${my} ${t.x} ${t.y}`}
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              />
            );
          })}
        </svg>
        {TOOLS.map((t, i) => (
          <div
            key={t.name}
            className="node"
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              animationDelay: `${0.2 + i * 0.08}s, ${0.2 + i * 0.08}s`,
            }}
          >
            {t.name.slice(0, 3)}
          </div>
        ))}
      </div>
    </div>
  );
}
