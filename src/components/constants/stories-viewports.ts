// TODO: Remove export and keep it as a scoped variable - Issue #50
// - Update stories files to use the params value
export const defaultViewport = {
  mobile: "iphone6",
  tablet: "ipad"
};

export const chromaticViewport = {
  mobile: 375,
  tablet: 768
};

export const mobileParameters = {
  viewport: {
    defaultViewport: defaultViewport.mobile
  },
  chromatic: {
    viewports: [chromaticViewport.mobile]
  }
};

export const tabletParameters = {
  viewport: {
    defaultViewport: defaultViewport.tablet
  },
  chromatic: {
    viewports: [chromaticViewport.tablet]
  }
};