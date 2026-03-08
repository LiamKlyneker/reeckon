export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative flex-1">
      <svg
        className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--veta-text-muted)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search skills..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--veta-border)] bg-[var(--veta-bg-raised)] py-2 pr-4 pl-10 text-sm text-[var(--veta-text)] placeholder-[var(--veta-text-muted)] transition-colors outline-none focus:border-[var(--veta-accent-dim)]"
      />
    </div>
  );
}
