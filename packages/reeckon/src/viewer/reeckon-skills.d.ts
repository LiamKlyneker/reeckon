declare module "virtual:reeckon-skills" {
  export interface Skill {
    slug: string;
    name: string;
    description: string;
    tags: string[];
    license?: string;
    metadata?: Record<string, unknown>;
    content: string;
    filePath: string;
  }

  export const skills: Skill[];
  export const repoUrl: string | null;
}
