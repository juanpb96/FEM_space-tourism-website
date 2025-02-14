type Page = "crew" | "destinations" | "technology";

// TODO: Here could be a notification to let the user know that the data is being fetched from the JSON file
export const getDataFromJSON = async (page: Page) => {
  try {
    const response = await fetch("./src/services/data.json");
    const data = await response.json();

    return data[page];
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
