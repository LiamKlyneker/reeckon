import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { scanSkills, type Skill } from "../skills.js";
import { resolveRepoUrl, injectToken } from "./github.js";

export interface FetchResult {
  skills: Skill[];
  repoDir: string;
  cleanup: () => void;
}

/**
 * Clone a repo (shallow) and scan for skills.
 * Returns the skills found plus a cleanup function to remove the temp dir.
 */
export function fetchSkills(
  repo: string,
  options?: { token?: string }
): FetchResult {
  const { url, isLocal } = resolveRepoUrl(repo);

  if (isLocal) {
    // For local paths, scan directly without cloning
    const skills = scanSkills(join(url, "skills"));
    return {
      skills,
      repoDir: url,
      cleanup: () => {},
    };
  }

  const tempDir = mkdtempSync(join(tmpdir(), "reeckon-"));

  const cloneUrl =
    options?.token ? injectToken(url, options.token) : getAuthUrl(url);

  try {
    execSync(`git clone --depth 1 --filter=blob:none ${cloneUrl} ${tempDir}`, {
      stdio: "pipe",
    });
  } catch {
    rmSync(tempDir, { recursive: true, force: true });
    throw new Error(
      `Failed to clone ${url}. Check the URL and your access permissions.`
    );
  }

  const skills = scanSkills(join(tempDir, "skills"));

  return {
    skills,
    repoDir: tempDir,
    cleanup: () => rmSync(tempDir, { recursive: true, force: true }),
  };
}

/**
 * If GITHUB_TOKEN is set in env, inject it into the URL.
 */
function getAuthUrl(url: string): string {
  const token = process.env.GITHUB_TOKEN;
  if (token && url.startsWith("https://")) {
    return injectToken(url, token);
  }
  return url;
}
