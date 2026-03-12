import fg from "fast-glob";
import matter from "gray-matter";
import { readFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

export interface Skill {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  license?: string;
  metadata?: Record<string, unknown>;
  content: string;
  filePath: string;
}

export function scanSkills(skillsDir: string): Skill[] {
  const pattern = resolve(skillsDir, "*/SKILL.md");
  const files = fg.sync(pattern, { absolute: true });

  return files.map((filePath) => {
    const raw = readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const slug = basename(dirname(filePath));

    return {
      slug,
      name: (data.name as string) || slug,
      description: (data.description as string) || "",
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      license: data.license as string | undefined,
      metadata: data.metadata as Record<string, unknown> | undefined,
      content: content.trim(),
      filePath,
    };
  });
}
