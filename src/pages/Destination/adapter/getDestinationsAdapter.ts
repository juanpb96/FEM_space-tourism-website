import type { Destinations } from "../types";

const getDestinations = async () => {
  try {
    // TODO: Update URL when resource is defined for prod env
    // TODO: Test on mobile when prod gets defined
    const response = await fetch('http://localhost:3000/destinations');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Inspired by Nik Sumeiko: https://www.youtube.com/live/DQwNqSEvpk8?si=ZrzqzQL2EpENSXHQ&t=4064
export const getDestinationsAdapter = (options?: { get(): Promise<Destinations> }) => {
  const get = options?.get ?? getDestinations;

  return () => get();
}