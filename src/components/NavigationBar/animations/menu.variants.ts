import { ScreenType } from "../../../hooks/useScreenType";

interface MenuVerticalVariantProps {
  index: number;
}

interface WithOptionsProps extends MenuVerticalVariantProps {
  options: HTMLLIElement[];
}

interface MenuHorizontalVariantProps extends WithOptionsProps {
  screenType: ScreenType;
}

// TODO: Check if it could be a better approach to move functions to another file - Issue #50
const sumOptionsWidth = ({ options, index }: WithOptionsProps) => {
  return options
    .slice(0, index)
    .reduce((acc, option) => acc + option.offsetWidth, 0);
};

// TODO: Create constant values for numbers without a clear explanation - Issue #50
const calculateHorizontalMoveByViewport = ({
  screenType,
  options,
  index,
}: MenuHorizontalVariantProps) => {
  const optionsGap = screenType === "tablet" ? 38 : 48;
  return sumOptionsWidth({ options, index }) + index * optionsGap;
};

const menuVariants = {
  vertical: ({ index }: MenuVerticalVariantProps) => ({
    y: 118 + index * 51,
  }),
  horizontal: ({ screenType, options, index }: MenuHorizontalVariantProps) => ({
    x: calculateHorizontalMoveByViewport({ screenType, options, index }),
  }),
};

// TODO: Get more knowledge on the declaration added in the transition object - Issue #109
const optionsVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      restDelta: 2,
    },
  },
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export { menuVariants, optionsVariants };
