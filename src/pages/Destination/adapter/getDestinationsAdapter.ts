import type { Destinations } from "../types";
import jsonData from "../../../services/data.json";
import { ENDPOINT } from "../../../services/endpoint";

const getDestinations = async () => {
  try {
    const response = await fetch(ENDPOINT.destinations);

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
    return jsonData.destinations;
  }
};

// Inspired by Nik Sumeiko: https://www.youtube.com/live/DQwNqSEvpk8?si=ZrzqzQL2EpENSXHQ&t=4064
export const getDestinationsAdapter = (options?: {
  get(): Promise<Destinations>;
}) => {
  const get = options?.get ?? getDestinations;

  return () => get();
};
