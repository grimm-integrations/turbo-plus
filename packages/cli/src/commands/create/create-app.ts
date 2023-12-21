/* eslint-disable import/no-named-as-default-member -- BP to use fs */
import path from "node:path";
import fs from "fs-extra";
import chalk from "chalk";
import ora from "ora";
import { execa } from "execa";
import { logger } from "../../utils/logger";
import {
  createNextEslintConfig,
  createReactEslintConfig,
  createStorybookEslintConfig,
} from "../../../templates/eslint";
import {
  createNextTSConfig,
  createReactTSConfig,
  createStorybookTSConfig,
} from "../../../templates/ts-config";
import {
  createCardStory,
  createManager,
  createPreview,
  createSnippetStory,
} from "../../../templates/storybook";
import {
  createNextJSON,
  createStorybookJSON,
  createUIJSON,
} from "../../../templates/package-json";
import { createLandingPage, createLayout } from "../../../templates/next";
import { createLicense } from "../../../templates/license";
import type { CreateAppOptions } from "./type";

export async function createApp(options: CreateAppOptions): Promise<void> {
  const {
    // apps,
    tailwind,
    name,
    packageManager,
    path: projectPath,
    templates,
    typescript,
  } = options;
  const projectTemplate = `${packageManager}-${typescript ? "ts" : "js"}-${
    tailwind ? "tailwind" : "no-tailwind"
  }`;
  const LoadingState = ora({
    text: "Loading...",
    spinner: "growHorizontal",
  }).start();
  try {
    LoadingState.text = "1. Cloning project";
    await fs.copy(
      path.join(templates, `../templates/${projectTemplate}`),
      `${projectPath}/${name}`,
    );
    // Write Storybook files
    LoadingState.text = "2. Writing Storybook files";
    await fs.writeFile(
      `${projectPath}/${name}/apps/storybook/package.json`,
      createStorybookJSON(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/apps/storybook/.eslintrc.cjs`,
      createStorybookEslintConfig(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/apps/storybook/tsconfig.json`,
      createStorybookTSConfig(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/apps/storybook/.storybook/manager.ts`,
      createManager(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/apps/storybook/.storybook/preview.ts`,
      createPreview(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/apps/storybook/stories/card.stories.tsx`,
      createCardStory(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/apps/storybook/stories/snippet.stories.tsx`,
      createSnippetStory(name),
      "utf8",
    );

    // Write Next files
    LoadingState.text = "3. Writing Next files";
    await fs.writeFile(
      `${projectPath}/${name}/apps/web/package.json`,
      createNextJSON(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/apps/web/.eslintrc.js`,
      createNextEslintConfig(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/apps/web/tsconfig.json`,
      createNextTSConfig(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/apps/web/app/layout.tsx`,
      createLayout(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/apps/web/app/page.tsx`,
      createLandingPage(name),
      "utf8",
    );

    // Write UI files
    LoadingState.text = "4. Writing UI files";
    await fs.writeFile(
      `${projectPath}/${name}/packages/ui/package.json`,
      createUIJSON(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/packages/ui/.eslintrc.js`,
      createReactEslintConfig(name),
      "utf8",
    );

    await fs.writeFile(
      `${projectPath}/${name}/packages/ui/tsconfig.json`,
      createReactTSConfig(name),
      "utf8",
    );

    // Renaming Config files
    LoadingState.text = "5. Renaming Config files";
    await fs.rename(
      `${projectPath}/${name}/packages/eslint-config-custom/turboplus-next.js`,
      `${projectPath}/${name}/packages/eslint-config-custom/${name.replace(
        "@",
        "",
      )}-next.js`,
    );

    await fs.rename(
      `${projectPath}/${name}/packages/eslint-config-custom/turboplus-react.js`,
      `${projectPath}/${name}/packages/eslint-config-custom/${name.replace(
        "@",
        "",
      )}-react.js`,
    );

    await fs.rename(
      `${projectPath}/${name}/packages/eslint-config-custom/turboplus-storybook.js`,
      `${projectPath}/${name}/packages/eslint-config-custom/${name.replace(
        "@",
        "",
      )}-storybook.js`,
    );

    await fs.rename(
      `${projectPath}/${name}/packages/tsconfig/turboplus-next.json`,
      `${projectPath}/${name}/packages/tsconfig/${name.replace(
        "@",
        "",
      )}-next.json`,
    );

    await fs.rename(
      `${projectPath}/${name}/packages/tsconfig/turboplus-react.json`,
      `${projectPath}/${name}/packages/tsconfig/${name.replace(
        "@",
        "",
      )}-react.json`,
    );

    await fs.rename(
      `${projectPath}/${name}/packages/tsconfig/turboplus-storybook.json`,
      `${projectPath}/${name}/packages/tsconfig/${name.replace(
        "@",
        "",
      )}-storybook.json`,
    );

    // Write LICENSE
    LoadingState.text = "6. Writing LICENSE file";
    await fs.writeFile(
      `${projectPath}/${name}/LICENSE.md`,
      createLicense(name, "MIT"),
      "utf8",
    );

    LoadingState.text = "7. Installing dependencies";

    process.chdir(`${projectPath}/${name}`);
    await execa(packageManager, ["install"]);

    LoadingState.stop();

    logger.success("turbo-plus create was successful");
    console.log(`
${chalk.bold(
  `Welcome to ${chalk.red("turbo")}${chalk.dim("-")}${chalk.blue("plus")}`,
)}

${chalk.bold("Get started with the following commands:")}
${chalk.bold("cd")} ${projectPath}/${name}
${chalk.bold("bun")} run dev
    `);
  } catch (error) {
    LoadingState.stopAndPersist({
      symbol: "❌",
      text: "Error",
    });
    logger.warn("turbo-plus create was aborted");
    logger.error(error);
  }
}
