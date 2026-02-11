import { mkdirSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import prompts from "prompts";
import pc from "picocolors";

const EXAMPLE_SKILL = `---
name: code-review
description: Reviews code for best practices, bugs, and improvements.
tags:
  - review
  - quality
license: MIT
metadata:
  author: my-team
  version: "1.0.0"
---

# Code Review

You are an expert code reviewer. When given code, analyze it for:

1. **Best practices** — Does the code follow language conventions?
2. **Bugs** — Are there potential runtime errors or logic issues?
3. **Performance** — Are there obvious inefficiencies?
4. **Readability** — Is the code clear and well-structured?

Provide specific, actionable feedback with code examples when possible.
`;

async function main() {
  const dirArg = process.argv[2];

  let projectName: string;

  if (dirArg) {
    projectName = basename(dirArg);
  } else {
    const response = await prompts({
      type: "text",
      name: "name",
      message: "Project name:",
      initial: "my-skills",
    });

    if (!response.name) {
      console.log(pc.red("Cancelled."));
      process.exit(1);
    }
    projectName = response.name as string;
  }

  const targetDir = resolve(process.cwd(), dirArg || projectName);

  console.log();
  console.log(`  ${pc.bold(pc.magenta("veta"))} ${pc.dim("scaffolder")}`);
  console.log();

  // Create project structure
  mkdirSync(resolve(targetDir, "skills/code-review"), { recursive: true });

  writeFileSync(
    resolve(targetDir, "skills/code-review/SKILL.md"),
    EXAMPLE_SKILL
  );

  writeFileSync(
    resolve(targetDir, "package.json"),
    JSON.stringify(
      {
        name: projectName,
        version: "0.1.0",
        private: true,
        scripts: {
          dev: "veta dev",
          build: "veta build",
        },
        dependencies: {
          veta: "latest",
        },
      },
      null,
      2
    ) + "\n"
  );

  writeFileSync(
    resolve(targetDir, ".gitignore"),
    ["node_modules", ".veta", ""].join("\n")
  );

  console.log(`  ${pc.green("✓")} Created project in ${pc.cyan(targetDir)}`);
  console.log();
  console.log("  Next steps:");
  console.log();
  console.log(`  ${pc.dim("$")} cd ${projectName}`);
  console.log(`  ${pc.dim("$")} pnpm install`);
  console.log(`  ${pc.dim("$")} pnpm dev`);
  console.log();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
