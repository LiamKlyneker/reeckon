import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Package root: from dist/cli/commands/ → go up 3 levels
const PKG_ROOT = resolve(__dirname, "../../..");

export async function buildCommand() {
  const cwd = process.cwd();
  const skillsDir = resolve(cwd, "skills");
  const outDir = resolve(cwd, ".reeckon");

  if (!existsSync(skillsDir)) {
    console.error(
      pc.red("Error:") +
        " No skills/ directory found. Create one with SKILL.md files inside."
    );
    process.exit(1);
  }

  const viewerDir = resolveViewerDir();

  console.log();
  console.log(`  ${pc.bold(pc.magenta("reeckon"))} ${pc.dim("build")}`);
  console.log();

  const { build } = await import("vite");
  const react = (await import("@vitejs/plugin-react")).default;
  const tailwindcss = (await import("@tailwindcss/vite")).default;
  const { reeckonPlugin } = await import("../../vite/plugin.js");

  await build({
    root: viewerDir,
    base: "./",
    build: {
      outDir,
      emptyOutDir: true,
    },
    plugins: [react(), tailwindcss(), reeckonPlugin({ skillsDir })],
    logLevel: "info",
  });

  console.log();
  console.log(
    `  ${pc.green("✓")} Built to ${pc.cyan(
      ".reeckon/"
    )} — open ${pc.dim("index.html")} to view`
  );
  console.log();
}

function resolveViewerDir(): string {
  const viewerDir = resolve(PKG_ROOT, "src/viewer");
  if (existsSync(viewerDir)) {
    return viewerDir;
  }

  console.error(
    pc.red("Error:") +
      " Could not find viewer source. This is a bug in reeckon."
  );
  process.exit(1);
}
