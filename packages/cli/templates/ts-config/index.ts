export function createStorybookTSConfig(name: string): string {
  return `{
  "extends": "tsconfig/${name.replace("@", "")}-storybook.json",
  "include": ["."],
  "exclude": [
    "dist",
    "build",
    "node_modules",
    "storybook-static",
    "${name}/ui"
  ]
}
`;
}

export function createNextTSConfig(name: string): string {
  return `{
  "extends": "tsconfig/${name.replace("@", "")}-next.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`;
}

export function createReactTSConfig(name: string): string {
  return `{
  "extends": "tsconfig/${name.replace("@", "")}-react.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
`;
}
