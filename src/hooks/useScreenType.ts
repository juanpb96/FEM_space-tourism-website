import { useEffect, useState } from "react";

const BREAKPOINTS = {
  tablet: "(min-width: 37.5rem) and (max-width: 81.1875rem)",
  desktop: "(min-width: 81.25rem) and (max-width: 89.9375rem)",
};

export type ScreenType = keyof typeof BREAKPOINTS | "mobile";

const getWindowType = () => {
  for (const breakpoint in BREAKPOINTS) {
    if (
      window.matchMedia(BREAKPOINTS[breakpoint as keyof typeof BREAKPOINTS])
        .matches
    ) {
      return breakpoint as keyof typeof BREAKPOINTS;
    }
  }

  return "mobile";
};

export const useScreenType = () => {
  const [screenType, setScreenType] = useState<ScreenType>(getWindowType);

  useEffect(() => {
    const onResize = () => {
      setScreenType(getWindowType());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return screenType;
};
