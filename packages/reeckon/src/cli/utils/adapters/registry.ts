import type { ToolAdapter } from "./types.js";
import { claudeAdapter } from "./claude.js";
import { cursorAdapter } from "./cursor.js";
import { antigravityAdapter } from "./antigravity.js";

export const allAdapters: ToolAdapter[] = [
  claudeAdapter,
  cursorAdapter,
  antigravityAdapter,
];

export function getAdapterById(id: string): ToolAdapter | undefined {
  return allAdapters.find((a) => a.id === id);
}

export function getAdaptersByIds(ids: string[]): ToolAdapter[] {
  return ids
    .map((id) => getAdapterById(id))
    .filter((a): a is ToolAdapter => a !== undefined);
}
