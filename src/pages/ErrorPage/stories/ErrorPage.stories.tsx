import type { Meta, StoryObj } from "@storybook/react";

import { ErrorPage } from "../ErrorPage";
import {
  chromaticViewport,
  defaultViewport,
} from "../../../components/constants/stories-viewports";
import { withRouter } from "../../../components/helpers/stories/withRouter";

const meta: Meta<typeof ErrorPage> = {
  title: "Pages/ErrorPage",
  component: ErrorPage,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const ErrorPageOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: defaultViewport.mobile,
    },
    chromatic: {
      viewports: [chromaticViewport.mobile],
    },
  },
};

export const Default: Story = {};
