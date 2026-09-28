import type { Meta, StoryObj } from "@storybook/react-vite";

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
  globals: {
    viewport: { value: defaultViewport.mobile, isRotated: false },
  },
  parameters: {
    chromatic: {
      viewports: [chromaticViewport.mobile],
    },
  },
};

export const ErrorPageOnTablet: Story = {
  globals: {
    viewport: { value: defaultViewport.tablet, isRotated: false },
  },
  parameters: {
    chromatic: {
      viewports: [chromaticViewport.tablet],
    },
  },
};

export const Default: Story = {};
