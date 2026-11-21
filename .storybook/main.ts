import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    // Emit the preview CSS/JS at the root of `storybook-static` (same as the app
    // build, see `assetsDir` in vite.config.ts). The page backgrounds use
    // `url(./assets/...)`, which is resolved relative to the CSS file and must
    // point to `public/assets` (served at the root). Otherwise Chromatic
    // requests `/assets/assets/...` and the backgrounds are missing - Issue #69
    config.build = { ...config.build, assetsDir: "" };
    return config;
  },
};
export default config;
