import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { homedir } from "node:os";
import type { ToolAdapter } from "./types.js";

export const claudeAdapter: ToolAdapter = {
  name: "Claude Code",
  id: "claude-code",
  skillsDir: ".claude/skills",
  isUniversal: false,
  async detectInstalled() {
    return existsSync(resolve(homedir(), ".claude"));
  },
};
