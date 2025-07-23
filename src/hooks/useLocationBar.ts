import { useEffect, useRef, useState } from "react";

const baseFontSize = parseFloat(
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("font-size")
);

export const useLocationBar = <
  TContainer extends HTMLElement,
  TOptions extends HTMLElement
>(
  items?: unknown[],
  defaultActiveOption = -1
) => {
  const containerRef = useRef<TContainer>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [activeMenuOptionIndex, setActiveMenuOptionIndex] =
    useState(defaultActiveOption);
  const [options, setOptions] = useState<TOptions[]>([]);

  useEffect(() => {
    const paginationElement = containerRef.current;

    if (paginationElement) {
      const optionElements = Array.from(
        paginationElement.children
      ) as TOptions[];
      setOptions(optionElements);
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
    containerRef,
    barRef,
    options,
    activeMenuOptionIndex,
    setActiveMenuOptionIndex,
  };
};
