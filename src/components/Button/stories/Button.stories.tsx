import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "../Button";
import { defaultViewport } from "../../constants/stories-viewports";
import { MemoryRouter } from "react-router-dom";

const withRouter: Decorator = (Story) => (
  <MemoryRouter initialEntries={["/"]}>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  decorators: [withRouter],
  tags: ["autodocs"],
  args: {
    navigateTo: "/home",
    variant: "circle",
    children: "Explore",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("link");

    expect(button).toBeInTheDocument();
    await userEvent.click(button);
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonOnMobile: Story = {
  globals: {
    viewport: { value: defaultViewport.mobile, isRotated: false },
  },
};

export const ButtonOnTablet: Story = {
  globals: {
    viewport: { value: defaultViewport.tablet, isRotated: false },
  },
};

export const ButtonOnDesktop: Story = {};
