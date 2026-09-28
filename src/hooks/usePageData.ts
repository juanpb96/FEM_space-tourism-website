import { useEffect, useState } from "react";
import { DataCache } from "../services/cache";
import { Pages, SpaceTourismData } from "../services/types";

const DataCacheInstance = DataCache.getInstance();

export const usePageData = <T extends Pages>(pageName: T) => {
  const [pageData, setPageData] = useState(() =>
    DataCacheInstance.getPageData(pageName)
  );
  const [dataState, setDataState] = useState(() =>
    DataCacheInstance.getPageDataState(pageName)
  );
  // The index (not the item) is stored, so the current tab displays the API
  // data once it replaces the fallback data
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const currentTab: SpaceTourismData[T][0] | undefined =
    pageData[currentTabIndex] ?? pageData[0];

  useEffect(() => {
    const updateData = () => {
      setPageData(DataCacheInstance.getPageData(pageName));
      setDataState(DataCacheInstance.getPageDataState(pageName));
    };

    DataCacheInstance.subscribe(updateData);
    DataCacheInstance.updatePageDataFromApi(pageName);

    return () => {
      DataCacheInstance.unsubscribe(updateData);
    };
  }, [pageName]);

  const onPaginationClick = (name: string) => {
    const tabIndex = pageData.findIndex((item) => item.name === name);

    if (tabIndex >= 0) {
      setCurrentTabIndex(tabIndex);
    }
  };

  const retry = () => {
    DataCacheInstance.updatePageDataFromApi(pageName);
  };

  return {
    pageData,
    dataState,
    currentTab,
    onPaginationClick,
    retry,
  };
};
