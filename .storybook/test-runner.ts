// Reference: https://storybook.js.org/docs/writing-tests/integrations/test-runner#preconfiguring-viewport-size
import { TestRunnerConfig, getStoryContext } from "@storybook/test-runner";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 };

const config: TestRunnerConfig = {
  async preVisit(page, story) {
    const context = await getStoryContext(page, story);
    // Storybook 9 sets the viewport through `globals.viewport.value`
    const viewportName: string | undefined =
      context.storyGlobals?.viewport?.value ?? context.globals?.viewport?.value;
    const viewportParameter =
      viewportName && viewportName in INITIAL_VIEWPORTS
        ? INITIAL_VIEWPORTS[viewportName]
        : undefined;

    if (viewportParameter) {
      // Viewport sizes are strings such as "375px"
      await page.setViewportSize({
        width: parseInt(viewportParameter.styles.width, 10),
        height: parseInt(viewportParameter.styles.height, 10),
      });
    } else {
      await page.setViewportSize(DEFAULT_VIEWPORT_SIZE);
    }
  },
};
export default config;
