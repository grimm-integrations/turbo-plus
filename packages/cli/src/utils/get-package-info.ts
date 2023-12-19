import path from "node:path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

export async function getPackageInfo(): Promise<PackageJson> {
  const packageJsonPath = path.join("../package.json");

  // eslint-disable-next-line import/no-named-as-default-member -- not available
  return (await fs.readJSONSync(packageJsonPath)) as PackageJson;
}
