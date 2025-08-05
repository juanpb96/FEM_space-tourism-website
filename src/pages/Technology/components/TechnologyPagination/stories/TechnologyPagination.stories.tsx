import type { Meta, StoryObj } from "@storybook/react";

import { TechnologyPagination } from "../TechnologyPagination";
import {
  mobileParameters,
  tabletParameters,
} from "../../../../../components/constants/stories-viewports";
import { Technology } from "../../../types";
import { useState } from "react";

// TODO: Start - Check if the code needed for the renderFn can be moved to a separate file - Issue #50
const defaultData = {
  images: {
    portrait: "",
    landscape: "",
  },
  description: "",
};

const technologies: Technology[] = [
  { name: "Launch vehicle", ...defaultData },
  { name: "Spaceport", ...defaultData },
  { name: "Space capsule", ...defaultData },
];

const renderFn = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedTechnology, setSelectedTechnology] = useState(
    technologies[1].name
  );

  const onClick = (name: string) => setSelectedTechnology(name);
  return (
    <TechnologyPagination
      technologies={technologies}
      selectedTechnologyName={selectedTechnology}
      onClick={onClick}
    />
  );
};
// TODO: End - Check if the code needed for the renderFn can be moved to a separate file

const meta: Meta<typeof TechnologyPagination> = {
  title: "Technology/Components/TechnologyPagination",
  component: TechnologyPagination,
  parameters: {
    layout: "fullscreen",
  },
  render: renderFn,
};

export default meta;
type Story = StoryObj<typeof TechnologyPagination>;

export const TechnologyPaginationOnMobile: Story = {
  parameters: mobileParameters,
};

export const TechnologyPaginationOnTablet: Story = {
  parameters: tabletParameters,
};

export const Default: Story = {};
