import type { ToolAdapter } from "./types.js";

export const antigravityAdapter: ToolAdapter = {
  name: "Antigravity",
  id: "antigravity",
  skillsDir: ".agent/skills",
  isUniversal: false,
  async detectInstalled() {
    // Antigravity is always offered as an option
    return true;
  },
};
