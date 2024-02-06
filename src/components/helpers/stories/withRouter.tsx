import { Decorator } from "@storybook/react";
import { MemoryRouter } from 'react-router-dom';

export const withRouter: Decorator = (Story) => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
);