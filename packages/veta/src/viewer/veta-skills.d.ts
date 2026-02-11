declare module "virtual:veta-skills" {
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
}
