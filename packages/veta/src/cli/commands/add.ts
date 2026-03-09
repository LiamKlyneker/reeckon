import {
  cpSync,
  existsSync,
  mkdirSync,
  symlinkSync,
  lstatSync,
  rmSync,
} from "node:fs";
import { resolve, relative, dirname, join } from "node:path";
import pc from "picocolors";
import prompts from "prompts";
import { fetchSkills } from "../utils/git/fetch.js";
import { allAdapters } from "../utils/adapters/registry.js";
import { getAdaptersByIds } from "../utils/adapters/registry.js";
import type { Skill } from "../utils/skills.js";
import type { ToolAdapter } from "../utils/adapters/types.js";

interface AddOptions {
  repo: string;
  skill?: string;
  token?: string;
  tool?: string;
}

const CANONICAL_DIR = ".agents/skills";

export async function addCommand(options: AddOptions) {
  const cwd = process.cwd();

  console.log();
  console.log(`  ${pc.bold(pc.magenta("veta"))} ${pc.dim("add")}`);
  console.log();

  // 1. Fetch skills from repo
  console.log(`  Fetching skills from ${pc.cyan(options.repo)}...`);

  let result;
  try {
    result = fetchSkills(options.repo, { token: options.token });
  } catch (err) {
    console.error(
      `  ${pc.red("Error:")} ${err instanceof Error ? err.message : err}`
    );
    process.exit(1);
  }

  const { skills, repoDir, cleanup } = result;

  if (skills.length === 0) {
    console.log(`  ${pc.yellow("No skills found")} in this repository.`);
    cleanup();
    return;
  }

  console.log(`  Found ${pc.bold(String(skills.length))} skill(s).`);
  console.log();

  try {
    // 2. Select skills
    const selectedSkills = await selectSkills(skills, options.skill);
    if (selectedSkills.length === 0) {
      console.log(`  ${pc.dim("No skills selected. Cancelled.")}`);
      return;
    }

    // 3. Select tools
    const selectedTools = await selectTools(options.tool);
    if (selectedTools.length === 0) {
      console.log(`  ${pc.dim("No tools selected. Cancelled.")}`);
      return;
    }

    // 4. Install skills
    for (const skill of selectedSkills) {
      installSkill(skill, selectedTools, repoDir, cwd);
    }

    // 5. Summary
    console.log();
    console.log(
      `  ${pc.green("Done!")} Installed ${pc.bold(String(selectedSkills.length))} skill(s) for ${pc.bold(String(selectedTools.length))} tool(s).`
    );
    console.log();
  } finally {
    cleanup();
  }
}

async function selectSkills(
  skills: Skill[],
  skillFilter?: string
): Promise<Skill[]> {
  if (skillFilter) {
    const names = skillFilter.split(",").map((s) => s.trim());
    const filtered = skills.filter(
      (s) => names.includes(s.slug) || names.includes(s.name)
    );
    if (filtered.length === 0) {
      console.log(
        `  ${pc.yellow("Warning:")} No skills matching "${skillFilter}" found.`
      );
      console.log(
        `  Available: ${skills.map((s) => s.slug).join(", ")}`
      );
    }
    return filtered;
  }

  const response = await prompts({
    type: "multiselect",
    name: "skills",
    message: "Select skills to install",
    choices: skills.map((s) => ({
      title: `${s.name} ${pc.dim("— " + (s.description || s.slug))}`,
      value: s.slug,
    })),
    hint: "- Space to select. Return to submit",
  });

  if (!response.skills) return [];

  return skills.filter((s) => (response.skills as string[]).includes(s.slug));
}

async function selectTools(toolFilter?: string): Promise<ToolAdapter[]> {
  if (toolFilter) {
    const ids = toolFilter.split(",").map((s) => s.trim());
    const adapters = getAdaptersByIds(ids);
    if (adapters.length === 0) {
      console.log(
        `  ${pc.yellow("Warning:")} No tools matching "${toolFilter}" found.`
      );
      console.log(
        `  Available: ${allAdapters.map((a) => a.id).join(", ")}`
      );
    }
    return adapters;
  }

  const response = await prompts({
    type: "multiselect",
    name: "tools",
    message: "Select AI tools",
    choices: allAdapters.map((a) => ({
      title: `${a.name} ${pc.dim("(" + a.skillsDir + "/")}${pc.dim(")")}`,
      value: a.id,
    })),
    hint: "- Space to select. Return to submit",
  });

  if (!response.tools) return [];

  return getAdaptersByIds(response.tools as string[]);
}

function installSkill(
  skill: Skill,
  tools: ToolAdapter[],
  repoDir: string,
  cwd: string
) {
  const skillSourceDir = dirname(skill.filePath);
  const canonicalDir = resolve(cwd, CANONICAL_DIR, skill.slug);

  // Copy to canonical location
  mkdirSync(canonicalDir, { recursive: true });
  cpSync(skillSourceDir, canonicalDir, { recursive: true });

  console.log(
    `  Installing ${pc.bold(skill.name)}...`
  );
  console.log(
    `    ${pc.green("→")} ${join(CANONICAL_DIR, skill.slug)}/SKILL.md ${pc.dim("(canonical)")}`
  );

  for (const tool of tools) {
    if (tool.isUniversal) {
      // Universal tools read from .agents/skills/ directly — already copied
      console.log(
        `    ${pc.green("→")} ${tool.skillsDir}/${skill.slug} ${pc.dim("(universal)")}`
      );
      continue;
    }

    // Non-universal: create symlink from tool dir → canonical
    const toolSkillDir = resolve(cwd, tool.skillsDir, skill.slug);
    const toolParentDir = dirname(toolSkillDir);
    mkdirSync(toolParentDir, { recursive: true });

    // Compute relative path from symlink location to canonical dir
    const relTarget = relative(toolParentDir, canonicalDir);

    try {
      // Remove existing symlink/dir if present
      if (existsSync(toolSkillDir) || lstatExists(toolSkillDir)) {
        rmSync(toolSkillDir, { recursive: true, force: true });
      }
      symlinkSync(relTarget, toolSkillDir, "dir");
      console.log(
        `    ${pc.green("→")} ${tool.skillsDir}/${skill.slug} → ${relTarget} ${pc.dim("(symlink)")}`
      );
    } catch {
      // Fallback: copy instead of symlink
      cpSync(canonicalDir, toolSkillDir, { recursive: true });
      console.log(
        `    ${pc.green("→")} ${tool.skillsDir}/${skill.slug} ${pc.dim("(copy — symlink failed)")}`
      );
    }
  }
}

/**
 * Check if a path exists as a symlink (even broken ones).
 */
function lstatExists(p: string): boolean {
  try {
    lstatSync(p);
    return true;
  } catch {
    return false;
  }
}
