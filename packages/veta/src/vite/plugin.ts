import { resolve } from "node:path";
import type { Plugin, ViteDevServer } from "vite";
import { scanSkills } from "../cli/utils/skills.js";

const VIRTUAL_MODULE_ID = "virtual:veta-skills";
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

export interface VetaPluginOptions {
  skillsDir: string;
}

export function vetaPlugin(options: VetaPluginOptions): Plugin {
  const skillsDir = resolve(options.skillsDir);

  function generateModule(): string {
    const skills = scanSkills(skillsDir);
    return `export const skills = ${JSON.stringify(skills, null, 2)};`;
  }

  return {
    name: "veta-skills",

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
