import { defineConfig } from "tsup";
import { readFileSync, writeFileSync } from "node:fs";

export default defineConfig({
  entry: [
    "src/cli/index.ts",
    "src/cli/commands/dev.ts",
    "src/cli/commands/build.ts",
    "src/cli/commands/add.ts",
    "src/cli/utils/skills.ts",
    "src/cli/utils/git/fetch.ts",
    "src/cli/utils/git/github.ts",
    "src/cli/utils/git/resolve-repo.ts",
    "src/cli/utils/adapters/types.ts",
    "src/cli/utils/adapters/registry.ts",
    "src/cli/utils/adapters/claude.ts",
    "src/cli/utils/adapters/cursor.ts",
    "src/cli/utils/adapters/antigravity.ts",
    "src/vite/plugin.ts",
  ],
  format: ["esm"],
  outDir: "dist",
  target: "node18",
  splitting: false,
  clean: true,
  bundle: false,
  shims: true,
  onSuccess: async () => {
    // Add shebang to CLI entry
    const entry = "dist/cli/index.js";
    const content = readFileSync(entry, "utf8");
    if (!content.startsWith("#!")) {
      writeFileSync(entry, "#!/usr/bin/env node\n" + content);
    }
  },
});
