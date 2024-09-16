import { useEffect, useState } from "react";
import { CrewMember } from "./types";
import { getCrewAdapter } from "./adapter/getCrewAdapter";

export const useCrew = () => {
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [currentCrewMember, setCurrentCrewMember] = useState<CrewMember>();

  useEffect(() => {
    const getCrew = getCrewAdapter();

    const getData = async () => {
      const crewData = await getCrew();
      setCrew(crewData);
      setCurrentCrewMember(crewData[0]);
    };

    getData();
  }, []);

  const onPaginationClick = (name: string) => {
    const crewIndex = crew.findIndex((crewMember) => crewMember.name === name);

    if (crewIndex >= 0) {
      setCurrentCrewMember(crew[crewIndex]);
    }
  };

  return {
    crew,
    currentCrewMember,
    onPaginationClick,
  };
};
