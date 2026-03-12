import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Resolve the repo identifier for install commands.
 *
 * Priority:
 * 1. `reeckon.repo` field in package.json (explicit override)
 * 2. Git remote origin URL (auto-detected, converted to shorthand)
 *
 * Returns null if neither is available.
 */
export function resolveRepoIdentifier(cwd: string): string | null {
  // 1. Check package.json for explicit override
  const pkgPath = resolve(cwd, "package.json");
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      if (pkg.reeckon?.repo) {
        return pkg.reeckon.repo as string;
      }
    } catch {
      // Ignore parse errors
    }
  }

  // 2. Auto-detect from git remote
  try {
    const remoteUrl = execSync("git remote get-url origin", {
      cwd,
      stdio: "pipe",
      encoding: "utf-8",
    }).trim();

    return toShorthand(remoteUrl);
  } catch {
    return null;
  }
}

/**
 * Convert a git remote URL to the shortest usable form.
 *
 * - "https://github.com/acme/ai-skills.git" → "acme/ai-skills"
 * - "git@github.com:acme/ai-skills.git"     → "acme/ai-skills"
 * - Non-GitHub URLs are returned as-is.
 */
function toShorthand(url: string): string {
  // HTTPS GitHub
  const httpsMatch = url.match(
    /^https?:\/\/github\.com\/([^/]+\/[^/]+?)(?:\.git)?$/
  );
  if (httpsMatch) return httpsMatch[1];

  // SSH GitHub
  const sshMatch = url.match(/^git@github\.com:([^/]+\/[^/]+?)(?:\.git)?$/);
  if (sshMatch) return sshMatch[1];

  // Non-GitHub: return full URL (strip trailing .git for cleanliness)
  return url.replace(/\.git$/, "");
}
