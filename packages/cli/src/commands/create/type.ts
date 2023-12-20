export interface CreateAppOptions {
  name: string;
  packageManager: "bun" | "yarn" | "npm" | "pnpm";
  typescript: boolean;
  tailwind: boolean;
  apps: string[];
  shadcn: boolean;
  path: string;
  templates: string;
}
