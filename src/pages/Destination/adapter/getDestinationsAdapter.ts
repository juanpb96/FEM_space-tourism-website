import type { Destinations } from "../types";
import jsonData from '../../../services/data.json';

// TODO: Move to a constants file once other endpoints are added
const apiUrl = 'https://fem-space-tourism-backend.onrender.com/api';
const endpoint = '/destinations';

const getDestinations = async () => {
  try {
    // TODO: Test on mobile when prod gets defined
    const response = await fetch(`${apiUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data from the backend');
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
}

// Inspired by Nik Sumeiko: https://www.youtube.com/live/DQwNqSEvpk8?si=ZrzqzQL2EpENSXHQ&t=4064
export const getDestinationsAdapter = (options?: { get(): Promise<Destinations> }) => {
  const get = options?.get ?? getDestinations;

  return () => get();
}