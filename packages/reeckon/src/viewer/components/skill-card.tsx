import type { Skill } from "virtual:reeckon-skills";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <a
      href={`#/skills/${skill.slug}`}
      className="block rounded-sm border border-[var(--reeckon-border)] bg-[var(--reeckon-bg-raised-card)] p-5 no-underline transition-colors hover:border-[var(--reeckon-accent-dim)] hover:bg-[var(--reeckon-bg-hover)]"
    >
      <h3 className="mb-1 text-base font-semibold text-[var(--reeckon-text)]">
        {skill.name}
      </h3>
      {skill.description && (
        <p className="mb-3 text-sm text-[var(--reeckon-text-muted)]">
          {skill.description}
        </p>
      )}
      {skill.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-[var(--reeckon-tag-bg)] px-2 py-0.5 text-xs text-[var(--reeckon-tag-text)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
