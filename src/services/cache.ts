import jsonData from "./data.json" assert { type: "json" };
import { Pages, SpaceTourismData } from "./types";
import { getPageAdapter } from "./getPageAdapter";

interface PageDataStatus {
  isLoading: boolean;
  hasLoaded: boolean;
}

export class DataCache {
  private static readonly instance: DataCache = new DataCache();
  private readonly cache: Map<Pages, SpaceTourismData[Pages]> = new Map();
  private readonly pageDataUpdates: Map<Pages, PageDataStatus> = new Map();
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
      this.pageDataUpdates.set(key as Pages, {
        isLoading: false,
        hasLoaded: false,
      });
    }
  }

  private isPageDataUpdated(name: Pages): boolean {
    if (this.pageDataUpdates.has(name)) {
      return (
        this.pageDataUpdates.get(name)!.isLoading ||
        this.pageDataUpdates.get(name)!.hasLoaded
      );
    }

    return false;
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

  public async updatePageDataFromApi<T extends Pages>(
    name: Pages
  ): Promise<void> {
    if (this.isPageDataUpdated(name)) {
      return;
    }

    try {
      this.pageDataUpdates.set(name, {
        isLoading: true,
        hasLoaded: false,
      });

      const getPageData = getPageAdapter<SpaceTourismData[T]>(name);
      const data: SpaceTourismData[T] = await getPageData();

      this.cache.set(name, data);
      this.pageDataUpdates.set(name, {
        isLoading: false,
        hasLoaded: true,
      });
      this.lastUpdate = new Date().getTime();
      this.notifyListeners();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
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
