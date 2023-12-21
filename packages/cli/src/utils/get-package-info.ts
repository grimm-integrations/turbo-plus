import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

export async function getPackageInfo(): Promise<PackageJson> {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const packageJsonPath = path.join(__dirname, "../package.json");

  // eslint-disable-next-line import/no-named-as-default-member -- not available
  return (await fs.readJSONSync(packageJsonPath)) as PackageJson;
}
