import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { NavigationBar } from "../NavigationBar";
import {
  defaultViewport,
  chromaticViewport,
} from "../../constants/stories-viewports";
import { withRouter } from "../../helpers/stories/withRouter";

const meta = {
  title: "Components/NavigationBar/NavigationBar",
  component: NavigationBar,
  tags: ["autodocs"],
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const anchorElement = canvas.getByRole("link", { name: /technology/i });

    await expect(anchorElement).toBeInTheDocument();
    await userEvent.click(anchorElement);
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationBarOnMobile: Story = {
  globals: {
    viewport: { value: defaultViewport.mobile, isRotated: false },
  },
  parameters: {
    chromatic: {
      viewports: [chromaticViewport.mobile],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "24px" }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /open menu/i });
    await userEvent.click(button);

    const anchorElement = canvas.getByRole("link", {
      name: /technology/i,
    });

    await expect(button.ariaExpanded).toBe("true");
    await userEvent.click(anchorElement);
    await expect(button.ariaExpanded).toBe("false");
  },
};

const withWrapper: Decorator = (Story) => (
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Story />
  </div>
);

export const NavigationBarOnTablet: Story = {
  globals: {
    viewport: { value: defaultViewport.tablet, isRotated: false },
  },
  parameters: {
    chromatic: {
      viewports: [chromaticViewport.tablet],
    },
  },
  decorators: [withWrapper],
};

export const NavigationBarDesktop: Story = {
  decorators: [withWrapper],
};
