export interface ToolAdapter {
  name: string;
  id: string;
  skillsDir: string;
  isUniversal: boolean;
  detectInstalled(): Promise<boolean>;
}
