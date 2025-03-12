import { useEffect, useState } from "react";
import { DataCache } from "../services/cache";
import { Pages, SpaceTourismData } from "../services/types";

const DataCacheInstance = DataCache.getInstance();

export const usePageData = <T extends Pages>(pageName: T) => {
  const [pageData, setPageData] = useState(() =>
    DataCacheInstance.getPageData(pageName)
  );
  const [currentTab, setCurrentTab] = useState<SpaceTourismData[T][0]>(
    pageData[0]
  );

  useEffect(() => {
    const updateData = () => {
      setPageData(DataCacheInstance.getPageData(pageName));
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
      setCurrentTab(pageData[tabIndex]);
    }
  };

  return {
    pageData,
    currentTab,
    onPaginationClick,
  };
};
