import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { Menu } from "../Menu";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const withRouter: Decorator = (Story) => (
  <MemoryRouter initialEntries={["/"]}>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: "Components/NavigationBar/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [withRouter],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const anchorElement = canvas.getByRole("link", { name: /crew/i });

    await expect(anchorElement).toBeInTheDocument();
    await userEvent.click(anchorElement);
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: Check if this story belongs to this file or if it should be moved to MenuMobile.stories.tsx
export const MenuOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone6",
    },
  },
};

export const MenuOnTablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "ipad",
    },
  },
};

export const Default: Story = {};
