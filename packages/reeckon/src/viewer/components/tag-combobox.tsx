import { useState, useRef, useEffect } from "react";

export function TagCombobox({
  allTags,
  selected,
  onChange,
}: {
  allTags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const filtered = allTags.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(tag: string) {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-sm border border-[var(--reeckon-border)] bg-[var(--reeckon-bg-raised)] px-3 py-2 text-sm text-[var(--reeckon-text)] transition-colors hover:bg-[var(--reeckon-bg-hover)]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--reeckon-text-muted)]"
        >
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        <span>Tags</span>
        {selected.length > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--reeckon-accent)] px-1.5 text-xs font-medium text-white">
            {selected.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-1 w-56 rounded-lg border border-[var(--reeckon-border)] bg-[var(--reeckon-bg-raised)] shadow-lg">
          {allTags.length === 0 ? (
            <p className="px-3 py-2 text-sm text-[var(--reeckon-text-muted)]">
              No tags available
            </p>
          ) : (
            <>
              <div className="border-b border-[var(--reeckon-border)] p-2">
                <input
                  type="text"
                  placeholder="Search tags..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  className="w-full rounded-md border border-[var(--reeckon-border)] bg-[var(--reeckon-bg)] px-2 py-1 text-sm text-[var(--reeckon-text)] placeholder-[var(--reeckon-text-muted)] outline-none focus:border-[var(--reeckon-accent-dim)]"
                />
              </div>
              <div className="max-h-48 overflow-y-auto p-1">
                {filtered.length === 0 ? (
                  <p className="px-2 py-1.5 text-sm text-[var(--reeckon-text-muted)]">
                    No matching tags
                  </p>
                ) : (
                  filtered.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggle(tag)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-[var(--reeckon-bg-hover)]"
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          selected.includes(tag)
                            ? "border-[var(--reeckon-accent)] bg-[var(--reeckon-accent)]"
                            : "border-[var(--reeckon-border)]"
                        }`}
                      >
                        {selected.includes(tag) && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <span className="truncate text-[var(--reeckon-text)]">
                        {tag}
                      </span>
                    </button>
                  ))
                )}
              </div>
              {selected.length > 0 && (
                <div className="border-t border-[var(--reeckon-border)] p-1">
                  <button
                    onClick={() => onChange([])}
                    className="w-full rounded-md px-2 py-1.5 text-left text-sm text-[var(--reeckon-text-muted)] transition-colors hover:bg-[var(--reeckon-bg-hover)] hover:text-[var(--reeckon-text)]"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
