export function createManager(name: string): string {
  return `import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "${name.replace("@", "")}",
    brandUrl: "/",
    brandTarget: "_self",
  }),
});
`;
}

export function createPreview(name: string): string {
  return `import type { Preview } from "@storybook/react";
import "${name}/ui/dist/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;`;
}

export function createCardStory(name: string): string {
  return `import { Card } from "${name}/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "Card",
  tags: ["autodocs"],
  component: Card,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 300,
          display: "grid",
          textAlign: "left",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Normal: Story = {
  args: {
    title: "Lorem ipsum dolor",
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis qui, quo distinctio ab assumenda.",
    href: "/",
  },
};
`;
}

export function createSnippetStory(name: string): string {
  return `import { Snippet } from "${name}/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Snippet> = {
  title: "Snippet",
  tags: ["autodocs"],
  component: Snippet,
};

export default meta;

type Story = StoryObj<typeof Snippet>;

export const Normal: Story = {
  args: {
    children: "yarn add turbo",
  },
};
`;
}
