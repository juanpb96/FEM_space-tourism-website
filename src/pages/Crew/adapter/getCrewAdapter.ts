import { ENDPOINT } from "../../../services/endpoint";
import { CrewMember } from "../types";
import jsonData from "../../../services/data.json";

const getCrew = async (): Promise<CrewMember[]> => {
  try {
    const response = await fetch(ENDPOINT.crew);

    if (!response.ok) {
      throw new Error("Failed to fetch data from the backend");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    // Returning local JSON data in case backend is not available for any reason
    return jsonData.crew;
  }
};

export const getCrewAdapter = (options?: { get(): Promise<CrewMember[]> }) => {
  const get = options?.get ?? getCrew;

  return () => get();
};
