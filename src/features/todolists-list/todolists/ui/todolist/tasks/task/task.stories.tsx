import type { Meta, StoryObj } from '@storybook/react';

import { Task } from 'features/todolists-list/todolists/ui/todolist/tasks/task/task';
import { TaskPriorities, TaskStatuses } from 'common/enums';
import { ReduxStoreProviderDecorator } from 'app/decorators';


// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: "TODOLISTS/task",
  component: Task,
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes:
  // https://storybook.js.org/docs/react/api/argtypes
  args: {
    task: {
      id: "12wsdewfijdei",
      title: "JS",
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      entityStatus: "idle",
      startDate: "",
      deadline: "",
      todoListId: "qweewtrrddfgdfg",
      order: 0,
      addedDate: "",
      description: "",
    },
    todolistId: "fgdosrg8rgjuh",
  },
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof Task>

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    task: {
      id: "12wsdewfijdei2343",
      title: "CSS",
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Low,
      entityStatus: "idle",
      startDate: "",
      deadline: "",
      todoListId: "qweewtrrddfgdfg",
      order: 0,
      addedDate: "",
      description: "",
    },
    todolistId: "fgdosrg8rgjuh",
  }
}
