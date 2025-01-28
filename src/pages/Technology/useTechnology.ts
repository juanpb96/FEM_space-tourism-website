import { useEffect, useState } from "react";
import { getTechnologyAdapter } from "./adapter/getTechnologyAdapter";
import { Technology } from "./types";

export const useTechnology = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<Technology>();

  useEffect(() => {
    const getTechnology = getTechnologyAdapter();

    const getData = async () => {
      const technologyData = await getTechnology();
      setTechnologies(technologyData);
      setSelectedTechnology(technologyData[0]);
    };

    getData();
  }, []);

  const onPaginationClick = (name: string) => {
    const activeIndex = technologies.findIndex(
      (technology) => technology.name === name
    );

    if (activeIndex >= 0) {
      setSelectedTechnology(technologies[activeIndex]);
    }
  };

  return {
    technologies,
    onPaginationClick,
    selectedTechnology,
  };
};
