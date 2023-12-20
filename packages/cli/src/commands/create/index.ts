import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import fs from "fs-extra";
import { checkbox, input, select } from "@inquirer/prompts";
import { z } from "zod";
import { logger } from "../../utils/logger";
import { confirm } from "../../utils/inputs/confirm";
import { createApp } from "./create-app";

const Schema = {
  path: z
    .string({
      invalid_type_error: "Path have to be a string",
    })
    .refine((value) => fs.existsSync(value), {
      message: "Path does not exist. Please provide a valid path",
    }),
  yes: z.boolean({
    invalid_type_error: "Yes have to be a boolean",
  }),
  name: z
    .string({
      invalid_type_error: "Project name have to be a string",
    })
    .regex(/^@[a-zA-Z-]+$/g, {
      message: "Project name have to start with @ and only contain letters",
    }),
  packageManager: z
    .enum(["yarn", "npm", "pnpm", "bun"])
    .refine((value) => ["bun"].includes(value), {
      message: "Package Manager is not supported yet",
    }),
};

const argsSchema = z.object({
  ...Schema,
  name: Schema.name.optional(),
  packageManager: Schema.packageManager.optional(),
});

export const create = new Command()
  .name("create")
  .description("Create a new turbo-plus project")
  .option("-y, --yes", "Skip prompts and use default values", false)
  .option("-n, --name <name>", "Project name (have to start with an @)")
  .option("-p, --path <path>", "Project path", process.cwd())
  .option("-pm, --package-manager <packageManager>", "Package Manager")
  .action(async (args: z.infer<typeof argsSchema>) => {
    try {
      argsSchema.parse(args);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issues: Record<string, string[]> = {};
        error.issues.forEach((issue) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- !issues[issue.path[0]] can also be undefined
          if (!issues[issue.path[0]]) {
            issues[issue.path[0]] = [];
          }
          issues[issue.path[0]] = [...issues[issue.path[0]], issue.message];
        });
        logger.error("Invalid Flags:\n");
        Object.entries(issues).forEach(([key, value]) => {
          logger.error(`--${key}:\n  ${value.join("\n  ")}`);
        });
        return;
      }
    }

    const { name, path, packageManager, yes } = args;

    const __dirname = dirname(fileURLToPath(import.meta.url));
    try {
      const answers = yes
        ? {
            name: name || "@turbo-plus",
            packageManager: packageManager || "bun",
            typescript: true,
            tailwind: true,
            apps: ["next", "storybook"],
            shadcn: false,
            confirm: await confirm({
              message: "Do you want to create the project?",
              default: true,
            }),
          }
        : {
            name:
              name ||
              (await input({
                message: "What's your project name?",
                validate: (value: string) => {
                  try {
                    console.log(value);
                    Schema.name.optional().parse(value);
                    return true;
                  } catch (error) {
                    if (error instanceof z.ZodError) {
                      return error.issues
                        .map((issue) => issue.message)
                        .join("\n");
                    }
                    return JSON.stringify(error, null, 2);
                  }
                },
                default: "@turbo-plus",
              })),
            packageManager:
              packageManager ||
              (await select({
                message: "Whats Package Manager do you want to use?",
                choices: [
                  {
                    name: "Yarn",
                    value: "yarn",
                    disabled: "Yarn is not available yet",
                  },
                  {
                    name: "NPM",
                    value: "npm",
                    disabled: "NPM is not available yet",
                  },
                  {
                    name: "PNPM",
                    value: "pnpm",
                    disabled: "PNPM is not available yet",
                  },
                  {
                    name: "Bun",
                    value: "bun",
                  },
                ],
                loop: true,
              })),
            typescript: await confirm({
              message: "Do you want to use Typescript?",
              default: true,
              validate: (value: boolean) => {
                if (value) {
                  return true;
                }
                return "Typescript is required";
              },
            }),
            tailwind: await confirm({
              message: "Do you want to use Tailwind?",
              default: true,
              validate: (value: boolean) => {
                if (value) {
                  return true;
                }
                return "Tailwind is required";
              },
            }),
            apps: await checkbox({
              message: "What apps do you want to use?",
              choices: [
                {
                  name: "Next",
                  value: "next",
                  checked: true,
                },
                {
                  name: "Storybook",
                  value: "storybook",
                  checked: true,
                },
              ],
              loop: true,
              required: true,
            }),
            shadcn: await confirm({
              message: "Do you want to use Shadcn/ui?",
              default: false,
              validate: (value: boolean) => {
                if (value) {
                  return "Shadcn/ui is not available yet";
                }
                return true;
              },
            }),
            confirm: await confirm({
              message: "Do you want to create the project?",
              default: true,
            }),
          };
      if (!answers.confirm) {
        logger.warn("turbo-plus create was aborted");
        logger.error("You declined the project creation");
        return;
      }
      await createApp({
        ...answers,
        path,
        templates: __dirname,
      });
    } catch (error) {
      logger.warn("turbo-plus create was aborted");
      logger.error(error);
    }
  });
