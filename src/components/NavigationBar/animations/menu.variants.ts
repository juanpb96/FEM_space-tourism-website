interface MobileProps {
  activeItemIndex: number,
  initialY: number
};

interface TabletProps {
  activeItemIndex: number,
};

// TODO: Continue working on the desktop variant
const menuVariants = {
  mobile: ({activeItemIndex, initialY}: MobileProps) => ({
    y: activeItemIndex * 50 + initialY
  }),
  tablet: ({activeItemIndex}: TabletProps) => ({
    x: activeItemIndex
  }),
  desktop: ({activeItemIndex}: TabletProps) => ({
    x: activeItemIndex
  }),
  'large-desktop': ({activeItemIndex}: TabletProps) => ({
    x: activeItemIndex
  })
};

export {
  menuVariants
};