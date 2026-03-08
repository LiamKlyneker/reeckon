import { useState, useMemo } from "react";
import { skills } from "virtual:veta-skills";
import { SearchBar } from "./search-bar";
import { SkillCard } from "./skill-card";
import { TagCombobox } from "./tag-combobox";
import Container from "./container";

export function SkillList() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const skill of skills) {
      for (const tag of skill.tags) {
        tags.add(tag);
      }
    }
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    let result = skills;

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((s) =>
        selectedTags.some((tag) => s.tags.includes(tag))
      );
    }

    return result;
  }, [query, selectedTags]);

  return (
    <Container>
      <div className="mb-8 max-w-xl">
        <h1 className="mb-6 text-4xl font-semibold">Overview</h1>
        <p>
          This is a list of all the skills in your project. Click on any skill
          to see more details and how to install them.
        </p>
      </div>
      <div>
        <div className="mb-4">
          <p className="text-sm text-[var(--veta-text-muted)]">
            {skills.length} skill{skills.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="mb-6 flex gap-4">
          <SearchBar value={query} onChange={setQuery} />
          <TagCombobox
            allTags={allTags}
            selected={selectedTags}
            onChange={setSelectedTags}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="py-12 text-center text-[var(--veta-text-muted)]">
            No skills match your filters
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {filtered.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
