import type { DataCache as DataCacheType } from "../cache";
import { getPageAdapter } from "../getPageAdapter";

jest.mock("../getPageAdapter");

const mockedGetPageAdapter = getPageAdapter as jest.MockedFunction<
  typeof getPageAdapter
>;

describe("DataCache request status", () => {
  let cache: DataCacheType;

  beforeAll(async () => {
    // The cache starts a revalidation interval when the module is loaded
    jest.useFakeTimers();
    const { DataCache } = await import("../cache");
    cache = DataCache.getInstance();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should be idle before requesting the API", () => {
    expect(cache.getPageDataState("crew")).toEqual({ status: "idle" });
  });

  it("should keep the fallback data and report an error when the request fails", async () => {
    const fallbackData = cache.getPageData("technology");
    mockedGetPageAdapter.mockReturnValue(() =>
      Promise.reject(new Error("Network error"))
    );
    const listener = jest.fn();
    cache.subscribe(listener);

    const request = cache.updatePageDataFromApi("technology");
    expect(cache.getPageDataState("technology").status).toBe("loading");
    expect(cache.getPageDataState("technology").requestedAt).toEqual(
      expect.any(Number)
    );

    await request;

    expect(cache.getPageDataState("technology")).toEqual({ status: "error" });
    expect(cache.getPageData("technology")).toBe(fallbackData);
    // loading + error
    expect(listener).toHaveBeenCalledTimes(2);
    cache.unsubscribe(listener);
  });

  it("should retry after an error and store the API data", async () => {
    const apiData = [
      {
        name: "Launch vehicle",
        images: { portrait: "portrait.jpg", landscape: "landscape.jpg" },
        description: "From the API",
      },
    ];
    mockedGetPageAdapter.mockReturnValue(() => Promise.resolve(apiData));

    await cache.updatePageDataFromApi("technology");

    expect(cache.getPageDataState("technology")).toEqual({ status: "success" });
    expect(cache.getPageData("technology")).toBe(apiData);
  });

  it("should not request the API again once the data is loaded", async () => {
    mockedGetPageAdapter.mockClear();

    await cache.updatePageDataFromApi("technology");

    expect(mockedGetPageAdapter).not.toHaveBeenCalled();
  });
});
