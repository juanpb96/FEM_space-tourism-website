import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import { chromaticViewport } from "../src/components/constants/stories-viewports";
import "../src/styles/main.scss";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0B0D17" }],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    // Chromatic snapshots are 1200px wide by default, which renders the tablet
    // layout. Stories without a viewport show the desktop layout instead
    chromatic: {
      viewports: [chromaticViewport.desktop],
    },
  },
};

export default preview;
