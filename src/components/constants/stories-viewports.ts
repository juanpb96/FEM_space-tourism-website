// TODO: Remove export and keep it as a scoped variable - Issue #50
// - Update stories files to use the params value
// Keys of INITIAL_VIEWPORTS from "storybook/viewport"
export const defaultViewport = {
  mobile: "iphone6",
  tablet: "ipad"
};

export const chromaticViewport = {
  mobile: 375,
  tablet: 768
};

// Storybook 9 sets the story viewport through globals instead of parameters
export const mobileGlobals = {
  viewport: { value: defaultViewport.mobile, isRotated: false }
};

export const tabletGlobals = {
  viewport: { value: defaultViewport.tablet, isRotated: false }
};

export const mobileParameters = {
  chromatic: {
    viewports: [chromaticViewport.mobile]
  }
};

export const tabletParameters = {
  chromatic: {
    viewports: [chromaticViewport.tablet]
  }
};
