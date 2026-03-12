import type { ToolAdapter } from "./types.js";

export const cursorAdapter: ToolAdapter = {
  name: "Cursor",
  id: "cursor",
  skillsDir: ".agents/skills",
  isUniversal: true,
  async detectInstalled() {
    // Cursor reads from .agents/skills/ (universal location), always available
    return true;
  },
};
