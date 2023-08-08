import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EditableSpan } from 'common/components/editableSpan/EditableSpan';

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
  title: "TODOLISTS/editableSpan",
  component: EditableSpan,
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes:
  // https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      description: "Start value empty. Add value push button set string.",
    },
    onChange: {
      description: "Value editableSpan changed",
    },
  },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    onChange: action("Value editableSpan changed"),
  },
}
