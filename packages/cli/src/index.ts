#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { create } from "./commands/create";
import { getPackageInfo } from "./utils/get-package-info";
import { logger } from "./utils/logger";

async function main(): Promise<void> {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name(
      chalk.bold(`${chalk.red("turbo")}${chalk.dim("-")}${chalk.blue("plus")}`),
    )
    .description(
      `${chalk.red("The Turbo CLI to")} ${chalk.dim("work")} ${chalk.blue(
        "with turbo easily",
      )}
\n- Storybook
- Tailwind
- Typescript
- ESLint
- Vite
- NextJS`,
    )
    .version(
      `Your current version is: 
${chalk.bold(packageInfo.version)}
${chalk.italic(
  `Use ${chalk.bold(
    `${chalk.red("turbo")}${chalk.dim("-")}${chalk.blue("plus")}${chalk.dim(
      "@latest",
    )}`,
  )} to get always the latest version`,
)}`,
      "-v, --version",
      chalk.blue("display the version number"),
    )
    .helpOption("-h, --help", chalk.blue("display help for command"))
    .showHelpAfterError('("turbo-plus help" for more information)');

  program.addCommand(create);

  program.parse();
}

await main().catch((error) => {
  logger.warn("Aborting installation.");
  logger.error(error);
  process.exit(1);
});
