import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { DestinationPagination } from "../DestinationPagination";

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
