import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    root.classList.toggle("dark", prefersDark);
    root.classList.toggle("light", !prefersDark);
  } else {
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
  }
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("veta-theme") as Theme) || "dark";
  });

  const handleSystemChange = useCallback(
    (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const root = document.documentElement;
        root.classList.toggle("dark", e.matches);
        root.classList.toggle("light", !e.matches);
      }
    },
    [theme]
  );

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("veta-theme", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", handleSystemChange);
    return () => mq.removeEventListener("change", handleSystemChange);
  }, [handleSystemChange]);

  const options: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: "light", icon: <SunIcon />, label: "Light" },
    { value: "dark", icon: <MoonIcon />, label: "Dark" },
    { value: "system", icon: <MonitorIcon />, label: "System" },
  ];

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-[var(--veta-border)] bg-[var(--veta-bg-raised)] p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          title={opt.label}
          className={`rounded-md p-1.5 transition-colors ${
            theme === opt.value
              ? "bg-[var(--veta-bg-hover)] text-[var(--veta-text)]"
              : "text-[var(--veta-text-muted)] hover:text-[var(--veta-text)]"
          }`}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}
