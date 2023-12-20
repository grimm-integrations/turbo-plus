export function createUIJSON(name: string): string {
  return `{
  "name": "${name}/ui",
  "version": "0.0.0",
  "sideEffects": [
    "**/*.css"
  ],
  "types": "./dist/index.d.mts",
  "exports": {
    ".": "./dist/index.mjs",
    "./dist/index.css": "./dist/index.css"
  },
  "license": "MIT",
  "scripts": {
    "build": "tsup",
    "lint": "eslint src/",
    "dev": "tsup --watch",
    "check-types": "tsc --noEmit",
    "clean": "rm -rf .turbo && rm -rf node_modules && rm -rf dist"
  },
  "peerDependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.5",
    "autoprefixer": "^10.4.13",
    "esbuild-react18-useclient": "^1.0.7",
    "eslint-config-custom": "*",
    "postcss": "^8.4.20",
    "react": "^18.2.0",
    "tailwind-config": "*",
    "tailwindcss": "^3.2.4",
    "tsconfig": "*",
    "tsup": "^7.2.0",
    "typescript": "^5.2.2"
  },
  "dependencies": {
    "lucide-react": "^0.292.0"
  }
}`;
}

export function createStorybookJSON(name: string): string {
  return `{
  "name": "${name}/storybook",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "storybook dev -p 2000",
    "build": "storybook build --docs",
    "preview-storybook": "serve storybook-static",
    "clean": "rm -rf .turbo && rm -rf node_modules && rm -rf storybook-static",
    "lint": "eslint ./stories/*.stories.tsx"
  },
  "dependencies": {
    "${name}/ui": "*",
    "@storybook/manager-api": "^7.5.3",
    "@storybook/theming": "^7.5.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^7.5.3",
    "@storybook/addon-interactions": "^7.5.3",
    "@storybook/addon-links": "^7.5.3",
    "@storybook/addon-onboarding": "^1.0.8",
    "@storybook/blocks": "^7.5.3",
    "@storybook/react": "^7.5.3",
    "@storybook/react-vite": "^7.5.3",
    "@storybook/testing-library": "^0.2.2",
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.53.0",
    "eslint-config-custom": "*",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "storybook": "^7.5.3",
    "typescript": "^5.2.2",
    "tailwind-config": "*",
    "vite": "^5.0.0"
  }
}`;
}

export function createNextJSON(name: string): string {
  return `{
  "name": "${name}/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "clean": "rm -rf .turbo && rm -rf node_modules && rm -rf .next"
  },
  "dependencies": {
    "${name}/ui": "*",
    "react": "^18",
    "react-dom": "^18",
    "next": "latest"
  },
  "devDependencies": {
    "typescript": "^5",
    "tsconfig": "*",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "tailwind-config": "*",
    "eslint": "^8",
    "eslint-config-next": "latest",
    "eslint-plugin-custom": "*"
  }
}`;
}
