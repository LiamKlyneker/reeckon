import { useState } from "react";
import { skills, repoUrl } from "virtual:veta-skills";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Container from "./container";

export function SkillDetail({ slug }: { slug: string }) {
  const skill = skills.find((s) => s.slug === slug);

  if (!skill) {
    return (
      <Container>
        <p className="py-12 text-center text-[var(--veta-text-muted)]">
          Skill &ldquo;{slug}&rdquo; not found.
        </p>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">{skill.name}</h1>
          {skill.description && (
            <p className="text-[var(--veta-text-muted)]">{skill.description}</p>
          )}
          {skill.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-[var(--veta-tag-bg)] px-2 py-0.5 text-xs text-[var(--veta-tag-text)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {skill.license && (
            <p className="mt-2 text-xs text-[var(--veta-text-muted)]">
              License: {skill.license}
            </p>
          )}
        </div>

        <CopyInstallCommand slug={skill.slug} />
      </Container>

      <div className="my-8 h-[6px] bg-black" />

      <Container>
        <div className="veta-prose">
          <Markdown remarkPlugins={[remarkGfm]}>{skill.content}</Markdown>
        </div>
      </Container>
    </>
  );
}

function CopyInstallCommand({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  if (!repoUrl) return null;

  const command = `npx veta add ${repoUrl} --skill ${slug}`;

  function handleCopy() {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="w-fit rounded-lg border border-[var(--veta-border)] bg-[var(--veta-bg-raised)] p-1">
      <div className="flex w-fit items-center gap-2">
        <code className="overflow-x-auto rounded-md bg-[var(--veta-bg)] px-2 py-1 pr-6 text-sm">
          {command}
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 cursor-pointer rounded-md border border-[var(--veta-border)] bg-[var(--veta-bg)] px-6 py-1 text-sm text-[var(--veta-text)] transition-colors hover:bg-[var(--veta-tag-bg)]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
