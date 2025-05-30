import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

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
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.mobile,
    },
  },
};

export const ButtonOnTablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.tablet,
    },
  },
};

export const ButtonOnDesktop: Story = {};
