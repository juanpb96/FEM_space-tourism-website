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

// TODO: Get more knowledge on the declaration added in the transition object
const optionsVariants = {
  open: { 
    opacity: 1, 
    x: 0, 
    transition: {
      type: "spring",
      stiffness: 50,
      restDelta: 2
    }
  },
  closed: { 
    opacity: 0, 
    x: "100%",
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  },
};

export {
  menuVariants,
  optionsVariants
};