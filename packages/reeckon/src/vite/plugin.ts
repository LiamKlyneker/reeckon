import { resolve, dirname } from "node:path";
import type { Plugin, ViteDevServer } from "vite";
import { scanSkills } from "../cli/utils/skills.js";
import { resolveRepoIdentifier } from "../cli/utils/git/resolve-repo.js";

const VIRTUAL_MODULE_ID = "virtual:reeckon-skills";
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

export interface ReeckonPluginOptions {
  skillsDir: string;
}

export function reeckonPlugin(options: ReeckonPluginOptions): Plugin {
  const skillsDir = resolve(options.skillsDir);
  // Resolve repo from the project root (parent of skills/)
  const projectRoot = dirname(skillsDir);
  const repoUrl = resolveRepoIdentifier(projectRoot);

  function generateModule(): string {
    const skills = scanSkills(skillsDir);
    return [
      `export const skills = ${JSON.stringify(skills, null, 2)};`,
      `export const repoUrl = ${JSON.stringify(repoUrl)};`,
    ].join("\n");
  }

  return {
    name: "reeckon-skills",

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return generateModule();
      }
    },

    configureServer(server: ViteDevServer) {
      server.watcher.add(resolve(skillsDir, "**/*.md"));

      server.watcher.on("change", (path) => {
        if (path.endsWith("SKILL.md") && path.includes(skillsDir)) {
          const module = server.moduleGraph.getModuleById(
            RESOLVED_VIRTUAL_MODULE_ID
          );
          if (module) {
            server.moduleGraph.invalidateModule(module);
          }
          server.ws.send({ type: "full-reload" });
        }
      });

      server.watcher.on("add", (path) => {
        if (path.endsWith("SKILL.md") && path.includes(skillsDir)) {
          const module = server.moduleGraph.getModuleById(
            RESOLVED_VIRTUAL_MODULE_ID
          );
          if (module) {
            server.moduleGraph.invalidateModule(module);
          }
          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}
