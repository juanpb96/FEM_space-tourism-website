import { useEffect, useState } from 'react';

const BREAKPOINTS = {
  tablet: '(min-width: 48rem) and (max-width: 63.9375rem)',
  desktop: '(min-width: 64rem) and (max-width: 89.9375rem)',
  'large-desktop': '(min-width: 90rem)',
};

export type ScreenType = keyof typeof BREAKPOINTS | 'mobile';

const getWindowType = () => {
  for (const breakpoint in BREAKPOINTS) {     
    if (window.matchMedia(BREAKPOINTS[breakpoint as keyof typeof BREAKPOINTS]).matches) {
      return breakpoint as keyof typeof BREAKPOINTS;
    }
  }

  return 'mobile';
};

export const useScreenType = () => {
  const [screenType, setScreenType] = useState<ScreenType>(getWindowType); 

  useEffect(() => {
    const onResize = () => {
      setScreenType(getWindowType());
    };

    window.addEventListener('resize', onResize);
  
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);  

  return screenType;
}
