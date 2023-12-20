export function createStorybookEslintConfig(name: string): string {
  return `module.exports = {
  extends: ["custom/${name.replace("@", "")}-storybook"],
};`;
}

export function createNextEslintConfig(name: string): string {
  return `module.exports = {
  extends: ["custom/${name.replace("@", "")}-next"],
};`;
}

export function createReactEslintConfig(name: string): string {
  return `module.exports = {
  extends: ["custom/${name.replace("@", "")}-react"],
};
`;
}
