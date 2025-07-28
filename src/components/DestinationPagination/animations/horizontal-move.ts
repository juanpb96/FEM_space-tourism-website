import type { ScreenType } from "../../../hooks/useScreenType";

interface ListProps<TOptions extends HTMLElement> {
  index: number;
  options: TOptions[];
}

interface HorizontalMoveProps<TOptions extends HTMLElement>
  extends ListProps<TOptions> {
  screenType: ScreenType;
}

const sumOptionsWidth = <TOptions extends HTMLElement>({
  options,
  index,
}: ListProps<TOptions>) => {
  return options
    .slice(0, index)
    .reduce((acc, option) => acc + option.offsetWidth, 0);
};

export const calculateHorizontalMoveByViewport = <
  TOptions extends HTMLElement
>({
  screenType,
  options,
  index,
}: HorizontalMoveProps<TOptions>) => {
  const optionsGap = screenType === "mobile" ? 26 : 36;
  return sumOptionsWidth({ options, index }) + index * optionsGap;
};
