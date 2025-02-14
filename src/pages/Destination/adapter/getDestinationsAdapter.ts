import type { Destinations } from "../types";
import { ENDPOINT } from "../../../services/endpoint";

// TODO: If data is retrieved properly, look for any message presented to the user telling them that "we are using backup data" and remove it
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
  }
};

// Inspired by Nik Sumeiko: https://www.youtube.com/live/DQwNqSEvpk8?si=ZrzqzQL2EpENSXHQ&t=4064
export const getDestinationsAdapter = (options?: {
  get(): Promise<Destinations>;
}) => {
  const get = options?.get ?? getDestinations;

  return () => get();
};
