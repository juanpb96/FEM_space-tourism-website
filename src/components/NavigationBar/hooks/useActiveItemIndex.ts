import { useState } from 'react';
import { useScreenType } from "../../../hooks/useScreenType";

const barAdditionalWidth = {
  mobile: 0,
  tablet: 38,
  desktop: 48,
  'large-desktop': 0,
};

export const useActiveItemIndex = () => {
  const screenType = useScreenType();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [elementList, setElementList] = useState([] as HTMLLinkElement[]);

  const getAdditionalWidth = () => {
    return barAdditionalWidth[screenType];
  };

  const setItemList = (elementList: HTMLLinkElement[]) => {
    setElementList(elementList);
  }
  
  const setActivePosition = (index: number) => {
    if (screenType === 'mobile') {
      return setActiveItemIndex(index);
    }

    setActiveItemIndex(
      index === 0 
      ? index 
      : elementList.slice(0, index).reduce((sum, item) => sum + item.offsetWidth + getAdditionalWidth(), 0)
    );
  };

  return { activeItemIndex, setItemList, setActivePosition };
};
