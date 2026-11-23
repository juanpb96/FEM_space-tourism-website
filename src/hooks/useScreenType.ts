import { useEffect, useState } from "react";

// Keep in sync with `$tablet` and `$desktop` in src/styles/_variables.scss.
// Using the same values as the SCSS media queries guarantees JS and CSS agree
// on the current layout, even when the user changes the default font size.
const MEDIA_QUERIES = {
  desktop: "(min-width: 81.25rem)",
  tablet: "(min-width: 37.5rem)",
} as const;

export type ScreenType = keyof typeof MEDIA_QUERIES | "mobile";

// Only `min-width` checks, from the largest breakpoint down, so there are no
// gaps between ranges (e.g. 81.2rem / 1299.5px at some zoom levels) that would fall
// back to "mobile"
const getScreenType = (): ScreenType => {
  if (window.matchMedia(MEDIA_QUERIES.desktop).matches) {
    return "desktop";
  }

  if (window.matchMedia(MEDIA_QUERIES.tablet).matches) {
    return "tablet";
  }

  return "mobile";
};

export const useScreenType = () => {
  const [screenType, setScreenType] = useState<ScreenType>(getScreenType);

  useEffect(() => {
    const mediaQueryLists = Object.values(MEDIA_QUERIES).map((query) =>
      window.matchMedia(query)
    );

    const onChange = () => {
      setScreenType(getScreenType());
    };

    mediaQueryLists.forEach((mediaQueryList) =>
      mediaQueryList.addEventListener("change", onChange)
    );

    return () => {
      mediaQueryLists.forEach((mediaQueryList) =>
        mediaQueryList.removeEventListener("change", onChange)
      );
    };
  }, []);

  return screenType;
};
