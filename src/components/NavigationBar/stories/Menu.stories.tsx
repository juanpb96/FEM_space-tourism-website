import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { MemoryRouter } from "react-router-dom";
import { Menu } from "../Menu";

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
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};

export const MenuOnTablet: Story = {
  globals: {
    viewport: { value: "ipad", isRotated: false },
  },
};

export const Default: Story = {};
