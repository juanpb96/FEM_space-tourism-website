import type { Meta, StoryObj } from "@storybook/react-vite";

import { CrewPagination } from "../CrewPagination";
import { CrewMember } from "../../../pages/Crew/types";
import { useState } from "react";

const meta: Meta<typeof CrewPagination> = {
  title: "Components/CrewPagination",
  component: CrewPagination,
};

export default meta;
type Story = StoryObj<typeof CrewPagination>;

const defaultData = {
  images: { webp: "", png: "" },
  role: "test",
  bio: "",
};

const crew: CrewMember[] = [
  { name: "Jenn", ...defaultData },
  { name: "Paul", ...defaultData },
  { name: "Dre", ...defaultData },
  { name: "Arash", ...defaultData },
];

export const Default: Story = {
  render: () => {
    const [currentCrewMemberName, setCurrentCrewMemberName] = useState("Paul");

    const onClick = (selectedCrewMember: string) =>
      setCurrentCrewMemberName(selectedCrewMember);

    return (
      <CrewPagination
        crew={crew}
        currentCrewMemberName={currentCrewMemberName}
        onClick={onClick}
      />
    );
  },
};
