// TODO: Get more knowledge on the declaration added in the transition object - Issue #109
const optionsVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 40,
      restDelta: 0.01,
    },
  },
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 50,
    },
  },
};

export { optionsVariants };
