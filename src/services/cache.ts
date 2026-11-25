import jsonData from "./data.json";
import { Pages, SpaceTourismData } from "./types";
import { getPageAdapter } from "./getPageAdapter";

/**
 * Status of the request that replaces the fallback data (data.json) with the
 * data from the API:
 * - `idle`: no request has been made yet (the fallback data is displayed)
 * - `loading`: waiting for the API (the fallback data is displayed)
 * - `success`: the API data is displayed
 * - `error`: the request failed (the fallback data is displayed)
 */
export type PageDataStatus = "idle" | "loading" | "success" | "error";

export interface PageDataState {
  status: PageDataStatus;
  /** Timestamp (ms) of the last request, used to detect slow requests */
  requestedAt?: number;
}

export class DataCache {
  private static readonly instance: DataCache = new DataCache();
  private readonly cache: Map<Pages, SpaceTourismData[Pages]> = new Map();
  private readonly pageDataUpdates: Map<Pages, PageDataState> = new Map();
  private readonly revalidationInterval: number = 15 * 60 * 1000; // 15 minutes
  private lastUpdate: number | undefined = undefined;
  private listeners: (() => void)[] = [];

  private constructor() {
    this.initializeCacheFromJSON();
    this.clearPageDataUpdates();
    this.startRevalidation();
  }

  public static getInstance(): DataCache {
    return DataCache.instance;
  }

  private initializeCacheFromJSON(): void {
    for (const [key, value] of Object.entries(jsonData)) {
      this.cache.set(key as Pages, value);
    }
  }

  private clearPageDataUpdates(): void {
    for (const key of Object.keys(jsonData)) {
      this.pageDataUpdates.set(key as Pages, { status: "idle" });
    }
  }

  private isPageDataUpdated(name: Pages): boolean {
    const { status } = this.getPageDataState(name);

    return status === "loading" || status === "success";
  }

  private startRevalidation(): void {
    setInterval(() => {
      const now = new Date().getTime();
      if (
        this.lastUpdate &&
        now - this.lastUpdate > this.revalidationInterval
      ) {
        this.clearPageDataUpdates();
      }
    }, 5 * 60 * 1000); // 5 minutes
  }

  public getPageData<T extends Pages>(name: T): SpaceTourismData[T] {
    try {
      const pageData = this.cache.get(name);

      if (pageData === undefined) {
        throw new Error("Page data not found for " + name);
      }

      return pageData as SpaceTourismData[T];
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return [];
    }
  }

  public getPageDataState(name: Pages): PageDataState {
    return this.pageDataUpdates.get(name) ?? { status: "idle" };
  }

  public async updatePageDataFromApi<T extends Pages>(
    name: Pages
  ): Promise<void> {
    if (this.isPageDataUpdated(name)) {
      return;
    }

    try {
      this.pageDataUpdates.set(name, {
        status: "loading",
        requestedAt: Date.now(),
      });
      this.notifyListeners();

      const getPageData = getPageAdapter<SpaceTourismData[T]>(name);
      const data: SpaceTourismData[T] = await getPageData();

      this.cache.set(name, data);
      this.pageDataUpdates.set(name, { status: "success" });
      this.lastUpdate = new Date().getTime();
      this.notifyListeners();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      // The fallback data stays in the cache. A new call (e.g. the user
      // visiting the page again) will retry the request
      this.pageDataUpdates.set(name, { status: "error" });
      this.notifyListeners();
    }
  }

  public subscribe(listener: () => void): void {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: () => void): void {
    this.listeners = this.listeners.filter((item) => item !== listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}
