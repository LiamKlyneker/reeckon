import { useState, useMemo } from "react";
import { skills } from "virtual:veta-skills";
import { SearchBar } from "./search-bar";
import { SkillCard } from "./skill-card";

export function SkillList() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return skills;
    const q = query.toLowerCase();
    return skills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-bold">Skills</h1>
        <p className="text-sm text-[var(--veta-text-muted)]">
          {skills.length} skill{skills.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-[var(--veta-text-muted)]">
          No skills match &ldquo;{query}&rdquo;
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
