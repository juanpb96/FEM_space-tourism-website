import type { Meta, StoryObj } from "@storybook/react";

import { DestinationPagination } from "../DestinationPagination";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof DestinationPagination> = {
  title: "Components/DestinationPagination",
  component: DestinationPagination,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const destination = await canvas.findByText(/europa/i);

    await expect(destination).toBeInTheDocument();
    await userEvent.click(destination);
  },
  args: {
    pages: ["Moon", "Mars", "Europa", "Titan"],
    setActivePage: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof DestinationPagination>;

export const Default: Story = {};
