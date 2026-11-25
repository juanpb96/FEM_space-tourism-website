const svgVariants = {
  closed: {
    rotate: 0
  },
  open: {
    rotate: 90
  }
};

const topRectVariants = {
  closed: {
    rotate: 0,
    y: 0
  },
  open: {
    rotate: [0, 0, -45],
    y: 9,
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1]
    }
  }
};

const middleRectVariants = {
  closed: {
    opacity: 1
  },
  open: (shouldReduceMotion: boolean) => ({
    opacity: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.3
    }
  })
};

const bottomRectVariants = {
  closed: {
    rotate: 0,
    y: 0
  },
  open: {
    rotate: [0, 0, 45],
    y: -9,
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1]
    }
  }
};

export {
  svgVariants,
  topRectVariants,
  middleRectVariants,
  bottomRectVariants
};