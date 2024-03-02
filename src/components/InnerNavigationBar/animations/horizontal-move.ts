import type { ScreenType } from '../../../hooks/useScreenType';

interface ListProps {
  index: number;
  options: HTMLLIElement[];
}

interface HorizontalMoveProps extends ListProps {
  screenType: ScreenType,
}

const sumOptionsWidth = ({options, index}: ListProps) => {    
  return options.slice(0, index).reduce((acc, option) => acc + option.offsetWidth, 0);
};

export const calculateHorizontalMoveByViewport = ({screenType, options, index}: HorizontalMoveProps) => {
  const optionsGap = screenType === 'mobile' ? 26 : 36;
  return sumOptionsWidth({options, index}) + index * optionsGap;
};