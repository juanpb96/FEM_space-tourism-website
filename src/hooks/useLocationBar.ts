import { useEffect, useRef, useState } from "react";

const baseFontSize = parseFloat(
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("font-size")
);

export const useLocationBar = (items?: unknown[], defaultActiveOption = -1) => {
  const olRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [activeMenuOptionIndex, setActiveMenuOptionIndex] =
    useState(defaultActiveOption);
  const [options, setOptions] = useState<HTMLLIElement[]>([]);

  useEffect(() => {
    const olElement = olRef.current;

    if (olElement) {
      const liElements = Array.from(olElement.getElementsByTagName("li"));
      setOptions(liElements);
    }
  }, [items]);

  useEffect(() => {
    const barElement = barRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      if (barElement) {
        const activeMenuOptionWidth = Math.round(
          entries[0].contentBoxSize[0].inlineSize
        );
        barElement.style.width = `${activeMenuOptionWidth / baseFontSize}rem`;
      }
    });

    const calculateBarWidth = () => {
      if (activeMenuOptionIndex >= 0 && options.length > 0 && barElement) {
        const activeMenuOption = options[activeMenuOptionIndex];
        resizeObserver.observe(activeMenuOption);
      }
    };

    calculateBarWidth();

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeMenuOptionIndex, options]);

  return {
    olRef,
    barRef,
    options,
    activeMenuOptionIndex,
    setActiveMenuOptionIndex,
  };
};
