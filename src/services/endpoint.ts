// TODO: Check if there is a better place to save this url - Issue #50
export const API_URL = "https://fem-space-tourism-backend.onrender.com/api";

export const ENDPOINT = {
  destinations: `${API_URL}/destinations`,
  crew: `${API_URL}/crew`,
} as const;
