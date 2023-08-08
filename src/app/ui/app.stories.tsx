import type { Meta, StoryObj } from '@storybook/react';

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from 'app/decorators/reduxStoreProviderDecorator';
import { App } from 'app/ui/app';

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof App> = {
  title: "TODOLISTS/AppWithRedux",
  component: App,
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
}

export default meta
type Story = StoryObj<typeof App>

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppStory: Story = {
  args: {
    demo: true,
  },
}
