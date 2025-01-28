import { ENDPOINT } from "../../../services/endpoint";
import { Technology } from "../types";
import jsonData from "../../../services/data.json";

const getTechnology = async (): Promise<Technology[]> => {
  try {
    const response = await fetch(ENDPOINT.technology);

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
    return jsonData.technology;
  }
};

export const getTechnologyAdapter = (options?: {
  get(): Promise<Technology[]>;
}) => {
  const get = options?.get ?? getTechnology;

  return () => get();
};
