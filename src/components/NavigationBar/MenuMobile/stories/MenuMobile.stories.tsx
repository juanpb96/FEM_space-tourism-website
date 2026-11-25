import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { MenuMobile } from "../MenuMobile";
import { withRouter } from "../../../helpers/stories/withRouter";
import {
  chromaticViewport,
  defaultViewport,
} from "../../../constants/stories-viewports";

const meta = {
  title: "Components/NavigationBar/Mobile/MenuMobile",
  component: MenuMobile,
  decorators: [
    // Same spacing the menu button has inside the Header on mobile
    (Story) => (
      <div style={{ padding: "24px" }}>
        <Story />
      </div>
    ),
    withRouter,
  ],
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

// Open and close the menu with the button to see how it behaves. The play
// function closes the menu at the end, so the story is left in its initial state
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole("link")).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /open menu/i }));
    await expect(
      await canvas.findByRole("link", { name: /crew/i })
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: /close menu/i }));
    await expect(
      await canvas.findByRole("button", { name: /open menu/i })
    ).toHaveAttribute("aria-expanded", "false");
    // The links stay in the document until the exit animation ends. Waiting
    // for it avoids snapshots of the menu half closed
    await waitFor(
      () => expect(canvas.queryAllByRole("link")).toHaveLength(0),
      { timeout: 2000 }
    );
  },
};
