import { getDataFromJSON } from "../getDataFromJSON";
import jsonData from "../../services/data.json";

describe("getDataFromJSON", () => {
  it("should return the destinations from the JSON file", async () => {
    const fetchMock = jest.spyOn(global, "fetch");

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(jsonData),
    } as Response);

    const result = await getDataFromJSON("destinations");
    expect(result).toEqual(jsonData.destinations);
  });
});
