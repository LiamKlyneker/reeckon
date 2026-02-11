import { defineConfig } from "tsup";
import { readFileSync, writeFileSync } from "node:fs";

export default defineConfig({
  entry: [
    "src/cli/index.ts",
    "src/cli/commands/dev.ts",
    "src/cli/commands/build.ts",
    "src/cli/utils/skills.ts",
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
