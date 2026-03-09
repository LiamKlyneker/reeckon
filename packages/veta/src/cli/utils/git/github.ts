/**
 * Resolve a repo argument to a full git clone URL.
 *
 * Supports:
 * - GitHub shorthand: "owner/repo" → "https://github.com/owner/repo.git"
 * - Full HTTPS URLs: "https://github.com/owner/repo"
 * - Full git URLs: "git@github.com:owner/repo.git"
 * - Local paths: "/abs/path" or "../relative/path"
 */
export function resolveRepoUrl(input: string): {
  url: string;
  isLocal: boolean;
} {
  // Full git URL
  if (input.startsWith("git@") || input.startsWith("ssh://")) {
    return { url: input, isLocal: false };
  }

  // Full HTTPS URL
  if (input.startsWith("https://") || input.startsWith("http://")) {
    const url = input.endsWith(".git") ? input : `${input}.git`;
    return { url, isLocal: false };
  }

  // Local path (absolute or relative starting with . or /)
  if (input.startsWith("/") || input.startsWith(".")) {
    return { url: input, isLocal: true };
  }

  // GitHub shorthand: owner/repo
  if (/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(input)) {
    return { url: `https://github.com/${input}.git`, isLocal: false };
  }

  // Fallback: treat as URL
  return { url: input, isLocal: false };
}

/**
 * Inject a token into an HTTPS git URL for private repo access.
 */
export function injectToken(url: string, token: string): string {
  if (url.startsWith("https://")) {
    return url.replace("https://", `https://x-access-token:${token}@`);
  }
  return url;
}
