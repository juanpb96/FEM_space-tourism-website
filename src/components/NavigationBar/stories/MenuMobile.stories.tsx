import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { MenuMobile } from "../MenuMobile";
import { withRouter } from "../../helpers/stories/withRouter";
import {
  chromaticViewport,
  defaultViewport,
} from "../../constants/stories-viewports";

const meta = {
  title: "Components/NavigationBar/MenuMobile",
  component: MenuMobile,
  decorators: [withRouter],
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: defaultViewport.mobile,
    },
    chromatic: {
      viewports: [chromaticViewport.mobile],
    },
  },
  args: {
    isOpen: false,
  },
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs();
    const onToggle = () => updateArgs({ isOpen: !isOpen });

    return <MenuMobile {...args} isOpen={isOpen} onToggle={onToggle} />;
  },
} satisfies Meta<typeof MenuMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole("link")).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /open menu/i }));
    await expect(
      await canvas.findByRole("link", { name: /crew/i })
    ).toBeInTheDocument();
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
  },
};
