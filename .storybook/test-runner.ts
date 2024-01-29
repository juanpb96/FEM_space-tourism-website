// Reference: https://storybook.js.org/addons/@storybook/test-runner#preconfiguring-viewport-size
import { TestRunnerConfig, getStoryContext } from '@storybook/test-runner';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 };

const config: TestRunnerConfig = {
  async preRender(page, story) {
    const context = await getStoryContext(page, story);
    const viewportName = context.parameters?.viewport?.defaultViewport;
    const viewportParameter = INITIAL_VIEWPORTS[viewportName];

    if (viewportParameter) {
      const viewportSize = Object.entries(viewportParameter.styles).reduce(
        (acc, [screen, size]) => ({
          ...acc,
          // make sure your viewport config in Storybook only uses numbers, not percentages
          [screen]: parseInt(size),
        }),
        {}
      );

      console.log({viewportSize});
      
      page.setViewportSize(viewportSize);
    } else {
      page.setViewportSize(DEFAULT_VIEWPORT_SIZE);
    }
  },
};
export default config;