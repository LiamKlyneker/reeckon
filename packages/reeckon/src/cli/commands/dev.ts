import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Package root: from dist/cli/commands/ → go up 3 levels
const PKG_ROOT = resolve(__dirname, "../../..");

export async function devCommand(options: { port?: number }) {
  const port = options.port || 4321;
  const cwd = process.cwd();
  const skillsDir = resolve(cwd, "skills");

  if (!existsSync(skillsDir)) {
    console.error(
      pc.red("Error:") +
        " No skills/ directory found. Create one with SKILL.md files inside."
    );
    process.exit(1);
  }

  const viewerDir = resolveViewerDir();

  const { createServer } = await import("vite");
  const react = (await import("@vitejs/plugin-react")).default;
  const tailwindcss = (await import("@tailwindcss/vite")).default;
  const { reeckonPlugin } = await import("../../vite/plugin.js");

  const server = await createServer({
    root: viewerDir,
    server: {
      port,
      open: true,
    },
    plugins: [react(), tailwindcss(), reeckonPlugin({ skillsDir })],
    optimizeDeps: {
      exclude: ["virtual:reeckon-skills"],
    },
  });

  await server.listen();

  console.log();
  console.log(`  ${pc.bold(pc.magenta("reeckon"))} ${pc.dim("v0.1.0")}`);
  console.log();
  console.log(
    `  ${pc.green("→")} Viewer:  ${pc.cyan(`http://localhost:${port}`)}`
  );
  console.log(`  ${pc.green("→")} Skills:  ${pc.dim(skillsDir)}`);
  console.log();
  console.log(pc.dim("  Watching for changes..."));
  console.log();
}

function resolveViewerDir(): string {
  // Viewer source shipped in package at src/viewer/
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
