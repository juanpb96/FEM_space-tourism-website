import { ENDPOINT } from "./endpoint";
import { Pages } from "./types";

const getPageData = async <T>(page: Pages): Promise<T> => {
  try {
    const response = await fetch(ENDPOINT[page]);

    if (!response.ok) {
      throw new Error("Failed to fetch data from the backend");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    throw error;
  }
};

export const getPageAdapter = <T>(
  page: Pages,
  options?: { get(): Promise<T> }
) => {
  const get = options?.get ?? (() => getPageData<T>(page));

  return () => get();
};
