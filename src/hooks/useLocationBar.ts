import { useEffect, useRef, useState } from 'react';

const baseFontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));

export const useLocationBar = () => {
  const olRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [activeMenuOptionIndex, setActiveMenuOptionIndex] = useState(0);
  const [options, setOptions] = useState<HTMLLIElement[]>([]);

  useEffect(() => {
    const olElement = olRef.current;

    if (olElement) {
      const liElements = Array.from(olElement.getElementsByTagName('li'));
      setOptions(liElements);
    }
  }, [])

  useEffect(() => {
    const barElement = barRef.current;

    const resizeObserver = new ResizeObserver((entries) => {      
      if (barElement) {
        const activeMenuOptionWidth = Math.round(entries[0].contentBoxSize[0].inlineSize);
        barElement.style.width = `${activeMenuOptionWidth / baseFontSize}rem`; 
      }
    });
    
    const calculateBarWidth = () => {
      if (options.length && barElement) {    
        const activeMenuOption = options[activeMenuOptionIndex];            
        resizeObserver.observe(activeMenuOption);
      }
    }

    calculateBarWidth();

    return () => {
      resizeObserver.disconnect();
    }
  }, [activeMenuOptionIndex, options]);
  
  return {
    olRef,
    barRef,
    options,
    activeMenuOptionIndex,
    setActiveMenuOptionIndex
  };
};
